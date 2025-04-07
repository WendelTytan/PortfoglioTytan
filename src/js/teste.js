async function loadCourses() {
    try {
      console.log("Carregando courses...");
      
      await i18next.loadNamespaces(["courses", "comp"]); // Carrega os namespaces necessários
      const courses = i18next.t("courses:courses", { returnObjects: true });
      const compTexts = i18next.t("comp", { returnObjects: true }); // Carrega o JSON inteiro do namespace "comp"
  
      // Criamos a variável para armazenar o conteúdo do contador de competências
      let competencyCount = {};
      courses.forEach(course => {
        course.competencies.forEach(comp => {
          competencyCount[comp] = (competencyCount[comp] || 0) + 1;
        });
      });
  
      const competencyCountHtml = Object.entries(competencyCount)
        .map(([comp, count]) => `<span class="inline-block m-1 px-4 py-2 rounded-lg text-white">${comp}: ${count}</span>`)
        .join('');
  
      // Criamos uma variável para armazenar o bloco HTML do contador
      const counterSectionHtml = `
        <div class="inline-block bg-[#1A1F2C] px-6 py-3 rounded-lg border-2 border-[#9b87f5] text-white">
          <p class="text-lg mb-2">${compTexts.text1}</p> 
          <div class="flex flex-wrap justify-center gap-2">
            ${competencyCountHtml}
          </div>
        </div>
      `;
  
      // Criamos a variável para o resumo
      const summaryHtml = `
        <div class="bg-gray-900 p-4 rounded-lg text-white shadow-md">
          <h3 class="text-[#9b87f5] text-xl font-bold mb-5 text-center">${compTexts.summaryTitle}</h3>
          <p class="text-gray-300 text-sm text-center">${compTexts.summaryDescription}</p>
        </div>
      `;
  
      // Geramos os cursos e usamos as variáveis counterSectionHtml e summaryHtml onde for necessário
      document.querySelector("#courses .grid").innerHTML = courses.map(course => {
        const competenciesHtml = course.competencies.map(comp => 
          `<span class="inline-block px-3 py-1 rounded-full text-sm text-white ${competencyColorMap[comp]} m-1">${comp}</span>`
        ).join('');
  
        return `
          <div class="bg-[#9b87f5]/10 p-6 rounded-lg border border-[#9b87f5]/20">
            <h3 class="text-xl font-semibold text-[#9b87f5]">${course.title}</h3>
            <p class="text-gray-400">${course.institution} • ${course.year}</p>
            <p class="mt-2 text-gray-300">${course.description}</p>
            ${course.hours ? `<p class="text-gray-400 text-sm mt-2">Carga horária: ${course.hours}h</p>` : ''}
            <span class="inline-block mt-3 px-3 py-1 bg-[#9b87f5]/20 rounded-full text-sm text-[#9b87f5]">
              ${course.type}
            </span>
            <div class="mt-4 flex flex-wrap gap-2">
              ${competenciesHtml}
            </div>
            ${counterSectionHtml} <!-- Adicionamos o contador de competências dentro do bloco de cursos -->
            ${summaryHtml} <!-- Adicionamos o resumo dentro do bloco de cursos -->
          </div>`;
      }).join("");
  
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  }
  