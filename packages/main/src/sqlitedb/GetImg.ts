import Sqlitedb from './Sqdb';
import type { IData, IDataS } from './Sqdb';
// import DownloadImage from './download';
class GetImg {
  url: string;
  DB: Sqlitedb;
  name: string;
  // urls: Array<string> = [];
  collectData: Array<IData> = [];
  downloadData: Array<IData> = [];
  // deletedData: Array<IData> = [];
  constructor(url: string, tableName: string) {
    this.name = tableName;
    this.url = url;
    this.DB = new Sqlitedb(tableName);
    if(this.DB){
      this.DB.getAllImages((e: unknown, a: Array<IDataS>) => {
        if (e) console.error(e);
        if (a) {
          for (const item of a) {
            const temItem: IData = {
              classify: '',
              title: '',
              url: '',
              href: [],
              star: 0,
              collect: false,
              deleted: false,
              download: false,
            };
            temItem.href = item.href.split(',');
            temItem.title = item.title;
            temItem.classify = item.classify;
            temItem.url = item.url;
            temItem.star = item.star;
            temItem.collect = item.collect;
            temItem.deleted = item.deleted;
            temItem.download = item.download;
            // this.urls.push(item.url);
            if (temItem.collect) {
              this.collectData.push(temItem);
            }
            if (temItem.download) {
              this.downloadData.push(temItem);
            }
            // if (temItem.deleted) {
            //   this.deletedData.push(temItem);
            // }
          }
        }
      });
    }
  }

  // getImages(){

  // }

}

export default GetImg;
