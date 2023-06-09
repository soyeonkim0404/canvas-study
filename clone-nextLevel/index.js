document.addEventListener("mousemove", (e) => {
  const cursorDefaultInner = document.querySelector(".cursor-default-inner");
  const cursorTraceInner = document.querySelector(".cursor-trace-inner");

  cursorDefaultInner.style.top = e.clientY + "px";
  cursorDefaultInner.style.left = e.clientX + "px";

  cursorTraceInner.style.top = e.clientY + "px";
  cursorTraceInner.style.left = e.clientX + "px";
});

const cursor = document.querySelector(".cursor");

document.addEventListener("mousedown", (e) => {
  cursor.classList.add("cursor--active");
});

document.addEventListener("mouseup", (e) => {
  cursor.classList.remove("cursor--active");
});

function createRipple(e) {
  let ripple = document.createElement("span");
  ripple.classList.add("ripple");
  cursor.appendChild(ripple);
  ripple.style.top = e.clientY - ripple.clientHeight / 2 + "px";
  ripple.style.left = e.clientY - ripple.clientWidth / 2 + "px";
  ripple.addEventListener("animationend", () => {
    cursor.removeChild(ripple);
  });
}

document.addEventListener("click", (e) => {
  createRipple(e);
});

const preloaderBtn = document.querySelector(".preloader__btn");

let intervalId = null;
let scale = 1;

const preloaderHideThreshold = 18;

function setPreloaderStyle(scale) {
  preloaderBtn.style.transform = `scale(${scale})`;
  document.querySelector(".preloader__btn_hold").style.opacity =
    1 - (scale - 1) / preloaderHideThreshold;
}

const header = document.querySelector(".header");

preloaderBtn.addEventListener("mousedown", () => {
  intervalId = setInterval(() => {
    scale += 0.175;

    setPreloaderStyle(scale);

    if (scale >= 1 + preloaderHideThreshold) {
      document.querySelector(".preloader").classList.add("hidden-area");

      header.classList.remove("hidden-area");

      header.classList.add("shown-area");

      clearInterval(intervalId);
    }
  }, 10);
});

preloaderBtn.addEventListener("mouseup", () => {
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    scale -= 0.075;

    setPreloaderStyle(scale);

    if (scale <= 1) {
      clearInterval(intervalId);
    }
  }, 10);
});

header.addEventListener("mousemove", (e) => {
  const xRelativeToHeader = e.clientX / header.clientWidth;
  const yRelativeToHeader = e.clientY / header.clientHeight;

  document.querySelector(".header__title").style.transform = `translate(${
    xRelativeToHeader * -50
  }px, ${yRelativeToHeader * -50}px)`;

  document.querySelector("#circle-1").style.transform = `translate(${
    xRelativeToHeader * -25
  }px, ${yRelativeToHeader * -25}px)`;
  document.querySelector("#circle-2").style.transform = `translate(${
    xRelativeToHeader * 25
  }px, ${yRelativeToHeader * 25}px)`;

  document.querySelector("#cube__image_1").style.transform = `translate(${
    xRelativeToHeader * -15
  }px, ${yRelativeToHeader * -15}px)`;
  document.querySelector("#cube__image_2").style.transform = `translate(${
    xRelativeToHeader * -8
  }px, ${yRelativeToHeader * -8}px)`;
  document.querySelector("#cube__image_3").style.transform = `translate(${
    xRelativeToHeader * -20
  }px, ${yRelativeToHeader * -20}px)`;
  document.querySelector("#cube__image_4").style.transform = `translate(${
    xRelativeToHeader * 5
  }px, ${yRelativeToHeader * 5}px)`;
});
