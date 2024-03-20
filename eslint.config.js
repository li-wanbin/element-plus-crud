import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    ignores: ['dist', 'public', 'node_modules'],
  },
)
