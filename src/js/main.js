import i18next from "./i18n.js";

import { carregarFaixas } from './lastfm-tracks.js';

let currentMediaIndex = 0;
let currentMediaList = [];

const darkColors = [
  'bg-[#b6f0f8]', 'bg-[#f8d49d]', 'bg-[#e0a9af]', 'bg-[#ce9696]',
  'bg-[#ebc1f1]', 'bg-[#ffcfd6]', 'bg-[#b2e7e5]', 'bg-[#c4f5c8]',
  'bg-[#d5c2f0]', 'bg-[#bde3ff]', 'bg-[#acd5e7]', 'bg-[#d7f5b4]',
  'bg-[#fff7a3]', 'bg-[#fae59f]', 'bg-[#fad79f]', 'bg-[#f8c1bb]',
  'bg-[#ecc2ae]', 'bg-[#e0bcbc]', 'bg-[#b0d5ee]', 'bg-[#d49090]',
];

const lightColors = [
  'bg-[#BF360C]', 'bg-[#880E4F]', 'bg-[#1B5E20]', 'bg-[#311B92]',
  'bg-[#E65100]', 'bg-[#01579B]', 'bg-[#006064]', 'bg-[#004D40]',
  'bg-[#4A148C]', 'bg-[#33691E]', 'bg-[#F57F17]', 'bg-[#212121]',
  'bg-[#B71C1C]', 'bg-[#0D47A1]', 'bg-[#3E2723]', 'bg-[#FF6F00]',
  'bg-[#263238]', 'bg-[#1C1C1C]', 'bg-[#880E4F]', 'bg-[#4A148C]',
];

let colors = [];
const courseTypeCount = {};

function getColorsByTheme(theme) {
  return theme === "dark" ? darkColors : lightColors;
}

function applyColors() {
  const elements = document.querySelectorAll(".dynamic-color");
  elements.forEach((el, index) => {
    el.className = el.className.replace(/bg-\[#\w+\]/g, ""); // Remove classes bg antigas
    el.classList.add(colors[index % colors.length]); // Adiciona nova cor
  });
}

const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");

function setTheme(theme) {
  if (theme === "dark") {
      document.documentElement.classList.add("dark");
      moonIcon.classList.remove("hidden");
      sunIcon.classList.add("hidden");
  } else {
      document.documentElement.classList.remove("dark");
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
  }
  localStorage.setItem("theme", theme);
  colors = getColorsByTheme(theme);
  applyColors();
}

// Inicialização do tema com base no localStorage
const savedTheme = localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

setTheme(savedTheme);

// Alternância de tema ao clicar no botão
themeToggle.addEventListener("click", () => {
  const newTheme = document.documentElement.classList.contains("dark")
  ? "light"
  : "dark";
  setTheme(newTheme);
});

async function loadTexts() {
  try {
    // Carrega novamente as traduções no idioma atual
    i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0];
    
    document.getElementById("id-do-inicio").textContent = etc.inicio;
    document.getElementById("id-do-sobre").textContent = etc.sobre;
    document.getElementById("id-do-form").textContent = etc.formacao;
    document.getElementById("id-do-exp").textContent = etc.experiencia;
    document.getElementById("id-do-cur").textContent = etc.cursos;
    document.getElementById("id-do-proj").textContent = etc.projetos;
    document.getElementById("id-do-mais").textContent = etc.mais;
    document.getElementById("id-do-other").textContent = etc.ouprojetos;
    document.getElementById("id-do-contact").textContent = etc.contato;
  } catch (error) {
    console.error("Error loading Texts:", error);
  }
}



// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu');
const sidebar = document.querySelector('.sidebar');

mobileMenuButton.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Highlight active section in sidebar
const highlightActiveSection = () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    const sidebarItem = document.querySelector(`.sidebar-item[data-section="${sectionId}"]`);
    
    if (sidebarItem) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sidebarItem.classList.add('active');
      } else {
        sidebarItem.classList.remove('active');
      }
    }
  });
};

window.addEventListener('scroll', highlightActiveSection);




