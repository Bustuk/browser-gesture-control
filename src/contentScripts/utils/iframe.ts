let iframe: null | HTMLIFrameElement = null

export async function createIframe(iframeUrl: string = 'http://localhost:5173/') {
  return new Promise((resolve, reject) => {
    iframe = document.createElement('iframe')
    iframe.height = '0px'
    iframe.width = '0px'
    iframe.src = iframeUrl
    iframe.allow = 'microphone; camera'
    iframe.onload = () => resolve(iframe)
    document.body.appendChild(iframe)
  })
  
}

export function postMessageToIframe(msg: string) {
  if (iframe)
    iframe.contentWindow?.postMessage(msg, '*')
  else
    throw new Error('Iframe not initialized')
}

const defaultCallback = (event: MessageEvent) => {
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
}

export function registerIframeMessageListener(callback: (event: MessageEvent) => void = defaultCallback) {
  addEventListener('message', callback)
}

