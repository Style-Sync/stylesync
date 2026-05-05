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
    // StyleSync 반응형 뷰포트 (tailwind.config.ts 브레이크포인트 기준)
    viewport: {
      viewports: {
        mobile390: {
          name: 'Mobile (390px)',
          styles: { width: '390px', height: '844px' },
          type: 'mobile',
        },
        tablet768: {
          name: 'Tablet (768px)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        pc1280: {
          name: 'PC (1280px)',
          styles: { width: '1280px', height: '900px' },
          type: 'desktop',
        },
        pc1920: {
          name: 'PC (1920px)',
          styles: { width: '1920px', height: '900px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'pc1920',
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
