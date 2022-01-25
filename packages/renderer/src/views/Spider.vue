<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import {NSpace,NTable} from 'naive-ui';
import { useRouter } from 'vue-router';
const msg = reactive([]);
// const appDom = document.getElementById('layout');
const router = useRouter();
function sendMsg(){
window.ipcRenderer.send('spiderAll');
 window.ipcRenderer.on('mainMsg',(e,arg)=>{
    msg.push(arg.img);
    if(arg.Xindex===6&&arg.Yindex===arg.DataLength-1){
      let TM = setTimeout(()=>{
        router.push('/ustyle');
        clearTimeout(TM);
      },3000);
    }
  });

}
// watch(()=>[...msg],()=>{
//     window.scrollTo(0,appDom!.scrollHeight+500);
//     console.log(appDom!.scrollHeight);
//   });

onMounted(()=>{
  if(msg.length===0){
    sendMsg();
  }

});

</script>
<template>
  <n-space vertical>
    <n-table striped>
      <thead>
        <tr>
          <th>title</th>
          <th>type</th>
          <th>href</th>
          <th>srcs</th>
          <th>star</th>
          <th>collect</th>
          <th>download</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="e in msg"
          :key="e[0]"
        >
          <td
            v-for="el in e"
            :key="el"
          >
            {{ el[0]&& typeof(el)!=='string'?el[0]:el }}
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-space>
</template>
