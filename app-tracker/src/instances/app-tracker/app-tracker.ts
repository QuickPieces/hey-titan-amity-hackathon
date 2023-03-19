import { exec } from 'child_process';
import { Storage } from '../storage/storage';

export class AppTracker {
  public static getCurrentFocusedApp() {
    exec(`osascript -e 'tell application "System Events" to get name of first application process whose frontmost is true'`, async (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      const appName: string = stdout.replace(/\n$/, '');
      await Storage.stampAppActivity(appName);
    });
  }
}
