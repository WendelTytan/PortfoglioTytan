document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Carrega os dados do JSON correto
    const response = await fetch('./src/data/courses.json');
    if (!response.ok) {
      throw new Error('Falha ao carregar os dados dos cursos');
    }
    const data = await response.json();

    // Define cores para diferentes competências
    const colors = [
      'bg-[#8B5CF6]', 'bg-[#D946EF]', 'bg-[#F97316]', 'bg-[#0EA5E9]',
      'bg-[#F2FCE2]', 'bg-[#FEF7CD]', 'bg-[#FEC6A1]', 'bg-[#E5DEFF]',
      'bg-[#FFDEE2]', 'bg-[#FDE1D3]', 'bg-[#D3E4FD]', 'bg-[#1EAEDB]',
      'bg-[#33C3F0]', 'bg-[#9b87f5]', 'bg-[#ea384c]', 'bg-[#0FA0CE]',
      'bg-[#7E69AB]', 'bg-[#6E59A5]', 'bg-[#8B5CF6]', 'bg-[#D946EF]'
    ];

    // Mapeia as competências para cores
    const competencyColorMap = {};
    let colorIndex = 0;

    // Obtém o container dos cursos
    const coursesContainer = document.querySelector('#courses .grid');
    
    data.courses.forEach(course => {
      const courseElement = document.createElement('div');
      courseElement.className = 'bg-gray-800 p-6 rounded-lg border-2 shadow-md';

      // Mapeia cores para competências se existirem
      const competencies = course.competencies || [];
      const competenciesHtml = competencies.map(comp => {
        if (!competencyColorMap[comp]) {
          competencyColorMap[comp] = colors[colorIndex % colors.length];
          colorIndex++;
        }
        return `<span class="inline-block m-1 px-3 py-1 rounded-full text-sm ${competencyColorMap[comp]}">${comp}</span>`;
      }).join('');

      // Preenche a estrutura do curso
      courseElement.innerHTML = `
        <h3 class="text-xl font-semibold mb-2 text-white">${course.title}</h3>
        <p class="text-gray-300 mb-2">${course.institution} - ${course.year}</p>
        <p class="text-gray-400 text-sm mb-2">${course.description || ''}</p>
        ${course.hours ? `<p class="text-gray-400 text-sm">Carga horária: ${course.hours}h</p>` : ''}
        ${course.type ? `<span class="inline-block mt-3 px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">${course.type}</span>` : ''}
        <div class="mt-4 flex flex-wrap gap-2">
          ${competenciesHtml}
        </div>
      `;

      coursesContainer.appendChild(courseElement);
    });

  } catch (error) {
    console.error('Erro ao carregar ou processar os dados:', error);
    const errorMessage = document.createElement('div');
    errorMessage.className = 'text-red-500 text-center p-4';
    errorMessage.textContent = 'Erro ao carregar os cursos. Por favor, tente novamente mais tarde.';
    document.body.appendChild(errorMessage);
  }
});
