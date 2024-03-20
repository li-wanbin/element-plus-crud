<script setup>
import { ElTable, ElTableColumn } from 'element-plus'

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
