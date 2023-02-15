import type { Tabs } from 'webextension-polyfill'
import browser from 'webextension-polyfill'
import { onMessage, sendMessage } from 'webext-bridge'
import { pagesConfig, availableLabels } from '~/logic/storage'
if (__DEV__)
  import('./contentScriptHMR')
browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

console.log('pagesConfig', pagesConfig.value)
type params = {
  host: string,
  cameraStatus?: 'granted' | 'prompt' | 'denied'
  active?: boolean
}

onMessage('page-update', async ({ data }: { data: params}) => {
  try {
    console.log('page update data', data)
    console.log('page update', pagesConfig.value)
    pagesConfig.value[data.host] = {
      ...pagesConfig.value[data.host],
      ...data,
    }
    console.log('page update po', pagesConfig.value)
  }
  catch(err){
    console.error(err)
  }
})

onMessage('badge-change', async ({ data }) => {
  console.log('badge change', data)
  if (data.active) {
    chrome.action.setBadgeText({text: "ON"});
    chrome.action.setBadgeBackgroundColor({color: "#BDE7BD"});
  } else {
    chrome.action.setBadgeText({text: "OFF"});
    chrome.action.setBadgeBackgroundColor({color: "#FF6962"});
  }
})

onMessage('labels-update', async ({ data }: { data: string[]}) => {
  try {
    availableLabels.value = data
  }
  catch(err){
    console.error(err)
  }
})