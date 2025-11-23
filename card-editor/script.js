document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    pagination: { el: ".swiper-pagination" },
    observer: true,
    observeParents: true,
  });

  const imageInput = document.getElementById("imageInput");
  const textInput = document.getElementById("textInput");
  const fontSelect = document.getElementById("fontSelect");
  const colorPicker = document.getElementById("colorPicker");
  const fontSize = document.getElementById("fontSize");

  const addCardBtn = document.getElementById("addCardBtn");
  const addTextBtn = document.getElementById("addTextBtn");
  const removeCardBtn = document.getElementById("removeCardBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const printBtn = document.getElementById("printBtn");

  addCardBtn.addEventListener("click", () => {
    const file = imageInput.files[0];
    const message = textInput.value.trim();
    if (!message && !file) return;

    const card = document.createElement("div");
    card.className = "card";

    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.appendChild(card);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.className = "card-image";
        card.appendChild(img);
        if (message) addTextBlock(card, message);
        swiper.appendSlide(slide);
        swiper.update();
        swiper.slideTo(swiper.slides.length - 1);
      };
      reader.readAsDataURL(file);
    } else {
      if (message) addTextBlock(card, message);
      swiper.appendSlide(slide);
      swiper.update();
      swiper.slideTo(swiper.slides.length - 1);
    }
  });

  addTextBtn.addEventListener("click", () => {
    const message = textInput.value.trim();
    if (!message) return;
    const activeCard = document.querySelector(".swiper-slide-active .card");
    if (activeCard) addTextBlock(activeCard, message);
  });

  function addTextBlock(container, message) {
    const text = document.createElement("div");
    text.className = "card-text";
    text.contentEditable = true;
    text.innerText = message;
    text.style.fontFamily = fontSelect.value;
    text.style.color = colorPicker.value;
    text.style.fontSize = `${fontSize.value}px`;
    text.style.position = "absolute";
    text.style.left = "20px";
    text.style.top = "20px";
    text.style.cursor = "move";
    text.setAttribute("draggable", "false");
    makeDraggable(text);
    container.appendChild(text);
  }

  function makeDraggable(el) {
    let offsetX = 0,
      offsetY = 0,
      isDragging = false;

    el.addEventListener("mousedown", (e) => {
      if (document.activeElement === el) return;
      e.preventDefault();
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.userSelect = "";
    });

    el.addEventListener("blur", () => {
      const clean = el.innerText.replace(/\u200B/g, "").trim();
      if (clean === "") {
        el.innerText = "Type your message…";
        el.style.opacity = "0.5";
      } else {
        el.style.opacity = "1";
      }
    });

    el.addEventListener("dblclick", () => {
      el.remove();
    });
  }

  removeCardBtn.addEventListener("click", () => {
    const activeSlide = document.querySelector(".swiper-slide-active");
    if (activeSlide) {
      activeSlide.remove();
      swiper.update();
    }
  });

  downloadBtn.addEventListener("click", () => {
    const activeCard = document.querySelector(".swiper-slide-active .card");
    if (!activeCard) return;
    html2canvas(activeCard).then((canvas) => {
      const link = document.createElement("a");
      link.download = "wedding-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });

  printBtn.addEventListener("click", () => {
    const activeCard = document.querySelector(".swiper-slide-active .card");
    if (!activeCard) return;

    const image = activeCard.querySelector("img");
    const textBlocks = activeCard.querySelectorAll(".card-text");

    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Print Card</title>
          <style>
            body { margin: 0; position: relative; }
            .card-text { position: absolute; z-index: 1; white-space: pre-wrap; }
            img { width: 100%; display: block; }
          </style>
        </head>
        <body>
          ${image ? `<img src="${image.src}" />` : ""}
          ${Array.from(textBlocks)
            .map((el) => el.outerHTML)
            .join("")}
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  });
});
