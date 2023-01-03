let iframe: null | HTMLIFrameElement = null

export async function createIframe(iframeUrl: string = 'http://localhost:5173/iframe') {
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

export function registerIframeMessageListener(key: string, callback: (data: any) => void) {
  addEventListener('message', (event: MessageEvent) => {
    if (event.data.message === key) {
      callback(event.data)
    }
  })
}