// Load and render Hero atualizada para o i18next Atualizado
async function loadHero() {
  try {    
    await i18next.loadNamespaces("hero");
    const hero = i18next.t("hero:hero", { returnObjects: true });
    
    const heroContainer = document.querySelector("#home .hero_hero");
    
    heroContainer.innerHTML = hero
      .map(
        (her) => `
        <div class="animate-fade-in">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 texto-light">
            ${her.part1}<span class="texto-high">${her.nome}</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 texto-suave">
            ${her.titulo}
          </p>
          <div class="flex justify-center space-x-6">
            <a href="${her.lingit}" target="_blank" rel="noopener noreferrer" class="transition-colors icons tooltip" data-tooltip="${her.gitalt}">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="${her.linln}" target="_blank" rel="noopener noreferrer" class="transition-colors icons tooltip" data-tooltip="${her.lnalt}">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="${her.lininsta}" class="transition-colors icons tooltip" data-tooltip="${her.inalt}">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
          </div>
        </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading Hero:", error);
  }
}

// Load and render About atualizada para o i18next Atualizado
async function loadAbout() {
  try {    
    await i18next.loadNamespaces("about");
    const about = i18next.t("about:about", { returnObjects: true });

    await i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0];
    
    const aboutSection = document.getElementById("about");
    
    aboutSection.innerHTML = `
      <div class="container mx-auto padding_box">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center texto-light">
        ${etc.sobre_1} <span class="texto-high">${etc.sobre_2}</span>
        </h2>
        <div class="about_about">
        </div>
      </div>
    `;
    
    const aboutContainer = document.querySelector("#about .about_about");
    
    aboutContainer.innerHTML = about.map((abo) => {
    const aboutHtml = abo.competencies.map(aboutcomp =>
      `<span class="px-4 py-2 rounded-full texto-high fundo-suave">${aboutcomp}</span>`
      ).join('');
      return `
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="animate-slide-in">
              <img
                src="${abo.foto}"
                alt="${abo.alt}"
                class="rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
            </div>
            <div class="space-y-6 animate-slide-in">
              <p class="texto-light">
                ${abo.p1}
              </p>
              <p class="texto-light">
                ${abo.p2}
              </p>
              <div class="flex flex-wrap gap-4 about_comp">
                ${aboutHtml}
              </div>
            </div>
          </div>
    `;
  }).join('');
  } catch (error) {
    console.error('Error loading about:', error);
  }
}

// Load and render Formations atualizada para o i18next Atualizado
async function loadFormations() {
  try {    
    await i18next.loadNamespaces("formations");
    const formations = i18next.t("formations:formations", { returnObjects: true });

    await i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0];

    // Seleciona o container principal da seção de formações
    const formationsSection = document.getElementById("formation");
    
    formationsSection.innerHTML = `
        <div class="container mx-auto padding_box">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center texto-light">
            ${etc.form_1} <span class="texto-high">${etc.form_2}</span>
          </h2>
          <div class="space-y-8">
          </div>
        </div>
    `;
    
    const formationsContainer = document.querySelector("#formation .space-y-8");
    
    formationsContainer.innerHTML = formations
      .map(
        (form) => `
        <div class="space-y-8">
          <div class="p-6 rounded-lg fundo-light glow">
            <h3 class="text-xl font-semibold texto-high">${form.nome}</h3>
            <p class="texto-suave">${form.instituicao} • ${form.inicio} - ${form.fim}</p>
            <p class="mt-4 texto-light">${form.descricao}</p>
          </div>
        </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading formations:", error);
  }
}

// Load and render Experiences atualizada para o i18next Atualizado
async function loadExperiences() {
  try {    
    await i18next.loadNamespaces("experience");
    const experience = i18next.t("experience:experience", { returnObjects: true });

    await i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0];

    // Seleciona o container principal da seção de Experienca
    const experienceSection = document.getElementById("experience");
    
    experienceSection.innerHTML = `
        <div class="container mx-auto padding_box">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center texto-light">
            ${etc.exp_1} <span class="texto-high">${etc.exp_2}</span>
          </h2>
          <div class="space-y-8">
          </div>
        </div>
    `;

    const experienceContainer = document.querySelector("#experience .space-y-8");
      
    experienceContainer.innerHTML = experience
      .map(
        (exp) => `
      <div class="p-6 rounded-lg fundo-light glow">
        <h3 class="text-xl font-semibold texto-high">${exp.funcao}</h3>
        <p class="texto-suave">${exp.empresa} • ${exp.inicio} - ${exp.fim}</p>
        <p class="mt-4 texto-light">${exp.descricao}</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading Experience:", error);
  }
}

// 1. Primeiro, modifique a função setupSearchFilter para aceitar um callback de atualização
function setupSearchFilter(options) {
  const { 
    searchInputId, 
    cardsContainerSelector, 
    cardSelector, 
    excludeSelector = null,
    fieldsToSearch,
    onFilter = null
  } = options;
  
  const searchInput = document.getElementById(searchInputId);
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    const container = document.querySelector(cardsContainerSelector);
    
    // Seleciona cards excluindo os que estão dentro do excludeSelector
    const allCards = container.querySelectorAll(cardSelector);
    const cards = excludeSelector 
      ? Array.from(allCards).filter(card => !card.closest(excludeSelector))
      : Array.from(allCards);
    
    if (searchTerm === '') {
      cards.forEach(card => {
        card.style.display = 'block';
      });
      
      if (onFilter) onFilter(null);
      return;
    }

    const visibleTypeCount = {};
    
    cards.forEach(card => {
      // Verifica TODOS os campos do card para ver se ALGUM corresponde
      const hasMatch = fieldsToSearch.some(field => {
        return Array.from(card.querySelectorAll(field.selector)).some(element => {
          return element.textContent.toLowerCase().includes(searchTerm);
        });
      });

      // Mostra ou oculta o CARD INTEIRO (nunca partes individuais)
      card.style.display = hasMatch ? 'block' : 'none';

      // Contagem para o filtro
      if (hasMatch) {
        const tipoElement = card.querySelector('span.texto-high.fundo-suave');
        const tipo = tipoElement?.textContent.trim().toLowerCase();
        if (tipo) visibleTypeCount[tipo] = (visibleTypeCount[tipo] || 0) + 1;
      }
    });
    
    if (onFilter) onFilter(Object.keys(visibleTypeCount).length ? visibleTypeCount : null);
  });
}

// 2. Crie uma função para atualizar o resumo
function updateResumo(visibleCounts) {
  const resumContainer = document.querySelector('.resum_resum');
  if (!resumContainer) return;
  
  const resum = i18next.t("etc:resum", { returnObjects: true });
  const searchInput = document.getElementById('course-search');
  
  const countsToUse = searchInput.value.trim() === '' ? courseTypeCount : visibleCounts;
  if (!countsToUse) return;
  
  const typeSummaryHtml = Object.entries(countsToUse)
    .map(([tipo, count]) => {
      // Formata o tipo para capitalizar a primeira letra
      const tipoFormatado = tipo.charAt(0).toUpperCase() + tipo.slice(1);
      
      return `
        <p class="text-sm">
          <strong class="texto-high">${tipoFormatado}:</strong> 
          <span class="contraste">${count}</span> <span class="texto-high">${resum[0].res_cur}</span>
        </p>`;
    })
    .join('');
  
  resumContainer.innerHTML = `
    <h3 class="text-xl font-bold mb-5 text-center texto-high">${resum[0].resumo}</h3>
    <div class="cursos_resum flex flex-col items-center justify-center rounded-md">
      <div class="flex flex-col space-y-2 p-3 rounded-md">
        ${typeSummaryHtml}
      </div>
    </div>
  `;
}

// Load and render Courses atualizada para o i18next Atualizado
async function loadCourses() {
  try {    
    await i18next.loadNamespaces("courses");
    const courses = i18next.t("courses:courses", { returnObjects: true });

    await i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0]; 

    await i18next.loadNamespaces("badges");
    const badges = i18next.t("badges:badges", { returnObjects: true }); 
    
    const competencyCount = {};
    const competencyColorMap = {};
    let colorIndex = 0;
    
    courses.forEach(course => {
    course.competencies.forEach(comp => {
      competencyCount[comp] = (competencyCount[comp] || 0) + 1;
      if (!competencyColorMap[comp]) {
        competencyColorMap[comp] = colors[colorIndex % colors.length];
        colorIndex++;
      }
    });

    if (course.tipo) {
      if (!courseTypeCount[course.tipo]) {
        courseTypeCount[course.tipo] = 0;
      }
      courseTypeCount[course.tipo]++;
    }

    });

    // Seleciona o container principal da seção de cursos
    const coursesSection = document.getElementById("courses");
    
    coursesSection.innerHTML = `
        <div class="container mx-auto padding_box">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center texto-light">
            ${etc.cur_1} <span class="texto-high">${etc.cur_2}</span>
          </h2>

          <!-- Search Bar -->
          <div id="pesquisa" class="max-w-md mx-auto">
            <div class="relative">
              <input 
                type="text" 
                id="course-search"
                placeholder="${etc.placeholdercursos}"
                class="w-full px-4 py-2 rounded-lg border pl-10
                cor-prin search-theme texto-suave"
              >

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                class="icon-search texto-light absolute left-3 top-1/2 transform -translate-y-1/2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>

              <a href="./endpoints/cursos/index.html" 
                target="_blank" rel="noopener noreferrer" 
                class="transition-colors icons items-center icon-filter tooltip tooltip-right" 
              data-tooltip="${etc.person_filter}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-search texto-light absolute right-3 top-1/2 transform -translate-y-1/2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
              </a>
            </div>
          </div>

          <div class="mt-2 text-center"> <a href="./endpoints/cursos/index.html" target="_blank" rel="noopener noreferrer" 
            class="transition-colors icons tooltip inline-flex" data-tooltip="${etc.abrir_filtros}">
              <p class="texto-light transition-colors hover:underline">
              ${etc.person_filter}
              </p>
            </a>
          </div>

          <div class="grid scroll-site">
              <div class="resum_resum">
              </div>
          </div>
          <div class="cont_comp">
          </div>
        </div>

        <div class="badge-section padding_swiper">
            <div class="swiper badge-swiper">
              <div class="swiper-wrapper" id="badge-carousel">
                <!-- Slides -->
              </div>
              <!-- Navegação -->
              <div class="nav-btn prev-btn transColors">
                &#10094;
              </div>
              <div class="nav-btn next-btn transColors">
                &#10095;
              </div>
            </div>
          </div>
    `;

    const coursesContainer = document.querySelector("#courses .grid");

    coursesContainer.innerHTML = courses
      .map(
        (cor) => {
          const competenciesHtml = cor.competencies.map(comp => 
            `<span class="dynamic-text dynamic-color inline-block px-3 py-1 rounded-full text-sm ${competencyColorMap[comp]} m-1">${comp}</span>`
          ).join('');
    
          return `
            <div class="certificate-${cor.tipoClean} card p-6 rounded-lg border fundo-light">
              <h3 class="text-xl font-semibold texto-high">${cor.nome}</h3>
              <p class="texto-suave">${cor.instituicao} • ${cor.ano}</p>
              <p class="mt-2 texto-light">${cor.descricao}</p>
              <p class="text-sm mt-2 texto-suave">${cor.horasdesc} ${cor.horas}</p>
              <span class="inline-block mt-3 px-3 py-1 rounded-full text-sm texto-high fundo-suave">
                ${cor.tipo}
              </span>
              <div class="comp mt-4 flex flex-wrap gap-2">
                ${competenciesHtml}
              </div>
            </div>
          `
          ;
        })
      .join("");
    
      const resum = i18next.t("etc:resum", { returnObjects: true });

      const resumHtml = resum
        .map((res) => {
          const typeSummaryHtml = Object.entries(courseTypeCount)
            .map(([tipo, count]) => 
              `<p class="text-sm">
                <strong class="texto-high">${tipo}:</strong> 
                <span class="contraste">${count}</span> <span class="texto-high">${res.res_cur}</span>
              </p>`
            )
            .join('');

          return `
            <div class="resum_resum card p-4 rounded-lg shadow-md fundo-light">
              <h3 class="text-xl font-bold mb-5 text-center texto-high">${res.resumo}</h3>
              <div class="cursos_resum flex flex-col items-center justify-center rounded-md">
                <div class="flex flex-col space-y-2 p-3 rounded-md">
                  ${typeSummaryHtml}
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      coursesContainer.innerHTML += resumHtml;

      // Load and render Competecias atualizada para o i18next
    
      const compe = i18next.t("etc:comp", { returnObjects: true }); 
      
      const compeContainer = document.querySelector("#courses .cont_comp");

      compeContainer.innerHTML = compe
      .map(
        (cont) => {
          const competencyCountHtml = Object.entries(competencyCount)
          .map(([comp, count]) => {
            const colorClass = competencyColorMap[comp];
            return `<span class="dynamic-text dynamic-color inline-block m-1 px-4 py-2 rounded-lg ${colorClass}">${comp}: ${count}</span>`;
          })
          .join('');

          return `
            <div class="cont_comp mt-8 text-center">
              <div class="inline-block px-3 py-3 rounded-lg border-2 glow-borda fundo-light">
              <p class="text-lg mb-2 font-bold texto-high">${cont.contagem}</p>
              <div class="flex flex-wrap justify-center gap-2">
                ${competencyCountHtml}
              </div>
            </div>
          `;
      })
      .join("");
      coursesContainer.insertAdjacentElement('afterend', compeContainer);

      const container = document.getElementById("badge-carousel");

      badges.forEach(badge => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        slide.innerHTML = `
          <img class="texto-suave" src="${badge.imagem}" alt="${badge.titulo}" />
          <p class="texto-high texto-swiper">${badge.titulo}</p>
        `;

        container.appendChild(slide);
      });

      // Inicializa o carrossel
      new Swiper('.badge-swiper', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.next-btn',
          prevEl: '.prev-btn'
        },
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        grabCursor: true,
          // slidesPerView muda com base na largura da tela:
        breakpoints: {
          // quando a tela for >= 320px
          430: {
            slidesPerView: 1
          },
          // quando a tela for >= 480px
          768: {
            slidesPerView: 2
          },
          // quando a tela for >= 768px
          1280: {
            slidesPerView: 3
          },
          // quando a tela for >= 1024px
          1500: {
            slidesPerView: 4
          }
        }
      });    
      
      setupSearchFilter({
        searchInputId: 'course-search',
        cardsContainerSelector: '#courses',
        cardSelector: '.card', // Seletor do card individual
        excludeSelector: '.resum_resum', // Área a ser ignorada
        fieldsToSearch: [
          { selector: 'h3' }, // Título
          { selector: 'p:nth-of-type(1)' }, // Instituição/ano
          { selector: 'p:nth-of-type(2)' }, // Descrição
          { selector: 'div.comp' }, // Competências
          { selector: 'span' } // Tag
        ],
        onFilter: updateResumo
      });

    } catch (error) {
      console.error('Error loading courses:', error);
  }
}

