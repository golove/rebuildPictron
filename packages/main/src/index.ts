import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import { join } from 'path';
import { URL } from 'url';
import './security-restrictions';

const isSingleInstance = app.requestSingleInstanceLock();
const isDevelopment = import.meta.env.MODE === 'development';
import {spiderAll,readImg, updateImg} from '/@/spider/spider';

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

// Install 'Vue.js devtools'
if (isDevelopment) {
  app
    .whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, VUEJS3_DEVTOOLS }) =>
      installExtension(VUEJS3_DEVTOOLS, {
        loadExtensionOptions: {
          allowFileAccess: true,
        },
      }),
    )
    .catch((e) => console.error('Failed install extension:', e));
}

let mainWindow: BrowserWindow | null = null;



const createWindow = async () => {
  mainWindow = new BrowserWindow({
    // show: false, // Use 'ready-to-show' event to show window
    minWidth: 1100,
    minHeight: 700,
    frame: false,
    transparent: true,
    // titleBarStyle:'hidden',
    // titleBarOverlay: {
    //   color: '#e6e6e6',
    // },

    // transparent: true,
    // trafficLightPosition: { x: 10, y: 10 },
    webPreferences: {
      nativeWindowOpen: true,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  ipcMain.handle('dark-mode:toggle', () => {
    nativeTheme.shouldUseDarkColors?nativeTheme.themeSource = 'light': nativeTheme.themeSource = 'dark';
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.on('change',(event, arg:{act:string,title:string,type:string,href:string,value:number,srcs:string})=>{
    updateImg(arg, event);

  });

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.on('spiderAll',(event)=>{
    spiderAll(event);

  });

  ipcMain.on('getImageData',(event,arg:{tableName:string,pageNumber:number,collect:boolean})=>{
    readImg(arg.tableName,arg.pageNumber,arg.collect,event);
  });


  // ipcMain.on('getCollectImageData',(event)=>{
  // //  const collectData = manage.getAllCollect();
  //  event.sender.send('collectData',collectData);
  // });

  // console.log();
  // ipcMain.handle('imageData', () => {
  //   return manage;
  // });

  ipcMain.on('windowTool', (event, content) => {
    if(mainWindow===null) {
      return;
    }else{
      if (content === 'min') {
        mainWindow.minimize();
      } else if (content === 'max') {
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
      } else {
        mainWindow.close();
      }
    }

  });

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();

    if (isDevelopment) {
      mainWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    isDevelopment && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL(
        '../renderer/dist/index.html',
        'file://' + __dirname,
      ).toString();

  await mainWindow.loadURL(pageUrl);
};

ipcMain.on('renderMsg', (event, arg) => {
  console.log(arg);
  event.sender.send('ipcMainMsg', 'pong');
});

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error('Failed create window:', e));

// Auto-updates
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e));
}
