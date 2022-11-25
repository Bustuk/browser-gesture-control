<script setup>
import { h, onMounted, ref } from 'vue'
</script>

<template>
  <iframe width="500" height="500" allow="camera *;microphone *" src="http://localhost:5173/" />
</template>

<style scoped>
.output_canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width:300px;
  height: 300px;
}
</style>