// Load and render Projects atualizada para o i18next Atualizado
async function loadProjects() {
  try {
    // --- CARREGAMENTO I18NEXT ---
    await i18next.loadNamespaces("projects");
    const projects = i18next.t("projects:projects", { returnObjects: true });
    
    await i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0];

    // --- ELEMENTOS PRINCIPAIS ---
    const projectsSection = document.getElementById("projects");

    // Elementos do Modal de Mídia (Fullscreen)
    const modal = document.getElementById("media-modal");
    const mediaContainer = modal.querySelector(".media-container"); // Certifique-se que existe no HTML
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const closeModalBtn = modal.querySelector(".fecharModal");
    
    let btnPrev = document.getElementById("modal-prev");
    let btnNext = document.getElementById("modal-next");
    
    if (!btnPrev) {
        // Injeta botões caso você não tenha colocado no HTML ainda
        btnPrev = document.createElement("div"); btnPrev.id = "modal-prev"; btnPrev.className = "nav-btn prev-btn transColors"; btnPrev.innerHTML = "&#10094;";
        btnNext = document.createElement("div"); btnNext.id = "modal-next"; btnNext.className = "nav-btn next-btn transColors"; btnNext.innerHTML = "&#10095;";
        // Estilos básicos inline para garantir visibilidade (pode mover pro CSS)
        const style = "position: absolute; top: 50%; transform: translateY(-50%); font-size: 3rem; color: white; background: rgba(0,0,0,0.5); padding: 10px 20px; cursor: pointer; z-index: 2000; user-select: none;";
        btnPrev.style.cssText = style + "left: 10px;";
        btnNext.style.cssText = style + "right: 10px;";
        modal.querySelector(".modal-content").appendChild(btnPrev);
        modal.querySelector(".modal-content").appendChild(btnNext);
    }

    // --- VARIÁVEIS DE ESTADO (Navegação) ---
    let currentMediaList = [];
    let currentMediaIndex = 0;

    // --- RENDERIZAÇÃO DA SEÇÃO PRINCIPAL ---
    projectsSection.innerHTML = `
      <div class="container mx-auto padding_box">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center texto-light">
          ${etc.projetos_1} <span class="texto-high">${etc.projetos_2}</span>
        </h2>

        <div class="relative">

          <!-- Search Bar -->
          <div id="pesquisa" class="max-w-md mx-auto">
            <div class="relative">
              <input 
                type="text" 
                id="project-search"
                placeholder="${etc.placeholderprojetos}"
                class="w-full px-4 py-2 rounded-lg border pl-10
                cor-prin search-theme texto-suave"
              >

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                class="icon-search texto-light absolute left-3 top-1/2 transform -translate-y-1/2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>

              <a href="./endpoints/cursos/index.html" 
                target="_blank" rel="noopener noreferrer" 
                class="transition-colors icons items-center icon-filter tooltip tooltip-right" 
              data-tooltip="${etc.person_filter}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-search texto-light absolute right-3 top-1/2 transform -translate-y-1/2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
              </a>
            </div>
          </div>

          <div class="mt-2 text-center"> <a href="./endpoints/cursos/index.html" target="_blank" rel="noopener noreferrer" 
            class="transition-colors icons tooltip inline-flex" data-tooltip="${etc.abrir_filtros}">
              <p class="texto-light transition-colors hover:underline">
              ${etc.person_filter}
              </p>
            </a>
          </div>

          </div>

        <div class="grid md:grid-cols-2 gap-8 mt-8" id="projects-grid">
        </div>
      </div>
    `;

    const projectsContainer = document.querySelector("#projects-grid");
    projectsContainer.innerHTML = projects.map(
      (project, index) => `
        <div class="project-card block rounded-lg overflow-hidden fundo-light glow cursor-pointer" data-index="${index}">
          <img src="${project.foto}" alt="${project.titulo}" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-semibold texto-high">${project.titulo}</h3>
            <p class="mt-2 texto-light">${project.descricao}</p>
            <div class="comp mt-4 flex flex-wrap gap-2">
              ${project.competencies.map(tech =>
                `<span class="px-3 py-1 rounded-full text-sm texto-high fundo-suave">${tech}</span>`
              ).join('')}
            </div>
          </div>
        </div>
      `
    ).join("");

    // Search bar
    setupSearchFilter({
      searchInputId: 'project-search',
      cardsContainerSelector: '#projects-grid',
      cardSelector: '.project-card',
      fieldsToSearch: [{ selector: 'h3' }, { selector: 'p' }, { selector: 'div span' }]
    });

    const divOculta = document.getElementById("divOculta");

    // --- CLIQUE NO CARD DO PROJETO (Abre Detalhes) ---
    projectsContainer.addEventListener("click", (e) => {
      const card = e.target.closest(".project-card");
      if (!card) return;

      const index = card.dataset.index;
      const project = projects[index];

      // Preenche divOculta
      divOculta.innerHTML = `
        <button id="fecharBotao" class="fechar fecharCor transition-colors">X</button>
        <section class="project-info-section">
          <div class="container">
            <div class="info-content">
              <div class="text-center mb-8">
                <h1><span class="texto-high">${project.titulo}</span></h1>
                <p class="texto-light">${project.descricao}</p>
              </div>
              <div class="grid-info">
                <div>
                  <h3 class="texto-suave">${etc.techProjects}</h3>
                  <div class="comp mt-4 flex flex-wrap gap-2">
                    ${project.competencies.map(tech =>
                      `<span class="px-3 py-1 rounded-full text-sm texto-high fundo-suave">${tech}</span>`
                    ).join('')}
                  </div>
                </div>
                <div class="divProjeto">
                  <h3 class="texto-suave">${etc.linkProject}</h3>
                  <div class="project-details texto-light">
                    ${renderProjectLinks(project)} 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- container da galeria -->
        <section class="media-gallery-section">
          <div class="container">
            <div id="media-grid" class="media-esquecida">
            </div>
          </div>
        </section>
      `;
      
      const grid = divOculta.querySelector("#media-grid");
      renderGallery(project.media, grid);

      // Exibe divOculta
      divOculta.classList.add("ativa");
      divOculta.scrollIntoView({ behavior: "smooth" });

      // Botão fechar DivOculta
      divOculta.querySelector("#fecharBotao").addEventListener("click", () => {
        divOculta.classList.remove("ativa");
        projectsSection.scrollIntoView({ behavior: "smooth" });
      });

      // Script do Instagram
      // esse if serve para recarregar os cards do instagram pois eles carregam junto com a pagina
      // e com isso eles carregam toda vez que alteramos algo nos cards, tipo abrir ou fechar      
      if (!window.instgrm) {
        const script = document.createElement('script');
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => window.instgrm?.Embeds?.process();
        document.body.appendChild(script);
      } else {
        window.instgrm.Embeds.process();
      }
    });

    // Função auxiliar para renderizar links
    function renderProjectLinks(project) {
        let html = '';
        if (project.siteprojeto1) html += `
                    <a href="${project.siteprojeto1}" target="_blank" class="icons tooltip" data-tooltip="${project.siteAlt1}">
                      <svg class="icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61
                          c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 
                          5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 
                          13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 
                          5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 
                          3.78c0 5.42 3.3 6.61 6.44 
                          7A3.37 3.37 0 0 0 9 
                          18.13V22">
                        </path>
                      </svg>
                    </a>`;
        if (project.siteprojeto2) html += `
                            <a href="${project.siteprojeto2}" target="_blank" class="icons tooltip" data-tooltip="${project.siteAlt2}">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 0 20"></path>
                                <path d="M12 2a15.3 15.3 0 0 0 0 20"></path>
                              </svg>
                            </a>`;
        if(project.siteprojeto3) html += `
                            <a href="${project.siteprojeto3}" target="_blank" class="icons tooltip" data-tooltip="${project.siteAlt3}">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                              </svg>
                            </a>`;
        if(project.siteprojeto4) html += `
                    <a href="${project.siteprojeto4}" target="_blank" class="icons tooltip" data-tooltip="${project.siteAlt4}">
                      <svg class="icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </a>`;
        return html;
    }

    // =========================================================
    //  FUNÇÃO RENDER GALLERY (Com estilos Restaurados)
    // =========================================================
    function renderGallery(mediaData, grid) {
      if (!grid || !Array.isArray(mediaData)) return;
      grid.innerHTML = '';
      
      // Atualiza lista global para navegação
      currentMediaList = mediaData;

      // 1. Crie containers para cada tipo de mídia
      const otherContainer = document.createElement('div');
      otherContainer.className = 'other-gallery media-grid';
      const instagramContainer = document.createElement('div');
      instagramContainer.className = 'instagram-gallery media-grid';
      const youtubeContainer = document.createElement('div');
      youtubeContainer.className = 'youtube-gallery media-grid'; // Adicione uma classe para estilização
      
      // 2. Classifique os dados em arrays separados
      const categorizedData = {
          other: [],
          youtube: [],
          instagram: []        
      };

      mediaData.forEach(item => {
        const src = item.src?.trim();
        if (!src) return;

        if (src.includes("youtube.com") || src.includes("youtu.be")) {
          categorizedData.youtube.push(item);
        } else if (src.includes("instagram.com")) {
          categorizedData.instagram.push(item);
        } else {
          categorizedData.other.push(item);
        }
      });

      // 3. Função auxiliar para renderizar cards em um container específico
      function createAndAppendCards(items, container) {
        items.forEach(item => {
          const card = document.createElement("div");
          card.className = "portfolio-card glow cursor-pointer"; 

          const src = item.src?.trim();
          let mediaHtml = '';
          let mediaTypeTag = '';
          let mediaType = '';

          // --- Gerar o HTML do card ---
          if (src.includes("youtube.com") || src.includes("youtu.be")) {
            const videoIdMatch = src.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([^?&#]+)/);
            const videoId = videoIdMatch ? videoIdMatch[1] : null;
            if (videoId) {
              mediaHtml = `<img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${item.alt || ''}" class="media-item">`;
              mediaTypeTag = '<span class="inverseGlow texto-suave fundo-light media-type">YOUTUBE</span>';
              mediaType = 'youtube';
            }
          } else if (src.includes("instagram.com")) {
            const isReel = src.includes("reel");
            mediaHtml = `<div class="instagram-card"> <blockquote class="instagram-media" data-instgrm-permalink="${src}" data-instgrm-version="14" style="margin:0 auto;"></blockquote> </div>`;
            mediaTypeTag = `<span class="inverseGlow texto-suave fundo-light media-type">${isReel ? 'IG REEL' : 'IG'}</span>`;
            mediaType = 'instagram';
          } else if (item.type === 'image' || item.type === 'gif') {
            mediaHtml = `<img src="${src}" alt="${item.alt || ''}" class="media-item">`;
            mediaTypeTag = `<span class="inverseGlow texto-suave fundo-light media-type">${item.type.toUpperCase()}</span>`;
            mediaType = item.type;
          } else if (item.type === 'video') {
            mediaHtml = `<video controls class="media-item"><source src="${src}" type="video/mp4"></video>`;
            mediaTypeTag = '<span class="inverseGlow texto-suave fundo-light media-type">VIDEO</span>';
            mediaType = 'video';
          }

          if (!mediaHtml) return;

          //Estrutura HTML completa do card (Overlay + Content Info)
          card.innerHTML = `
            <div class="relative group fundo-light uni-card"
              data-type="${mediaType}"
              data-src="${src}"
              data-alt="${item.alt || ''}"
              data-media-title="${item.titulo || ''}" 
              data-media-description="${item.descricao || ''}">
              
              ${mediaHtml}
              ${mediaTypeTag}
              
              <div class="overlay">

                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" 
                  fill="none" stroke-linecap="round" stroke-linejoin="round" 
                  class="icon icons">
                  
                  <!-- camada de "borda" -->
                  <g class="icon-outline" stroke="black" stroke-width="4" opacity="0.6">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                    <line x1="11" x2="11" y1="8" y2="14"></line>
                    <line x1="8" x2="14" y1="11" y2="11"></line>
                  </g>

                  <g class="icon-main" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                    <line x1="11" x2="11" y1="8" y2="14"></line>
                    <line x1="8" x2="14" y1="11" y2="11"></line>
                  </g>

                </svg>

              </div>
            </div>
            <div class="content-info fundo-light">
              <h3 class="texto-high">${item.titulo || ''}</h3>
              <p class="texto-light">${item.descricao || ''}</p>
            </div>
          `;

          // --- EVENTO DE CLIQUE (Modificado para usar Navegação Global) ---
          card.addEventListener("click", () => {
             // Encontra índice global para poder navegar
             const globalIndex = mediaData.indexOf(item);
             if (globalIndex !== -1) {
               currentMediaIndex = globalIndex;
               updateModalContent(); // Chama a função que renderiza o modal
               modal.style.display = "block";
             }
          });

          container.appendChild(card);
        });
      }

      if (categorizedData.other.length > 0) 
        { 
          createAndAppendCards(categorizedData.other, otherContainer); 
          grid.appendChild(otherContainer); 
      }
      if (categorizedData.youtube.length > 0) 
        { 
          createAndAppendCards(categorizedData.youtube, otherContainer);
          grid.appendChild(otherContainer);

          // para separar o youtube em uma div propria
          // createAndAppendCards(categorizedData.youtube, youtubeContainer);
          // grid.appendChild(youtubeContainer);
      }
      if (categorizedData.instagram.length > 0) 
      { 
        createAndAppendCards(categorizedData.instagram, otherContainer);
        grid.appendChild(otherContainer);

        // para separar o insta em uma div propria
        // createAndAppendCards(categorizedData.instagram, instagramContainer);
        // grid.appendChild(instagramContainer);
        const script = document.createElement('script');
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }

    // =========================================================
    //  ATUALIZAR CONTEÚDO DO MODAL (Com estilos Restaurados)
    // =========================================================
    function updateModalContent() {
      if (!currentMediaList || currentMediaList.length === 0) return;
      
      const item = currentMediaList[currentMediaIndex];
      const src = item.src?.trim();

      //  const cardType = card.querySelector(".relative").dataset.type;
      // nesta função tem uns cardType que estão comentados, pois eles são do antigo codigo
      // o  atual funciona, mas sei lá, vai que eu quero usar o outro

      mediaContainer.innerHTML = ''; 
      modalTitle.textContent = item.titulo || '';
      modalDescription.textContent = item.descricao || '';

      //Classes e estruturas do Modal
      if (src.includes("youtube.com") || src.includes("youtu.be")) {
        const videoIdMatch = src.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([^?&#]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (videoId) {
          // Container responsivo com a classe .youtube
          const responsiveContainer = document.createElement('div');
          responsiveContainer.className = 'modal-media-container youtube';
          responsiveContainer.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              title="${item.titulo || 'YouTube video'}">
            </iframe>`;
          mediaContainer.appendChild(responsiveContainer);
        }
      } 
      else if (src.includes("instagram.com")) {
        const instagramContainer = document.createElement('div');
        instagramContainer.className = 'modal-media-container instagram';
        if (src.includes("reel")) instagramContainer.classList.add('instagram-reel');
        else instagramContainer.classList.add('instagram-post');

        instagramContainer.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${src}" data-instgrm-version="14"></blockquote>`;
        mediaContainer.appendChild(instagramContainer);
        
        if (window.instgrm) window.instgrm.Embeds.process();
      } 
      else if (item.type === 'video') {
        // Vídeo nativo
        mediaContainer.innerHTML = `<video controls autoplay loop><source src="${src}" type="video/mp4"></video>`;
      } 
      else {
        // Imagem
        mediaContainer.innerHTML = `<img src="${src}" alt="${item.alt || ''}">`;
      }
    }

    // Função Navegar
    function navigateModal(direction) {
      const newIndex = currentMediaIndex + direction;
      if (newIndex < 0) currentMediaIndex = currentMediaList.length - 1;
      else if (newIndex >= currentMediaList.length) currentMediaIndex = 0;
      else currentMediaIndex = newIndex;
      updateModalContent();
    }

    // =========================================================
    //  EVENT LISTENERS GLOBAIS (Navegação + Swipe)
    // =========================================================

    // Botão Fechar Modal Media
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        mediaContainer.innerHTML = "";
      });
    }

    // Fechar ao clicar fora
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        mediaContainer.innerHTML = "";
      }
    });

    // Botões Next/Prev (Clique)
    if (btnPrev) btnPrev.addEventListener("click", (e) => { e.stopPropagation(); navigateModal(-1); });
    if (btnNext) btnNext.addEventListener("click", (e) => { e.stopPropagation(); navigateModal(1); });

    // Teclado
    document.addEventListener("keydown", (e) => {
      if (modal.style.display === "block") {
        if (e.key === "ArrowRight") navigateModal(1);
        else if (e.key === "ArrowLeft") navigateModal(-1);
        else if (e.key === "Escape") {
          modal.style.display = "none";
          mediaContainer.innerHTML = "";
        }
      }
    });

    // --- SWIPE (TOUCH) ---
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; 

    modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    });

    function handleSwipeGesture() {
      const distance = touchEndX - touchStartX;
      if (Math.abs(distance) > minSwipeDistance) {
        if (distance < 0) navigateModal(1); // Esquerda -> Próximo
        else navigateModal(-1); // Direita -> Anterior
      }
    }

  } catch (error) {
    console.error("Error loading Projects:", error);
  }
}


