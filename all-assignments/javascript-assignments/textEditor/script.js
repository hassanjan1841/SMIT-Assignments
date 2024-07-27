document.addEventListener("DOMContentLoaded", function () {
  const boldButton = document.getElementById("bold-btn");
  const italicButton = document.getElementById("italic-btn");
  const underlineButton = document.getElementById("underline-btn");
  const colorPicker = document.getElementById("color-picker");
  const fontSizeSelect = document.getElementById("font-size");
  const undoButton = document.getElementById("undo-btn");
  const redoButton = document.getElementById("redo-btn");
  const alignmentSelect = document.getElementById("alignment");
  const listUlButton = document.getElementById("list-ul-btn");
  const listOlButton = document.getElementById("list-ol-btn");
  const editor = document.getElementById("editor");

  boldButton.addEventListener("click", function () {
    document.execCommand("bold");
  });

  italicButton.addEventListener("click", function () {
    document.execCommand("italic");
  });

  underlineButton.addEventListener("click", function () {
    document.execCommand("underline");
  });

  colorPicker.addEventListener("input", function () {
    const color = colorPicker.value;
    document.execCommand("foreColor", false, color);
  });

  fontSizeSelect.addEventListener("change", function () {
    const fontSize = fontSizeSelect.value;
    document.execCommand("fontSize", false, fontSize);
  });

  undoButton.addEventListener("click", function () {
    document.execCommand("undo");
  });

  redoButton.addEventListener("click", function () {
    document.execCommand("redo");
  });

  alignmentSelect.addEventListener("change", function () {
    const alignment = alignmentSelect.value;
    document.execCommand("justify" + alignment);
  });

  listUlButton.addEventListener("click", function () {
    document.execCommand("insertUnorderedList");
  });

  listOlButton.addEventListener("click", function () {
    document.execCommand("insertOrderedList");
  });
});
