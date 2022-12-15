<script lang="ts" setup>
import { NDynamicInput, NSelect } from 'naive-ui'
import { computed, defineEmits, ref } from 'vue'
import GestureSettings from './GestureSettings.vue'
const props = defineProps<{
  modelValue: mappedGesture[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: mappedGesture[]): void
}>()

const showSettings = ref(false)
const closeOptions = () => {
  showSettings.value = false
}

const openOptions = () => {
  showSettings.value = true
}

const actions = [
  {
    label: 'Scroll Down',
    value: 'scrollDown',
  },
  {
    label: 'Scroll Up',
    value: 'scrollUp',
  },
  {
    label: 'Play',
    value: 'play',
  },
  {
    label: 'Pause',
    value: 'pause',
  }
]

const gestures = [
  {
    label: 'victory',
    value: 'victory',
  },
  {
    label: 'pause',
    value: 'pause',
  },
  {
    label: 'flat',
    value: 'flat',
  },
]

const filteredGestures = computed(() => {
  return gestures.filter((gesture) => {
    return !props.modelValue.some(value => value.gesture === gesture.value)
  })
})

const onCreate = () => {
  return {
    action: '',
    gesture: '',
    settings: {
      accuracy: 50,
      sensitivity: 50,
    },
  }
}
const handleUpdate = (value: any) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <n-dynamic-input :value="props.modelValue" :on-update:value="handleUpdate" :on-create="onCreate">
    <template #create-button-default>
      Add whatever you want
    </template>
    <template #default="{ value }">
      <div style="display: flex; align-items: center; width: 100%">
        <n-select v-model:value="value.action" :options="actions" />
        <n-select v-model:value="value.gesture" :options="filteredGestures" />
        <material-symbols:settings class="icon" @click="openOptions" />
        <GestureSettings v-model:sensitivity="value.settings.sensitivity" v-model:accuracy="value.settings.accuracy" :show="showSettings" @close="closeOptions" />
      </div>
    </template>
  </n-dynamic-input>
</template>

<style>
.icon {
  width: 45px;
  height: 45px;
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
}
</style>
