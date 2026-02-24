// note : skills data after line 100
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
    { threshold: 0.5 },
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
            `<div style="font-size:1rem;">${value}%</div>`,
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
    { threshold: 0.5 },
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

// Skills data
const skillCategories = {
  frontend: {
    title: "Frontend Development",
    skills: [
      { name: "HTML5/CSS3", percentage: 90 },
      { name: "JavaScript (ES6+)", percentage: 85 },
      { name: "Tailwind CSS", percentage: 50 },
      { name: "Responsive Design", percentage: 88 },
      { name: "Flutter UI Development", percentage: 60 },
      { name: "Javafx", percentage: 85 },
    ],
  },
  backend: {
    title: "Backend Development",
    skills: [
      { name: "Java", percentage: 75 },
      { name: "Python FastAPI", percentage: 70 },
      { name: "RESTful APIs", percentage: 85 },
      { name: "Node.js", percentage: 75 },
      { name: "Docker Containerization", percentage: 60 },
    ],
  },
  database: {
    title: "Database & Migrations",
    skills: [
      { name: "Oracle Database", percentage: 80 },
      { name: "PostgreSQL", percentage: 70 },
      { name: "Alembic Migrations", percentage: 65 },
    ],
  },
  hardware: {
    title: "Hardware & IoT",
    skills: [
      { name: "Arduino Development", percentage: 92 },
      { name: "ESP32 & IoT", percentage: 85 },
      { name: "Circuit Design", percentage: 85 },
      { name: "Embedded Systems", percentage: 80 },
    ],
  },
  architecture: {
    title: "Architecture & Patterns",
    skills: [
      { name: "MVVM Architecture", percentage: 60 },
      { name: "MVC Pattern", percentage: 85 },
      { name: "State Management", percentage: 60 },
    ],
  },
};

// Load skills function
function loadSkills(category = "all") {
  const wrapper = document.querySelector(".skills-wrapper");
  if (!wrapper) return;

  wrapper.innerHTML = "";

  if (category === "all") {
    Object.values(skillCategories).forEach((cat) => {
      wrapper.appendChild(createCategorySection(cat));
    });
  } else {
    wrapper.appendChild(createCategorySection(skillCategories[category]));
  }

  setTimeout(animateSkills, 200);
}

function createCategorySection(category) {
  const section = document.createElement("div");
  section.className = "skill-category";

  const title = document.createElement("h3");
  title.textContent = category.title;

  const list = document.createElement("ul");
  list.className = "skills-list";

  category.skills.forEach((skill) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h5>${skill.name}</h5>
      <div class="skills-bar">
        <div class="bar" style="width: 0%" data-percent="${skill.percentage}"></div>
      </div>
      <span class="skill-percent-fixed">${skill.percentage}%</span>
    `;

    list.appendChild(li);
  });

  section.appendChild(title);
  section.appendChild(list);

  return section;
}

function animateSkills() {
  const bars = document.querySelectorAll(".skills-list .bar");
  bars.forEach((bar) => {
    const percent = bar.getAttribute("data-percent");
    setTimeout(() => {
      bar.style.width = percent + "%";
    }, 100);
  });
}

function animateSkills() {
  const bars = document.querySelectorAll(".skills-list .bar");
  bars.forEach((bar) => {
    const percent = bar.getAttribute("data-percent");
    setTimeout(() => {
      bar.style.width = percent + "%";
    }, 100);
  });
}

function initCategoryTabs() {
  const tabs = document.querySelectorAll(".category-btn");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));

      tab.classList.add("active");

      const category = tab.getAttribute("data-category");
      loadSkills(category);
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll(".bar");
        bars.forEach((bar) => {
          bar.style.width = "0%";
        });

        setTimeout(() => {
          bars.forEach((bar) => {
            const percent = bar.getAttribute("data-percent");
            bar.style.width = percent + "%";
          });
        }, 100);
      }
    });
  },
  { threshold: 0.3 },
);

document.addEventListener("DOMContentLoaded", () => {
  loadSkills("all");
  initCategoryTabs();

  const wrapper = document.querySelector(".skills-wrapper");
  if (wrapper) {
    observer.observe(wrapper);
  }
});
