import i18next from "./i18n.js";

let etcPromise = i18next.loadNamespaces("etc").then(() => {
  return i18next.t("etc:texto", { returnObjects: true })[0];
});
let etc; 

// 
// 
// 

window.toggleGrayscale = function () {
  document.documentElement.style.filter =
    document.documentElement.style.filter === "grayscale(100%)"
      ? "none"
      : "grayscale(100%)";
};

// 
// 
//

  // const sidebar = document.getElementById("sidebar");

  //   sidebar.addEventListener("mouseenter", () => {
  //     // Calcula a largura do maior texto dentro da sidebar
  //     const spans = sidebar.querySelectorAll("span");
  //     let maxWidth = 0;

  //     spans.forEach(span => {
  //       const width = span.offsetWidth;
  //       if (width > maxWidth) {
  //         maxWidth = width;
  //       }
  //     });

  //     // Aplica a largura correta
  //     sidebar.style.width = `${maxWidth + 60}px`; // 60px para os ícones + espaçamento
  //     spans.forEach(span => span.style.opacity = "1");
  //   });

  //   sidebar.addEventListener("mouseleave", () => {
  //     sidebar.style.width = "4rem"; // Volta ao tamanho original
  //     sidebar.querySelectorAll("span").forEach(span => span.style.opacity = "0");
  //   });

// 
// 
// 

const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");

function setTheme(theme) {
      if (theme === "dark") {
        console.log("if")
          document.documentElement.classList.add("dark");
          moonIcon.classList.remove("hidden");
          sunIcon.classList.add("hidden");
          localStorage.setItem("theme", "dark");
      } else {
        console.log("else")
          document.documentElement.classList.remove("dark");
          sunIcon.classList.remove("hidden");
          moonIcon.classList.add("hidden");
          localStorage.setItem("theme", "light");
      }
  }

  // Inicialização do tema com base no localStorage
  const savedTheme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  setTheme(savedTheme);

  // Alternância de tema ao clicar no botão
  themeToggle.addEventListener("click", () => {
      const newTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
      setTheme(newTheme);
});