// Load and render More atualizada para o i18next Atualizado
async function loadMore() {
  try {    
    await i18next.loadNamespaces("more");
    const more = i18next.t("more:more", { returnObjects: true });

    await i18next.loadNamespaces("more");
    const games = i18next.t("more:games", { returnObjects: true });

    await i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0];

    // Seleciona o container principal da seção de more
    const moreSection = document.getElementById("more-about");
    
    moreSection.innerHTML = `
      <div class="container mx-auto padding_box">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center texto-light">
          ${etc.mais_1} <span class="texto-high">${etc.mais_2}</span>
        </h2>
        <div class="more_about">
        </div>
      </div>
    `;

    const moreContainer = document.querySelector("#more-about .more_about");
    
    moreContainer.innerHTML = more
    .map((mor) => {
      const loadGames = games
      .map((item) => {
        const linkVazio = !item.lingames; // verifica se está vazio, null ou undefined

        const conteudo = linkVazio
          ? `<span class="inline-flex items-center texto-light">
              <img src="${item.favico}" alt="${item.alt}" class="inline align-middle sites-ico" />
              ${item.nome}
            </span>`
          : `<a href="${item.lingames}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center hover:underline texto-light tooltip" data-tooltip="${item.alt}">
              <img src="${item.favico}" alt="${item.alt}" class="inline align-middle sites-ico" />
              ${item.nome}
            </a>`;

        return `
          <ul class="custom-list">
            <li>
              <span class="bullet texto-high">•</span>
              ${conteudo}
            </li>
          </ul>
        `;
      })
    .join("");
      return `
      <div class="grid md:grid-cols-2 gap-8 mx-auto">
        <div class="p-6 rounded-lg fundo-light">
          <div class="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon texto-light mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 texto-high"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <h3 class="text-xl font-semibold texto-high">${mor.mais_1}</h3>
          </div>
            <div id="meu-card">
              <div id="PST">
                <a href="${mor.mypst}" target="_blank" class="pstdiv tooltip" data-tooltip="${mor.mypstalt}">
                  <img src="${mor.mypstcard}" alt="${mor.mypstalt}">
                </a>
              </div>
              
              <div id="meu-card">
                <div id="PST">
                  <a href="${mor.exophase}" target="_blank" class="pstdiv tooltip" data-tooltip="${mor.exoalt}">
                    <img src="${mor.exocard}" alt="${mor.exoalt}">
                  </a>
                </div>
              </div>

              <div id="meu-card">
                <div id="PST">
                  <a href="${mor.revil}" target="_blank" class="pstdiv tooltip" data-tooltip="${mor.revilalt}">
                    <img src="${mor.revilcard}" alt="${mor.revilalt}">
                  </a>
                </div>
              </div>

              ${loadGames}
              
            </div>

            <div class="background_iframe">
              <div id="gr_updates_widget" class="gr_container">
                <iframe id="the_iframe" frameborder="0" sandbox></iframe>
              </div>
            </div>

          </div>
          <div class="p-6 rounded-lg fundo-light">
            <div class="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon texto-light mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 texto-high"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              <h3 class="text-xl font-semibold texto-high">${mor.mais_2}</h3>
            </div>
            <div class="space-y-4">
              <div class="spotify-container">
                <iframe class="spotify-embed"
                  src="${mor.spotifyplaylist1}"
                  allowfullscreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy">
                </iframe>
              </div>
              <div class="spotify-container">
                <iframe class="spotify-embed"
                  src="${mor.spotifyplaylist2}"
                  allowfullscreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy">
                </iframe>
              </div>
              <div class="spotify-container">
                <iframe class="spotify-embed"
                  src="${mor.spotifyplaylist3}"
                  allowfullscreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy">
                </iframe>
              </div>
              <ul class="custom-list">
                <li>
                  <span class="bullet texto-high">•</span>
                  <a href="${mor.linspotify}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center hover:underline texto-light tooltip" data-tooltip="${mor.spotify}">
                    <img src="${mor.spotifyico}" alt="${mor.spotify}" class="inline w-5 h-5 mr-2 align-middle sites-ico" />
                    ${mor.spotify}
                  </a>
                </li>
                <li>
                  <span class="bullet texto-high">•</span>
                  <a href="${mor.linsoundcloud}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center hover:underline texto-light tooltip" data-tooltip="${mor.soundcloud}">
                    <img src="${mor.soundcloudico}" alt="${mor.soundcloud}" class="inline w-5 h-5 mr-2 align-middle sites-ico" />
                    ${mor.soundcloud}
                  </a>
                </li>
                <li>
                  <span class="bullet texto-high">•</span>
                  <a href="${mor.linlastfm}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center hover:underline texto-light tooltip" data-tooltip="${mor.lastfm}">
                    <img src="${mor.lastfmico}" alt="${mor.lastfm}" class="inline w-5 h-5 mr-2 align-middle sites-ico" />
                    ${mor.lastfm}
                  </a>
                </li>
              </ul>

              <div class="recent-played">
                <div id="tracks"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
      `;
    })
  .join("");
  } catch (error) {
    console.error("Error loading More:", error);
  }
}

