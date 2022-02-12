import { net } from 'electron';
import { join } from 'path';
import {writeFile,mkdirSync,existsSync, openSync } from 'fs';
import { Notification } from 'electron';
import {homedir} from 'os';
import sqlite3 from 'sqlite3';
// eslint-disable-next-line no-var
var DB = DB || {};

DB.SqliteDB = function (file: string) {
  DB.db = new sqlite3.Database(file);
  DB.exists = existsSync(file);
  if (!DB.exists) {
    console.log('Creating db file!');
    openSync(file, 'w');
  }
};

DB.printErrorInfo = function (err: any) {
  console.log('Error Message: ' + err.message + 'ErrorNumber: ' + err);
};

// const createTableSql = "CREATE TABLE IF NOT EXISTS beauty (title TEXT,href TEXT,srcs BLOB,star INTEGER,collect NUMERIC,deleted NUMERIC,download NUMERIC);";
// sqliteDB.createTable(createTableSql);
DB.SqliteDB.prototype.createTable = function (sql: string) {
  DB.db.serialize(function () {
    DB.db.run(sql, function (err: any) {
      if (null != err) {
        DB.printErrorInfo(err);
        return;
      }
    });
  });
};

// const insertData = [
//     ['[IMISS愛蜜社] 2021.05.14 Vol.592 Vanessa (44P)',
//         'http://w11.a6def2ef910.rocks/pw/html_data/14/2201/5787735.html',
//         'http://p1.pi22y.cc/i/2022/01/13/z7qtwh.jpg,http://p1.pi22y.cc/i/2022/01/13/z7rjaj.jpg,http://p1.pi22y.cc/i/2022/01/13/z7rxow.jpg,http://p1.pi22y.cc/i/2022/01/13/z7su0t.jpg,http://p1.pi22y.cc/i/2022/01/13/z7theh.jpg,http://p1.pi22y.cc/i/2022/01/13/z7tsy8.jpg,http://p1.pi22y.cc/i/2022/01/13/z7u6lt.jpg,http://p1.pi22y.cc/i/2022/01/13/z7ur8b.jpg,http://p1.pi22y.cc/i/2022/01/13/z7v3gc.jpg,http://p1.pi22y.cc/i/2022/01/13/z7vsej.jpg,http://p1.pi22y.cc/i/2022/01/13/z7wfln.jpg,http://p1.pi22y.cc/i/2022/01/13/z85dl4.jpg,http://p1.pi22y.cc/i/2022/01/13/z85tz4.jpg,http://p1.pi22y.cc/i/2022/01/13/z86cly.jpg,http://p1.pi22y.cc/i/2022/01/13/z86tzg.jpg,http://p1.pi22y.cc/i/2022/01/13/z87def.jpg,http://p1.pi22y.cc/i/2022/01/13/z87rsi.jpg,http://p1.pi22y.cc/i/2022/01/13/z887wn.jpg,http://p1.pi22y.cc/i/2022/01/13/z88tba.jpg,http://p1.pi22y.cc/i/2022/01/13/z89lqr.jpg,http://p1.pi22y.cc/i/2022/01/13/z8a8zj.jpg,http://p1.pi22y.cc/i/2022/01/13/z8aov1.jpg,http://p1.pi22y.cc/i/2022/01/13/z8bbcz.jpg,http://p1.pi22y.cc/i/2022/01/13/z8bsjv.jpg,http://p1.pi22y.cc/i/2022/01/13/z8cfbj.jpg,http://p1.pi22y.cc/i/2022/01/13/z8d6bz.jpg,http://p1.pi22y.cc/i/2022/01/13/z8dsaj.jpg,http://p1.pi22y.cc/i/2022/01/13/z8edpj.jpg,http://p1.pi22y.cc/i/2022/01/13/9sc5l51.jpg,http://p1.pi22y.cc/i/2022/01/13/z8fpby.jpg,http://p1.pi22y.cc/i/2022/01/13/z8gct4.jpg,http://p1.pi22y.cc/i/2022/01/13/z8h8v4.jpg,http://p1.pi22y.cc/i/2022/01/13/z8hraq.jpg,http://p1.pi22y.cc/i/2022/01/13/z8rirv.jpg,http://p1.pi22y.cc/i/2022/01/13/z8sa0f.jpg,http://p1.pi22y.cc/i/2022/01/13/z8tggg.jpg,http://p1.pi22y.cc/i/2022/01/13/z8um4o.jpg,http://p1.pi22y.cc/i/2022/01/13/z8vtci.jpg,http://p1.pi22y.cc/i/2022/01/13/z8wzro.jpg,http://p1.pi22y.cc/i/2022/01/13/z8yf8z.jpg,http://p1.pi22y.cc/i/2022/01/13/9shxhp0.jpg,http://p1.pi22y.cc/i/2022/01/13/z916o0.jpg,http://p1.pi22y.cc/i/2022/01/13/z92r8s.jpg,http://p1.pi22y.cc/i/2022/01/13/z9cpiz.jpg',
//         0, 0, 0,
//     ]
// ]
// const insertSql = 'INSERT INTO beauty VALUES (?,?,?,?,?,?,?);';
// sqliteDB.insertData(insertSql, insertData);

