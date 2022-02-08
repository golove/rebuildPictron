<script lang="ts" setup>
import { reactive,onMounted} from 'vue';
import { NDataTable } from 'naive-ui';
import { useRouter } from 'vue-router';
const Data = reactive([]);
const router = useRouter();
function sendMsg(){
window.ipcRenderer.send('spiderAll');
 window.ipcRenderer.on('mainMsg',(e,arg)=>{
  //  console.log(arg.img);
  Data.unshift(arg.img);
    if(arg.Xindex===6&&arg.Yindex===arg.DataLength-1){
      let TM = setTimeout(()=>{
        router.push('/ustyle');
        clearTimeout(TM);
      },3000);
    }
  });
}
onMounted(()=>{
  if(Data.length===0){
    sendMsg();
  }

});

// const arr = [
//   {
//     title: '新年就要穿的紅紅火火 (20P)',
//     type: 'Beauty',
//     href: 'http://x11.7086xx.work/pw/html_data/14/2202/5823951.html',
//     srcs: 'https://p221.fijipic.xyz/i/2022/02/03/swbcd5.jpg',
//     star: 0,
//     collect: 1,
//     delete: 0,
//     download: 0,
//   },
//   {
//     title: '小丁ding《Sex appeal》 (45P)',
//     type: 'Beauty',
//     href: 'http://x11.7086xx.work/pw/html_data/14/2202/5823950.html',
//     srcs: 'https://p221.fijipic.xyz/i/2022/02/03/sw9p7y.jpg',
//     star: 0,
//     collect: 0,
//     delete: 0,
//     download: 0,
//   },
//   {
//     title: '小丁ding《Red clothes》 (52P)',
//     type: 'Beauty',
//     href: 'http://x11.7086xx.work/pw/html_data/14/2202/5823949.html',
//     srcs: 'https://p221.fijipic.xyz/i/2022/02/03/sw81kn.jpg',
//     star: 0,
//     collect: 0,
//     download: 0,
//     delete: 0,
//   },
// ];

// let index = 0;
// const ST = setInterval(() => {
//   if (index > arr.length - 1) {
//     index = 0;
//   } else {
//     Data.unshift(arr[index]);
//     index++;
//   }

// }, 30);
// setTimeout(() => {
//   clearInterval(ST);
// }, 5000);

const columns = [
  {
    title: 'Title',
    key: 'title',
    width:220,
    ellipsis: true,
  },
  {
    title: 'Type',
    key: 'type',
    width:100,
    ellipsis: true,
  },
  {
    title: 'Href',
    key: 'href',
    ellipsis: true,
  },

  {
    title: 'Star',
    key: 'star',
     width: 90,
  },
  {
    title: 'Collect',
    key: 'collect',
     width: 90,
  },
  {
    title: 'Download',
    key: 'download',
     width: 90,
  },
  {
    title: 'Delete',
    key: 'delete',
     width: 90,
  },
];


function rowKey(rowData: { column1: any; }) {
  return rowData.column1;
}
</script>
<template>
  <n-data-table
    ref="table"
    :columns="columns"
    :row-key="rowKey"
    :data="Data"
  />
</template>
