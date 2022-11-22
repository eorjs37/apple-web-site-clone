(() => {
  let yOffset = 0; // window pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; //현재 스크롤 위치(yOffset) 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된 scene
  const sceneInfo = [
    {
      //0
      type: "sticky",
      scrollHeight: 0,
      heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1],
      },
    },
    {
      //1
      type: "normal",
      scrollHeight: 0,
      heightNum: 5, // ㅂ브라우저 높이의 5배 scrollHeight 세팅
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      //2
      type: "sticky",
      scrollHeight: 0,
      heightNum: 5, // ㅂ브라우저 높이의 5배 scrollHeight 세팅
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      //3
      type: "sticky",
      scrollHeight: 0,
      heightNum: 5, // ㅂ브라우저 높이의 5배 scrollHeight 세팅
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    //각 스크롤 섹션의 높이 세팅
    for (let sceneIndex = 0; sceneIndex < sceneInfo.length; sceneIndex++) {
      sceneInfo[sceneIndex].scrollHeight = sceneInfo[sceneIndex].heightNum * window.innerHeight;
      sceneInfo[sceneIndex].objs.container.style.height = `${sceneInfo[sceneIndex].scrollHeight}px`;
    }

    let totalScrollHeight = 0;
    yOffset = window.pageYOffset;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  function playAnimation() {
    const values = sceneInfo[currentScene].values;
    const objs = sceneInfo[currentScene].objs;
    const currentYOffset = yOffset - prevScrollHeight;
    console.log(currentScene, currentYOffset);
    switch (currentScene) {
      case 0:
        let messageA_opacity_0 = values.messageA_opacity[0];
        let messageA_opacity_1 = values.messageA_opacity[1];

        calcValues(values.messageA_opacity, currentYOffset);
        break;
      case 1:
        //console.log("1 play");

        break;
      case 2:
        //console.log("2 play");
        break;
      case 3:
        // console.log("3 play");
        break;
    }
  }

  function calcValues(values, currentYOffset) {}

  function scrollLoop() {
    prevScrollHeight = 0;
    //앞의 높이 구하기
    /**
     * 1. currentScene이 0인경우 prevScrollHeight = 0
     *
     * */
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    playAnimation();
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener("DOMContentLoaded", setLayout);
  window.addEventListener("resize", setLayout);
})();
