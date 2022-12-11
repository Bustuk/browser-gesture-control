/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'
import { createApp } from 'vue'
import App from './views/App.vue'

let iframe: null | HTMLIFrameElement = null

function createIframe() {
  const iframeUrl = 'http://localhost:5173/'
  iframe = document.createElement('iframe')
  iframe.height = '0px'
  iframe.width = '0px'
  iframe.src = iframeUrl
  iframe.allow = 'microphone; camera'
  document.body.appendChild(iframe)
}

function postMessageToIframe(msg) {
  console.log('iframe', iframe)
  if (iframe)
    iframe.contentWindow?.postMessage(msg, '*')
}

addEventListener('message', (event) => {
  console.log('Dostałem EVENT', event.data)
  if (event.data.message === 'gesture') {
    if (event.data.value === 'victory') {
      window.scrollBy({
        top: -135,
        behavior: 'smooth',
      })
    }
    if (event.data.value === 'flat') {
      window.scrollBy({
        top: 135,
        behavior: 'smooth',
      })
    }
  }
})

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
navigator.permissions.query({ name: 'camera' })
  .then((permissionObj) => {
    if (!location.href.includes('math.uni.lodz.pl'))
      return

    console.log(permissionObj.state)
    if (permissionObj.state === 'granted') {
      createIframe()
      console.log('camera granted')
      console.log(postMessageToIframe)
      setTimeout(() => {
        console.log('ZACZYNAMY')
        postMessageToIframe('start')
      }, 2000)
    }
    if (permissionObj.state === 'prompt') {
      console.log('camera prompt')
      navigator.mediaDevices.getUserMedia({ video: true })
    }
  })
  .catch((error) => {
    console.log('Got error :', error)
  });

(() => {
  console.info('[vitesse-webext] Hello world from content script')

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  })

  // mount component to context window
  const container = document.createElement('div')
  const root = document.createElement('div')
  // const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  // styleEl.setAttribute('rel', 'stylesheet')
  // styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  // shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  document.body.appendChild(container)
  createApp(App).mount(root)
})()
