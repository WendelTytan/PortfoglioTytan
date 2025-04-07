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

// Load and render Formations
async function loadFormations() {
  try {
    const response = await fetch('./src/data/formations.json');
    const data = await response.json();
    const formationsContainer = document.querySelector('#formation .space-y-8');
    
    formationsContainer.innerHTML = data.formations.map(form => `
      <div class="bg-[#9b87f5]/10 p-6 rounded-lg">
        <h3 class="text-xl font-semibold text-[#9b87f5]">${form.degree}</h3>
        <p class="text-gray-400">${form.institution} • ${form.period}</p>
        <p class="mt-4 text-gray-300">${form.description}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading formations:', error);
  }
}

// Load and render experiences
async function loadExperiences() {
  try {
    const response = await fetch('./src/data/experience.json');
    const data = await response.json();
    const experienceContainer = document.querySelector('#experience .space-y-8');
    
    experienceContainer.innerHTML = data.experiences.map(exp => `
      <div class="bg-[#9b87f5]/10 p-6 rounded-lg">
        <h3 class="text-xl font-semibold text-[#9b87f5]">${exp.title}</h3>
        <p class="text-gray-400">${exp.company} • ${exp.period}</p>
        <p class="mt-4 text-gray-300">${exp.description}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading experiences:', error);
  }
}

// Load and render courses
async function loadCourses() {
  try {
    const response = await fetch('./src/data/courses.json');
    const data = await response.json();
    const coursesContainer = document.querySelector('#courses .grid');
    
    coursesContainer.innerHTML = data.courses.map(course => `
      <div class="bg-[#9b87f5]/10 p-6 rounded-lg">
        <h3 class="text-xl font-semibold text-[#9b87f5]">${course.title}</h3>
        <p class="text-gray-400">${course.institution} • ${course.year}</p>
        <p class="mt-4 text-gray-300">${course.description}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading courses:', error);
  }
}

///////////////////////////////////////////////////////
/////////////// ajustar a seçao de certificados com a de cursos

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Carrega os dados do JSON
    const response = await fetch('./src/data/portfolio.json');
    if (!response.ok) {
      throw new Error('Falha ao carregar os dados do portfólio');
    }
    const data = await response.json();
    
    // Define as cores para os diferentes tipos de certificados
    const colors = [
      'bg-[#8B5CF6]', 'bg-[#D946EF]', 'bg-[#F97316]', 'bg-[#0EA5E9]',
      'bg-[#F2FCE2]', 'bg-[#FEF7CD]', 'bg-[#FEC6A1]', 'bg-[#E5DEFF]',
      'bg-[#FFDEE2]', 'bg-[#FDE1D3]', 'bg-[#D3E4FD]', 'bg-[#1EAEDB]',
      'bg-[#33C3F0]', 'bg-[#9b87f5]', 'bg-[#ea384c]', 'bg-[#0FA0CE]',
      'bg-[#7E69AB]', 'bg-[#6E59A5]', 'bg-[#8B5CF6]', 'bg-[#D946EF]'
    ];

    // Renderiza certificados e competências
    const certificatesContainer = document.getElementById('certificates-container');
    const competencyCount = {};
    const competencyColorMap = {};
    let colorIndex = 0;

    data.certificates.forEach(certificate => {
      const certificateElement = document.createElement('div');
      certificateElement.className = `bg-gray-800 p-6 rounded-lg border-2 certificate-${certificate.type} animate-neon-pulse`;
      
      // Obtém as competências relacionadas ao tipo do certificado
      const relatedCompetencies = certificate.competencies || [];
      
      // Conta as ocorrências de cada competência
      relatedCompetencies.forEach(comp => {
        competencyCount[comp] = (competencyCount[comp] || 0) + 1;
        // Associa uma cor a cada competência se ainda não tiver
        if (!competencyColorMap[comp]) {
          competencyColorMap[comp] = colors[colorIndex % colors.length];
          colorIndex++;
        }
      });
      
      const competenciesHtml = relatedCompetencies.map(comp => {
        return `<span class="inline-block m-1 px-3 py-1 rounded-full text-sm ${competencyColorMap[comp]}">${comp}</span>`;
      }).join('');

      certificateElement.innerHTML = `
        <h3 class="text-xl font-semibold mb-2 text-white">${certificate.title}</h3>
        <p class="text-gray-300 mb-2">${certificate.institution}</p>
        <p class="text-gray-400 text-sm mb-2">${certificate.date}</p>
        ${certificate.hours ? `<p class="text-gray-400 text-sm">Carga horária: ${certificate.hours}h</p>` : ''}
        <span class="inline-block mt-3 px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
          ${certificate.type}
        </span>
        <div class="mt-4 flex flex-wrap gap-2">
          ${competenciesHtml}
        </div>
      `;
      certificatesContainer.appendChild(certificateElement);
    });

    // Adiciona o contador detalhado de competências
    const counterSection = document.createElement('div');
    counterSection.className = 'mt-8 text-center';
    
    const competencyCountHtml = Object.entries(competencyCount)
      .map(([comp, count]) => {
        const colorClass = competencyColorMap[comp];
        return `<span class="inline-block m-1 px-4 py-2 rounded-lg ${colorClass}">${comp}: ${count}</span>`;
      })
      .join('');

    counterSection.innerHTML = `
      <div class="inline-block bg-gray-800 px-6 py-3 rounded-lg border-2 border-purple-500 text-white">
        <p class="text-lg mb-2">Contagem de Competências:</p>
        <div class="flex flex-wrap justify-center gap-2">
          ${competencyCountHtml}
        </div>
      </div>
    `;
    certificatesContainer.parentElement.appendChild(counterSection);

  } catch (error) {
    console.error('Erro ao carregar ou processar os dados:', error);
    // Adiciona uma mensagem de erro visível para o usuário
    const errorMessage = document.createElement('div');
    errorMessage.className = 'text-red-500 text-center p-4';
    errorMessage.textContent = 'Erro ao carregar os dados do portfólio. Por favor, tente novamente mais tarde.';
    document.body.appendChild(errorMessage);
  }
});
////////////////////////////////////

// Load and render projects
async function loadProjects() {
  try {
    const response = await fetch('./src/data/projects.json');
    const data = await response.json();
    const projectsGrid = document.querySelector('#projects-grid');
    
    projectsGrid.innerHTML = data.projects.map(project => `
      <div class="bg-[#9b87f5]/10 rounded-lg overflow-hidden">
        <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover" />
        <div class="p-6">
          <h3 class="text-xl font-semibold text-[#9b87f5]">${project.title}</h3>
          <p class="mt-2 text-gray-300">${project.description}</p>
          <div class="mt-4 flex gap-2">
            ${project.technologies.map(tech => 
              `<span class="px-3 py-1 bg-[#9b87f5]/20 text-[#9b87f5] rounded-full text-sm">${tech}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

// Load and render tabletop projects
async function loadTabletopProjects() {
  try {
    const response = await fetch('./src/data/tabletop-projects.json');
    const data = await response.json();
    const tabletopProjectsGrid = document.querySelector('#tabletop-projects .grid');
    
    if (tabletopProjectsGrid) {
      tabletopProjectsGrid.innerHTML = data.projects.map(project => `
        <div class="project-card rounded-lg overflow-hidden">
          <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-orange-500">${project.title}</h3>
            <p class="mt-2 text-gray-300">${project.description}</p>
            <div class="mt-4 flex gap-2">
              ${project.tags.map(tag => 
                `<span class="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm">${tag}</span>`
              ).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading tabletop projects:', error);
  }
}

// Project search functionality
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

// Load all data when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadFormations();
  loadExperiences();
  loadCourses();
  loadProjects();
  loadTabletopProjects();
  //loadComp();
  // Initial highlight check
  highlightActiveSection();
});

/////////////////////////////////