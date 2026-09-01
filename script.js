const translations = {
  pt: {
    navWork: "Projetos",
    navSystems: "Sistemas",
    navExperience: "Experiência",
    navStack: "Stack",
    navWriting: "Escrita",
    heroKicker: "Software Engineer · Applied AI · Data Infrastructure",
    heroLead: "Desenvolvo sistemas de IA aplicada, backend e infraestrutura de dados com foco em soluções confiáveis, escaláveis e auditáveis.",
    heroProjects: "Ver projetos",
    heroCv: "Download CV",
    buildKicker: "What I Build",
    buildTitle: "Sistemas que conectam IA, dados e produto.",
    workKicker: "Selected Work",
    workTitle: "Projetos apresentados como decisões de engenharia.",
    expKicker: "Experience",
    expTitle: "Trajetória em software, IA e pesquisa aplicada."
  },
  en: {
    navWork: "Work",
    navSystems: "Systems",
    navExperience: "Experience",
    navStack: "Stack",
    navWriting: "Writing",
    heroKicker: "Software Engineer · Applied AI · Data Infrastructure",
    heroLead: "I build applied AI, backend and data infrastructure systems focused on reliability, scalability and auditability.",
    heroProjects: "View projects",
    heroCv: "Download CV",
    buildKicker: "What I Build",
    buildTitle: "Systems that connect AI, data and product.",
    workKicker: "Selected Work",
    workTitle: "Projects framed as engineering decisions.",
    expKicker: "Experience",
    expTitle: "A path through software, AI and applied research."
  }
};

const nodeContent = {
  "DATA": "Structured and unstructured sources prepared for retrieval, analysis and product workflows.",
  "PIPELINES": "Ingestion, cleaning and transformation steps that make downstream systems dependable.",
  "BACKEND": "APIs, domain logic and integration layers built for maintainability.",
  "AI / RAG": "Retrieval, prompting, evaluation and model orchestration around real knowledge.",
  "APPLICATION": "Interfaces that turn technical capability into usable software."
};

const ragContent = {
  documents: ["Documents", "Private files, articles, policies or records define the knowledge boundary before any model is involved."],
  chunking: ["Chunking", "Documents are divided into semantic units so retrieval can be precise instead of noisy."],
  embeddings: ["Embeddings", "Text is transformed into vector representations that preserve meaning for search."],
  retrieval: ["Retrieval", "The system selects the most relevant context before asking the model to generate."],
  llm: ["LLM", "The model answers using retrieved evidence, not only its pretraining memory."],
  audit: ["Audit", "Sources, traces and evaluation loops make the system safer to operate."]
};

const techGroups = {
  Languages: {
    Python: "Used in: AI services, ETL, automation, RAG experiments.",
    Java: "Used in: backend services, Spring Boot systems, delivery work.",
    SQL: "Used in: PostgreSQL modeling, analytics and retrieval workflows.",
    TypeScript: "Used in: web interfaces, typed frontends and product surfaces."
  },
  Backend: {
    FastAPI: "Used in: MLKD Research Platform, AI service APIs.",
    Flask: "Used in: lightweight web APIs and prototypes.",
    "Spring Boot": "Used in: Java backend services and institutional systems.",
    REST: "Used in: integration contracts across product and data services."
  },
  AI: {
    RAG: "Used in: Sovereign AI, MLKD Research Platform, CIIA training.",
    LangChain: "Used in: retrieval and LLM application experiments.",
    LiteLLM: "Used in: provider abstraction and AI service orchestration.",
    Ollama: "Used in: local model workflows and sovereign AI prototypes.",
    PyTorch: "Used in: machine learning study and applied AI experiments.",
    TensorFlow: "Used in: model experimentation and AI fundamentals."
  },
  Data: {
    PostgreSQL: "Used in: product databases, research platforms and structured data.",
    pgvector: "Used in: semantic search and vector retrieval.",
    Kafka: "Used in: event-driven pipelines and distributed communication.",
    ETL: "Used in: ingestion, transformation and reporting pipelines.",
    "Power BI": "Used in: dashboards and decision-support views."
  },
  Engineering: {
    Git: "Used in: version control, collaboration and review workflows.",
    GitHub: "Used in: portfolio, repositories and project delivery.",
    Docker: "Used in: reproducible services and local infrastructure.",
    Linux: "Used in: deployment, scripting and development environments."
  }
};

