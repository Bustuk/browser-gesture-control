<script setup lang="ts">
import { computed } from 'vue';
import { NCard, NLayout } from 'naive-ui'
import GestureMapping from '../components/GestureMapping.vue'
import { mappedGestures, availableLabels } from '~/logic'

const labels = computed(() => {
  return Object.values(availableLabels.value).map(el => ({
    label: el,
    value: el,
  }))
})
</script>

<template>
  <n-layout :embedded="true">
    <n-card
      style="width: 800px"
      title="Left Hand"
      :bordered="true"
      size="huge"
    >
      <GestureMapping :labels="labels" v-model="mappedGestures" />
    </n-card>
  </n-layout>
</template>

<style >
#app {
  height: 100vh;
  display: flex;
}

.n-layout-scroll-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
