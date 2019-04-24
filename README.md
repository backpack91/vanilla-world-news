# World News Aggregator
[News API Source](https://newsapi.org/docs/endpoints/sources)를 이용하여 뉴스 정보를 보여줍니다. 사용자는 원하는 기간과 신문사를 선택할 수 있습니다. #React

![](GIF/vanilla-world-news.gif)

## Setup

Install dependencies

```sh
$ yarn install (or npm install)
```

## Development

```sh
$ yarn start (or npm start)
# visit http://localhost:3000
```

## Features

- [ ] 사용자가 검색어를 입력할 수 있습니다.
- [ ] 사용자가 검색을 원하는 기간을 설정할 수 있는 UI가 있습니다.
- [ ] 검색을 원하는 소스를 선택할 수 있습니다. (다중 선택 가능, 최대 20개)
- [ ] 검색 결과가 로딩 중인 상태에서는 로딩 중이라는 메시지 혹은 아이콘을 보여주어야 합니다.
- [ ] 검색 결과는 [News API Everything](https://newsapi.org/docs/endpoints/everything)을 이용하여 보여주었습니다.
- [ ] 첫 검색 결과는 30개를 보여주고 검색 결과 화면 아래로 스크롤을 내릴 경우, 더 이상 검색 결과가 없을때까지 계속하여 30개씩 더 보여줍니다.
- [ ] 사용자는 검색 결과를 "리스트" 형식 혹은 "카드" 형식으로 선택하여 볼 수 있습니다.
- [ ] "리스트" 형식의 각 검색 결과는 다음 정보를 보여줍니다.
  - 검색 소스 이름
  - 뉴스 작성자
  - 뉴스 제목
  - 뉴스 작성일
- [ ] "카드" 형식의 각 검색 결과는 다음 정보를 보여줍니다.
  - 뉴스 이미지
  - 뉴스 작성자
  - 뉴스 제목
- [ ] 각 검색 결과를 클릭할 경우, Modal을 이용하여 다음과 같은 상세 정보를 보여줍니다.
  - 검색 소스 이름
  - 뉴스 작성자
  - 뉴스 제목
  - 뉴스 작성일
  - 뉴스 설명
  - 뉴스 내용
  - 뉴스 이미지
  - 뉴스 링크
