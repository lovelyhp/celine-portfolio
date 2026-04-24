# Céline Choi — Portfolio

A bilingual (KO / EN) editorial portfolio site, built with React + TypeScript + Vite.

## 로컬 개발 (Local Dev)

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 접속

## 빌드 (Build)

```bash
npm run build
```

`dist/` 폴더에 정적 파일 생성됨.

## 배포 (Netlify)

1. GitHub repository 생성 후 이 프로젝트 푸시
2. Netlify에서 "Add new site" → "Import an existing project" → GitHub 연결
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy 클릭

`netlify.toml`이 이미 설정되어 있어 자동으로 인식됨.

## 구조 (Structure)

```
src/
  content/       # 모든 텍스트 콘텐츠 (ko.ts, en.ts)
  context/       # LangContext (언어 전환)
  components/    # Nav
  sections/      # Hero, About, Featured, Selected, Experience, Skills, Contact
  styles/        # global.css (디자인 토큰)
  App.tsx
  main.tsx
```

## 콘텐츠 수정

모든 문구는 `src/content/ko.ts` 와 `src/content/en.ts`에 있음.
코드를 건드리지 않고 이 두 파일만 수정하면 내용이 반영됨.

## 디자인 토큰

`src/styles/global.css`의 `:root` 블록에서 색상·타이포·스페이싱 변수 수정 가능.

---

© 2026 Céline Choi