DB.SqliteDB.prototype.insertDatas = function (sql: string, objects: []) {
  DB.db.serialize(function () {
    const stmt = DB.db.prepare(sql);
    for (let i = 0; i < objects.length; ++i) {
      stmt.run(objects[i]);
    }
    stmt.finalize();
  });
};
DB.SqliteDB.prototype.insertData = function (sql: string, object: []) {
  DB.db.serialize(function () {
    const stmt = DB.db.prepare(sql);
    stmt.run(object);
    stmt.finalize();
  });
};

// const querySql = 'select * from beauty';
// const query = `SELECT * FROM ${tableName} LIMIT ${3} OFFSET ${(n - 1) * 3}`;
// function queryData(rows){
//     console.log(rows)
// }
// // sqliteDB.queryData(querySql,queryData);
DB.SqliteDB.prototype.queryData = function (
  sql: string,
  collect?: boolean,
  event?: Electron.IpcRendererEvent,
  callback?:(rows:[]) =>void,
) {
  DB.db.all(sql, function (err: any, rows: []) {
    // console.log(collect);
    // console.log(rows);
    if (collect) {
      if(event) {
        if(rows===undefined){
          event.sender.send('imagesData', []);
        }else{
          event.sender.send('imagesData', rows);
        }
      }

    }else{
      if(event){
        if (null != err) {
          // DB.printErrorInfo(err);
          // return;
          event.sender.send('imagesData', false);
        }else{
          event.sender.send('imagesData', rows);
        }
      }

    }
    if(callback){
      callback(rows);
    }

  });
};

// const updateSql = 'update beauty set download = 1 where star = 0';
// sqliteDB.executeSql(updateSql)
DB.SqliteDB.prototype.executeSql = function (sql: string,arg:{act:string,title:string,type:string,href:string,value:number,srcs:string},event: Electron.IpcMainEvent) {
 DB.db.exec(sql, function (err: any) {
    if (null != err) {
      DB.printErrorInfo(err);
      event.sender.send(arg.act+'-reply',false);
    }else{

      if(arg.act==='download'&&arg.value){
        const rootpath = 'Pictures';
        const picDir = join(homedir(),`${rootpath}/${arg.title}`);
        mkdirSync(picDir,{ recursive:true });
        const list = arg.srcs.split(',');
        const last = list[list.length - 1];
        list.forEach((url,index)=>{
          imgDownload(url,index,arg.title,picDir,last,arg.act,event);
        });
      }else{
        event.sender.send(arg.act+'-reply',true);
      }
    }
  });
};

DB.SqliteDB.prototype.close = function () {
  DB.db.close();
};

export const SqliteDB = DB.SqliteDB;


function imgDownload(url:string,index:number,title:string,picDir:string,last:string,act:string,event:Electron.IpcMainEvent){
  const axios= net.request(url);
  const ext = url.split('/').pop();
  axios.on('response',(response)=>{
    const imgbuffer:Buffer[]=[];
    response.on('data',(chunk)=>{
      imgbuffer.push(chunk);
    });
    response.on('end',()=>{
      const newbuff = Buffer.concat(imgbuffer);
      const base64Img = newbuff.toString('base64');
      const decodeImg = Buffer.from(base64Img,'base64');
      writeFile(join(picDir,`${ext}`),decodeImg,(err)=>{
        if(err)console.log(err);
        if (url === last) {
          event.sender.send(act+'-reply',true);
          showNotification(title, `已完成下载图片保存在${picDir}文件夹`);
        }
      });
      // console.log('NO MORE DATA IN RESPONSE');
    });
  });
  axios.end();


}
function showNotification(title: string, body: string) {
  new Notification({ title, body }).show();
}

