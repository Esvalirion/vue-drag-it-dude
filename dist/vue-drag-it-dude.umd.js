(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.DragItDude = {})));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: 'drag-it-dude',
    props: {
      width: {
        type: Number,
        default: 0,
      },
      height: {
        type: Number,
        default: 0,
      },
      parentWidth: {
        type: Number,
        default: 0,
      },
      parentHeight: {
        type: Number,
        default: 0,
      },
    },
    watch: {
      width: function width(newWidth, oldWidth) {
        if (newWidth < oldWidth) { return; }
        if (this.left === 0) { return; }

        this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth;
        this.parent.height = this.parentHeight || this.elem.parentNode.offsetHeight;

        if (newWidth > this.parent.width - this.left) {
          var newLeft = this.parent.width - newWidth;
          this.left = newLeft < 0 ? 0 : newLeft;
          this.elem.style.left = (this.left) + "px";
        }
      },
      height: function height(newHeight, oldHeight) {
        if (newHeight < oldHeight) { return; }
        if (this.top === 0) { return; }

        this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth;
        this.parent.height = this.parentHeight || this.elem.parentNode.offsetHeight;
        
        if (newHeight > this.parent.height - this.top) {
          var newTop = this.parent.height - this.height;
          this.top = newTop;
          this.elem.style.top = (this.top) + "px";
        }
      },
    },
    data: function () { return ({
      shiftY: null,
      shiftX: null,
      left: 0,
      top: 0,
      elem: null,
      isIos: false,
      parent: {
        width: 0,
        height: 0,
      },
    }); },
    methods: {
      iosMove: function iosMove(e) {
        if (this.isIos) { this.elementMove(e); }
      },
      elementMove: function elementMove(e) {
        this.$emit('dragging');
        e.preventDefault();
        if (!e.pageX) {
          document.body.style.overflow = 'hidden';
        }
        var x = e.pageX || e.changedTouches[0].pageX;
        var y = e.pageY || e.changedTouches[0].pageY;
        var newLeft = x - this.shiftX;
        var newTop = y - this.shiftY;
        var newRight = x - this.shiftX + this.elem.offsetWidth;
        var newBottom = y - this.shiftY + this.elem.offsetHeight;
        if (newLeft < 0) {
          newLeft = 0;
        } else if (newRight > this.parent.width) {
          newLeft =  this.parent.width - this.elem.offsetWidth;
        } else {
          newLeft = x - this.shiftX;
        }
        if (newTop < 0) {
          newTop = 0;
        } else if (newBottom > this.parent.height) {
          newTop = this.parent.height - this.elem.offsetHeight;
        } else {
          newTop = y - this.shiftY;
        }
        this.elem.style.left = newLeft + "px";
        this.left = newLeft;
        this.elem.style.top = newTop + "px";
        this.top = newTop;
      },
      hang: function hang(e) {
        this.$emit('activated');
        this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth;
        this.parent.height = this.parentHeight || this.elem.parentNode.offsetHeight;
        this.shiftX = e.pageX
          ? e.pageX - this.elem.offsetLeft
          : e.changedTouches[0].pageX - this.elem.offsetLeft;
        this.shiftY = e.pageY
          ? e.pageY - this.elem.offsetTop
          : e.changedTouches[0].pageY - this.elem.offsetTop;
        if (e.pageX) {
          if (this.isIos) {
            this.elem.addEventListener('touchmove', this.elementMove);
          } else {
            this.elem.addEventListener('mousemove', this.elementMove);
            this.elem.addEventListener('mouseleave', this.drop);
          }
        } else {
          this.elem.addEventListener('touchmove', this.elementMove);
        }
      },
      drop: function drop() {
        this.$emit('dropped');
        document.body.style.overflow = null;
        this.elem.removeEventListener('mousemove', this.elementMove, false);
        this.elem.removeEventListener('touchmove', this.elementMove, false);
        this.elem.onmouseup = null;
        this.elem.ontouchend = null;
      },
    },
    mounted: function mounted() {
      this.isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      this.elem = this.$el;
    },
  };

  /* script */
              var __vue_script__ = script;
              
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "drag-it-dude",
        on: {
          touchstart: function($event) {
            $event.stopPropagation();
            return _vm.hang($event)
          },
          touchend: function($event) {
            $event.stopPropagation();
            return _vm.drop($event)
          },
          mousedown: function($event) {
            $event.stopPropagation();
            return _vm.hang($event)
          },
          mouseup: function($event) {
            $event.stopPropagation();
            return _vm.drop($event)
          },
          touchmove: function($event) {
            $event.stopPropagation();
            return _vm.iosMove($event)
          }
        }
      },
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-47e484ae_0", { source: "\n.drag-it-dude {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n}\n", map: {"version":3,"sources":["/Users/karambafe/job/libs/vue-drag-it-dude/src/DragItDude.vue"],"names":[],"mappings":";AAmJA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,WAAA;CACA","file":"DragItDude.vue","sourcesContent":["<template>\n  <div\n    class=\"drag-it-dude\"\n    @touchstart.stop=\"hang\"\n    @touchend.stop=\"drop\"\n    @mousedown.stop=\"hang\"\n    @mouseup.stop=\"drop\"\n    @touchmove.stop=\"iosMove\"\n  >\n    <slot></slot>\n  </div>\n</template>\n\n<script>\n  export default {\n    name: 'drag-it-dude',\n    props: {\n      width: {\n        type: Number,\n        default: 0,\n      },\n      height: {\n        type: Number,\n        default: 0,\n      },\n      parentWidth: {\n        type: Number,\n        default: 0,\n      },\n      parentHeight: {\n        type: Number,\n        default: 0,\n      },\n    },\n    watch: {\n      width(newWidth, oldWidth) {\n        if (newWidth < oldWidth) return;\n        if (this.left === 0) return;\n\n        this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth;\n        this.parent.height = this.parentHeight || this.elem.parentNode.offsetHeight;\n\n        if (newWidth > this.parent.width - this.left) {\n          const newLeft = this.parent.width - newWidth;\n          this.left = newLeft < 0 ? 0 : newLeft;\n          this.elem.style.left = `${this.left}px`;\n        }\n      },\n      height(newHeight, oldHeight) {\n        if (newHeight < oldHeight) return;\n        if (this.top === 0) return;\n\n        this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth;\n        this.parent.height = this.parentHeight || this.elem.parentNode.offsetHeight;\n        \n        if (newHeight > this.parent.height - this.top) {\n          const newTop = this.parent.height - this.height;\n          this.top = newTop;\n          this.elem.style.top = `${this.top}px`;\n        }\n      },\n    },\n    data: () => ({\n      shiftY: null,\n      shiftX: null,\n      left: 0,\n      top: 0,\n      elem: null,\n      isIos: false,\n      parent: {\n        width: 0,\n        height: 0,\n      },\n    }),\n    methods: {\n      iosMove(e) {\n        if (this.isIos) this.elementMove(e);\n      },\n      elementMove(e) {\n        this.$emit('dragging');\n        e.preventDefault();\n        if (!e.pageX) {\n          document.body.style.overflow = 'hidden';\n        }\n        const x = e.pageX || e.changedTouches[0].pageX;\n        const y = e.pageY || e.changedTouches[0].pageY;\n        let newLeft = x - this.shiftX;\n        let newTop = y - this.shiftY;\n        const newRight = x - this.shiftX + this.elem.offsetWidth;\n        const newBottom = y - this.shiftY + this.elem.offsetHeight;\n        if (newLeft < 0) {\n          newLeft = 0;\n        } else if (newRight > this.parent.width) {\n          newLeft =  this.parent.width - this.elem.offsetWidth;\n        } else {\n          newLeft = x - this.shiftX;\n        }\n        if (newTop < 0) {\n          newTop = 0;\n        } else if (newBottom > this.parent.height) {\n          newTop = this.parent.height - this.elem.offsetHeight;\n        } else {\n          newTop = y - this.shiftY;\n        }\n        this.elem.style.left = `${newLeft}px`;\n        this.left = newLeft;\n        this.elem.style.top = `${newTop}px`;\n        this.top = newTop;\n      },\n      hang(e) {\n        this.$emit('activated');\n        this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth;\n        this.parent.height = this.parentHeight || this.elem.parentNode.offsetHeight;\n        this.shiftX = e.pageX\n          ? e.pageX - this.elem.offsetLeft\n          : e.changedTouches[0].pageX - this.elem.offsetLeft;\n        this.shiftY = e.pageY\n          ? e.pageY - this.elem.offsetTop\n          : e.changedTouches[0].pageY - this.elem.offsetTop;\n        if (e.pageX) {\n          if (this.isIos) {\n            this.elem.addEventListener('touchmove', this.elementMove);\n          } else {\n            this.elem.addEventListener('mousemove', this.elementMove);\n            this.elem.addEventListener('mouseleave', this.drop);\n          }\n        } else {\n          this.elem.addEventListener('touchmove', this.elementMove);\n        }\n      },\n      drop() {\n        this.$emit('dropped');\n        document.body.style.overflow = null;\n        this.elem.removeEventListener('mousemove', this.elementMove, false);\n        this.elem.removeEventListener('touchmove', this.elementMove, false);\n        this.elem.onmouseup = null;\n        this.elem.ontouchend = null;\n      },\n    },\n    mounted() {\n      this.isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;\n      this.elem = this.$el;\n    },\n  };\n</script>\n\n<style>\n.drag-it-dude {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* component normalizer */
    function __vue_normalize__(
      template, style, script$$1,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/Users/karambafe/job/libs/vue-drag-it-dude/src/DragItDude.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      {
        var hook;
        if (style) {
          hook = function(context) {
            style.call(this, createInjector(context));
          };
        }

        if (hook !== undefined) {
          if (component.functional) {
            // register for functional component in vue file
            var originalRender = component.render;
            component.render = function renderWithStyleInjection(h, context) {
              hook.call(context);
              return originalRender(h, context)
            };
          } else {
            // inject component registration as beforeCreate hook
            var existing = component.beforeCreate;
            component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
        }
      }

      return component
    }
    /* style inject */
    function __vue_create_injector__() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var component = __vue_normalize__(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      __vue_create_injector__,
      undefined
    );

  // Import vue component

  // install function executed by Vue.use()
  function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('DragItDude', component);
  }

  // Create module definition for Vue.use()
  var plugin = {
    install: install,
  };

  // To auto-install when vue is found
  /* global window global */
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  // It's possible to expose named exports when writing components that can
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = component;

  exports.default = component;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
