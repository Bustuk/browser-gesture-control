<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { NButton, NCard, NPopover, NSwitch } from 'naive-ui'
import { tabs as browserTabs } from 'webextension-polyfill'
import { sendMessage } from 'webext-bridge'
import { pagesConfig } from '~/logic/storage'
function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

const host = ref('')

const active = ref(false)

const toggle = (val: boolean) => {
  active.value = val
  pagesConfig.value[host.value].active = val
  console.log(pagesConfig)
}

onBeforeMount(async () => {
  const tabs = await browserTabs.query({ active: true, currentWindow: true })
  const tab = tabs.pop()
  if (tab) {
    const url = (new URL(tab.url || '')).host
    host.value = url
    if (pagesConfig.value[url])
    pagesConfig.value.active = pagesConfig.value[url]
  }
})
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

    Camera status: Active
    <n-button disabled class="btn mt-2" @click="openOptionsPage">
      Ask for permission
    </n-button>
    <template #action>
      Toogle recognition
      <n-switch :value="active" :on-update:value="toggle" />
    </template>
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
