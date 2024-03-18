//즉시실행함수
(function () {
    contentFullpage();
    coverTimeline();
    gnbEvent();
    circleTxt(`.profile .ctxt`);
})();

particlesJS("particles-js", {
    particles: {
        number: { value: 6, density: { enable: true, value_area: 800 } },
        color: { value: "#000000" },
        shape: {
            type: "edge",
            stroke: { width: 0, color: "#000" },
            polygon: { nb_sides: 6 },
            image: { src: "img/github.svg", width: 100, height: 100 },
        },
        opacity: {
            value: 0.1183721462448409,
            random: true,
            anim: { enable: false, speed: 0, opacity_min: 0.1, sync: false },
        },
        size: {
            value: 160,
            random: false,
            anim: { enable: true, speed: 10, size_min: 40, sync: false },
        },
        move: {
            enable: true,
            speed: 8,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: false, mode: "push" },
            resize: true,
        },
        modes: {
            grab: { distance: 400, line_linked: { opacity: 0 } },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
        },
    },
    retina_detect: true,
});
var count_particles, stats, update;
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
    stats.begin();
    stats.end();
    if (
        window.pJSDom[0].pJS.particles &&
        window.pJSDom[0].pJS.particles.array
    ) {
        count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    }
    requestAnimationFrame(update);
};

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
            destination.index === 0 && mainVisualTimeline();

            destination.index === 1 && storyTimeline();
            destination.index === 2 && profileTimeline();
        },

        onSlideLeave: (section, origin, destination, direction, trigger) => {
            destination.index && portfolioTimeline(destination.index - 1);
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

function coverTimeline() {
    const btn = document.querySelector(".utils_wrap .btn");

    const cover = document.querySelector(".gnb");

    btn.addEventListener("click", (e) => {
        const t = e.currentTarget;
        t.classList.toggle("is-active");
        cover.classList.toggle("on");
    });
}

function gnbEvent() {
    const cover = document.querySelector(".gnb");
    const btn = document.querySelector(".utils_wrap .btn");
    cover.addEventListener("wheel", (e) => {
        //e.preventDefault();
        e.stopPropagation(); // 이벤트의 전파를 막음
    });

    const lnk = document.querySelectorAll(".gnb .lnk a");

    lnk.forEach((it, idx) => {
        it.addEventListener("click", () => {
            cover.classList.remove("on");
            btn.classList.remove("is-active");
        });
    });
}

function mainVisualTimeline() {
    const t = document.querySelector(".mainVisal .tit h2");
    const p = document.querySelector(".mainVisal .tit p");
    const a = document.querySelector(".mainVisal .t");
    const b = document.querySelector(".mainVisal .bg");

    const tl = gsap.timeline();
    tl.from(t, {
        x: 1000,
        autoAlpha: 0,
        delay: 2,
        duration: 0.5,
    });
    tl.from(b, {
        x: 1000,
        rotate: 180,
        autoAlpha: 0,
        delay: 0.5,
        duration: 0.5,
    });
}
function portfolioTimeline(n) {
    const t = document.querySelectorAll(".portfolio .desc h3");
    const p = document.querySelectorAll(".portfolio .desc p");
    const m = document.querySelectorAll(".portfolio .mokup");
    const tb = document.querySelectorAll(".portfolio .table");
    const lnk = document.querySelectorAll(".portfolio .link");
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
        .from(p[n], {
            autoAlpha: 0,
            x: 200,
            duration: 0.3,
        })
        .from(tb[n], {
            autoAlpha: 0,
            x: 200,
        })
        .from(lnk[n], {
            autoAlpha: 0,
            x: 200,
        })
        .fromTo(
            b[n],
            { width: "100%", left: "0" }, // 오른쪽 끝을 기준으로 시작하도록 설정
            { width: "0%", left: "100%", duration: 0.5, ease: "power2.inOut" } // 너비를 변경하여 오른쪽으로 줄어들게 함
        );
}

function storyTimeline() {
    const t = document.querySelector(".portfolio .tit h3");
    const p = document.querySelector(".portfolio .tit p");

    const tl = gsap.timeline();

    tl.from(t, {
        autoAlpha: 0,
        x: 2000,
        delay: 0.5,
    }).from(p, {
        autoAlpha: 0,
        x: 2000,
        delay: 0.5,
    });
}

function profileTimeline() {
    const t = document.querySelector(".profile .tit h3");
    const p = document.querySelector(".profile .tit p");
    const c = document.querySelector(".profile .ctxt");
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

function mouseCursor() {
    const mc = document.querySelectorAll(".mainVisal , .profile");
    mc.forEach((it) => {
        it.addEventListener("mousemove", (e) => {
            let mouseX = e.pageX + 10; // document의 x좌표값
            let mouseY = e.pageY + 10; // document의 y좌표값

            const cursor = document.querySelector(".cursor");
            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";
        });
    });
}

function circleTxt(txt) {
    const t = document.querySelector(txt).innerText;
    const at = [...t].map((it) => `<span>${it}</span>`).join("");
    document.querySelector(txt).innerHTML = at;
    const b = document.querySelector(txt);
    const ctxt = b.querySelectorAll("span");
    console.log(ctxt);

    ctxt.forEach((it, idx, arry) => {
        it.style.cssText = `
        position: absolute;
        top:0;
        left: 50%;
        height: 100%;
        transform: translate(-50%,0) rotate(${(360 / arry.length) * idx}deg)
        `;
    });
}
