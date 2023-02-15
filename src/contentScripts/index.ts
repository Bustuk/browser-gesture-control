/* eslint-disable no-console */
import { onMessage, sendMessage } from 'webext-bridge'
import { createIframe, postMessageToIframe, getCameraPermission, promptCameraPermission, registerIframeMessageListener } from './utils/index'
import { watch } from 'vue'
import GestureService from './services/gesture';
import ActionService from './services/action';
import { storage } from 'webextension-polyfill'

async function getMappedGestures() {
  try {
    return JSON.parse((await storage.local.get('webext-mapped-gestures'))['webext-mapped-gestures'])
  } catch (e) {
    return {}
  }
}

async function getPageConfig() {
  try {
    return JSON.parse((await storage.local.get('webext-pages-config'))['webext-pages-config'])
  } catch (e) {
    return {}
  }
}

onMessage('toggle-recognition', ({ data }: { data: {active: boolean} }) => {
  postMessageToIframe(data?.active ? 'startRecognition' : 'stopRecognition')
  sendMessage('badge-change', { active: data.active })
});

(async () => {
  sendMessage('badge-change', { active: false })
  if (window.location.href.includes('localhost')) return;
  const pageConfig = await getPageConfig();
  const permissionObj = await getCameraPermission();
  const mappedGestures = await getMappedGestures();
  const actionService = new ActionService(mappedGestures);
  const gestureService = new GestureService(mappedGestures, actionService);
  const callback = gestureService.run.bind(gestureService)
  registerIframeMessageListener('gesture', callback);

  watch(permissionObj.state, async (newPermissions) => {
    if (!newPermissions) return;
    switch (newPermissions) {
      case 'granted':
        await createIframe(import.meta.env.VITE_GESTURE_RECOGNITION_URL)
        if (pageConfig[location.host]?.active) {
          postMessageToIframe('startRecognition')
          sendMessage('badge-change', { active: true })
        }
        break;
      case 'prompt':
        console.log('camera prompt')
        break;
      case 'denied':
        console.log('camera denied')
        break;
    }
    sendMessage('page-update', { cameraStatus: newPermissions, host: location.host })
  }, { deep: true, immediate: true });

  onMessage('ask-for-camera-permission', ({ data }) => {
    console.log('Asking for permission')
    promptCameraPermission()
  })

  const labels = localStorage.getItem('gesture-recognition-model-labels')
  if (labels) {
    sendMessage('labels-update', JSON.parse(labels))
  }
})()
