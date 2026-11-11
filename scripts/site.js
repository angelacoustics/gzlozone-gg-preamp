document.addEventListener("DOMContentLoaded", () => {
  if (window.mermaid) {
    window.mermaid.initialize({
      startOnLoad: true,
      theme: "neutral",
      securityLevel: "loose",
    });
  }
});
