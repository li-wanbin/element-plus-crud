<script setup>
import { ElTable, ElTableColumn } from 'element-plus'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'
import 'element-plus/es/components/loading/style/css'

const data = [
  { id: 1, name: 's' },
  { id: 2, name: '2526' },
]
</script>

<template>
  <ElTable :data="data" border>
    <ElTableColumn prop="id" label="ID" />
    <ElTableColumn prop="name" label="名字" />
  </ElTable>
</template>
