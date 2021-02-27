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
    console.log("error", err);
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
  //console.log(data, nodes);
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightBlock(block);
  });
});
