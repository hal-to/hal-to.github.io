# 0. 프로젝트 소개
갓환국님께서 공유해주신 [구글시트](https://han.gl/49BQk)를 보기좋게 보여주는 사이트입니다.  

카테코리별로 영상을 확인할 수 있고,  
지인들에게 추천할 때 영상들을 묶어서 공유할 수 있습니다.  


(하라는 백테스트는 안하고ㅜㅠ) 최근에 웹개발에 흥미가 생겨서 만들어 본 사이트입니다.  
본래 웹개발자는 아니라서 좀 허접하고 완성도도 떨어지지만,  
영상 공유에 조금은 도움이 될 수 있을거라 봅니다.  

진짜 웹개발자님들이 나타나서 제대로 된 사이트가 만들어지길 기대해 봅니다.  
참여해 주셔서 제대로 만들어 주십셔~!  
갓환국님의 사이버 동상을 제대로 만들어 봅시다~!  

<br/>
<br/>

# 1. 개발 관련
버그나 있었으면 하는 기능은 이슈에 올려주십시오.  
(직접 만들어 주시는 걸 더 추천합니다.)  

## 1.1 관련 기술
- React
- Sass

<br/>
<br/>

## 1.2 개발 시작
fork 해서, 로컬로 clone 후  

```bash
> npm install  # 필요 모듈 설치

> npm start   # 로컬에서 dev 버전 시작
```

<br/>
<br/>

## 1.3 주요 동작

### 1.3.1 구글 시트 읽어 오기
<https://theoephraim.github.io/node-google-spreadsheet/#/> 모듈 사용  
components/Header.js 에서 트리거 하고,  
components/util/YoutubeUtil.js 의 getVideos() 에서 시트를 읽어 옵니다.

읽어온 링크에서 비디오의 id 를 찾아서(getYoutubeId()), thumbnail url 도 가져 옵니다.

### 1.3.2 하위 페이지에 바로 접근 (/recommend)
<https://github.com/rafgraph/spa-github-pages> 를 사용해서, /recommend 페이지에 바로 접속을 가능하게 합니다.

Reference:
- https://github.com/rafgraph/spa-github-pages
- https://sujinlee.me/spa-github-pages-ko/
- https://velog.io/@ausg/gh-pages-react-router


<br/>
<br/>

## 1.4 본인 repo 에서 호스팅 (optional)

몇 가지 제약사항으로 인해 본인 repo 에서 deploy 해 보려면, 추가 수정이 필요합니다. (로컬에서의 테스트만 하신다면, 필요 없습니다.)
`npm run deploy` 하기 전 아래 내용도 임시로 수정해서, 명령 실행 부탁드립니다.

### 1.4.1 env.local 에 본인의 API key 지정
구글 시트를 사용하기 위한 API key 가 'localhost' 와 'hal-to.github.io' 에서만 동작합니다.
본인의 구글 아이디로 api key 를 받아서, [google-spreadsheet 모듈 가이드](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=api-key)  
해당 api key 사용하도록 설정하는 작업이 필요합니다.

`env.local.sample` 파일을 복사하여 `env.local` 파일 하고 (.gitignore 에 포함되어 있음)  
본인의 api key 입력합니다.


### 1.4.2 public/404.html 파일의 `pathSegmentsToKeep` 값 변경 필요
/recommend 로 바로 접속을 위해, 404 hack(?)을 사용하고 있습니다.
forked repo 에서는 `pathSegmentsToKeep` 값을 `1` 로 세팅해야 합니다.

### 1.4.3 package.json 파일의 `homepage` 항목 변경
forked repo 의 url 을 적어 줍니다.  
(ex: https://mechurak.github.io/hal-to.github.io/)


<br/>
<br/>

## 1.5 풀 리퀘스트 관련

아래 블로그 참고하셔서 Pull Request 올려 주시면 됩니다.  
<https://wayhome25.github.io/git/2017/07/08/git-first-pull-request-story/>

### 1.5.1 fork
### 1.5.2 git clone (포크된 본인 repo)
### 1.5.3 원본 repo 를 remote 에 등록

```bash
> git remote add upstream https://github.com/hal-to/hal-to.github.io.git
```

### 1.5.4 작업 전 main 브랜치 sync
```bash
> git pull upstream main  # 원본(upstream) 소스 당겨옴
> git push origin main  # 본인 repo (origin) 에 푸쉬
```

### 1.5.5 브랜치 만들어서 작업
```bash
> git checkout -b MY_AWESOME_TASK  # 브랜치 따서 작업 시작
> ...
> git commit  # 작업 완료 후 커밋
```

### 1.5.6 push 후 Pull request 요청
```bash
> git push origin MY_AWESOME_TASK  # 본인 repo 에 push
```

본인 repo 페이지에서 해당 브랜치 고른 후, `Pull request` 요청