// Load and render Projects atualizada para o i18next Atualizado
async function loadTabletopProjects() {
  try {    
    await i18next.loadNamespaces("tabletop-projects");
    const tableprojects = i18next.t("tabletop-projects:projects", { returnObjects: true });

    await i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0];

    // Seleciona o container principal da seção de formações
    const tabletopSection = document.getElementById("tabletop-projects");
    
    tabletopSection.innerHTML = `
        <div class="container mx-auto padding_box">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center texto-light-inv">
            ${etc.ouprojetos_1} <span class="escuro-high-inv texto-high-inv">${etc.ouprojetos_2}</span>
          </h2>
          <div class="grid md:grid-cols-2 gap-8" id="tabletop-grid">
          </div>
        </div>
    `;
      
    const tableprojectsContainer = document.querySelector("#tabletop-projects .grid");

    tableprojectsContainer.innerHTML = tableprojects
      .map(
        (project) => `
          <a href="${project.siteprojeto}" class="block project-card rounded-lg overflow-hidden fundo-light">
            <img src="${project.foto}" alt="${project.nome}" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold escuro-high-inv texto-high-inv">${project.nome}</h3>
              <p class="mt-2 texto-light-inv">${project.descricao}</p>
              <div class="mt-4 flex gap-2">
                ${project.competencies.map(tag => 
                  `<span class="px-3 py-1 rounded-full text-sm fundo-inv">${tag}</span>`
                ).join('')}
              </div>
            </div>
          </a>
         `
      )
      .join("");
  } catch (error) {
    console.error("Error loading Table Top Projects:", error);
  }
}

