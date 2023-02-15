import { useStorageLocal } from '~/composables/useStorageLocal'

interface PageConfig {
  active: boolean
  cameraStatus: 'granted' | 'prompt' | 'denied'
}
type PagesConfigType = Record<string, PageConfig>
export const pagesConfig = useStorageLocal('webext-pages-config', {} as PagesConfigType, { listenToStorageChanges: true })
export const mappedGestures = useStorageLocal('webext-mapped-gestures', [] as mappedGesture[], { listenToStorageChanges: true })
export const availableLabels = useStorageLocal('webext-available-labels', {"0":"victory","1":"pause","2":"spiderman","3":"l","4":"flat"}, { listenToStorageChanges: true })