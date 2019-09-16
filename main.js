class CubeAnim {
  constructor(cubeEl, svgEl) {
    this.el = cubeEl;
    this.svg = svgEl;
    this.scaleY = 0;
    this.createAnimInterval = null;
    this.animationendCallback = null;
  }

  clearAnimClasses(el) {
    for (let animclass of el.srcElement.classList) {
      if (animclass.startsWith("cube--anim")) {
        el.classList.remove(animclass);
      }
    }
  }

  init() {
    this.el.addEventListener(
      "animationend",
      function(event) {
        this.animationendCallback();
      }.bind(this)
    );

    this.createAnim();
  }

  duplicate() {
    console.log("yo");
    let clone = this.el.cloneNode(true);
    //this.clearAnimClasses(clone);
    clone.classList.add("cube--anim--fall");
    this.svg.appendChild(clone);
  }

  cubeFallAnim() {
    this.el.classList.add("cube--anim--fall");
  }

  createAnim() {
    this.el.classList.add("cube--anim--create");
    this.animationendCallback = this.cubeFallAnim;
  }
}

function getEl(query, all = true) {
  let el = null;

  if (all) {
    el = document.querySelectorAll(query);
  } else {
    el = document.querySelector(query);
  }

  if (!el) {
    console.error(query + " can't be found - svg loading error");
    return null;
  }

  return el;
}

document.addEventListener("DOMContentLoaded", function(event) {
  let heaters = getEl(".heater");
  let cubeEl = getEl("#cube", false);
  let svgEl = getEl("svg", false);

  /* -- cube animation -- */
  let cubeAnim = new CubeAnim(cubeEl, svgEl);

  for (let heater of heaters) {
    heater.style.fill = "rgb(183,28,28)";
  }

  cubeAnim.init();

  window.setInterval(() => {
    cubeAnim.duplicate();
  }, 5000);
});