// Load and render Contact atualizada para o i18next Atualizado
async function loadContact() {
  try {
    await i18next.loadNamespaces("contact");
    const contact = i18next.t("contact:contact", { returnObjects: true });

    await i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0];    

    // Seleciona o container principal da seção de contato
    const contactSection = document.getElementById("contact");
    
    contactSection.innerHTML = `
        <div class="container mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center texto-light">
            ${etc.contato_1} <span class="texto-high">${etc.contato_2}</span>
          </h2>
          <div class="footer_contact">
          </div>
        </div>
    `;

    const contactContainer = document.querySelector("#contact .footer_contact");
      
    contactContainer.innerHTML = contact
      .map(
        (cont) => `
          <div class="flex flex-wrap justify-center space-x-8">
            <a href="${cont.lingit}" target="_blank" rel="noopener noreferrer" class="transition-colors icons tooltip whitespace-nowrap" data-tooltip="${cont.git}">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon-footer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span class="sr-only">${cont.git}</span>
            </a>
            <a href="${cont.linln}" target="_blank" rel="noopener noreferrer" class="transition-colors icons tooltip whitespace-nowrap" data-tooltip="${cont.ln}">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon-footer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span class="sr-only">${cont.ln}</span>
            </a>
            <a href="${cont.linemail}" class="transition-colors icons tooltip whitespace-nowrap" data-tooltip="${cont.email}">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon-footer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span class="sr-only">${cont.email}</span>
            </a>
          </div>

          <div class="text-lg font-bold texto-high text-center mt-6 mb-6">
            ${cont.apoiar}
          </div>
          
          <div class="flex flex-wrap justify-center icons_footer">

            <a href="${cont.linkpatreon}" target="_blank" rel="noopener noreferrer" class="transition-colors icons inline-flex items-center hover:underline texto-light tooltip gap-2 whitespace-nowrap" data-tooltip="${cont.patreon}">
              <span class="icon-footer footer-pay bg-current inline-block" 
                style="-webkit-mask: url('${cont.icopatreon}') center / contain no-repeat; mask: url('${cont.icopatreon}') center / contain no-repeat;">
              </span>
              <span>${cont.patreon}</span>
            </a>

            <a href="${cont.linkofi}" target="_blank" rel="noopener noreferrer" class="transition-colors icons inline-flex items-center hover:underline texto-light tooltip gap-2 whitespace-nowrap" data-tooltip="${cont.kofi}">
              <span class="icon-footer footer-pay bg-current inline-block" 
                style="-webkit-mask: url('${cont.icokofi}') center / contain no-repeat; mask: url('${cont.icokofi}') center / contain no-repeat;">
              </span>
              <span>${cont.kofi}</span>
            </a>

            <a href="${cont.lincoffee}" target="_blank" rel="noopener noreferrer" class="transition-colors icons inline-flex items-center hover:underline texto-light tooltip gap-2 whitespace-nowrap" data-tooltip="${cont.coffee}">
              <span class="icon-footer footer-pay bg-current inline-block" 
                style="-webkit-mask: url('${cont.icocoffee}') center / contain no-repeat; mask: url('${cont.icocoffee}') center / contain no-repeat;">
              </span>
              <span>${cont.coffee}</span>
            </a>

            <a href="${cont.linpix}" target="_blank" rel="noopener noreferrer" class="transition-colors icons inline-flex items-center hover:underline texto-light tooltip gap-2 whitespace-nowrap" data-tooltip="${cont.livepix}">
              <span class="icon-footer footer-pay bg-current inline-block" 
                style="-webkit-mask: url('${cont.icopix}') center / contain no-repeat; mask: url('${cont.icopix}') center / contain no-repeat;">
              </span>
              <span>${cont.livepix}</span>
            </a>

            <a href="${cont.linapoia}" target="_blank" rel="noopener noreferrer" class="transition-colors icons inline-flex items-center hover:underline texto-light tooltip gap-2 whitespace-nowrap" data-tooltip="${cont.apoia}">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon-footer footer-pay" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span class="sr-only">${cont.apoia}</span>
              ${cont.apoia}
            </a>
          </div>

          <div class="text-center text-sm mt-4 texto-suave">
            Wendel Tytan
          </div>

          <div class="text-center text-sm texto-suave">
            &copy; <span id="year"></span> ${cont.etc}
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading Contact:", error);
  }
  document.getElementById('year').textContent = new Date().getFullYear();
}

function updateIframe() {
  const iframe = document.getElementById("the_iframe");
  const screenWidth = window.visualViewport?.width || document.documentElement.clientWidth;
  let width, height, updates;

  if (screenWidth <= 413) {
    width = 160;
    height = 400;
    updates = 6;
  } else if (screenWidth <= 414) {
    width = 220;
    height = 530;
    updates = 5;
  } else if (screenWidth <= 480) {
    width = 280;
    height = 692;
    updates = 9;
  } else if (screenWidth <= 768) {
    width = 230;
    height = 750;
    updates = 9;
  } else if (screenWidth <= 1024) {
    width = 335;
    height = 800;
    updates = 11;
  } else if (screenWidth <= 1280) {
    width = 460;
    height = 790;
    updates = 15;
  } else if (screenWidth <= 1440) {
    width = 500;
    height = 790;
    updates = 15;
  } else if (screenWidth <= 1920) {
    width = 630;
    height = 790;
    updates = 15;
  } else if (screenWidth <= 2560) {
    width = 630;
    height = 790;
    updates = 16;
  } else {
    width = 630;
    height = 790;
    updates = 15;
  }

  iframe.width = width;
  iframe.height = height;
  iframe.src = `https://goodreads.com/widgets/user_update_widget?height=${height}&num_updates=${updates}&user=190298199&width=${width}`;
}

function tamanhoPlaylist() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 449) {
  return 6;
  } else if (screenWidth <= 480) {
  return 10;
  } else if (screenWidth <= 768) {
  return 21;
  } else if (screenWidth <= 1280) {
  return 22;
  } else if (screenWidth <= 1440) {
  return 22;
  } else if (screenWidth <= 2560) {
  return 21;
  } else if (screenWidth <= 3000) {
  return 22;
  } else {
  return 22;
  }
}

