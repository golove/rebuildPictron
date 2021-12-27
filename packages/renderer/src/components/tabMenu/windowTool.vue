<template>
  <div class="windowTool">
    <div
      class="min svgparent" 
      @click="sendIpc('min')"
    >
      <svg>
        <use xlink:href="#minus" />
      </svg>
    </div>
    <div
      class="max svgparent"
      @click="sendIpc('max')"
    >
      <svg>
        <use xlink:href="#max" />
      </svg>
    </div>
    <div
      class="close svgparent"
      @click="sendIpc('close')"
    >
      <svg>
        <use xlink:href="#close" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'WindowTool',
  setup() {
    function sendIpc(tag: string) {
      console.log(tag);
      window.ipcRenderer.send('windowTool', tag);
    }
    return {
      sendIpc,
    };
  },
});
</script>
<style>
@media (prefers-color-scheme: dark) {
.windowTool .svgparent svg {
  fill: #838383;
}
.windowTool .svgparent:hover{
  background: rgba(194, 194, 194,.3);
}
}
@media (prefers-color-scheme: light) {
.windowTool .svgparent svg {
fill: #838383;
}
.windowTool .svgparent:hover{
  background: rgba(255, 255, 255, 0.7);
}
}
.windowTool {
    -webkit-user-select: none;
  -webkit-app-region: drag;

  /* width: 12rem; */
  height: 31px;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: flex-end;
}

.windowTool .svgparent {
    -webkit-app-region: no-drag;
  position: relative;
  width: 45px;
}

.windowTool .svgparent svg {
  transition: all 0.3s ease;
  margin: 0;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.windowTool .min svg {
  width: 20px;
  height: 20px;
}
.windowTool .max svg {
  width: 20px;
  height: 15px;
}
.windowTool .close svg {
  width: 20px;
  height: 20px;
}
.windowTool .close:hover{
background: rgba(255, 0, 98, 1);;
}

.windowTool .close:hover svg{
  fill: rgb(255, 255, 255);
}
</style>
