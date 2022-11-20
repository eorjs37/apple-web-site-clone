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
  }

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

    /**
     * 2. yOffset(현재 브라우저에서 스크롤을 내린 위치) > prevScrollHeight(현재 스크롤 높이) +
     *
     * */
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--;
    }

    console.log(currentScene);
  }

  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  setLayout();
})();
