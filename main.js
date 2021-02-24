function escapeHtmlString(htmlStr) {
  return htmlStr
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
//TODO bind these to the butttons and make it DRYer

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
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const fetchCSS = async () => {
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
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const fetchJS = async () => {
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
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

fetchHtml();
fetchCSS();
fetchJS();
