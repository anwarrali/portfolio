

document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".skills-bar .bar");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const bar = entry.target;
        if (entry.isIntersecting) {
          const width = bar.getAttribute("data-width");
          bar.style.width = width;
        } else {
          bar.style.width = "0%";
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach((bar) => {
    observer.observe(bar);
  });
});

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
function createLanguageBar(containerId, language, levelText, percent) {
  const container = document.querySelector(containerId);

  const bar = new ProgressBar.SemiCircle(container, {
    strokeWidth: 6,
    color: "#bfaad0",
    trailColor: "#55376bff",
    trailWidth: 1,
    easing: "easeInOut",
    duration: 1400,
    svgStyle: null,
    text: {
      value: "",
      alignToBottom: false,
    },
    from: { color: "#8882b5" },
    to: { color: "#bfaad0" },
    step: (state, bar) => {
      bar.path.setAttribute("stroke", state.color);
      const value = Math.round(bar.value() * 100);
      if (value === 0) {
        bar.setText("");
      } else {
        bar.setText(
          `<div style="font-size:1.2rem;">${language}</div>` +
            `<div style="font-size:0.9rem;">${levelText}</div>` +
            `<div style="font-size:1rem;">${value}%</div>`
        );
      }
      bar.text.style.color = "#bfaad0";
    },
  });

  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.textAlign = "center";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bar.set(0);
          bar.animate(percent);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(container);
}

createLanguageBar("#language-english", "English", "Advanced", 0.65);
createLanguageBar("#language-arabic", "Arabic", "Native", 1.0);
createLanguageBar("#language-turkish", "Turkish", "Advanced", 0.75);

const cards = document.querySelectorAll(".soft, .hard, .cert");

let flippedCard = null;

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (flippedCard && flippedCard !== card) {
      flippedCard.classList.remove("flipped");
    }

    card.classList.toggle("flipped");

    flippedCard = card.classList.contains("flipped") ? card : null;
  });
});

  const glow = document.getElementById("magic-glow");

  document.addEventListener("mousemove", (e) => {
    glow.style.top = `${e.clientY}px`;
    glow.style.left = `${e.clientX}px`;
  });

