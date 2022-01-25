<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue';
import {NSpace,NTable} from 'naive-ui';
const msg = reactive([]);
const appDom = document.getElementById('app');
function sendMsg(){
window.ipcRenderer.send('spiderAll');
 window.ipcRenderer.on('mainMsg',(e,a)=>{
  //  console.log(a)
    msg.push(a);
  });
}
watch(()=>[...msg],()=>{
    window.scrollTo(0,appDom!.scrollHeight+500);
    console.log(appDom!.scrollHeight);
  });

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
