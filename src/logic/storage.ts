import { useStorageLocal } from '~/composables/useStorageLocal'

interface PageConfig {
  active: boolean
  cameraStatus: 'granted' | 'prompt' | 'denied'
}
type PagesConfigType = Record<string, PageConfig>
export const pagesConfig = useStorageLocal('webext-active-pages', {} as PagesConfigType, { listenToStorageChanges: true })
export const mappedGestures = useStorageLocal('webext-mapped-gestures', [], { listenToStorageChanges: true })
