<!-- eslint-disable vue/one-component-per-file -->
<script lang="ts">
import { createApp, h, ref } from 'vue'

function renderChildren(children) {
  const body = window.document.body // this.$el.contentDocument.body
  const el = document.createElement('DIV') // we will mount or nested app to this element
  body.appendChild(el)

  const iApp = createApp({
    name: 'IApp',
    data() {
      return { children: Object.freeze(children) }
    },
    render() {
      return h('div', children)
    },
  })

  iApp.mount(el) // mount into iframe
}

export default {
  props: {
    /* ... */
  },
  setup(props) {
    const count = ref(1)

    // return the render function
    return () => h('button', {
      style: {
        color: 'green',
        onClick: () => {
          console.log('Hello')
        },
        on: { load: () => { console.log('SIEEEEMA') } },
      },
    },
    'Welcome to GeeksforGeeks')
  },
}
</script>

<template>
  <a class="icon-btn mx-2 text-2xl" rel="noreferrer" href="https://github.com/antfu/vitesse-webext" target="_blank" title="GitHub">
    <pixelarticons-power />
  </a>
</template>
