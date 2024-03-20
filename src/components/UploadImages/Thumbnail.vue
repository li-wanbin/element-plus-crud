<script setup>
import { ref } from 'vue'
import { CircleClose, Delete, ZoomIn } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { useEventListener } from '@vueuse/core'

defineProps({
  url: String,
  readonly: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['remove'])

const openPreview = ref(false)

function handleRemove() {
  emits('remove')
}
useEventListener('keydown', (e) => {
  if (e.key === 'Escape' && openPreview.value) {
    e.stopPropagation()
    openPreview.value = false
  }
})
</script>

<template>
  <div
    class="el-upload-list__item2 w-30 h-30
    rounded-1.5 relative mr2.5 mb2.5
    overflow-hidden border-1 border-[var(--c-border-color)]
    "
  >
    <img class="w-full h-full object-contain" :src="url" alt="">
    <span
      v-if="!readonly"
      class="
      el-upload-list__handle
      hidden
      absolute top-0 left-0
      right-0 bottom-0
      bg-#000/50
      items-center justify-center
      text-white
      "
    >
      <span
        class="text-5 m2 cursor-pointer"
        @click="openPreview = true"
      >
        <ElIcon><ZoomIn /></ElIcon>
      </span>
      <span
        class="text-5 m2 cursor-pointer"
        @click="handleRemove()"
      >
        <ElIcon><Delete /></ElIcon>
      </span>
    </span>
  </div>

  <Teleport to="body">
    <div
      v-if="openPreview"
      class="flex items-center justify-center fixed inset-0 bg-black:60 z-10000"
      @keydown.esc="openPreview = false"
    >
      <img :src="url" alt="Preview Image">
      <div
        class="text-white text-8 absolute right-10 top-10 cursor-pointer"
        @click="openPreview = false"
      >
        <ElIcon><CircleClose /></ElIcon>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.el-upload-list__item2:hover .el-upload-list__handle{
  display: flex;
}
</style>
