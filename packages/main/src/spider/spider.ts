import { net } from 'electron';
import { SqliteDB } from './sqlite';
const file = 'pictron.db';
const sqliteDB = new SqliteDB(file);
const host = 'http://x11.7086xx.work/pw/';

export function spiderAll(event: Electron.IpcMainEvent) {
  const array = [
    {
      url: 'http://x11.7086xx.work/pw/thread.php?fid=14',
      tableName: 'Beauty',
      n: 14,
    },
    {
      url: 'http://x11.7086xx.work/pw/thread.php?fid=15',
      tableName: 'Selfie',
      n: 15,
    },
    {
      url: 'http://x11.7086xx.work/pw/thread.php?fid=16',
      tableName: 'Passion',
      n: 16,
    },
    {
      url: 'http://x11.7086xx.work/pw/thread.php?fid=21',
      tableName: 'Lace',
      n: 21,
    },
    {
      url: 'http://x11.7086xx.work/pw/thread.php?fid=114',
      tableName: 'Ustyle',
      n: 114,
    },
    {
      url: 'http://x11.7086xx.work/pw/thread.php?fid=49',
      tableName: 'Outdoors',
      n: 49,
    },
    {
      url: 'http://x11.7086xx.work/pw/thread.php?fid=106',
      tableName: 'Cartoon',
      n: 106,
    },
  ];

  for (let index = 0; index < array.length; index++) {
    spider(
      array[index].url,
      array[index].tableName,
      true,
      event,
      array[index].n,
      index,
      0,
      0,
    );
    // console.log(array[index].url);
  }
  // if (array.length === index) {
  //   let TM = setTimeout(() => {
  //     sqliteDB.close();
  //     console.log("DB closed");
  //     clearTimeout(TM);
  //   }, 300);
  // }
}

function spider(
  url: string,
  tableName: string,
  flag: boolean,
  event: Electron.IpcMainEvent,
  n: number,
  Xindex:number,
  Yindex:number,
  DataLength:number,
) {
  const request = net.request(url);
  request.on('response', (response) => {
    // console.log('STATUS: '+response.statusCode)
    // console.log('HEADERS: '+ JSON.stringify(response.headers))
    response.on('data', (chunk) => {
      if (chunk) {
        if (flag) {
          const createTableSql = `CREATE TABLE IF NOT EXISTS ${tableName} (title TEXT,type TEXT, href TEXT,srcs BLOB,star INTEGER,collect NUMERIC,deleted NUMERIC,download NUMERIC);`;
          sqliteDB.createTable(createTableSql);
          const hrefs = getHref('' + chunk, n);
          for (let index = 0; index < hrefs.length; index++) {
            spider(host + hrefs[index], tableName, false, event, n,Xindex,index,hrefs.length);
          }
        } else {
          getSrc('' + chunk, url, tableName,Xindex, event,Yindex,DataLength);
        }
      } else {
        console.log('request warning');
      }
    });
    response.on('end', () => {
      console.log('NO MORE DATA IN RESPONSE');
    });
  });
  request.end();
}

function getHref(html: string, n: number) {
  const b = new RegExp(`html_data/${n}/([^<>"])*`, 'gi');
  const href = html.match(b);
  return Array.from(new Set(href));
}

function getSrc(
  html: string,
  url: string,
  tableName: string,
  Xindex:number,
  event: Electron.IpcMainEvent,
  Yindex: number,
  DataLength:number,
) {
  const b =
    /(http|https):\/\/[\w]+\.[\w]+\.[\w]+\/i\/[0-9]+\/[0-9]+\/[0-9]+\/[\w]+\.(jpg|jpeg|png)/gi;
  const srcs = html.match(b);
  // 匹配 img 的 title 值
  const t = /<span id="subject_tpc">(.+)<\/span>/gi;
  const title = t.exec(html);
  const img = [
    title![1],
    tableName,
    url,
    Array.from(new Set(srcs)),
    0,
    false,
    false,
    false,
  ];
  event.sender.send('mainMsg', {img,Xindex,Yindex,DataLength});
  const insertSql = `INSERT INTO ${tableName} VALUES (?,?,?,?,?,?,?,?);`;
  sqliteDB.insertData(insertSql, img);
}

export function readImg(
  tableName: string,
  page: number,
  collect: boolean,
  event: Electron.IpcMainEvent,
) {
  let sql='';
  if(collect){
    sql = `SELECT * FROM ${tableName} where collect = 1`;
  }else{
     sql = `SELECT * FROM ${tableName} LIMIT 24 OFFSET ${(page - 1) * 24}`;
  }
  console.log(sql);
  sqliteDB.queryData(sql,collect,event);
}


export function updateImg(tableName: string,act: string,href: string,value:boolean,event: Electron.IpcMainEvent){
  const updateSql = `update ${tableName} set ${act} = ${value} where href = '${href}'`;
  sqliteDB.executeSql(updateSql,act,event);
  // console.log(tableName,act,href,event);
}
