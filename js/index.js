function init() {
    import("./header-nav.js");
    import("./main.js");
    import("./dropdown-toggle.js");
    import("./character.js");
  }
  
  const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
  ).length;
  let loadedPartialsCount = 0;
  
  document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) {
      init();
    }
  });
  