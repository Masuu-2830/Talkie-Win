const { electron, ipcMain, app, BrowserWindow } = require("electron");
// Module to control application life.
// const app = electron.app;
// Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow;
const { autoUpdater } = require("electron-updater");

const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

if (require("electron-squirrel-startup")) {
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      nativeWindowOpen: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadURL("http://localhost:3000");
  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${__dirname}/./index.html`,
    { userAgent: "Chrome" }
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  // session.defaultSession.setUserAgent("Chrome");
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("app_version", (event) => {
  event.sender.send("app_version", { version: app.getVersion() });
});

autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});
autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});

ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});
