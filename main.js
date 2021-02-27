function escapeHtmlString(htmlStr) {
  return htmlStr
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
const fetchHtml = async () => {
  try {
    const response = await fetch("./index.html");
    if (response.status !== 200) {
      throw response;
    }
    let data = await response.text();
    data = escapeHtmlString(data);
    document.getElementById(
      "html-code-showcase",
    ).innerHTML = `<pre><code>${data}</code></pre>`;
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const fetchStyles = async () => {
  try {
    const response = await fetch("./styles/styles.scss");
    if (response.status !== 200) {
      throw response;
    }
    let data = await response.text();
    data = escapeHtmlString(data);
    document.getElementById(
      "css-code-showcase",
    ).innerHTML = `<pre><code>${data}</code></pre>`;
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const fetchMain = async () => {
  try {
    const response = await fetch("./main.js");
    if (response.status !== 200) {
      throw response;
    }
    let data = await response.text();
    data = escapeHtmlString(data);
    document.getElementById(
      "main-code-showcase",
    ).innerHTML = `<pre><code>${data}</code></pre>`;
    return data;
  } catch (err) {
    console.log("error", err);
  }
};
Promise.all([fetchHtml(), fetchStyles(), fetchMain()]).then((data) => {
  console.log(data);
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightBlock(block);
  });
});
// let htmlCodeLoaded = false;
// let stylesCodeLoaded = false;
// let mainCodeLoaded = false;

// document
//   .getElementById("go-to-index-btn")
//   .addEventListener("click", async () => {
//     if (!htmlCodeLoaded) {
//       fetchHtml();
//       htmlCodeLoaded = true;
//     }
//   });
// document
//   .getElementById("go-to-styles-btn")
//   .addEventListener("click", async () => {
//     if (!stylesCodeLoaded) {
//       fetchStyles();
//       stylesCodeLoaded = true;
//     }
//   });
// document
//   .getElementById("go-to-main-btn")
//   .addEventListener("click", async () => {
//     if (!mainCodeLoaded) {
//       fetchMain();
//       mainCodeLoaded = true;
//     }
//   });
