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
  // todo
});
