const scheduleButtons = document.querySelectorAll("[data-day-target]");
const schedulePanels = document.querySelectorAll("[data-day-panel]");
const scrollButtons = document.querySelectorAll("[data-scroll]");
const voiceNext = document.getElementById("voiceNext");
const speechBubble = document.getElementById("speechBubble");
const characterCard = document.getElementById("characterCard");
const sparkles = document.getElementById("sparkles");
const mottoText = document.getElementById("mottoText");
const mottoMeta = document.getElementById("mottoMeta");
const mottoPrev = document.getElementById("mottoPrev");
const mottoNext = document.getElementById("mottoNext");

const speechLines = [
  "欢迎来到 2024级中药学4班，今天的猫娘主页已经进入营业状态。",
  "实验记录、课堂拍照、班会通知，宣传委员今天也在认真巡逻。",
  "把课表、活动和班级记忆收进这个页面，班级空间就不会只是一个白板。",
  "今天也要带着铃铛、笔记本和一点点元气，准时奔向下一节课。",
  "如果你准备换成真实照片和班委信息，这一版结构已经可以直接接住。"
];

const mottoItems = [
  {
    text: "认真上课，温柔生活，努力做一只懂本草的小猫。",
    meta: "值日提醒：实验课前检查实验服、记录册与分组名单。"
  },
  {
    text: "把每一页课堂笔记都写成未来专业能力的底稿。",
    meta: "学习提示：本周适合集中整理中药鉴定学标本特征。"
  },
  {
    text: "可爱是班级气质，踏实是专业底色，两样都不能丢。",
    meta: "空间提示：相册区替换成真实班级照片后，整体效果会更完整。"
  },
  {
    text: "愿我们在赶作业和赶路的时候，也保留彼此照顾的耐心。",
    meta: "部署提示：上传仓库后启用 GitHub Pages 即可直接上线。"
  }
];

let speechIndex = 0;
let mottoIndex = 0;

scheduleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.dayTarget;

    scheduleButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    schedulePanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.dayPanel === target);
    });
  });
});

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

function renderSpeech(index) {
  speechBubble.textContent = speechLines[index];
}

if (voiceNext) {
  voiceNext.addEventListener("click", () => {
    speechIndex = (speechIndex + 1) % speechLines.length;
    renderSpeech(speechIndex);
  });
}

function renderMotto(index) {
  const item = mottoItems[index];
  mottoText.textContent = item.text;
  mottoMeta.textContent = item.meta;
}

if (mottoPrev) {
  mottoPrev.addEventListener("click", () => {
    mottoIndex = (mottoIndex - 1 + mottoItems.length) % mottoItems.length;
    renderMotto(mottoIndex);
  });
}

if (mottoNext) {
  mottoNext.addEventListener("click", () => {
    mottoIndex = (mottoIndex + 1) % mottoItems.length;
    renderMotto(mottoIndex);
  });
}

window.setInterval(() => {
  mottoIndex = (mottoIndex + 1) % mottoItems.length;
  renderMotto(mottoIndex);
}, 5600);

if (sparkles) {
  const sparkleTokens = ["✦", "✦", "✧", "♡", "✦", "☆"];

  for (let i = 0; i < 14; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.textContent = sparkleTokens[i % sparkleTokens.length];
    sparkle.style.left = `${8 + Math.random() * 82}%`;
    sparkle.style.top = `${8 + Math.random() * 74}%`;
    sparkle.style.animationDelay = `${Math.random() * 5}s`;
    sparkles.appendChild(sparkle);
  }
}

if (characterCard && window.matchMedia("(pointer: fine)").matches) {
  characterCard.addEventListener("mousemove", (event) => {
    const rect = characterCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    characterCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  characterCard.addEventListener("mouseleave", () => {
    characterCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
