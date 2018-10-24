import vue from 'rollup-plugin-vue';
import uglify from 'rollup-plugin-uglify-es';
import html from 'rollup-plugin-fill-html';

export default {
  input: 'docs-src/main.js',
  dest: 'docs/bundle-[hash].js',
  plugins: [
    vue({
      css: true,
      compileTemplate: true,
    }),
    uglify(),
    html({
      template: 'docs-src/index.html',
      filename: 'index.html',
    }),
  ],
};
