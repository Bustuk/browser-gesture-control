import { usePermission } from '@vueuse/core'
const cameraAccess = usePermission('camera', {controls: true})

export async function getCameraPermission() {
  return cameraAccess
}

export async function promptCameraPermission() {
  return await navigator.mediaDevices.getUserMedia({ video: true })
}

