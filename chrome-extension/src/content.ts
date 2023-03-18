document.addEventListener("input", function (e) {
  const target = e.target as Element;
  if (target.matches('input[type="search"], input[type="text"]')) {
    console.log("User typed: " + target);
  }

  console.log("Typing");
});
