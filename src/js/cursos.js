import i18next from "./i18n.js";

console.log(window.screen.width, window.screen.height);
console.log(window.innerWidth, window.innerHeight);
console.log(document.documentElement.scrollWidth, document.documentElement.scrollHeight);

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
    console.log("if")
      document.documentElement.classList.add("dark");
      moonIcon.classList.remove("hidden");
      sunIcon.classList.add("hidden");
      // localStorage.setItem("theme", "dark");
  } else {
    console.log("else")
      document.documentElement.classList.remove("dark");
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
      // localStorage.setItem("theme", "light");
  }
  localStorage.setItem("theme", theme);
  colors = getColorsByTheme(theme);
  console.log("Cores carregadas:", colors);
  applyColors();
  // adjustTextColor();
}

// Inicialização do tema com base no localStorage
const savedTheme = localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

setTheme(savedTheme);

// const colors = getColorsByTheme(theme);

// Alternância de tema ao clicar no botão
themeToggle.addEventListener("click", () => {
  const newTheme = document.documentElement.classList.contains("dark")
  ? "light"
  : "dark";
  setTheme(newTheme);
});

async function loadTexts() {
  try {

    console.log("Carregando textos no idioma:", i18next.language);

    // Carrega novamente as traduções no idioma atual
    i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0];

    // console.log("Novo objeto etc:", etc); // Para debugar
    
    document.getElementById("id-do-inicio").textContent = etc.inicio;
    document.getElementById("id-do-sobre").textContent = etc.sobre;
    document.getElementById("id-do-form").textContent = etc.formacao;
    document.getElementById("id-do-exp").textContent = etc.experiencia;
    document.getElementById("id-do-cur").textContent = etc.cursos;
    document.getElementById("id-do-proj").textContent = etc.projetos;
    document.getElementById("id-do-mais").textContent = etc.mais;
    document.getElementById("id-do-other").textContent = etc.ouprojetos;
    document.getElementById("id-do-contact").textContent = etc.contato;
    // document.getElementById("id-do-form").textContent = etc.p1;
    // document.getElementById("id-do-portfolio").textContent = etc.p1;

    // document.getElementById("idioma").textContent = etc.idioma;

  } catch (error) {
    console.error("Error loading Texts:", error);
  }
}



// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu');
const sidebar = document.querySelector('.sidebar');
// 
// 
// 

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
    
    // Only try to add/remove class if the sidebar item exists
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

