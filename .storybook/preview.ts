import type { Preview } from '@storybook/nextjs-vite'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    // StyleSync 배경 테마
    backgrounds: {
      default: 'stylesync',
      values: [
        { name: 'stylesync', value: '#FAF9F6' },  // 기본 페이지 배경
        { name: 'dark',      value: '#1A1C1A' },   // 다크 배경 (마스코트 확인용)
        { name: 'white',     value: '#FFFFFF' },   // 흰색 카드 확인용
        { name: 'surface',   value: '#F4F3F1' },   // surface-container-low
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