function updateLastFM() {
  const user = "wendeltytan";
  const apiKey = "5baf229838e9ac9f5d35ccdc53d6e444";
  const limit = tamanhoPlaylist();
  carregarFaixas(user, apiKey, limit);
}

window.addEventListener("load", () => {
  updateIframe();
  updateLastFM(); // ou qualquer outro carregamento que depende da renderização total
});

window.addEventListener("resize", () => {
  clearTimeout(window._resizeTimeout);
  window._resizeTimeout = setTimeout(() => {
    updateIframe();
    updateLastFM(); // se quiser atualizar também com o resize
  }, 200);
});

// Load all data when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  highlightActiveSection();

  const overlay = document.getElementById("intro-overlay");
  const btnEntrar = document.getElementById("btn-entrar");
  const video = document.getElementById("video-porta");
  const site = document.getElementById("conteudo-site");

  btnEntrar.addEventListener("click", () => {
    // 1. Pede tela cheia real
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((e) => console.log(e));
    }

    // 2. Esconde o botão e mostra o vídeo
    btnEntrar.style.display = "none";
    video.style.opacity = "1";
    
    // 3. Dá o play
    video.play();

    // 4. Fica escutando o momento exato que o vídeo acaba
    video.addEventListener("ended", () => {
      
      // --- NOVA ADIÇÃO AQUI ---
      // Verificamos se o navegador está em tela cheia e se o método existe
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => console.log("Saiu da tela cheia automaticamente."))
          .catch((e) => console.log("Erro ao tentar sair da tela cheia:", e));
      }
      // ------------------------

      // Efeito de fade out na tela preta para o site aparecer suavemente
      overlay.style.transition = "opacity 1s ease";
      overlay.style.opacity = "0";

      // Mostra o site por baixo
      site.style.display = "block";

      // Remove a div da intro do HTML depois do fade terminar (limpeza)
      setTimeout(() => {
        overlay.remove();
      }, 1000);
    });
  });

});

