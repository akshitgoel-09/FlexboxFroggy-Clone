"use strict";

const btnLevels = document.querySelector(".counter-centre");
const btnLevel = document.querySelectorAll(".level");
const reset = document.querySelector(".reset");
const btnLeft = document.querySelector(".counter-left");
const btnRight = document.querySelector(".counter-right");
const btnNext = document.querySelector(".btn-next");
const codebox = document.querySelector(".codebox");
const input = document.querySelector(".input-code");
const modalLevels = document.querySelector(".modal-levels");
const modalCode = document.querySelectorAll(".modal-code");
let modalHelp = document.querySelector(".modal-help");
let activeButton = null;

const pond = document.querySelector(".pond");
const pad = document.getElementsByClassName("pad");
const greenFrog = document.getElementsByClassName("green-frog");
const yellowFrog = document.getElementsByClassName("yellow-frog");
const redFrog = document.getElementsByClassName("red-frog");
const greenPad = document.getElementsByClassName("green-pad");
const yellowPad = document.getElementsByClassName("yellow-pad");
const redPad = document.getElementsByClassName("red-pad");
let green = false;
let yellow = false;
let red = false;

/*************************************************************************************************************/

if (pageNumber !== 1 && pageNumber !== 2) {
  btnLeft.addEventListener("click", function () {
    window.open(`/pages/quiz${pageNumber - 1}.html`, "_self");
  });
}

if (pageNumber === 2) {
  btnLeft.addEventListener("click", function () {
    window.open("/index.html", "_self");
  });
}

if (pageNumber !== 24) {
  btnRight.addEventListener("click", function () {
    window.open(`/pages/quiz${pageNumber + 1}.html`, "_self");
  });
}

for (let i = 0; i < pad.length; i++) {
  pad[i].style.cssText = `transform: rotate(${
    Math.trunc(Math.random() * 360) + 1
  }deg);`;
}

/*************************************************************************************************************/

for (let i = 0; i < btnLevel.length; i++) {
  if (i + 1 === 1) {
    btnLevel[i].addEventListener("click", function () {
      window.open("/index.html", "_self");
    });
  } else {
    btnLevel[i].addEventListener("click", function () {
      window.open(`/pages/quiz${i + 1}.html`, "_self");
    });
  }
  if (localStorage.getItem(i + 1) !== null) {
    btnLevel[i].classList.add("solved");
  }
  if (i + 1 === pageNumber) {
    btnLevel[i].classList.add("current");
  }
}

reset.addEventListener("click", function () {
  for (let i = 0; i < btnLevel.length; i++) {
    if (localStorage.getItem(i + 1) !== null) {
      btnLevel[i].classList.remove("solved");
    }
  }
  localStorage.clear();
  modalLevels.style.display = "none";
  input.value = "";
});

btnLevels.addEventListener("click", function (event) {
  event.stopPropagation();
  if (
    modalLevels.style.display === "none" ||
    modalLevels.style.display === ""
  ) {
    modalLevels.style.display = "block";
    modalLevels.style.top = btnLevels.offsetTop + 38 + "px";
    modalLevels.style.left = btnLevels.offsetLeft - 5 + "px";
  } else {
    modalLevels.style.display = "none";
  }
});

document.addEventListener("click", function (event) {
  if (!modalLevels.contains(event.target) && event.target !== btnLevels) {
    modalLevels.style.display = "none";
  }
});

modalLevels.addEventListener("click", function (event) {
  event.stopPropagation();
});

for (let i = 0; i < modalCode.length; i++) {
  modalCode[i].addEventListener("click", function (event) {
    modalHelp.style.display = "none";
    modalHelp = document.querySelector(`.modal-help-${modalCode[i].innerHTML}`);
    event.stopPropagation();
    if (activeButton !== this) {
      activeButton = this;
      modalHelp.style.display = "block";
      modalHelp.style.top = this.offsetTop + 35 + "px";
      modalHelp.style.left = this.offsetLeft + "px";
    } else {
      activeButton = null;
      modalHelp.style.display = "none";
    }
  });
}

document.addEventListener("click", function (event) {
  if (
    activeButton &&
    !modalHelp.contains(event.target) &&
    event.target !== activeButton
  ) {
    modalHelp.style.display = "none";
    activeButton = null;
  }
});

/*************************************************************************************************************/

input.value = JSON.parse(localStorage.getItem(pageNumber));

btnNext.addEventListener("click", function () {
  if (green && yellow && red && pageNumber !== 24) {
    codebox.classList.remove("codebox-animation");
    window.open(`/pages/quiz${pageNumber + 1}.html`, "_self");
  } else if (green && yellow && red && pageNumber === 24) {
    codebox.classList.remove("codebox-animation");
    window.open("victory.html", "_self");
  } else {
    codebox.classList.add("codebox-animation");
    setTimeout(function () {
      codebox.classList.remove("codebox-animation");
    }, 501);
  }
});

input.addEventListener("input", function () {
  btnNext.classList.remove("btn-next-animation");
  btnNext.classList.add("disable");
  if (order) {
    const orderFrog = document.getElementsByClassName(orderColor);
    for (let i = 0; i < orderFrog.length; i++) {
      orderFrog[i].style.cssText = input.value;
    }
  } else {
    pond.style.cssText = input.value;
  }
  if (greenPresent) {
    for (let i = 0; i < greenFrog.length; i++) {
      if (
        greenFrog[i].getBoundingClientRect().x ===
          greenPad[i].getBoundingClientRect().x &&
        greenFrog[i].getBoundingClientRect().y ===
          greenPad[i].getBoundingClientRect().y
      ) {
        green = true;
      } else {
        green = false;
      }
    }
  } else {
    green = true;
  }
  if (yellowPresent) {
    for (let i = 0; i < yellowFrog.length; i++) {
      if (
        yellowFrog[i].getBoundingClientRect().x ===
          yellowPad[i].getBoundingClientRect().x &&
        yellowFrog[i].getBoundingClientRect().y ===
          yellowPad[i].getBoundingClientRect().y
      ) {
        yellow = true;
      } else {
        yellow = false;
      }
    }
  } else {
    yellow = true;
  }
  if (redPresent) {
    for (let i = 0; i < redFrog.length; i++) {
      if (
        redFrog[i].getBoundingClientRect().x ===
          redPad[i].getBoundingClientRect().x &&
        redFrog[i].getBoundingClientRect().y ===
          redPad[i].getBoundingClientRect().y
      ) {
        red = true;
      } else {
        red = false;
      }
    }
  } else {
    red = true;
  }
  if (green && yellow && red) {
    localStorage.setItem(pageNumber, JSON.stringify(input.value));
    if (localStorage.getItem(pageNumber) !== null) {
      btnLevel[pageNumber - 1].classList.add("solved");
    }

    setTimeout(() => {
      btnNext.classList.add("btn-next-animation");
      btnNext.classList.remove("disable");
    }, 100);
  }
});

/*
const nextPage = document.createElement("a");
nextPage.href = "https://www.google.com";

btnNext.appendChild(nextPage);
nextPage.click();
*/
