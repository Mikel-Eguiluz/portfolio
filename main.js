function escapeHtmlString(htmlStr) {
  return htmlStr
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const fetchSource = async (endPoint) => {
  try {
    const response = await fetch(endPoint);
    if (response.status !== 200) {
      throw response;
    }
    let data = await response.text();
    data = escapeHtmlString(data);
    return data;
  } catch (err) {
    alert("error: " + err);
  }
};
Promise.all([
  fetchSource("./index.html"),
  fetchSource("./styles/styles.scss"),
  fetchSource("./main.js"),
]).then((data) => {
  const nodes = document.querySelectorAll(".source-code");
  nodes.forEach((node, index) => {
    node.innerHTML = `<pre><code>${data[index]}</code></pre>`;
  });
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightBlock(block);
  });
});

/***********************************************************
 ********Makes key press on label work as clicks************
 **********************************************************/

const sidebarBtns = document.querySelectorAll(`.sidebar label[tabindex="0"]`);
console.log(sidebarBtns);
for (const btn of sidebarBtns) {
  btn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.target.click();
    }
  });
}

/*******************************
 ********Tab order fix**********
 ******************************/

const cssSectionAnchors = document.querySelectorAll(`div.back-face a`);
const jsSectionAnchors = document.querySelectorAll(`div.top-face a`);

const cube = document.querySelector(`main.content-wrapper`);
cube.addEventListener("transitionstart", () => {
  for (const a of cssSectionAnchors) {
    a.tabIndex = -1;
  }
  for (const a of jsSectionAnchors) {
    a.tabIndex = -1;
  }
  if (document.getElementById("back-face-check").checked) {
    for (const a of cssSectionAnchors) {
      a.tabIndex = 0;
    }
  }
  if (document.getElementById("top-face-check").checked) {
    for (const a of jsSectionAnchors) {
      a.tabIndex = 0;
    }
  }
});
