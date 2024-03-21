import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { copy } from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 读取源 package.json 文件
const srcPackageJsonPath = path.join(__dirname, 'package.json')
const srcPackageJson = JSON.parse(fs.readFileSync(srcPackageJsonPath, 'utf-8'))

// 定义要放入 dist/package.json 的精简内容
const distPackageJson = {
  name: srcPackageJson.name,
  version: srcPackageJson.version,
  main: './index.js', // 或其他适合你项目的入口文件路径
  homepage: srcPackageJson.homepage,
  repository: srcPackageJson.repository,
  bugs: srcPackageJson.bugs,
  style: './index.css',
  dependencies: {}, // 如果有运行时依赖项，这里列出它们
}

// 将精简内容写入 dist/package.json
const distPackageJsonPath = path.join(__dirname, 'dist', 'package.json')
fs.writeFileSync(distPackageJsonPath, JSON.stringify(distPackageJson, null, 2), 'utf-8')
await copy('README.md', 'dist/README.md')

console.log('Generated dist/package.json dist/README.md successfully.')
