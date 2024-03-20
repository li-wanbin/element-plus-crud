<script setup>
import { computed, ref, toRaw } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElIcon, ElMessage, ElNotification, ElUpload } from 'element-plus'
import { useFullLoading } from '../composables'
import Thumbnail from './Thumbnail.vue'

const props = defineProps({
  modelValue: [Array, String, Object],
  noUrl: {
    type: Boolean,
    default: false,
  },
  action: {
    type: String,
    default: '',
  },
  imgType: {
    type: String,
    default: '',
  },
  tip: {
    type: String,
    default: '支持JPG/PNG/GIF/webp格式的图片，不超过 1MB',
  },
  request: {
    type: Function,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'changeVal'])

const fullLoading = useFullLoading()
let count = 0 // 记录上传数量，控制关闭loading
const upRef = ref()
const multiple = computed(() => Array.isArray(props.modelValue))
const uploadList = []
const nameList = []

function uploadSuccess(val) {
  if (val.code !== 200) {
    uploadError(val)
    return
  }
  if (!val || !val.data)
    return

  if (multiple.value) {
    count--
    uploadList.push(val.data)
    if (count === 0) {
      fullLoading.close()
      const value = [...props.modelValue]
      // 根据 name 排序
      nameList.forEach((i) => {
        const img = uploadList.find(j => j.name === i)
        value.push(img.url)
      })
      nameList.length = 0
      uploadList.length = 0
      emit('update:modelValue', value)
    }
  }
  else {
    fullLoading.close()
    emit('changeVal', val.data)
    emit('update:modelValue', props.noUrl ? val.data : val.data.url)
  }
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
    || file.type === 'image/png'
    || file.type === 'image/gif'
    || file.type === 'image/webp'
  if (!isJPG)
    ElMessage.error('只能上传JPG/PNG/GIF/webp格式的图片')

  const isLt1M = file.size / 1024 / 1024 < 1
  if (!isLt1M)
    ElMessage.error(`【${file.name}】图片大小不能超过 1MB`)

  if (isJPG && isLt1M) {
    nameList.push(file.name)
    count++
    fullLoading.show('上传中...')
  }
  else {
    fullLoading.close()
  }

  return isJPG && isLt1M
}

function remove(val) {
  if (multiple.value) {
    const value = (toRaw(props.modelValue)).filter((i, idx) => (i + idx) !== val)
    emit('update:modelValue', value)
  }
  else {
    emit('changeVal', '')
    emit('update:modelValue', '')
  }
}

function requestFn(options) {
  if (!props.request) {
    console.error('请传入 request 函数')
    fullLoading.close()
    return
  }

  const data = new FormData()
  data.append('file', options.file)
  data.append('type', props.imgType)
  return props.request({
    url: props.action,
    method: 'post',
    header: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
}

function uploadError(e) {
  fullLoading.close()
  ElNotification({
    title: '上传失败',
    type: 'error',
    message: e.msg || e.message || e.toString(),
  })
}
</script>

<template>
  <div>
    <div class="flex flex-wrap">
      <template v-if="multiple">
        <Thumbnail
          v-for="url, idx in modelValue"
          :key="url + idx"
          :readonly="readonly"
          :url="url"
          @remove="remove(url + idx)"
        />
      </template>
      <Thumbnail
        v-else-if="modelValue"
        :url="modelValue"
        :readonly="readonly"
        @remove="remove(modelValue)"
      />
      <ElUpload
        v-if="!readonly"
        ref="upRef"
        action="#"
        :show-file-list="false"
        :multiple="multiple"
        :data="{ type: imgType }"
        :tip="tip"
        list-type="picture-card"
        accept="image/png, image/jpeg, image/gif, image/webp"
        :on-success="uploadSuccess"
        :before-upload="beforeUpload"
        :http-request="requestFn"
        :on-error="uploadError"
      >
        <ElIcon>
          <Plus />
        </ElIcon>
      </ElUpload>
    </div>

    <div v-if="!readonly" class="text-3.5 text-gray-500 dark:text-gray-400 mt2">
      {{ tip }}
    </div>
  </div>
</template>

<style scoped>
:deep(.el-upload--picture-card) {
  --el-upload-picture-card-size: 120px;
}
</style>
