# Apple web site clone

## rem em

### rem

> root 폰트 사이즈 기준으로 계산한다.

### em

> 현재 폰트 및 부모의 폰트 기준으로 계산한다.

```css
html {
  font-size: 14px;
}

p {
  font-size: 1.2rem;
  margin-left: 0.5em;
}
```

위와 같이 설정할 경우 아래와 같이 계산된다.

```css
html {
  font-size: 14px;
}

p {
  font-size: 16.8px; /* 14px * 1.2 = 16.8 */
  margin-left: 8.4px; /* 14px * 1.2 * 0.5 =  8.4 */
}
```

## vw

> 윈도우 화면 사이즈에 따라 결정된다(정확히 수치를 계산하기는 어렵고, 상대적인 크기라고 생각하면 될것같다.)

## 즉시 실행함수

> 함수를 한번만 실행하기 위해서는 즉시 실행 함수를 사용한다.

## sceneInfo

```javascript
const sceneInfo = [
  {
    type: "sticky", //타입 종류
    scrollHeight: 0, //초기 scene 높이
    heightNum: 5, // 현재 보이는 브라우저 높이 * 5
  },
];
```

## func setLayout

> 각 scene 높이 세팅

## func scrollLoop

> 스크롤 이벤트 발생시 body에 id세팅
