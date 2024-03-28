//즉시실행함수
(function () {
    contentFullpage();
})();

requestAnimationFrame(update); //프레임전체 fullpage
function contentFullpage() {
    const slideWrap = document.querySelector(".portfolio");

    const f = new fullpage("#content", {
        anchors: ["intro", "portfolio", "traning", "profile"],
        scrollOverflow: false,

        //fullpage slide의 가로스크롤 구현 option
        controlArrows: false, //슬라이드 화살표 숨김
        loopHorizontal: false, //슬라이드 반복 멈춤

        //메인 애니메이션 재실행.
        afterRender: () => {
            mainVisualTimeline();
        },

        onLeave: (origin, destination, direction, trigger) => {
            if (destination.index === 0) {
                document.querySelector(".gnb").classList.add("on");
            } else {
                // gnb에서 'on' 클래스 삭제
                document.querySelector(".gnb").classList.remove("on");
            }

            // gnb li에 active 클래스 추가/제거
            const gnbItems = document.querySelectorAll(".gnb li");
            gnbItems.forEach((item, index) => {
                if (index === destination.index) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            });

            destination.index === 0 && mainVisualTimeline();
        },

        onSlideLeave: (section, origin, destination, direction, trigger) => {
            destination.index && portfolioTimeline(destination.index);
        },
    });

    //fullpage slide의 가로스크롤 구현
    slideWrap.addEventListener("wheel", function (e) {
        let delta = e.deltaY; // 휠할 때에 deltaY값을 구해옴 100 , -100;
        //slide index 구해서 인덱스 마다 애니메이션 구해오기
        if (delta < 0) {
            fullpage_api.moveSlideLeft();
        } else {
            fullpage_api.moveSlideRight();
        }
    });
}

function mainVisualTimeline() {
    const v = document.querySelector(".mainVisal .painting video");
    const t = document.querySelector(".mainVisal .tit h2");
    const w = document.querySelector(".mainVisal .bg ");
    const c = document.querySelector(".mainVisal .color_bg .color_01");
    const c01 = document.querySelector(".mainVisal .color_bg .color_02");
    const c02 = document.querySelector(".mainVisal .color_bg .color_03");
    const c03 = document.querySelector(".mainVisal .color_bg .color_04");
    const c04 = document.querySelector(".mainVisal .color_bg .color_05");
    const c05 = document.querySelector(".mainVisal .color_bg .wood");

    const tl = gsap.timeline();
    tl.to(v, {
        duration: 0.1, // 비디오를 바로 재생시키기 위해 매우 짧은 시간 설정
        play: 0, // 비디오를 재생
    });
    tl.from(t, {
        x: 0,
        delay: 2,
        duration: 0.5,
    });
    tl.from(w, {
        delay: -0.1,
        duration: 0.7,
    });
    tl.from(c, {
        delay: -0.1,
        duration: 0.3,
        opacity: 0,
    });
    tl.from(c01, {
        delay: -0.1,
        duration: 0.3,
        opacity: 0,
    });
    tl.from(c02, {
        delay: -0.1,
        duration: 0.3,
        opacity: 0,
    });
    tl.from(c03, {
        delay: -0.1,
        duration: 0.3,
        opacity: 0,
    });
    tl.from(c04, {
        delay: -0.1,
        duration: 0.3,
        opacity: 0,
    });
    tl.from(c05, {
        delay: -0.1,
        duration: 0.3,
        opacity: 0,
    });
}

function portfolioTimeline(n) {
    const t = document.querySelectorAll(".portfolio .desc ");
    const m = document.querySelectorAll(".portfolio .mokup");
    const b = document.querySelectorAll(".portfolio .brush_inner");

    const tl = gsap.timeline();

    tl.from(m[n], {
        autoAlpha: 0,
        y: 200,
        delay: 0.5,
    })
        .from(t[n], {
            autoAlpha: 0,
            x: 200,
            duration: 0.3,
        })

        .fromTo(
            b[n],
            { width: "100%", left: "0" }, // 오른쪽 끝을 기준으로 시작하도록 설정
            { width: "0%", left: "100%", duration: 0.5, ease: "power2.inOut" } // 너비를 변경하여 오른쪽으로 줄어들게 함
        );
}

function profileTimeline() {
    const t = document.querySelector(".profile .tit h3");
    const p = document.querySelector(".profile .tit p");
    const tl = gsap.timeline();

    tl.from(t, {
        x: 1000,
        autoAlpha: 0,
        delay: 1,
    }).from(p, {
        x: 1000,
        autoAlpha: 0,
        delay: 1,
    });
}
