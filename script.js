import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { getProjects, fetchProjectsFromDB, addProjectToDB, checkDBStatus, getLiveProjects } from "./src/projectsData.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Smooth scroll setup (Lenis + GSAP ticker)
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Fetch projects live from Database API
  let allProjects = await getLiveProjects();

  // 3. Sticky Cards Deck Setup
  const cards = document.querySelectorAll(".sticky-cards .card");
  const totalCards = cards.length;
  const segmentSize = 1 / totalCards;
  const cardYOffset = 5;
  const cardScaleStep = 0.075;

  function updateStickyCards() {
    cards.forEach((card, idx) => {
      if (allProjects[idx]) {
        const p = allProjects[idx];
        const titleEl = card.querySelector("h1");
        const eyebrowEl = card.querySelector("p");
        const imgEl = card.querySelector("img");
        if (titleEl) titleEl.textContent = p.title;
        if (eyebrowEl) eyebrowEl.textContent = `${p.subtitle || 'AIRA LAB PROJECT'} // ${p.code}`;
        if (imgEl) imgEl.src = p.cardImg || p.img;

        card.onclick = () => openProjectModal(p);
      }
    });
  }

  // Initial sticky cards population
  updateStickyCards();

  // Initial fanned stack pose
  cards.forEach((card, i) => {
    gsap.set(card, {
      xPercent: -50,
      yPercent: -50 + i * cardYOffset,
      scale: 1 - i * cardScaleStep,
    });
  });

  // ScrollTrigger pinning sticky cards deck
  ScrollTrigger.create({
    trigger: ".sticky-cards",
    start: "top top",
    end: `+=${window.innerHeight * 8}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const activeIndex = Math.min(Math.floor(progress / segmentSize), totalCards - 1);
      const segProgress = (progress - activeIndex * segmentSize) / segmentSize;

      cards.forEach((card, i) => {
        if (i < activeIndex) {
          gsap.set(card, { yPercent: -250, rotationX: 35 });
        } else if (i === activeIndex) {
          gsap.set(card, {
            yPercent: gsap.utils.interpolate(-50, -200, segProgress),
            rotationX: gsap.utils.interpolate(0, 35, segProgress),
            scale: 1,
          });
        } else {
          const behindIndex = i - activeIndex;
          const currentYOffset = (behindIndex - segProgress) * cardYOffset;
          const currentScale = 1 - (behindIndex - segProgress) * cardScaleStep;
          gsap.set(card, {
            yPercent: -50 + currentYOffset,
            rotationX: 0,
            scale: currentScale,
          });
        }
      });
    },
  });

  // 4. Project Archive Grid Renderer
  const projectsGrid = document.getElementById("projects-grid");
  let activeCategory = "all";
  let searchQuery = "";

  function filterProjects() {
    return allProjects.filter((p) => {
      const matchCat = activeCategory === "all" || (p.category && p.category.toLowerCase().includes(activeCategory.toLowerCase()));
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.desc && p.desc.toLowerCase().includes(q)) ||
        (p.techStack && p.techStack.some((t) => t.toLowerCase().includes(q)));
      return matchCat && matchSearch;
    });
  }

  function renderArchiveGrid() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = "";
    const filteredList = filterProjects();

    if (filteredList.length === 0) {
      projectsGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; opacity: 0.6;">
        <p class="mono">No matching projects found in archive.</p>
      </div>`;
      return;
    }

    filteredList.forEach((project) => {
      const card = document.createElement("div");
      card.className = "grid-card";
      card.onclick = () => openProjectModal(project);

      const techTagsHtml = (project.techStack || [])
        .slice(0, 3)
        .map((t) => `<span>${t}</span>`)
        .join("");

      card.innerHTML = `
        <div class="card-thumb">
          <img src="${project.img}" alt="${project.title}" loading="lazy" />
          <span class="card-status-badge">${project.status || 'DEPLOYED'}</span>
        </div>
        <div class="card-body">
          <div>
            <div class="card-code">${project.code} // ${(project.category || 'AIRA').toUpperCase()}</div>
            <h3 class="card-title">${project.title}</h3>
            <p class="card-desc">${project.desc}</p>
          </div>
          <div class="card-footer-row">
            <div class="card-tags">${techTagsHtml}</div>
            <span class="card-action">View Specs ↗</span>
          </div>
        </div>
      `;

      projectsGrid.appendChild(card);
    });
  }

  // 5. Category & Search Event Listeners
  document.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.cat;
      renderArchiveGrid();
    });
  });

  const searchInput = document.getElementById("archive-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderArchiveGrid();
    });
  }

  // 6. Project Details Modal Engine
  const projectModal = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  function openProjectModal(project) {
    if (!projectModal) return;

    document.getElementById("m-code").textContent = project.code || "FR 01";
    document.getElementById("m-category").textContent = project.category || "Research";
    document.getElementById("m-status").textContent = project.status || "DEPLOYED";
    document.getElementById("m-title").textContent = project.title;
    document.getElementById("m-subtitle").textContent = project.subtitle || "System Architecture & Specs";
    document.getElementById("m-img").src = project.img;
    document.getElementById("m-author").textContent = `Lead: ${project.author || 'AiRA Laboratory'}`;
    document.getElementById("m-desc").textContent = project.desc;

    // Metrics
    const m = project.metrics || {};
    document.getElementById("m-fps").textContent = m.fps || "240 FPS";
    document.getElementById("m-latency").textContent = m.latency || "1.2 ms";
    document.getElementById("m-accuracy").textContent = m.accuracy || "99.4%";
    document.getElementById("m-precision").textContent = m.precision || "0.1 mm";

    // Tech Stack
    const techContainer = document.getElementById("m-tech");
    techContainer.innerHTML = "";
    (project.techStack || []).forEach((t) => {
      const chip = document.createElement("span");
      chip.textContent = t;
      techContainer.appendChild(chip);
    });

    // Links
    document.getElementById("m-demo-btn").href = project.demoUrl || "https://aira-lab.in";
    document.getElementById("m-github-btn").href = project.githubUrl || "https://github.com/MeetDave-25/AiRA";
    document.getElementById("m-paper-btn").href = project.paperUrl || "https://aira-lab.in";

    projectModal.classList.add("is-open");
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      if (projectModal) projectModal.classList.remove("is-open");
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (projectModal) projectModal.classList.remove("is-open");
      if (addModal) addModal.classList.remove("is-open");
    }
  });

  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) projectModal.classList.remove("is-open");
    });
  }

  // 7. Live Neon PostgreSQL Integration Status
  const dbStatusPill = document.getElementById("db-status-pill");
  const dbStatusText = document.getElementById("db-status-text");

  async function syncDBStatus() {
    const status = await checkDBStatus();
    if (dbStatusPill && dbStatusText) {
      if (status.connected) {
        dbStatusPill.classList.remove("offline");
        dbStatusPill.classList.add("online");
        dbStatusText.textContent = `NEON POSTGRES (${status.latencyMs}ms)`;
        dbStatusPill.title = `Connected to ${status.provider} (${status.database}) — ${status.totalProjects} total projects in DB`;
      } else {
        dbStatusPill.classList.remove("online");
        dbStatusPill.classList.add("offline");
        dbStatusText.textContent = `NEON DB (Offline)`;
      }
    }
  }

  // 8. Add Project to PostgreSQL Modal & Form Logic
  const addModal = document.getElementById("add-project-modal");
  const openAddModalBtn = document.getElementById("open-add-modal-btn");
  const addModalCloseBtn = document.getElementById("add-modal-close-btn");
  const addModalCancelBtn = document.getElementById("add-modal-cancel-btn");
  const addProjectForm = document.getElementById("add-project-form");
  const addSubmitBtn = document.getElementById("add-submit-btn");

  if (openAddModalBtn && addModal) {
    openAddModalBtn.addEventListener("click", () => {
      addModal.classList.add("is-open");
    });
  }

  function closeAddModal() {
    if (addModal) addModal.classList.remove("is-open");
  }

  if (addModalCloseBtn) addModalCloseBtn.addEventListener("click", closeAddModal);
  if (addModalCancelBtn) addModalCancelBtn.addEventListener("click", closeAddModal);

  if (addModal) {
    addModal.addEventListener("click", (e) => {
      if (e.target === addModal) closeAddModal();
    });
  }

  if (addProjectForm) {
    addProjectForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const newProj = {
        title: document.getElementById("f-title").value,
        subtitle: document.getElementById("f-subtitle").value,
        category: document.getElementById("f-category").value,
        author: document.getElementById("f-author").value,
        desc: document.getElementById("f-desc").value,
        img: document.getElementById("f-img").value || "/c/3d-circular-img-gallery/img1.jpg",
        techStack: document.getElementById("f-tech").value,
        metrics: {
          fps: document.getElementById("f-fps").value || "120 FPS",
          latency: document.getElementById("f-latency").value || "2.0 ms",
          accuracy: document.getElementById("f-accuracy").value || "99.0%",
          precision: document.getElementById("f-precision").value || "Sub-mm"
        }
      };

      if (addSubmitBtn) {
        addSubmitBtn.disabled = true;
        addSubmitBtn.textContent = "⏳ Saving to Neon PostgreSQL...";
      }

      try {
        const updatedProjects = await addProjectToDB(newProj);
        if (updatedProjects) {
          allProjects = updatedProjects;
          updateStickyCards();
          renderArchiveGrid();
        }
        addProjectForm.reset();
        closeAddModal();
        await syncDBStatus();
      } catch (err) {
        alert("Failed to save project to PostgreSQL database: " + err.message);
      } finally {
        if (addSubmitBtn) {
          addSubmitBtn.disabled = false;
          addSubmitBtn.textContent = "💾 Save to Neon Database";
        }
      }
    });
  }

  // Initializations
  renderArchiveGrid();
  syncDBStatus();
  setInterval(syncDBStatus, 15000);
});
