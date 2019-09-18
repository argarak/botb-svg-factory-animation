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

let colours = [
  "#f44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#9E9E9E",
  "#607D8B"
];

function randomint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setColour(hex) {
  let indicator = getEl("#sprayColourIndicator", false);
  console.log(indicator);
  indicator.style.fill = hex;

  // max up value for each slider is 50 cy
  // lowest down value for each slider is 63 cy

  let rgb = [
    parseInt(hex.substring(1, 3), 16),
    parseInt(hex.substring(3, 5), 16),
    parseInt(hex.substring(5, 7), 16)
  ];

  let values = [
    rgb[0] * ((50 - 63) / 255) + 63,
    rgb[1] * ((50 - 63) / 255) + 63,
    rgb[2] * ((50 - 63) / 255) + 63
  ];

  let sliders = [
    getEl("#redSlider", false),
    getEl("#greenSlider", false),
    getEl("#blueSlider", false)
  ];

  for (let i = 0; i < sliders.length; i++) {
    sliders[i].style.cy = values[i];
  }
}

let currColour = "";

document.addEventListener("DOMContentLoaded", function(event) {
  // set initial random colour
  currColour = colours[randomint(0, 18)];
  setColour(currColour);

  let cube = getEl("#cube", false);

  let sprayToolHead = getEl("#sprayToolHead", false);
  sprayToolHead.addEventListener("animationend", function() {
    currColour = colours[randomint(0, 18)];
    setColour(currColour);
  });

  let spray = getEl("#spray", false);
  spray.addEventListener("animationstart", function() {
    cube.style.fill = currColour;
    spray.style.fill = currColour;
  });

  cube.addEventListener("");
});
