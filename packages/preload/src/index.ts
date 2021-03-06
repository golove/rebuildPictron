import {contextBridge, ipcRenderer} from 'electron';

import type {BinaryLike} from 'crypto';
import {createHash} from 'crypto';


// import getpage from '../../preload/src/spider/request';



// const host = 'http://x2.2112kw.rocks/pw/';
// const url = `${host}thread.php?fid=14thread.php?fid=${1}`;
// done(url);
/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */

/**
 * After analyzing the `exposeInMainWorld` calls,
 * `packages/preload/exposedInMainWorld.d.ts` file will be generated.
 * It contains all interfaces.
 * `packages/preload/exposedInMainWorld.d.ts` file is required for TS is `renderer`
 *
 * @see https://github.com/cawa-93/dts-for-context-bridge
 */

/**
 * Expose Environment versions.
 * @example
 * console.log( window.versions )
 */
contextBridge.exposeInMainWorld('versions', process.versions);

/**
 * Safe expose node.js API
 * @example
 * window.nodeCrypto('data')
 */
contextBridge.exposeInMainWorld('nodeCrypto', {
  sha256sum(data: BinaryLike) {
    const hash = createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  },
});

contextBridge.exposeInMainWorld('ipcRenderer',{
  ...ipcRenderer,
  on(ipcName: string,callback: (event:Electron.IpcRendererEvent,...args:unknown[])=>void){
    ipcRenderer.on(ipcName,callback);
  },
});

contextBridge.exposeInMainWorld('imageData',()=>ipcRenderer.invoke('imageData'));


contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
});

