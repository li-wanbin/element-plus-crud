/**
 * 生成表格请求 api
 * @param {*} request
 * @param {*} options
 * @returns {object} api
 */
export function useTableRequest(
  request,
  {
    url,
    addUrl,
    exportUrl,
    updateUrl,
    deleteUrl,
    detailUrl,
    importUrl,
  },
) {
  const api = {
    getList: async (params) => {
      const { data } = await request({ url, params })
      return data
    },
    getDetail: async (id) => {
      const { data } = await request({ url: `${detailUrl || url}/${id}` })
      return data
    },
    add: async (data) => {
      const res = await request({
        url: addUrl || url,
        data,
        method: 'POST',
      })
      return res.data
    },
    update: async (data) => {
      const res = await request({
        url: `${updateUrl || url}/${data.id}`,
        data,
        method: 'PUT',
      })
      return res.data
    },
    export: async (params) => {
      const res = await request({
        url: exportUrl || `${url}/export`,
        params,
        responseType: 'blob',
      })
      return res
    },
    delete: async (id) => {
      await request({
        url: `${deleteUrl || url}/${id}`,
        method: 'DELETE',
      })
    },
    import: async (data) => {
      const res = await request({
        url: importUrl || `${url}/import`,
        data,
        method: 'POST',
      })
      return res.data
    },
  }
  return api
}
