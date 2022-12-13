<script setup lang="ts">
import type { Ref } from 'vue'
import { onBeforeMount, ref, computed } from 'vue'
import { NButton, NCard, NPopover, NSwitch } from 'naive-ui'
import { tabs as browserTabs } from 'webextension-polyfill'
import { pagesConfig } from '~/logic/storage'
import { sendMessage } from 'webext-bridge'
function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

const host = ref('')
const currentTabId: Ref<undefined | number> = ref(undefined)
const active = ref(false)
const cameraStatus = computed(() => {
  return pagesConfig.value[host.value]?.cameraStatus || 'unknown'
})

const toggle = (val: boolean) => {
  active.value = val
  pagesConfig.value[host.value] = {
    ...(pagesConfig.value[host.value] || {}),
    active: val,
  }
  console.log(pagesConfig)
}

onBeforeMount(async () => {
  const tabs = await browserTabs.query({ active: true, currentWindow: true })
  const tab = tabs.pop()
  if (tab) {
    currentTabId.value = tab.id
    const url = (new URL(tab.url || '')).host
    host.value = url
    if (pagesConfig.value[url]?.active) {
      active.value = pagesConfig.value[url].active
    }
  }
})
const askForCameraPermission = async () => {
  if (!currentTabId.value) return;
  sendMessage('ask-for-camera-permission', { host: host.value }, { context: 'content-script', tabId: currentTabId.value })
}

</script>

<template>
  <!-- Naive UI doesn't allow us to add classes to template elements, only inlien style.... -->
  <n-card
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    size="large"
    title="Air Control"
    footer-style="display: flex; justify-content: center; align-items: center; "
    content-style="display: flex; justify-content: center; align-items: center; flex-direction: column;"
  >
    <template #header-extra>
      <n-popover trigger="hover">
        <template #trigger>
          <material-symbols:settings class="icon" @click="openOptionsPage" />
        </template>
        <span>Open options</span>
      </n-popover>
    </template>
    Camera status: {{cameraStatus}}
    <n-button :disabled="cameraStatus !== 'prompt'" @click="askForCameraPermission">
      Ask for permission
    </n-button>
    <template #action>
      Toogle recognition
      <n-switch :disabled="cameraStatus !== 'granted'" :value="active" :on-update:value="toggle" />
    </template>
    <!-- <pre>{{pagesConfig}}</pre> -->
  </n-card>
</template>

<style scoped>
.n-card {
  width: 230px;
  height: 290px;
}
.icon {
  weight: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
