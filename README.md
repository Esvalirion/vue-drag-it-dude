# vue-drag-it-dude

Vue2 component, that allows you to drag object wherever you want

## What this can do

* Drag and drop DOM elements inside parent (or document, if parent's size not specified)
* Receive content sizes and update move restrictions
* Move with mouse, or with touch, it's not matter
* Emit active and drag events

## Demo

[Demo](https://pp6x2qk5qm.codesandbox.io/)

## Install

via NPM
```bash
npm install vue-drag-it-dude --save
```

## Usage

```js
import DragItDude from 'vue-drag-it-dude';

export default {
  name: 'App',
  components: {
    DragItDude
  },
}
```

or

```js
import Vue from 'vue'
import DragItDude from 'vue-drag-it-dude'

Vue.component('vue-drag-it-dude', DragItDude)
```

Don't forget to add for the parent element css property `position: relative;`

#### Now use it!

```vue
<template>
  <div id="app" class="parentElement">
    <drag-it-dude
      @activated="handleActivated"
      @dragging="handleDragging"
      @dropped="handleDropped"
    >
      <div class="innerElement">{{ text }}</div>
    </drag-it-dude>
  </div>
</template>

<script>
import DragItDude from "vue-drag-it-dude";

export default {
  name: "App",
  components: {
    DragItDude
  },
  data: () => ({
    text: "Just move me!",
  }),
  methods: {
    handleActivated() {
      this.text = "I am ready for great things!";
    },
    handleDragging() {
      this.text = "Weeee!";
    },
    handleDropped() {
      this.text = "That's place is awesome!";
      setTimeout(() => {
        this.text = "Just move me!";
      }, 3000);
    }
  }
};
</script>

<style>
  .parentElement {
    position: relative;
  }
</style>
```

## Props

`width`<br>
type: `Number`<br>
Required: false<br>
Default: 0

If you want to dynamically change inner DOM element width, just type something like:

```vue
<drag-it-dude :width="40"></drag-it-dude>
```

`height`<br>
type: `Number`<br>
Required: false<br>
Default: 0

If you want to dynamically change inner DOM element height, just type something like:

```vue
<drag-it-dude :height="40"></drag-it-dude>
```


`parentWidth`<br>
type: `Number`<br>
Required: false<br>
Default: `parentNode.offsetWidth` of draggable element 

If you want to limit width of area, within which an element can move:

```vue
<drag-it-dude :parent-width="500"></drag-it-dude>
```



`parentHeight`<br>
type: `Number`<br>
Required: false<br>
Default: `parentNode.offsetHeight`of draggable element 

If you want to limit height of area, within which an element can move:

```vue
<drag-it-dude :parent-height="500"></drag-it-dude>
```

## Events
`activated`<br>
Required: false

Called, when element is activated

```vue
<drag-it-dude @activated="someFunction"></drag-it-dude>
```

`dragging`<br>
Required: false

Called, when element is draggeing

```vue
<drag-it-dude @dragging="someAnotherFunction"></drag-it-dude>
```

`dropped`<br>
Required: false

Called, when element release

```vue
<drag-it-dude @dropped="someOtherFunction"></drag-it-dude>
```

## License

[MIT license](LICENSE)
