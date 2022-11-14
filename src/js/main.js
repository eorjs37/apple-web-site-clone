(() => {
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

  window.addEventListener("resize", setLayout);
  setLayout();
})();
