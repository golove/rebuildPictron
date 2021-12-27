// store.ts
import type { InjectionKey } from 'vue';
import type { Store} from 'vuex';
import { createStore, useStore as baseUseStore } from 'vuex';

// define your typings for the store state
export interface State {
  album: Array<string>,
  albumTitle:string,
  albumFlag:boolean,
  darkTheme:boolean,
}

interface IAlbum{
  hrefs:Array<string>,
  title:string,
}

// define injection key
// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    album: [''],
    albumTitle: '',
    albumFlag: false,
    darkTheme:false,

  },
  getters: {
  },
  mutations: {
    SET_ALBUM (state, data: IAlbum) {
      state.album = data.hrefs;
      state.albumTitle = data.title;
    },
    SET_DARKTHEME(state,data:boolean){
      state.darkTheme = data;
    },
    SET_ALBUMFLAG (state, data:boolean) {
      state.albumFlag = data;
    },
  },
  actions: {

  },
});

// define your own `useStore` composition function
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useStore () {
  return baseUseStore(key);
}
