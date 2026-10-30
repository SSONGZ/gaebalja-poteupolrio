# 송성진 포트폴리오

HTML, CSS, 바닐라 JavaScript만으로 만든 정적 포트폴리오입니다. 서버나 데이터베이스 없이 동작하며, 파일을 직접 열거나 GitHub Pages에 게시할 수 있습니다.

## 파일 구조

```text
index.html       페이지 내용과 개인 정보
css/styles.css   색상, 반응형 레이아웃, 애니메이션
js/main.js       모바일 메뉴, 안내창, 이메일 복사, 임시 프로젝트 기록
images/          파비콘 등 이미지 파일
dist/public/     Vite 빌드 결과물 (자동 생성)
```

## 내용을 수정하는 곳

- 이름, 소개, 기술, 활동, 연락처: `index.html`
- 색상과 화면 배치: `css/styles.css`의 맨 위 CSS 변수와 반응형 규칙
- 버튼과 메뉴 동작: `js/main.js`
- 프로젝트 정보: 실제 경험을 확인한 뒤 프로젝트 영역을 업데이트하세요. 현재 입력 양식은 임시 메모만 이 기기의 브라우저 저장소에 보관하며, 공개 프로젝트 카드나 서버로 전송하지 않습니다.
- GitHub: 현재 제공된 링크는 `github.com/settings/profile`입니다. 공개 포트폴리오용 GitHub 프로필 주소로 바꾼 뒤 게시하세요.
- 강점, 프로젝트 활용 기술, 수상·자격의 연도 등 제공되지 않은 정보는 사실을 확인한 다음 추가하세요.

## GitHub Pages 게시

이 저장소는 여러 작업물이 들어 있는 pnpm workspace입니다. GitHub Pages의 브랜치 게시 방식은 저장소 루트 또는 `docs/` 폴더만 직접 게시할 수 있으므로, 독립 포트폴리오 저장소를 만들고 아래 파일과 폴더를 그 저장소의 루트에 복사하는 방법이 가장 간단합니다.

```text
index.html
css/
js/
images/
```

그다음 GitHub 저장소에서 **Settings → Pages → Deploy from a branch**를 선택하고, 게시 브랜치와 `/ (root)`를 지정하세요. `docs/`에서 게시하려면 같은 파일과 폴더를 `docs/` 안에 복사한 뒤 그 폴더를 선택하면 됩니다. 모든 리소스 경로가 상대 경로라 저장소 하위 경로에서도 작동합니다.

Vite 빌드가 필요하면 workspace 루트에서 다음 명령을 실행하고 `artifacts/song-seongjin-portfolio/dist/public/` 내용을 게시할 수 있습니다.

```sh
pnpm --filter @workspace/song-seongjin-portfolio run build
```

## 미리보기와 로컬 실행

Replit 미리보기는 프로젝트의 웹 실행 구성을 사용합니다. 별도 로컬 서버 없이 `index.html`을 브라우저에서 직접 열어도 기본 페이지와 인터랙션이 작동합니다. 프로젝트 기록 임시 저장은 해당 브라우저에만 저장됩니다.