// 1. Primeiro, modifique a função setupSearchFilter para aceitar um callback de atualização
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
    <div class="cursos_resum">
      <div class="flex flex-col space-y-2 p-3 rounded-md">
        ${typeSummaryHtml}
      </div>
    </div>
  `;
}

// Load and render Courses atualizada para o i18next Atualizado
async function loadCourses() {
  try {
    console.log("Carregando courses...");

    // --- MURAL DE BADGES (NOVO CÓDIGO AQUI) ---
    console.log("Carregando badges...");
    
    await i18next.loadNamespaces("courses");
    const courses = i18next.t("courses:courses", { returnObjects: true });

    await i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0]; 

    await i18next.loadNamespaces("badges");
    const badges = i18next.t("badges:badges", { returnObjects: true });
    
    // if (!coursesContainer) {
      //   console.error("Elemento #courses .grid não encontrado!");
      //   return;
      // }
      
      if (!Array.isArray(courses)) {
        console.error("Courses data is not an array:", courses);
        return;
      }

      // Para teste imediato com o JSON que você forneceu:
      // const badgesData = [
      //     { "id": 1, "imagem": "./src/images/badges/Alura - Badge Alura-Oracle-Ifood One.png", "titulo": "Alura - Alura-Oracle-Ifood One - Badge" },
      //     // ... (o restante do seu array de badges) ...
      // ];


  
      const competencyCount = {};
      const competencyColorMap = {};
      const instituicaoCount = {};
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

      if (course.instituicao) {
        instituicaoCount[course.instituicao] = (instituicaoCount[course.instituicao] || 0) + 1;
      }

    });

    // Seleciona o container principal da seção de cursos
    const coursesSection = document.getElementById("courses");

    if (!coursesSection) {
      console.error("Elemento #courses não encontrado!");
      return;
    }
    
    // Define o HTML inicial com o cabeçalho (para garantir que seja inserido apenas uma vez)
    coursesSection.innerHTML = `
        <div class="container mx-auto px-6 padding_box">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center texto-light">
            ${etc.cur_1} <span class="texto-high">${etc.cur_2}</span>
          </h2>

          <!-- Search Bar -->
          <div id="pesquisa" class="max-w-md mx-auto mb-8">
            <div class="relative">
              <input 
                type="text" 
                id="course-search"
                placeholder="${etc.placeholdercursos}"
                class="w-full px-4 py-2 rounded-lg border border-b-2 pl-10
                cor-prin search-theme texto-suave"
              >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
              class="icon-search texto-light absolute left-3 top-1/2 transform -translate-y-1/2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>          

          <!-- Filtros -->
          <div class="filters-container mb-8 container">
            <div class="">
              <!-- Filtro por Tipo - Agora ordenado -->
              <div class="filter-group">
                <h3 class="text-lg font-semibold mb-2 texto-high">${etc.filter_type}</h3>
                <div class="flex flex-wrap gap-2">
                  ${Object.keys(courseTypeCount)
                    .sort((a, b) => a.localeCompare(b)) // Ordena os tipos alfabeticamente instituicao
                    .map(tipo => `
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="filter-checkbox tipo-checkbox" value="${tipo.toLowerCase()}">
                      <span class="ml-2 texto-suave">${tipo}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
              
          <div class="filters-container mb-8 container">
            <div class="flex flex-wrap justify-center gap-4 mb-4">
              <!-- Filtro por Competência - Agora ordenado -->
              <div class="filter-group">
                <h3 class="text-lg font-semibold mb-2 texto-high">${etc.filter_comp}</h3>
                <div class="flex flex-wrap gap-2">
                  ${Object.keys(competencyCount)
                    .sort((a, b) => a.localeCompare(b)) // Ordena as competências alfabeticamente
                    .map(comp => `
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="filter-checkbox comp-checkbox" value="${comp.toLowerCase()}">
                      <span class="ml-2 texto-suave">${comp}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <div class="filters-container mb-8 container">
            <div class="filter-group">
              <h3 class="text-lg font-semibold mb-2 texto-high">${etc.filter_int}</h3>
              <div class="flex flex-wrap gap-2">
                ${Object.keys(instituicaoCount)
                  .sort((a, b) => a.localeCompare(b))
                  .map(inst => `
                    <label class="inline-flex items-center">
                      <input type="checkbox" class="filter-checkbox inst-checkbox" value="${inst.toLowerCase()}">
                      <span class="ml-2 texto-suave">${inst}</span>
                    </label>
                  `).join('')}
              </div>
            </div>
          </div>
            
          <!-- Botão para selecionar todos -->
          <div class="text-center">
            <button id="select-all-filters" class="px-4 py-2 rounded-lg texto-high fundo-suave hover:opacity-90 transition mr-2">
              ${etc.selectall}
            </button>
            <button id="clear-filters" class="px-4 py-2 rounded-lg texto-high fundo-suave hover:opacity-90 transition">
              ${etc.clearall}
            </button>
          </div>

          <div class="grid scroll-site">
              <div class="resum_resum">
              </div>
          </div>
          <div class="cont_comp">
          </div>
        </div>
    `;

    const coursesContainer = document.querySelector("#courses .grid");
    console.log("Elemento encontrado?", coursesContainer);

    coursesContainer.innerHTML = courses
      .map(
        (cor) => { //mix-blend-difference era para ser bom
          const competenciesHtml = cor.competencies.map(comp => 
            `<span class="dynamic-text dynamic-color inline-block px-3 py-1 rounded-full text-sm ${competencyColorMap[comp]} m-1">${comp}</span>`
          ).join('');
    
          return `
            <div class="certificate-${cor.tipoClean} card p-6 rounded-lg border fundo-light"
                data-tipo="${cor.tipo.toLowerCase()}"
                data-competencias="${cor.competencies.map(c => c.toLowerCase()).join(',')}"
                data-instituicao="${cor.instituicao.toLowerCase()}"
                >
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

      // Load and render Resumo atualizada para o i18next

      console.log("Carregando resum etc...");
    
      //await i18next.loadNamespaces("etc");
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
              <div class="cursos_resum">
                <div class="flex flex-col space-y-2 p-3 rounded-md">
                  ${typeSummaryHtml}
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      coursesContainer.innerHTML += resumHtml;


      // 
      // 
      setupFilterCheckboxes();
      updateResumoWithFilters(courseTypeCount, [], [], courses.length);
      // 
      // 


      // Load and render Competecias atualizada para o i18next

      console.log("Carregando compe etc...");
    
      //await i18next.loadNamespaces("etc");
      const compe = i18next.t("etc:comp", { returnObjects: true }); 
      //const compe = i18next.t("etc:comp", { returnObjects: true })[0]; //usado caso eu n'a oqueira iterar pelo json e pegar e converter em array e pegar algum em especifico com resum.*nome da coluna* ex> resum.text1 
      
      const compeContainer = document.querySelector("#courses .cont_comp"); //
      console.log("Elemento encontrado?", compeContainer);

      compeContainer.innerHTML = compe
      .map(
        (cont) => {
          const competencyCountHtml = Object.entries(competencyCount)
          .map(([comp, count]) => {
            const colorClass = competencyColorMap[comp]; //não gostei do mix bled difference, parece meio turvo
            return `<span class="dynamic-text dynamic-color inline-block m-1 px-4 py-2 rounded-lg ${colorClass}">${comp}: ${count}</span>`;
          })
          .join(''); //bg-[#1A1F2C]

          return `
            <div class="cont_comp mt-8 text-center">
              <div class="inline-block px-6 py-3 rounded-lg border-2 glow-borda fundo-light">
              <p class="text-lg mb-2 font-bold texto-high">${cont.contagem}</p>
              <div class="flex flex-wrap justify-center gap-2">
                ${competencyCountHtml}
              </div>
            </div>
          `;
      })
      .join("");
      coursesContainer.insertAdjacentElement('afterend', compeContainer); //acho que não precisa, já que a div está criada no html

      // 2. Criar o container do Mural
      const badgesSection = document.createElement('div');
      badgesSection.id = "badges-mural";
      badgesSection.className = "container mx-auto"; 

      // 3. Gerar o HTML dos Badges
      if (badges && Array.isArray(badges)) {
        const badgesGridHtml = badges.map(badge => {
        // Substitui o ".src/" (ou "./src/") inicial por "../../src/"
        const caminhoCorrigido = badge.imagem.replace(/^\.?\/?src/, '../../src');
        //fundo-light
        return `
            <div class="badge-item flex flex-col items-center justify-start rounded-xl transition-transform hover:scale-105 hover:border-white/30 group cursor-pointer" title="${badge.titulo}">
                <div class="badges-ico w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-3 shrink-0">
                    <img 
                        src="${caminhoCorrigido}" 
                        alt="${badge.titulo}" 
                        class="badges-img max-w-full max-h-full object-contain filter drop-shadow-md group-hover:drop-shadow-xl transition-all" 
                        loading="lazy"
                    >
                </div>
                <p class="vitralEspec bordasBadges badgesPadding text-center texto-suave w-full px-2 break-words">
                    ${badge.titulo}
                </p>
            </div>
        `;
        }).join('');

        badgesSection.innerHTML = `
            <h3 class="text-2xl font-bold mb-8 text-center texto-high badgesTexto">${etc.badges}</h3>
            <div class="scroll-site grid-Badges">
                ${badgesGridHtml}
            </div>
        `;
      

        // 4. Inserir DEPOIS de tudo (após a seção #courses ou após o container de competencias)
        // Como o compeContainer foi inserido com insertAdjacentElement('afterend', ...), 
        // vamos inserir o mural logo após ele para manter a ordem.
        const compeContainer = document.querySelector(".cont_comp");
        if (compeContainer && compeContainer.parentNode) {
             compeContainer.insertAdjacentElement('afterend', badgesSection);
        } else {
             // Fallback: insere no final da seção courses
             document.getElementById("courses").appendChild(badgesSection);
        }
    }
      
      // 3. Modifique a chamada em loadCourses
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

function setupFilterCheckboxes() {
  const tipoCheckboxes = document.querySelectorAll('.tipo-checkbox');
  const compCheckboxes = document.querySelectorAll('.comp-checkbox');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const selectAllBtn = document.getElementById('select-all-filters');
  const instCheckboxes = document.querySelectorAll('.inst-checkbox');

  
  // Flag para controlar se os filtros foram inicializados
  let filtersInitialized = false;

  // Função para aplicar os filtros
  function applyFilters() {

    const selectedTipos = Array.from(tipoCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());
    
    const selectedComps = Array.from(compCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    const selectedInsts = Array.from(instCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());


    // Só aplica filtros após a primeira interação
    if (!filtersInitialized && selectedTipos.length === 0 && selectedComps.length === 0) {
      return;
    }

    // const selectedTipos = Array.from(tipoCheckboxes)
    //   .filter(cb => cb.checked)
    //   .map(cb => cb.value.toLowerCase());
    
    // const selectedComps = Array.from(compCheckboxes)
    //   .filter(cb => cb.checked)
    //   .map(cb => cb.value.toLowerCase());

    const cards = document.querySelectorAll('#courses .grid .card:not(.resum_resum)');
    const filteredCounts = {};
    let totalFiltered = 0;

    cards.forEach(card => {
      const cardTipo = (card.getAttribute('data-tipo') || '').toLowerCase();
      const cardComps = (card.getAttribute('data-competencias') || '')
                        .split(',')
                        .map(comp => comp.trim().toLowerCase());
      const cardInst = (card.getAttribute('data-instituicao') || '').toLowerCase();


      const shouldShow = 
        (selectedTipos.length === 0 || selectedTipos.includes(cardTipo)) &&
        (selectedComps.length === 0 || cardComps.some(comp => selectedComps.includes(comp))) &&
        (selectedInsts.length === 0 || selectedInsts.includes(cardInst));


      card.style.display = shouldShow ? 'block' : 'none';

      if (shouldShow) {
        totalFiltered++;
        filteredCounts[cardTipo] = (filteredCounts[cardTipo] || 0) + 1;
      }
    });

    // Atualiza o resumo apenas se houver filtros ativos ou após inicialização
    if (filtersInitialized || selectedTipos.length > 0 || selectedComps.length > 0) {
      updateResumoWithFilters(filteredCounts, selectedTipos, selectedComps, totalFiltered);
    }

    console.log('selectedTipos:', selectedTipos); 
    console.log('selectedComps:', selectedComps);

  }

  // Configura event listeners com a flag de inicialização
  function setupEventListeners() {
    const handleFilterChange = () => {
      if (!filtersInitialized) {
        filtersInitialized = true;
        // Remove o resumo inicial quando o usuário interage pela primeira vez
        const initialResumo = document.querySelector('.resum_resum[data-initial]');
        if (initialResumo) initialResumo.remove();
      }
      applyFilters();
    };

    tipoCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleFilterChange);
    });

    compCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleFilterChange);
    });

    instCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleFilterChange);
    });


    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
          checkbox.checked = false;
        });
        handleFilterChange();
      });
    }

    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
          checkbox.checked = true;
        });
        handleFilterChange();
      });
    }
  }

  // Inicializa sem aplicar filtros
  function initialize() {
    // Mostra todos os cards inicialmente
    const cards = document.querySelectorAll('#courses .grid .card:not(.resum_resum)');
    cards.forEach(card => {
      card.style.display = 'block';
    });
    
    // Configura os listeners mas não aplica filtros ainda
    setupEventListeners();
  }

  // Inicializa o sistema de filtros
  initialize();

  console.log('Tipos:', tipoCheckboxes.length);
  console.log('Comps:', compCheckboxes.length);

}

