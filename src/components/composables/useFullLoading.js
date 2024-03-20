import { ElLoading } from 'element-plus'

export function useFullLoading() {
  let load = null
  function show(str) {
    load = ElLoading.service({
      lock: true,
      text: str || '加载中...',
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }
  function close() {
    load.close()
  }
  return { show, close }
}
