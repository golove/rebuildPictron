// store.ts
import type { InjectionKey } from 'vue';
import type { Store} from 'vuex';
import { createStore, useStore as baseUseStore } from 'vuex';

// define your typings for the store state
export interface State {
  album: Array<string>,
  albumTitle:string,
  page:number,
  albumFlag:boolean,
  darkTheme:boolean,
  imgIndex:number,
  stayPath:string,
}

interface IAlbum{
  srcs:Array<string>,
  title:string,
}

// define injection key
// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    album: [''],
    albumTitle: '',
    page:1,
    albumFlag: false,
    darkTheme:false,
    stayPath:'/',
    imgIndex:0,

  },
  getters: {
  },
  mutations: {
    SET_ALBUM (state, data: IAlbum) {
      state.album = data.srcs;
      state.albumTitle = data.title;
    },
    SET_PAGE(state,page: number) {
      state.page = page;
    },
    SET_IMGINDEX(state,index: number) {
      state.imgIndex = index;
    },
    SET_DARKTHEME(state,data:boolean){
      state.darkTheme = data;
    },
    SET_ALBUMFLAG (state, data:boolean) {
      state.albumFlag = data;
    },
    SET_PATH(state,data:string){
      state.stayPath = data;
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
