<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NCard, NPopover, NSwitch } from 'naive-ui'
import { storageDemo } from '~/logic/storage'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
const active = ref(false)
function toogle() {
  // turn on and off the recognition
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

    Camera status: Active
    <n-button disabled class="btn mt-2" @click="openOptionsPage">
      Ask for permission
    </n-button>
    <template #action>
      Toogle recognition
      <n-switch v-model:value="active" />
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
