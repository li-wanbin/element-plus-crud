# wanbin-element-plus-crud

- 通过JSON配置使用
- 传入后端接口完整url [使用](#使用)

## 使用
该组件仅支持`vue3+element-plus`项目使用;
使用前请确认项目已经成功安装了 `vue` `element-plus` `@element-plus/icons-vue`

### 安装

```bash
pnpm i wanbin-element-plus-crud
```

### 引入组件

```vue
<!-- HelloWorld.vue -->
<script setup>
import Crud from 'wanbin-element-plus-crud'
import 'wanbin-element-plus-crud/style.css'
// 为了避免项目打包时将样式文件重复打包，所以样式文件需要在使用时自行引入
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/upload/style/css'
import 'element-plus/es/components/image/style/css'
</script>

<template>
  <Crud />
</template>
```
