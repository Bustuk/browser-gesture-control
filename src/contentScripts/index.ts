/* eslint-disable no-console */
import { onMessage, sendMessage } from 'webext-bridge'
import { createIframe, postMessageToIframe, getCameraPermission, promptCameraPermission } from './utils/index'
import { watch } from 'vue'

(async () => {
  const permissionObj = await getCameraPermission();

  watch(permissionObj.state, async (newPermissions, oldPermissions) => {
    if (!newPermissions) return;
    console.log('WAAATCH', newPermissions, oldPermissions)
    switch (newPermissions) {
      case 'granted':
        await createIframe()
        postMessageToIframe('start')
        break;
      case 'prompt':
        console.log('camera prompt')
        break;
      case 'denied':
        console.log('camera denied')
        break;
    }
    sendMessage('page-update', { cameraStatus: newPermissions, host: location.host })
  }, { deep: true });
  
  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  })

  onMessage('ask-for-camera-permission', ({ data }) => {
    console.log('Asking for permission')
    promptCameraPermission()
  })
})()
