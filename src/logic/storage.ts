import { useStorageLocal } from '~/composables/useStorageLocal'

export const storageDemo = useStorageLocal('webext-demo', 'Storage Demo', { listenToStorageChanges: true })
export const mappedGestures = useStorageLocal('webext-mapped-gestures', [], { listenToStorageChanges: true })
