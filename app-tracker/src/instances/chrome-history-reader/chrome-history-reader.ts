import * as sqlite3 from "sqlite3";
import * as os from "os";

const username = os.userInfo().username;

export class ChromeHistoryReader {
  public static getChromeSearchHistory() {
    // Path to the Chrome History SQLite database file with the current username
    const chromeHistoryPath = `/Users/${username}/Library/Application Support/Google/Chrome/Default/History`;

    // Connect to the database and run a query to retrieve search history
    const db = new sqlite3.Database(
      chromeHistoryPath,
      sqlite3.OPEN_READONLY,
      (err: any | null) => {
        if (err) {
          console.error("Error opening database:", err.message);
        } else {
          const query = "SELECT * FROM keyword_search_terms";
          db.all(
            query,
            (err: any | null, rows: { term: string; url: string }[]) => {
              if (err) {
                console.error("Error running query:", err.message);
              } else {
                console.log("Chrome search history:");
                rows.forEach((row: { term: string; url: string }) =>
                  console.log(`- ${row.term}: ${row.url}`)
                );
              }
              db.close();
            }
          );
        }
      }
    );

    return username;
  }
}
