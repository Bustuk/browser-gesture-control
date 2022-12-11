import { useStorageLocal } from '~/composables/useStorageLocal'

interface PageConfig {
  active: boolean
  cameraStatus: string
}
type PagesConfigType = Record<string, PageConfig>
export const pagesConfig = useStorageLocal('webext-active-pages', {} as PagesConfigType, { listenToStorageChanges: true })
export const mappedGestures = useStorageLocal('webext-mapped-gestures', [], { listenToStorageChanges: true })
