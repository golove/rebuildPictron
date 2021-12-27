<template>
  <div class="tabmenu">
    <div
      :id="'over' + menus[0].title"
      class="over"
    />
    <div
      v-for="(menu, index) in menus"
      :id="'menu' + index + menu.title"
      :key="menu.title"
      class="menu"
      :class="menu.title === stayTitle ? 'active' : ''"
      @click="menuFunction(index, menu)"
    >
      <svg>
        <use :xlink:href="menu.icon" />
      </svg>
      {{ title ? menu.title : '' }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
export default defineComponent({
  props: {

    title: {
      type: Boolean,
      default: () => true,
    },
    items: {
      type: Array,
      default: () => [{ title: 'new picture', icon: '#star' }, { title: 'my collect', icon: '#heart' }],
    },
  },
  setup(props, _emit) {
    const stayTitle = ref('new picture');
    const menus = computed(() => props.items);
    onMounted(() => {
      menuFunction(0, stayTitle.value);
    });

    function menuFunction(index: number, menu) {
      _emit.emit('handle', menu.title);
      stayTitle.value = menu.title;
      const over = document.getElementById('over' + menus.value[0].title);
      let moveLeft = 0;
      for (let i = 0; i < index; i++) {
        moveLeft += document.getElementById('menu' + i + menus.value[i].title)!.offsetWidth;
      }
      const tab = document.getElementById('menu' + index + menus.value[index].title);
      over!.style.width = `${tab!.offsetWidth}px`;
      over!.style.left = `${moveLeft}px`;
    }

    return {
      stayTitle,
      menus,
      menuFunction,
    };
  },
});
</script>
<style scoped>
@media (prefers-color-scheme: dark) {
  .tabmenu {
    /* background-color: #b3b3b3; */
  }
  .tabmenu .menu {
    color: rgb(126, 126, 126);
  }
  .tabmenu .menu svg {
    fill: rgb(126, 126, 126);
  }
  .tabmenu .over {
    background-color: rgba(255, 255, 255, 0.9);
  }
  .tabmenu .active {
    color: rgba(255, 9, 103, 0.9);
  }
  .tabmenu .active svg {
    fill: rgba(255, 9, 103, 0.9);
  }
}
@media (prefers-color-scheme: light) {
  .tabmenu {
    /* background-color: #f8f8f8; */
  }
  .tabmenu .menu {
    color: rgb(168, 158, 161);
  }
  .tabmenu .menu svg {
    fill: rgb(168, 158, 161);
  }
  .tabmenu .over {
    background-color: rgba(255, 9, 103, 0.9);
  }
  .tabmenu .active {
    color: #ffffff;
  }
  .tabmenu .active svg {
    fill: #ffffff;
  }
}
.tabmenu {
  -webkit-user-select: none;
  -webkit-app-region: drag;
  font-weight: 500;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 0.6rem;
}
.tabmenu .menu {
  -webkit-app-region: no-drag;
  margin: 0rem;
  padding: 0.25rem 1rem;
  z-index: 2;
  display: flex;
  /* justify-content: ; */
  cursor: pointer;
}
.tabmenu .menu svg {
  width: 25px;
  height: 23px;
}
.tabmenu .menu p {
  padding: 0;
  margin: 0;
}
.tabmenu .over {
  position: absolute;
  height: 85%;
  margin-left: 0.7rem;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  transition: all 0.3s ease;
  backdrop-filter: brightness(460%);
}
</style>