async function loadTexts() {
  try {

    console.log("Carregando textos no idioma:", i18next.language);

    // Carrega novamente as traduções no idioma atual
    await i18next.loadNamespaces("etc");
    const etc = i18next.t("etc:texto", { returnObjects: true });

    console.log("Novo objeto etc:", etc); // Para debugar
    
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

    document.getElementById("idioma").textContent = etc.idioma;

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




// Load and render Hero atualizada para o i18next Atualizado
async function loadHero() {
  try {
    console.log("Carregando hero...");
    
    await i18next.loadNamespaces("hero");
    const hero = i18next.t("hero:hero", { returnObjects: true });
    
    const heroContainer = document.querySelector("#home .hero_hero");
    console.log("Elemento encontrado?", heroContainer);
    
    if (!heroContainer) {
      console.error("Elemento #home .hero_hero não encontrado!");
      return;
    }

    if (!Array.isArray(hero)) {
      console.error("Hero data is not an array:", hero);
      return;
    }

    heroContainer.innerHTML = hero
      .map(
        (her) => `
      <h1 class="text-4xl md:text-6xl font-bold mb-6 escuro-light claro-light">
              ${her.part1}<span class="escuro-high claro-high">${her.nome}</span>
            </h1>
            <p class="text-xl md:text-2xl mb-8 escuro-suave claro-suave">
              ${her.titulo}
            </p>
            <div class="flex justify-center space-x-6">
              <a href="${her.linkgit}" target="_blank" rel="noopener noreferrer" class="transition-colors escuro-icons claro-icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="${her.linklinked}" target="_blank" rel="noopener noreferrer" class="transition-colors escuro-icons claro-icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="${her.linkinsta}" class="transition-colors escuro-icons claro-icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
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
    console.log("Carregando about...");
    
    await i18next.loadNamespaces("about");
    const about = i18next.t("about:about", { returnObjects: true });
    
    
    // if (!aboutContainer) {
    //   console.error("Elemento #about .about_about não encontrado!");
    //   return;
    // }
    
    if (!Array.isArray(about)) {
      console.error("About data is not an array:", about);
      return;
    }
    
    
    // Seleciona o container principal da seção de about
    const aboutSection = document.getElementById("about");
    
    if (!aboutSection) {
      console.error("Elemento #about não encontrado!");
      return;
    }
    
    // Define o HTML inicial com o cabeçalho (para garantir que seja inserido apenas uma vez)
    aboutSection.innerHTML = `
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center escuro-light claro-light">
        ${etc.sobre_1} <span class="escuro-high claro-high">${etc.mim_1}</span>
        </h2>
        <div class="about_about">
        </div>
      </div>
    `;
    
    const aboutContainer = document.querySelector("#about .about_about");
    console.log("Elemento encontrado?", aboutContainer);
    
    aboutContainer.innerHTML = about.map((abo) => {
    const aboutHtml = abo.competencies.map(aboutcomp =>
      `<span class="px-4 py-2 rounded-full escuro-high escuro-comp claro-high claro-comp">${aboutcomp}</span>`
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
              <p class="escuro-light claro-light">
                ${abo.p1}
              </p>
              <p class="escuro-light claro-light">
                ${abo.p2}
              </p>
              <div class="flex flex-wrap gap-4">
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
    console.log("Carregando formações...");
    
    await i18next.loadNamespaces("formations");
    const formations = i18next.t("formations:formations", { returnObjects: true });
    
    // if (!formationsContainer) {
    //   console.error("Elemento #formations .space-y-8 não encontrado!");
    //   return;
    // }
    
    if (!Array.isArray(formations)) {
      console.error("Formations data is not an array:", formations);
      return;
    }

    // Seleciona o container principal da seção de formações
    const formationsSection = document.getElementById("formation");
    
    if (!formationsSection) {
      console.error("Elemento #formation não encontrado!");
      return;
    }
    
    // Define o HTML inicial com o cabeçalho (para garantir que seja inserido apenas uma vez)
    formationsSection.innerHTML = `
        <div class="container mx-auto px-6">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center escuro-light claro-light">
            ${etc.minha_1}<span class="escuro-high claro-high">${etc.formacao}</span>
          </h2>
          <div class="space-y-8">
          </div>
        </div>
    `;
    
    const formationsContainer = document.querySelector("#formation .space-y-8");
    console.log("Elemento encontrado?", formationsContainer);
    
    formationsContainer.innerHTML = formations
      .map(
        (form) => `
        <div class="space-y-8">
          <div class="p-6 rounded-lg escuro-fundo escuro-glow claro-fundo claro-glow">
            <h3 class="text-xl font-semibold escuro-high claro-high">${form.degree}</h3>
            <p class="escuro-suave claro-suave">${form.institution} • ${form.period}</p>
            <p class="mt-4 escuro-light claro-light">${form.description}</p>
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
    console.log("Carregando experience...");
    
    await i18next.loadNamespaces("experience");
    const experience = i18next.t("experience:experience", { returnObjects: true });
    
    
    // if (!experienceContainer) {
      //   console.error("Elemento #experience .space-y-8 não encontrado!");
      //   return;
      // }
      
      if (!Array.isArray(experience)) {
        console.error("Experience data is not an array:", experience);
        return;
      }

    // Seleciona o container principal da seção de Experienca
    const experienceSection = document.getElementById("experience");
    
    if (!experienceSection) {
      console.error("Elemento #experience não encontrado!");
      return;
    }
    
    // Define o HTML inicial com o cabeçalho (para garantir que seja inserido apenas uma vez)
    experienceSection.innerHTML = `
        <div class="container mx-auto px-6">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center escuro-light claro-light">
            ${etc.minha_1}<span class="escuro-high claro-high">${etc.minha_1}</span>
          </h2>
          <div class="space-y-8">
          </div>
        </div>
    `;

    const experienceContainer = document.querySelector("#experience .space-y-8");
    console.log("Elemento encontrado?", experienceContainer);
      
    experienceContainer.innerHTML = experience
      .map(
        (exp) => `
      <div class="p-6 rounded-lg escuro-fundo escuro-glow claro-fundo claro-glow">
        <h3 class="text-xl font-semibold escuro-high claro-high">${exp.title}</h3>
        <p class="escuro-suave claro-suave">${exp.company} • ${exp.period}</p>
        <p class="mt-4 escuro-light claro-light">${exp.description}</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading Experience:", error);
  }
}

  // Colors for competencies
  const colors = [
    'bg-[#8B5CF6]', 'bg-[#D946EF]', 'bg-[#F97316]', 'bg-[#0EA5E9]',
    'bg-[#F2FCE2]', 'bg-[#FEF7CD]', 'bg-[#FEC6A1]', 'bg-[#E5DEFF]',
    'bg-[#FFDEE2]', 'bg-[#FDE1D3]', 'bg-[#D3E4FD]', 'bg-[#1EAEDB]',
    'bg-[#33C3F0]', 'bg-[#9b87f5]', 'bg-[#ea384c]', 'bg-[#0FA0CE]'
  ];

  // Criando objeto para contar os tipos de curso
  const courseTypeCount = {};

// Load and render Courses atualizada para o i18next Atualizado
async function loadCourses() {
  try {
    console.log("Carregando courses...");
    
    await i18next.loadNamespaces("courses");
    const courses = i18next.t("courses:courses", { returnObjects: true });
    
    
    // if (!coursesContainer) {
      //   console.error("Elemento #courses .grid não encontrado!");
      //   return;
      // }
      
      if (!Array.isArray(courses)) {
        console.error("Courses data is not an array:", courses);
        return;
      }
      
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

    //
    if (course.type) {
      if (!courseTypeCount[course.type]) {
        courseTypeCount[course.type] = 0;
      }
      courseTypeCount[course.type]++;
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
        <div class="container mx-auto px-6">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center escuro-light claro-light">
            ${etc.minha_1}<span class="escuro-high claro-high">${etc.minha_1}</span>
          </h2>
          <div class="grid">
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
            `<span class="dynamic-text inline-block px-3 py-1 rounded-full text-sm ${competencyColorMap[comp]} m-1">${comp}</span>`
          ).join('');
    
          return `
            <div class="certificate-${cor.type} p-6 rounded-lg border escuro-fundo claro-fundo">
              <h3 class="text-xl font-semibold escuro-high claro-high">${cor.title}</h3>
              <p class="escuro-suave claro-suave">${cor.institution} • ${cor.year}</p>
              <p class="mt-2 escuro-light claro-light">${cor.description}</p>
              <p class="text-sm mt-2 escuro-suave claro-suave">${cor.hours}${cor.hours}h</p>
              <span class="inline-block mt-3 px-3 py-1 rounded-full text-sm escuro-high escuro-comp claro-high claro-comp">
                ${cor.type}
              </span>
              <div class="mt-4 flex flex-wrap gap-2">
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
            .map(([type, count]) => 
              `<p class="text-sm">
                <strong class="escuro-high claro-high">${type}:</strong> 
                <span class="escuro-contraste claro-contraste">${count}</span> ${res.text2}
              </p>`
            )
            .join('');

          return `
            <div class="resum_resum p-4 rounded-lg shadow-md escuro-fundo claro-fundo">
              <h3 class="text-xl font-bold mb-5 text-center escuro-high claro-high">${res.text1}</h3>
              <div class="flex flex-col items-center justify-center rounded-md">
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
            return `<span class="dynamic-text inline-block m-1 px-4 py-2 rounded-lg ${colorClass}">${comp}: ${count}</span>`;
          })
          .join(''); //bg-[#1A1F2C]

          return `
            <div class="cont_comp mt-8 text-center">
              <div class="inline-block px-6 py-3 rounded-lg border-2 escuro-borda escuro-fundo claro-borda claro-fundo">
              <p class="text-lg mb-2 font-bold escuro-high claro-high">${cont.text1}</p>
              <div class="flex flex-wrap justify-center gap-2">
                ${competencyCountHtml}
              </div>
            </div>
          `;
      })
      .join("");
      coursesContainer.insertAdjacentElement('afterend', compeContainer); //acho que não precisa, já que a div está criada no html
  } catch (error) {
    console.error('Error loading courses:', error);
  }

  async function colora() {
  //para criar cor de texto dinamica invertendo a cor da fonte
  document.querySelectorAll('.dynamic-text').forEach(element => {
    try {
      //criar contorno

        const bgColor = window.getComputedStyle(element).backgroundColor;
        
        function getBrightness(rgb) {
            let match = rgb.match(/\d+/g);
            if (!match) throw new Error(`Cor inválida: ${rgb}`);
            let [r, g, b] = match.map(Number);
            return (r * 0.299 + g * 0.587 + b * 0.114); // Fórmula de luminosidade
        }
        
        const brightness = getBrightness(bgColor);
        element.style.color = brightness > 128 ? 'black' : 'white';

    } catch (error) {
        console.error(`Erro ao calcular a cor para o elemento:`, element, error);
    }
  });
  }

  setTimeout(() => colora(), 100);

}

// Load and render Projects atualizada para o i18next Atualizado
async function loadProjects() {
  try {
    console.log("Carregando projects...");
    
    await i18next.loadNamespaces("projects");
    const projects = i18next.t("projects:projects", { returnObjects: true });
    
    // if (!projectsContainer) {
    //   console.error("Elemento #projects-grid não encontrado!");
    //   return;
    // }
      
    if (!Array.isArray(projects)) {
      console.error("Projects data is not an array:", projects);
      return;
    }
      
    // Seleciona o container principal da seção de Projetos
    const projectsSection = document.getElementById("projects");
    
    if (!projectsSection) {
      console.error("Elemento #projects não encontrado!");
      return;
    }
    
    // Define o HTML inicial com o cabeçalho (para garantir que seja inserido apenas uma vez)
    projectsSection.innerHTML = `
        <div class="container mx-auto px-6">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center escuro-light claro-light">
            ${etc.minha_1}<span class="escuro-high claro-high">${etc.minha_1}</span>
          </h2>
          
          <!-- Search Bar -->
          <div id="pesquisa" class="max-w-md mx-auto mb-8">
            <div class="relative">
              <input 
                type="text" 
                id="project-search"
                placeholder="${etc.placeholder}"
                class="w-full px-4 py-2 rounded-lg border focus:outline-none pl-10
                escuro-prin escuro-cont claro-prin claro-cont escuro-suave escuro-place claro-suave claro-place"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 transform -translate-y-1/2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-8" id="projects-grid">
          </div>
        </div>
    `;

    const projectsContainer = document.querySelector("#projects-grid");
    console.log("Elemento encontrado?", projectsContainer);

    projectsContainer.innerHTML = projects
      .map(
        (project) => `
        <div class="rounded-lg overflow-hidden escuro-fundo escuro-glow claro-fundo claro-glow">
          <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-semibold escuro-high claro-high">${project.title}</h3>
            <p class="mt-2 escuro-light claro-light">${project.description}</p>
            <div class="mt-4 flex gap-2">
              ${project.technologies.map(tech => 
                `<span class="px-3 py-1 rounded-full text-sm escuro-high escuro-comp claro-high claro-comp">${tech}</span>`
              ).join('')}
            </div>
          </div>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error loading Projects:", error);
  }

  // Project search functionality
  //document.getElementById("project-search").placeholder = etc.placeholder;

  const projectSearch = document.getElementById('project-search');
  if (projectSearch) {
    projectSearch.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const projectCards = document.querySelectorAll('#projects-grid > div');
      
      projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

// Load and render More atualizada para o i18next Atualizado
async function loadMore() {
  try {
    console.log("Carregando more...");
    
    await i18next.loadNamespaces("more");
    const more = i18next.t("more:more", { returnObjects: true });
    
    
    // if (!moreContainer) {
    //   console.error("Elemento #more-about .more_about não encontrado!");
    //   return;
    // }
    
    if (!Array.isArray(more)) {
      console.error("More data is not an array:", more);
      return;
    }

    // Seleciona o container principal da seção de more
    const moreSection = document.getElementById("more-about");

    if (!moreSection) {
      console.error("Elemento #more-about não encontrado!");
      return;
    }
    
    // Define o HTML inicial com o cabeçalho (para garantir que seja inserido apenas uma vez)
    moreSection.innerHTML = `
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center escuro-light claro-light">
          ${etc.mais_sobre}<span class="escuro-high claro-high">${etc.mim_2}</span>
        </h2>
        <div class="more_about">
        </div>
      </div>
    `;

    const moreContainer = document.querySelector("#more-about .more_about");
    console.log("Elemento encontrado?", moreContainer);
    
    moreContainer.innerHTML = more
      .map(
        (mor) => {
          // Criando a lista corretamente
          const moreHtml = `
          <ul class="list-disc pl-5 space-y-2 escuro-light claro-light">
            ${mor.hobbies.map(morecomp => `<li>${morecomp}</li>`).join('')}
          </ul>
        `;    
          return `
                <div class="grid md:grid-cols-2 gap-8 mx-auto">
                  <div class="p-6 rounded-lg escuro-fundo claro-fundo">
                    <div class="flex items-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 escuro-high claro-high"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                      <h3 class="text-xl font-semibold escuro-high claro-high">${mor.part1}</h3>
                    </div>
                    
                      ${moreHtml}
                    
                  </div>
                  <div class="p-6 rounded-lg escuro-fundo claro-fundo">
                    <div class="flex items-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 escuro-high claro-high"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                      <h3 class="text-xl font-semibold escuro-high claro-high">${mor.part2}</h3>
                    </div>
                    <div class="space-y-4">
                      <iframe src="${mor.part4}" width="100%" height="152" frameborder="0" allowtransparency="true" allow="encrypted-media" class="rounded-lg escuro-light claro-light"></iframe>
                      <a href="${mor.part5}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center transition-colors escuro-light claro-light">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 escuro-light claro-light"><path d="M17 22v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="12" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        ${mor.part7}
                      </a>
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
    console.log("Carregando table top projects...");
    
    await i18next.loadNamespaces("tabletop-projects");
    const tableprojects = i18next.t("tabletop-projects:projects", { returnObjects: true });
    
    // if (!tableprojectsContainer) {
    //   console.error("Elemento #tabletop-projects .grid não encontrado!");
    //   return;
    // }
    
    if (!Array.isArray(tableprojects)) {
      console.error("Projects data is not an array:", tableprojects);
      return;
    }

    // Seleciona o container principal da seção de formações
    const tabletopSection = document.getElementById("tabletop-projects");

    if (!tabletopSection) {
      console.error("Elemento #tabletop-projects não encontrado!");
      return;
    }
    
    // Define o HTML inicial com o cabeçalho (para garantir que seja inserido apenas uma vez)
    tabletopSection.innerHTML = `
        <div class="container mx-auto px-6">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center escuro-light-inv claro-light-inv">
            ${etc.minha_1}<span class="escuro-high-inv claro-high-inv">${etc.minha_1}</span>
          </h2>
          <div class="grid md:grid-cols-2 gap-8">
          </div>
        </div>
    `;
      
    const tableprojectsContainer = document.querySelector("#tabletop-projects .grid");
    console.log("Elemento encontrado?", tableprojectsContainer);

    tableprojectsContainer.innerHTML = tableprojects
      .map( //bg-[#1A1F2C]
        (project) => `
        <div class="project-card rounded-lg overflow-hidden escuro-fundo claro-fundo">
          <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-semibold  escuro-high-inv claro-high-inv">${project.title}</h3>
            <p class="mt-2 escuro-light-inv claro-light-inv">${project.description}</p>
            <div class="mt-4 flex gap-2">
              ${project.tags.map(tag => 
                `<span class="px-3 py-1 rounded-full text-sm escuro-high-inv escuro-comp-inv claro-high-inv claro-comp-inv">${tag}</span>`
              ).join('')}
            </div>
          </div>
        </div>
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
    console.log("Carregando contato...");
    
    await i18next.loadNamespaces("contact");
    const contact = i18next.t("contact:contact", { returnObjects: true });
    
    
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
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center escuro-light claro-light">
            ${etc.minha_1}<span class="escuro-high claro-high">${etc.minha_1}</span>
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
          <a href="${cont.linkcontato1};" target="_blank" rel="noopener noreferrer" class="transition-colors escuro-icons claro-icons">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span class="sr-only">${cont.contato1}</span>
          </a>
          <a href="${cont.linkcontato2}" target="_blank" rel="noopener noreferrer" class="transition-colors escuro-icons claro-icons">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span class="sr-only">${cont.contato2}</span>
          </a>
          <a href="${cont.linkcontato3}" class="transition-colors escuro-icons claro-icons">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span class="sr-only">${cont.contato3}</span>
          </a>
        </div>
        <div class="text-center text-sm mt-4 escuro-suave claro-suave">
          &copy; <span id="year"></span> ${cont.contato3}.
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
  await i18next.changeLanguage(event.target.value);
  const htmlElement = document.documentElement; // Seleciona o <html>
  const savedLang = localStorage.getItem("lang") || "pt-BR"; // Padrão é 'en'
    htmlElement.setAttribute("lang", savedLang);
    const currentLang = htmlElement.getAttribute("lang");
        const newLang = currentLang === "pt-BR" ? "en" : "pt-BR"; // Alterna entre inglês e português
        
        htmlElement.setAttribute("lang", newLang); // Atualiza o lang no <html>
        localStorage.setItem("lang", newLang); // Salva no navegador

        console.log("Idioma alterado para:", newLang);

});

i18next.on("languageChanged", async () => {
  await i18next.loadNamespaces([
    "about","contact","courses","experience",
    "formations","hero","more","portfolio",
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

  etc = await etcPromise;

  await loadFormations();
  await loadHero();
  await loadAbout();
  await loadMore();
  await loadContact();
  await loadExperiences();
  await loadCourses()/*.then(() => colora())*/;
  await loadProjects();
  await loadTabletopProjects();
  await loadTexts();
});

/////////////////////////////////