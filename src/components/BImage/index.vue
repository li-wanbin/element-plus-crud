<script setup>
import { computed } from 'vue'
import { ElImage } from 'element-plus'

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  src: {
    type: String,
    default: '',
  },
  previewList: {
    type: Array,
    default: () => [],
  },
  previewIndex: {
    type: Number,
    default: 0,
  },
  props: {
    type: Object,
    default: () => ({}),
  },
  size: {
    type: String,
    default: 'default',
  },
  width: {
    type: [Number, String],
    default: '',
  },
  height: {
    type: [Number, String],
    default: '',
  },
})
const sizeWidth = computed(() => {
  const obj = {
    small: 30,
    default: 40,
    large: 50,
  }
  return obj[props.size]
})
</script>

<template>
  <ElImage
    v-bind="$attrs"
    :crossorigin="null"
    :src="url || src"
    fit="contain"
    class="inline-block bg-[var(--c-img-bg)] b-1 b-[var(--c-border-color)]"
    :style="{
      width: `${props.width || width || sizeWidth}px`,
      height: `${props.height || width || sizeWidth}px`,
      borderRadius: `${props.radius || 5}px`,
    }"
    :initial-index="previewIndex"
    :preview-src-list="previewList.length ? previewList : [url || src]"
    preview-teleported
  />
</template>