const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const langToggle = document.querySelector("[data-lang-toggle]");
const themeToggle = document.querySelector("[data-theme-toggle]");

if (year) year.textContent = new Date().getFullYear();

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
});

let currentLang = "pt";
langToggle?.addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";
  document.documentElement.lang = currentLang === "pt" ? "pt-BR" : "en";
  langToggle.textContent = currentLang === "pt" ? "EN" : "PT";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[currentLang][key]) node.textContent = translations[currentLang][key];
  });
});

document.querySelectorAll("[data-node]").forEach((button) => {
  button.addEventListener("mouseenter", () => setNode(button));
  button.addEventListener("focus", () => setNode(button));
  button.addEventListener("click", () => setNode(button));
});

function setNode(button) {
  const title = button.dataset.node;
  document.querySelectorAll("[data-node]").forEach((node) => node.classList.remove("active"));
  button.classList.add("active");
  document.querySelector("[data-node-title]").textContent = title;
  document.querySelector("[data-node-copy]").textContent = nodeContent[title];
}

document.querySelectorAll("[data-case-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".case-card");
    document.querySelectorAll(".case-card").forEach((item) => {
      if (item !== card) item.classList.remove("is-open");
    });
    card.classList.toggle("is-open");
  });
});

document.querySelectorAll("[data-rag]").forEach((button) => {
  button.addEventListener("click", () => {
    const [title, copy] = ragContent[button.dataset.rag];
    document.querySelectorAll("[data-rag]").forEach((step) => step.classList.remove("active"));
    button.classList.add("active");
    document.querySelector("[data-rag-title]").textContent = title;
    document.querySelector("[data-rag-copy]").textContent = copy;
  });
});

const techList = document.querySelector("[data-tech-list]");
if (techList) {
  Object.entries(techGroups).forEach(([group, items]) => {
    const section = document.createElement("section");
    section.className = "tech-group";
    section.innerHTML = `<h3>${group}</h3><div class="tech-chips"></div>`;
    const chips = section.querySelector(".tech-chips");
    Object.entries(items).forEach(([name, copy]) => {
      const chip = document.createElement("button");
      chip.className = "tech-chip";
      chip.type = "button";
      chip.textContent = name;
      chip.addEventListener("click", () => {
        document.querySelectorAll(".tech-chip").forEach((item) => item.classList.remove("active"));
        chip.classList.add("active");
        document.querySelector("[data-tech-title]").textContent = name;
        document.querySelector("[data-tech-copy]").textContent = copy;
      });
      if (name === "RAG") chip.classList.add("active");
      chips.appendChild(chip);
    });
    techList.appendChild(section);
  });
}

const repoGrid = document.querySelector("[data-repos]");
if (repoGrid) {
  fetch("https://api.github.com/users/enoGuarana/repos?sort=updated&per_page=12")
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("GitHub API error")))
    .then((repos) => {
      const selected = repos
        .filter((repo) => !repo.fork && !/teste|test|hello/i.test(repo.name))
        .slice(0, 6);
      repoGrid.innerHTML = selected.length ? "" : "<p class='muted'>No public repositories found.</p>";
      selected.forEach((repo) => {
        const card = document.createElement("a");
        card.className = "repo-card";
        card.href = repo.html_url;
        card.target = "_blank";
        card.rel = "noreferrer";
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "Public repository by João Enomoto."}</p>
          <span class="repo-meta">${repo.language || "Code"} · ★ ${repo.stargazers_count} · Updated ${new Date(repo.updated_at).toLocaleDateString("en-US")}</span>
        `;
        repoGrid.appendChild(card);
      });
    })
    .catch(() => {
      repoGrid.innerHTML = "<p class='muted'>GitHub repositories could not be loaded right now. Visit github.com/enoGuarana.</p>";
    });
}