// Mudança de idioma
document.getElementById("language-selector").addEventListener("change", async (event) => {
  const selectedLang = event.target.value;
    
  // Converte "pt" para "pt-BR" ao salvar
  const newLang = selectedLang === "pt" ? "pt-BR" : selectedLang;

  // Muda o idioma no i18next (i18next deve receber "pt" ao invés de "pt-BR")
  await i18next.changeLanguage(selectedLang === "pt" ? "pt" : newLang);

  // Atualiza o atributo lang no <html>
  document.documentElement.setAttribute("lang", newLang);

  // Salva o idioma no localStorage
  localStorage.setItem("lang", newLang);
});

i18next.on("languageChanged", async () => {
  await i18next.loadNamespaces([
    "about","contact","courses","experience",
    "formations","hero","more",
    "projects","tabletop-projects", "etc"
  ]);

  await loadFormations();
  await loadHero();
  await loadAbout();
  await loadMore();
  await loadContact();
  await loadExperiences();
  await loadCourses();
  await loadProjects();
  await loadTabletopProjects();
  await loadTexts();
});

document.addEventListener("DOMContentLoaded", async () => {

    // Tenta obter o idioma salvo ou usa "pt-BR" como padrão
    let savedLang = localStorage.getItem("lang") || "pt-BR";
  
    // Garante que o i18next use "pt" em vez de "pt-BR"
    const i18nextLang = savedLang === "pt-BR" ? "pt" : savedLang;
  
    // Muda o idioma no i18next
    await i18next.changeLanguage(i18nextLang);
    
    // Atualiza o atributo lang no <html>
    document.documentElement.setAttribute("lang", savedLang);
  
    // Atualiza o seletor de idioma com o valor correto
    document.getElementById("language-selector").value = i18nextLang;
  updateLastFM();
  await updateIframe();
});