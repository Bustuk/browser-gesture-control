<!-- eslint-disable vue/require-explicit-emits -->
<script setup lang="ts">
import { NCard, NIcon, NModal, NSlider } from 'naive-ui'

const props = defineProps<{
  show: boolean
  accuracy: number
  sensitivity: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:accuracy', value: number): void
  (e: 'update:sensitivity', value: number): void
}>()

const handleUpdate = (value: number, property: 'accuracy' | 'sensitivity') => {
  const event = `update:${property}`
  type emitEvent = 'update:accuracy' // @todo | 'update:sensitivity'
  // czemu wywala się jak damy union type?
  emit(event as emitEvent, value)
}
</script>

<template>
  <n-modal :show="props.show">
    <n-card
      style="width: 600px"
      title="Settings"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <n-icon size="40">
          <gridicons:fullscreen-exit @click="$emit('close')" />
        </n-icon>
      </template>
      <p>Accuracy: {{ accuracy }}</p>
      <n-slider :on-update:value="(val) => handleUpdate(val, 'accuracy')" :value="accuracy" :min="0" :max="100" :step="1" />

      <p>Sensitivity: {{ sensitivity }}</p>
      <n-slider :on-update:value="(val) => handleUpdate(val, 'sensitivity')" :value="sensitivity" :min="0" :max="100" :step="1" />
    </n-card>
  </n-modal>
</template>
