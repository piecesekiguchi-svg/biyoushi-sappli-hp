import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pagesなどのサブディレクトリにデプロイする場合は、
  // リポジトリ名に合わせて base: '/repository-name/' を設定する必要があります。
  // ルートドメイン(例: user.github.io)の場合はこのままでOKです。
  base: './', 
})