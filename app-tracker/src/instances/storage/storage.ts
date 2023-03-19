import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { DataSummarizeReport } from '../data-summarize-report';

export class Storage {
  private static db: Database<sqlite3.Database, sqlite3.Statement>;

  public static async initializeDatabase() {
    const ISODate = new Date().toISOString();
    try {
      // Open the SQLite database
      const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database,
      });

      Storage.db = db;

      // Check if the "migrations" table exists
      const migrationsTableExists = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='migrations'");

      if (!migrationsTableExists) {
        // If the "migrations" table does not exist, create it
        await db.run(`
          CREATE TABLE migrations (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Run migrations here
        await db.run(`
        CREATE TABLE app_time_tracker (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          datetime TEXT NOT NULL,
          datetime_trunc TEXT NOT NULL,
          time_spent_sec INTEGER NOT NULL,

          UNIQUE (name, datetime_trunc)
        );
        `);

        await db.run(`
        CREATE TABLE IF NOT EXISTS report_generate_stamptation (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          generated_at DATETIME NOT NULL,
          status BOOLEAN NOT NULL DEFAULT 1
        );
        `);

        await db.run(`
      CREATE TABLE search_keyword_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        keyword VARCHAR(255) NOT NULL,
        datetime TIMESTAMP WITH TIME ZONE NOT NULL
    );
      `);

        await this.db.run(`
      INSERT INTO report_generate_stamptation (generated_at,status)
  VALUES (DATE('${ISODate}', 'localtime', 'start of day'),1);
`);

        console.log('Database initialized successfully!');
      }
    } catch (err) {
      console.error(err);
    }
  }

  public static async stampSearchText(searchTxt: string) {
    console.log('here');

    const ISODate = new Date().toISOString();
    await this.db.run(`
      INSERT INTO search_keyword_history (keyword,datetime)
  VALUES ('${searchTxt}',DATE('${ISODate}', 'localtime', 'start of day'));
`);
  }

  public static async stampAppActivity(appName: string) {
    const ISODate = new Date().toISOString();
    await this.db.run(`
          INSERT INTO app_time_tracker (name, datetime,datetime_trunc, time_spent_sec)
      VALUES ('${appName}', '${ISODate}',DATE('${ISODate}', 'localtime', 'start of day'),1)
      ON CONFLICT(name, datetime_trunc)
      DO UPDATE SET time_spent_sec = app_time_tracker.time_spent_sec + 1
    `);
  }

  public static async proceedSummerizationReport() {
    const latestTrack = await this.db.get(`
      SELECT * FROM app_time_tracker ORDER BY datetime_trunc DESC LIMIT 1;
    `);

    if (latestTrack) {
      console.log(latestTrack.datetime_trunc);

      const latestReport = await this.db.get(`
        SELECT * FROM report_generate_stamptation ORDER BY generated_at DESC LIMIT 1;
      `);

      if (!latestReport) return;
      if (latestTrack.datetime_trunc > latestReport.generated_at) {
        console.log('should do summerize');

        const tracks = await this.db.all(`
        SELECT * FROM app_time_tracker WHERE datetime_trunc='${latestTrack.datetime_trunc}';
      `);

        if (!tracks.length) {
          // if no track founds
          await this.db.run(`
          INSERT INTO report_generate_stamptation (generated_at,status)
      VALUES (DATE('now', 'localtime', 'start of day'),1);
    `);
          return;
        }

        const searchTexts = await this.db.all(`
        SELECT * FROM search_keyword_history WHERE datetime='${latestTrack.datetime_trunc}';
      `);

        DataSummarizeReport.getAndSendSummarization(tracks, searchTexts);
        await this.db.run(`
          INSERT INTO report_generate_stamptation (generated_at,status)
      VALUES (DATE('now', 'localtime', 'start of day'),1);
    `);
      }
    }
  }
  public static async getTodayTrackedData() {
    const ISODate = new Date().toISOString();
    const trackedData = await this.db.all(`
    SELECT * FROM app_time_tracker WHERE datetime_trunc=DATE('${ISODate}', 'localtime', 'start of day');
  `);
    return trackedData;
  }
}