function updateResumoWithFilters(
  filteredCounts,
  selectedTypes,
  selectedComps,
  selectedInsts,
  totalFiltered
) 
{
  console.log('Atualizando resumo com:', {filteredCounts, selectedTypes, selectedComps, totalFiltered});
  const resumContainer = document.querySelector('.resum_resum');
  if (!resumContainer) return;
  
  const resum = i18next.t("etc:resum", { returnObjects: true });
  const etc = i18next.t("etc:texto", { returnObjects: true })[0];

  // Se não há filtros ativos, mostra o resumo completo inicial
  if (
  selectedTypes.length === 0 &&
  selectedComps.length === 0 &&
  selectedInsts.length === 0
  ) 
  {
    // Restaura o resumo inicial (como em loadCourses)
    const typeSummaryHtml = Object.entries(courseTypeCount)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([tipo, count]) => {
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
        <div class="cursos_resum">
          <div class="flex flex-col space-y-2 p-3 rounded-md">
            ${typeSummaryHtml}
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Cria o cabeçalho do resumo com filtros ativos
  // let filtersHeader = '';
  // if (selectedTypes.length > 0 || selectedComps.length > 0) {
  //   filtersHeader = `
  //     <div class="mb-4 p-3 rounded-lg fundo-suave">
  //       <h4 class="font-semibold texto-high mb-2">Filtros Ativos:</h4>
  //       ${selectedTypes.length > 0 ? `
  //         <p class="text-sm"><span class="font-medium">Tipos:</span> ${selectedTypes.join(', ')}</p>
  //       ` : ''}
  //       ${selectedComps.length > 0 ? `
  //         <p class="text-sm"><span class="font-medium">Competências:</span> ${selectedComps.map(comp => comp.charAt(0).toUpperCase() + comp.slice(1)).join(', ')}</p>
  //       ` : ''}
  //       <p class="text-sm mt-2"><span class="font-medium">Total:</span> ${totalFiltered} cursos</p>
  //     </div>
  //   `;

  // }
  
  // Cria o resumo por tipo para os filtros ativos
  const typeSummaryHtml = Object.entries(filteredCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tipo, count]) => {
      const tipoFormatado = tipo.charAt(0).toUpperCase() + tipo.slice(1);
      return `
        <p class="text-sm">
          <strong class="texto-high">${tipoFormatado}:</strong> 
          <span class="contraste">${count}</span> <span class="texto-high">${resum[0].res_cur}</span>
        </p>`;
    })
    .join('');
  
  resumContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-3 text-center texto-high">${resum[0].resumo}</h3>
      <div class="cursos_resum">
        <div class="flex flex-col space-y-2 p-3 rounded-md">
          ${typeSummaryHtml}
        </div>
      </div>
    </div>
  `;
}

// Load and render Contact atualizada para o i18next Atualizado
async function loadContact() {
  try {
    console.log("Carregando contato...");
    
    await i18next.loadNamespaces("contact");
    const contact = i18next.t("contact:contact", { returnObjects: true });

    await i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true })[0];    
    
    // if (!contactContainer) {
    //   console.error("Elemento #contact .footer_contact não encontrado!");
    //   return;
    // }
      
    if (!Array.isArray(contact)) {
      console.error("Contact data is not an array:", contact);
      return;
    }

    // Seleciona o container principal da seção de contato
    const contactSection = document.getElementById("contact");
    
    if (!contactSection) {
      console.error("Elemento #contact não encontrado!");
      return;
    }
    
    // Define o HTML inicial com o cabeçalho (para garantir que seja inserido apenas uma vez)
    contactSection.innerHTML = `
        <div class="container mx-auto px-6">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center texto-light">
            ${etc.contato_1} <span class="texto-high">${etc.contato_2}</span>
          </h2>
          <div class="footer_contact">
          </div>
        </div>
    `;

    const contactContainer = document.querySelector("#contact .footer_contact");
    console.log("Elemento encontrado?", contactContainer);
      
    contactContainer.innerHTML = contact
      .map(
        (cont) => `
        <div class="flex justify-center space-x-8">
          <a href="${cont.lingit}" target="_blank" rel="noopener noreferrer" class="transition-colors icons tooltip" data-tooltip="${cont.git}">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-footer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span class="sr-only">${cont.git}</span>
          </a>
          <a href="${cont.linln}" target="_blank" rel="noopener noreferrer" class="transition-colors icons tooltip" data-tooltip="${cont.ln}">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-footer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span class="sr-only">${cont.ln}</span>
          </a>
          <a href="${cont.linemail}" class="transition-colors icons tooltip" data-tooltip="${cont.email}">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-footer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span class="sr-only">${cont.email}</span>
          </a>
        </div>
        <div class="text-center text-sm mt-4 texto-suave">
          &copy; <span id="year"></span> ${cont.etc}.
        </div>
        <div class="text-center text-sm mt-4 texto-suave">
          ${cont.patreon}.
        </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading Contact:", error);
  }
  document.getElementById('year').textContent = new Date().getFullYear();
}


// Load all data when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // loadHero();
  // loadAbout();
  // loadMore();
  // loadContact();
  // loadExperiences();
  // loadCourses();
  // loadProjects();
  // loadTabletopProjects();
  // loadComp();
  // Initial highlight check
  highlightActiveSection();
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

  console.log("Idioma alterado para:", newLang);

});

i18next.on("languageChanged", async () => {
  await i18next.loadNamespaces([
    "contact","courses", "etc"
  ]);

  // await loadFormations();
  // await loadHero();
  // await loadAbout();
  // await loadMore();
  await loadContact();
  // await loadExperiences();
  await loadCourses();
  // await loadProjects();
  // await loadTabletopProjects();
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

  // await loadFormations();
  // await loadHero();
  // await loadAbout();
  // await loadMore();
  // await loadContact();
  // await loadExperiences();
  // await loadCourses()
  /*.then(() => colora())*/;
  // await loadProjects();
  // await loadTabletopProjects();
  // await loadTexts();
});

/////////////////////////////////