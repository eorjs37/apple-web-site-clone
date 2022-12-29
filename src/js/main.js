(() => {
  let yOffset = 0; // window pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; //현재 스크롤 위치(yOffset) 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된 scene
  let enterNewScene = false; //새로운 scene이 시작된 순간 true
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
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        //messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_opacity_out: [0, 1, { start: 0.25, end: 0.3 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
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
    //현재 scene 계산
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
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
        // const messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
        //  const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
        //   const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);

        if (scrollRatio <= 0.22) {
          //in
          objs.messageA.style.opacity = messageA_opacity_in;
          objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
        } else {
          //out
          // objs.messageA.style.opacity = messageA_opacity_out;
          //objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
        }
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

  function calcValues(values, currentYOffset) {
    let rv;
    //현재 씬에서 스크롤 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    if (values.length === 3) {
      //start~end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      // 4235*0.1 =  423.5px
      const partScrollEnd = values[2].end * scrollHeight;
      // 4235*0.2 =  847px
      const partScrollHeight = partScrollEnd - partScrollStart;
      // partScrollHeight : 847px - 423.5px
      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        //currentYOffset - 423.5px / (847px - 423.5px)
        console.log("rv before : ", (currentYOffset - partScrollStart) / partScrollHeight);
        rv = ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function scrollLoop() {
    enterNewScene = false;
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
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
    if (enterNewScene) return;
    playAnimation();
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener("DOMContentLoaded", setLayout);
  window.addEventListener("resize", setLayout);
})();
