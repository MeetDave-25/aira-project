import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { getLiveProjects } from "./src/projectsData.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", async () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const projects = await getLiveProjects();

  const cards = document.querySelectorAll(".sticky-cards .card");
  cards.forEach((card, idx) => {
    if (projects[idx]) {
      const p = projects[idx];
      const titleEl = card.querySelector("h1");
      const eyebrowEl = card.querySelector("p");
      const imgEl = card.querySelector("img");
      const metaEl = card.querySelector(".card-meta");

      if (titleEl) titleEl.textContent = p.title;
      if (eyebrowEl) eyebrowEl.textContent = `${p.category.toUpperCase()} // ${p.code}`;
      if (imgEl) imgEl.src = p.cardImg || p.img;
      if (metaEl && p.techStack) {
        metaEl.innerHTML = p.techStack
          .map((t) => `<span class="meta-tag">${t}</span>`)
          .join("");
      }

      card.onclick = () => openModal(p);
    }
  });

  cards.forEach((card, i) => {
    gsap.set(card, {
      xPercent: -50,
      yPercent: -50 + i * 5,
      scale: 1 - i * 0.075,
    });
  });

  ScrollTrigger.create({
    trigger: ".sticky-cards",
    start: "top top",
    end: `+=${window.innerHeight * 6}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
  });
});

function openModal(p) {
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  document.getElementById("m-category").textContent = p.category;
  document.getElementById("m-title").textContent = p.title;
  document.getElementById("m-subtitle").textContent = p.subtitle;
  document.getElementById("m-desc").textContent = p.desc;
  document.getElementById("m-demo-btn").href = p.demoUrl || "#";
  document.getElementById("m-github-btn").href = p.githubUrl || "#";
  modal.style.display = "flex";
}

document.getElementById("modal-close")?.addEventListener("click", () => {
  const modal = document.getElementById("project-modal");
  if (modal) modal.style.display = "none";
});