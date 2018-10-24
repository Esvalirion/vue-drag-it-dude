<template>
  <div id="app">
    <h1>vue-drag-it-dude</h1>
    <div class="wrapper">
      <drag-it-dude
        v-for="item, key in inputItems"
        :key="item.id"
        @activated="onActivated(item.id)"
        @dragging="onDragging(item.id)"
        @dropped="onDropped(item.id)"
      >
        <div class="div"><input type="text" :value="item.text"></div>
      </drag-it-dude>
    </div>
  </div>
</template>

<script>
import DragItDude from "../src/DragItDude.vue";

export default {
  name: "App",
  components: {
    DragItDude
  },
  data() {
    return {
      inputItems: [
        {
          text: "Just move me!",
          isActive: false,
          id: 0
        }
      ]
    };
  },
  methods: {
    onActivated(key) {
      this.inputItems[key].text = "I am ready for great things!";
    },
    onDragging(key) {
      this.inputItems[key].text = "Weeee!";
    },
    onDropped(key) {
      this.inputItems[key].text = "That's place is awesome!";
      setTimeout(() => {
        this.inputItems[key].text = "Just move me!";
      }, 3000);
    }
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  align-items: center;
}

.wrapper {
  width: 350px;
  height: 350px;
  border: 1px solid #000;
  border-radius: 10px;
  position: relative;
}

h1 {
  text-align: center;
}

.div {
  display: inline-block;
}

input {
  width: 200px;
  padding: 20px 30px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: center;
}
</style>
