<template>
  <div
    class="drag-it-dude"
    @touchstart.stop="hang"
    @touchend.stop="drop"
    @mousedown.stop="hang"
    @mouseup.stop="drop"
    @touchmove.stop="iosMove"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'drag-it-dude',
    props: {
      inputWidth: {
        type: Number,
        default: 0,
      },
      inputHeight: {
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
    data() {
      return {
        shiftX: null,
        shiftY: null,
        left: 0,
        top: 0,
        elem: null,
        isIos: false,
        parent: {
          w: 0,
          h: 0,
        },
      };
    },
    watch: {
      inputWidth(newInputWidth) {
        if (this.left === 0) return;
        if (newInputWidth > this.parentWidth - this.left) {
          const newLeft = this.parentWidth - newInputWidth;
          this.left = newLeft < 0 ? 0 : newLeft;
          this.elem.style.left = `${this.left}px`;
        }
        if (this.inputHeight > this.parentHeight - this.top) {
          const newTop = this.parentHeight - this.inputHeight;
          this.top = newTop;
          this.elem.style.top = `${this.top}px`;
        }
      },
    },
    methods: {
      iosMove(e) {
        if (this.isIos) this.elementMove(e);
      },
      elementMove(e) {
        this.$emit('dragging');
        e.preventDefault();
        if (!e.pageX) {
          document.body.style.overflow = 'hidden';
        }

        const x = e.pageX || e.changedTouches[0].pageX;
        const y = e.pageY || e.changedTouches[0].pageY;

        let newLeft = x - this.shiftX;
        let newTop = y - this.shiftY;

        const newRight = x - this.shiftX + this.elem.offsetWidth;
        const newBottom = y - this.shiftY + this.elem.offsetHeight;

        if (newLeft < 0) {
          newLeft = 0;
        } else if (newRight > this.parent.w) {
          newLeft =  this.parent.w - this.elem.offsetWidth;
        } else {
          newLeft = x - this.shiftX;
        }
        if (newTop < 0) {
          newTop = 0;
        } else if (newBottom > this.parent.h) {
          newTop = this.parent.h - this.elem.offsetHeight;
        } else {
          newTop = y - this.shiftY;
        }
        this.elem.style.left = `${newLeft}px`;
        this.left = newLeft;
        this.elem.style.top = `${newTop}px`;
        this.top = newTop;
      },
      hang(e) {
        this.$emit('activated');
        this.elem = this.$el;

        this.parent.w = this.parentWidth || this.elem.parentNode.offsetWidth;
        this.parent.h = this.parentWidth || this.elem.parentNode.offsetHeight;

        this.shiftX = e.pageX
          ? e.pageX - this.elem.offsetLeft
          : e.changedTouches[0].pageX - this.elem.offsetLeft;
        this.shiftY = e.pageY
          ? e.pageY - this.elem.offsetTop
          : e.changedTouches[0].pageY - this.elem.offsetTop;

        if (e.pageX) {
          if (this.isIos) {
            document.addEventListener('touchmove', this.elementMove);
          } else {
            document.addEventListener('mousemove', this.elementMove);
          }
        } else {
          document.addEventListener('touchmove', this.elementMove);
        }
      },
      drop() {
        document.body.style.overflow = null;
        document.removeEventListener('mousemove', this.elementMove, false);
        document.removeEventListener('touchmove', this.elementMove, false);
        this.elem.onmouseup = null;
        this.elem.ontouchend = null;
      },
    },
    mounted() {
      this.isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    },
  };
</script>

<style>
.drag-it-dude {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
