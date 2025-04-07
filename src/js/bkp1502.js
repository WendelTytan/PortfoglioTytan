import i18next from "./i18n.js";

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

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// Load and render Hero atualizada para o i18next
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
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
              ${her.part1}<span class="text-[#9b87f5]">${her.nome}</span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 mb-8">
              ${her.titulo}
            </p>
            <div class="flex justify-center space-x-6">
              <a href="${her.linkgit}" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#9b87f5] transition-colors">
                <svg xmlns="${her.imggit}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="${her.linklinked}" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#9b87f5] transition-colors">
                <svg xmlns="${her.imglinked}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="${her.linkinsta}" class="text-white hover:text-[#9b87f5] transition-colors">
                <svg xmlns="${her.imginsta}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading Hero:", error);
  }
}

//  tá pronto


// async function loadHero() {
//   try {
//     const response = await fetch('./src/data/hero.json');
//     const data = await response.json();
//     const heroContainer = document.querySelector('#home .hero_hero');
    
//     heroContainer.innerHTML = data.hero.map(hero => `
//       <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
//               ${hero.part1}<span class="text-[#9b87f5]">${hero.nome}</span>
//             </h1>
//             <p class="text-xl md:text-2xl text-gray-300 mb-8">
//               ${hero.titulo}
//             </p>
//             <div class="flex justify-center space-x-6">
//               <a href="${hero.linkgit}" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#9b87f5] transition-colors">
//                 <svg xmlns="${hero.imggit}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
//               </a>
//               <a href="${hero.linklinked}" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#9b87f5] transition-colors">
//                 <svg xmlns="${hero.imglinked}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
//               </a>
//               <a href="${hero.linkinsta}" class="text-white hover:text-[#9b87f5] transition-colors">
//                 <svg xmlns="${hero.imginsta}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
//     `).join('');
//   } catch (error) {
//     console.error('Error loading hero:', error);
//   }
// }
//////////////////////////////////////////

// Load and render About atualizada para o i18next
async function loadAbout() {
  try {
    console.log("Carregando about...");
    
    await i18next.loadNamespaces("about");
    const about = i18next.t("about:about", { returnObjects: true });
    
    const aboutContainer = document.querySelector("#about .about_about");
    console.log("Elemento encontrado?", aboutContainer);
    
    if (!aboutContainer) {
      console.error("Elemento #about .about_about não encontrado!");
      return;
    }

    if (!Array.isArray(about)) {
      console.error("About data is not an array:", about);
      return;
    }

    aboutContainer.innerHTML = about.map((abo) => {
          const aboutHtml = abo.competencies.map(aboutcomp =>
            `<span class="px-4 py-2 bg-[#9b87f5]/20 text-[#9b87f5] rounded-full"">${aboutcomp}</span>`
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
              <p class="text-gray-300">
                ${abo.p1}
              </p>
              <p class="text-gray-300">
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

//  tá pronto

// async function loadAbout() {
//   try {
//     const response = await fetch('./src/data/about.json');
//     const data = await response.json();
//     const aboutContainer = document.querySelector('#about .about_about');
    
//     aboutContainer.innerHTML = data.about.map(about => {
//       const aboutHtml = about.competencies.map(aboutcomp => 
//         `<span class="px-4 py-2 bg-[#9b87f5]/20 text-[#9b87f5] rounded-full"">${aboutcomp}</span>`
//       ).join('');
//       return `
//           <h2 class="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//             ${about.part1}<span class="text-[#9b87f5]">${about.part2}</span>
//           </h2>
//           <div class="grid md:grid-cols-2 gap-12 items-center">
//             <div class="animate-slide-in">
//               <img
//                 src="${about.foto}"
//                 alt="${about.alt}"
//                 class="rounded-lg shadow-xl w-full max-w-md mx-auto"
//               />
//             </div>
//             <div class="space-y-6 animate-slide-in">
//               <p class="text-gray-300">
//                 ${about.p1}
//               </p>
//               <p class="text-gray-300">
//                 ${about.p2}
//               </p>
//               <div class="flex flex-wrap gap-4">
//                 ${aboutHtml}
//               </div>
//             </div>
//           </div>
//     `;
//   }).join('');
//   } catch (error) {
//     console.error('Error loading hero:', error);
//   }
// }

// Load and render Moro atualizada para o i18next
async function loadMore() {
  try {
    console.log("Carregando more...");
    
    await i18next.loadNamespaces("more");
    const more = i18next.t("more:more", { returnObjects: true });
    
    const moreContainer = document.querySelector("#more-about .more_about");
    console.log("Elemento encontrado?", moreContainer);
    
    if (!moreContainer) {
      console.error("Elemento #more-about .more_about não encontrado!");
      return;
    }

    if (!Array.isArray(more)) {
      console.error("More data is not an array:", more);
      return;
    }

    moreContainer.innerHTML = more
      .map(
        (mor) => {
          // Criando a lista corretamente
          const moreHtml = `
          <ul class="list-disc pl-5 space-y-2 text-gray-300">
            ${mor.hobbies.map(morecomp => `<li>${morecomp}</li>`).join('')}
          </ul>
        `;    
          return `
                <div class="grid md:grid-cols-2 gap-8 mx-auto">
                  <div class="bg-[#9b87f5]/10 p-6 rounded-lg">
                    <div class="flex items-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#9b87f5] mr-3"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                      <h3 class="text-xl font-semibold text-[#9b87f5]">${mor.part1}</h3>
                    </div>
                    
                      ${moreHtml}
                    
                  </div>
                  <div class="bg-[#9b87f5]/10 p-6 rounded-lg">
                    <div class="flex items-center mb-4">
                      <svg xmlns="${mor.part3}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#9b87f5] mr-3"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                      <h3 class="text-xl font-semibold text-[#9b87f5]">${mor.part2}</h3>
                    </div>
                    <div class="space-y-4">
                      <iframe src="${mor.part4}" width="100%" height="152" frameborder="0" allowtransparency="true" allow="encrypted-media" class="rounded-lg"></iframe>
                      <a href="${mor.part5}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-white hover:text-[#9b87f5] transition-colors">
                        <svg xmlns="${mor.part6}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M17 22v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="12" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
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

//////////////////

// async function loadMore() {
//   try {
//     const response = await fetch('./src/data/more.json');
//     const data = await response.json();
//     const moreContainer = document.querySelector('#more-about .more_about');
    
//     moreContainer.innerHTML = data.more.map(more => {
//       // Criando a lista corretamente
//       const moreHtml = `
//       <ul class="list-disc pl-5 space-y-2 text-gray-300">
//         ${more.hobbies.map(morecomp => `<li>${morecomp}</li>`).join('')}
//       </ul>
//     `;    
//       return `
//             <div class="grid md:grid-cols-2 gap-8 mx-auto">
//               <div class="bg-[#9b87f5]/10 p-6 rounded-lg">
//                 <div class="flex items-center mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#9b87f5] mr-3"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
//                   <h3 class="text-xl font-semibold text-[#9b87f5]">${more.part1}</h3>
//                 </div>
                
//                   ${moreHtml}
                
//               </div>
//               <div class="bg-[#9b87f5]/10 p-6 rounded-lg">
//                 <div class="flex items-center mb-4">
//                   <svg xmlns="${more.part3}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#9b87f5] mr-3"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
//                   <h3 class="text-xl font-semibold text-[#9b87f5]">${more.part2}</h3>
//                 </div>
//                 <div class="space-y-4">
//                   <iframe src="${more.part4}" width="100%" height="152" frameborder="0" allowtransparency="true" allow="encrypted-media" class="rounded-lg"></iframe>
//                   <a href="${more.part5}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-white hover:text-[#9b87f5] transition-colors">
//                     <svg xmlns="${more.part6}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M17 22v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="12" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
//                     ${more.part7}
//                   </a>
//                 </div>
//               </div>
//             </div>
//     `;
//   }).join('');
//   } catch (error) {
//     console.error('Error loading more:', error);
//   }
// }

//ano = document.getElementById('year').textContent = new Date().getFullYear();

async function loadContact() {
  try {
    console.log("Carregando hero...");
    
    await i18next.loadNamespaces("contact");
    const contact = i18next.t("contact:contact", { returnObjects: true });
    
    const contactContainer = document.querySelector("#contact .footer_contact");
    console.log("Elemento encontrado?", contactContainer);
    
    if (!contactContainer) {
      console.error("Elemento #contact .footer_contact não encontrado!");
      return;
    }

    if (!Array.isArray(contact)) {
      console.error("Contact data is not an array:", contact);
      return;
    }

    contactContainer.innerHTML = contact
      .map(
        (cont) => `
        <div class="flex justify-center space-x-8">
          <a href="${cont.linkcontato1};" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#9b87f5] transition-colors">
            <svg xmlns="${cont.imgcontato1}" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span class="sr-only">${cont.contato1}</span>
          </a>
          <a href="${cont.linkcontato2}" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#9b87f5] transition-colors">
            <svg xmlns="${cont.imgcontato2}" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span class="sr-only">${cont.contato2}</span>
          </a>
          <a href="${cont.linkcontato3}" class="text-white hover:text-[#9b87f5] transition-colors">
            <svg xmlns="${cont.imgcontato3}" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span class="sr-only">${cont.contato3}</span>
          </a>
        </div>
        <div class="text-center text-gray-500 text-sm mt-4">
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


// async function loadContact() {
//   try {
//     const response = await fetch('./src/data/contact.json');
//     const data = await response.json();
//     const contactContainer = document.querySelector('#contact .footer_contact');
    
//     contactContainer.innerHTML = data.contact.map(contact => `
//         <div class="flex justify-center space-x-8">
//           <a href="${contact.linkcontato1};" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#9b87f5] transition-colors">
//             <svg xmlns="${contact.imgcontato1}" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
//             <span class="sr-only">${contact.contato1}</span>
//           </a>
//           <a href="${contact.linkcontato2}" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#9b87f5] transition-colors">
//             <svg xmlns="${contact.imgcontato2}" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
//             <span class="sr-only">${contact.contato2}</span>
//           </a>
//           <a href="${contact.linkcontato3}" class="text-white hover:text-[#9b87f5] transition-colors">
//             <svg xmlns="${contact.imgcontato3}" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
//             <span class="sr-only">${contact.contato3}</span>
//           </a>
//         </div>
//         <div class="text-center text-gray-500 text-sm mt-4">
//           &copy; <span id="year"></span> ${contact.contato3}.
//         </div>
//     `).join('');
//   } catch (error) {
//     console.error('Error loading contact:', error);
//   }
//   document.getElementById('year').textContent = new Date().getFullYear();
// }

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// Load and render Formations atualizada para o i18next
async function loadFormations() {
  try {
    console.log("Carregando formações...");
    
    await i18next.loadNamespaces("formations");
    const formations = i18next.t("formations:formations", { returnObjects: true });
    
    const formationsContainer = document.querySelector("#formation .space-y-8");
    console.log("Elemento encontrado?", formationsContainer);
    
    if (!formationsContainer) {
      console.error("Elemento #formations .space-y-8 não encontrado!");
      return;
    }

    if (!Array.isArray(formations)) {
      console.error("Formations data is not an array:", formations);
      return;
    }

    formationsContainer.innerHTML = formations
      .map(
        (form) => `
      <div class="bg-[#9b87f5]/10 p-6 rounded-lg">
        <h3 class="text-xl font-semibold text-[#9b87f5]">${form.degree}</h3>
        <p class="text-gray-400">${form.institution} • ${form.period}</p>
        <p class="mt-4 text-gray-300">${form.description}</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading formations:", error);
  }
}

//  tá pronto

async function loadExperiences() {
  try {
    console.log("Carregando experience...");
    
    await i18next.loadNamespaces("experience");
    const experience = i18next.t("experience:experience", { returnObjects: true });
    
    const experienceContainer = document.querySelector("#experience .space-y-8");
    console.log("Elemento encontrado?", experienceContainer);
    
    if (!experienceContainer) {
      console.error("Elemento #experience .space-y-8 não encontrado!");
      return;
    }

    if (!Array.isArray(experience)) {
      console.error("Experience data is not an array:", experience);
      return;
    }

    experienceContainer.innerHTML = experience
      .map(
        (exp) => `
      <div class="bg-[#9b87f5]/10 p-6 rounded-lg">
        <h3 class="text-xl font-semibold text-[#9b87f5]">${exp.title}</h3>
        <p class="text-gray-400">${exp.company} • ${exp.period}</p>
        <p class="mt-4 text-gray-300">${exp.description}</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading Experience:", error);
  }
}

// Load and render experiences
// async function loadExperiences() {
//   try {
//     const response = await fetch('./src/data/experience.json');
//     const data = await response.json();
//     const experienceContainer = document.querySelector('#experience .space-y-8');
    
//     experienceContainer.innerHTML = data.experiences.map(exp => `
//       <div class="bg-[#9b87f5]/10 p-6 rounded-lg">
//         <h3 class="text-xl font-semibold text-[#9b87f5]">${exp.title}</h3>
//         <p class="text-gray-400">${exp.company} • ${exp.period}</p>
//         <p class="mt-4 text-gray-300">${exp.description}</p>
//       </div>
//     `).join('');
//   } catch (error) {
//     console.error('Error loading experiences:', error);
//   }
// }

// Colors for competencies
const colors = [
  'bg-[#8B5CF6]', 'bg-[#D946EF]', 'bg-[#F97316]', 'bg-[#0EA5E9]',
  'bg-[#F2FCE2]', 'bg-[#FEF7CD]', 'bg-[#FEC6A1]', 'bg-[#E5DEFF]',
  'bg-[#FFDEE2]', 'bg-[#FDE1D3]', 'bg-[#D3E4FD]', 'bg-[#1EAEDB]',
  'bg-[#33C3F0]', 'bg-[#9b87f5]', 'bg-[#ea384c]', 'bg-[#0FA0CE]'
];

// Criando objeto para contar os tipos de curso
const courseTypeCount = {};


async function loadCourses() {
  try {
    console.log("Carregando courses...");
    
    await i18next.loadNamespaces("courses");
    const courses = i18next.t("courses:courses", { returnObjects: true });
    
    const coursesContainer = document.querySelector("#courses .grid");
    console.log("Elemento encontrado?", coursesContainer);
    
    if (!coursesContainer) {
      console.error("Elemento #courses .grid não encontrado!");
      return;
    }

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

    coursesContainer.innerHTML = courses
      .map(
        (cor) => {
          const competenciesHtml = cor.competencies.map(comp => 
            `<span class="dynamic-text mix-blend-difference inline-block px-3 py-1 rounded-full text-sm text-white ${competencyColorMap[comp]} m-1">${comp}</span>`
          ).join('');
    
          return `
            <div class="bg-[#9b87f5]/10 p-6 rounded-lg border border-[#9b87f5]/20">
              <h3 class="text-xl font-semibold text-[#9b87f5]">${cor.title}</h3>
              <p class="text-gray-400">${cor.institution} • ${cor.year}</p>
              <p class="mt-2 text-gray-300">${cor.description}</p>
              ${cor.hours ? `<p class="text-gray-400 text-sm mt-2">Carga horária: ${cor.hours}h</p>` : ''}
              <span class="inline-block mt-3 px-3 py-1 bg-[#9b87f5]/20 rounded-full text-sm text-[#9b87f5]">
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


      // 
      // 
      // 
      console.log("Carregando resum etc...");
    
      await i18next.loadNamespaces("etc");
      const resum = i18next.t("etc:resum", { returnObjects: true }); 
      
      // const resumContainer = document.querySelector("#courses .resum_resum"); //
      // console.log("Elemento encontrado?", resumContainer);
      
      // if (!resumContainer) {
      //   console.error("Elemento #courses .resum_resum não encontrado!");
      //   return;
      // }

      // if (!Array.isArray(resum)) {
      //   console.error("Resumo data is not an array:", resum);
      //   return;
      // } //como n'ao [e mais um array ele cai aqui, j[a que agora [e um objeto]]
     
      const resumHtml = resum
        .map((res) => {
          const typeSummaryHtml = Object.entries(courseTypeCount)
            .map(([type, count]) => 
              `<p class="text-gray-300 text-sm">
                <strong class="text-[#9b87f5]">${type}:</strong> 
                <span class="text-green-400">${count}</span> ${res.text}
              </p>`
            )
            .join('');

          return `
            <div class="resum_resum bg-gray-900 p-4 rounded-lg text-white shadow-md">
              <h3 class="text-[#9b87f5] text-xl font-bold mb-5 text-center">${res.text1}</h3>
              <div class="flex flex-col items-center justify-center rounded-md">
                <div class="flex flex-col space-y-2 p-3 rounded-md">
                  ${typeSummaryHtml}
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      // Adiciona o HTML gerado ao container principal
      coursesContainer.innerHTML += resumHtml;

      //////////////////////
      /*
      // Criar e exibir o resumo dos tipos de cursos
      const typeSummaryContainer = document.createElement('div');
      typeSummaryContainer.className = 'resum_resum bg-gray-900 p-4 rounded-lg text-white shadow-md';
  
      // Criando o título fora da div interna
      let typeSummaryHtml = `<h3 class="text-[#9b87f5] text-xl font-bold mb-5 text-center">${resum.text1}</h3>`;
  
      // Criando uma div para conter apenas os cursos
      typeSummaryHtml += `<div class="flex flex-col items-center justify-center rounded-md"> <div class="flex flex-col space-y-2 p-3 rounded-md">`;
  
      Object.entries(courseTypeCount).forEach(([type, count]) => {
        typeSummaryHtml += `<p class="text-gray-300 text-sm">
          <strong class="text-[#9b87f5]">${type}:</strong> 
          <span class="text-green-400">${count}</span> curso(s)
        </p>`;
      });
  
      typeSummaryHtml += `</div></div>`; // Fecha a nova div interna
      typeSummaryContainer.innerHTML = typeSummaryHtml;
      coursesContainer.appendChild(typeSummaryContainer);

      */
      /////////////

      console.log("Carregando compe etc...");
    
      await i18next.loadNamespaces("etc");
      const compe = i18next.t("etc:comp", { returnObjects: true }); 
      //const compe = i18next.t("etc:comp", { returnObjects: true })[0]; 
      
      const compeContainer = document.querySelector("#courses .cont_comp"); //
      console.log("Elemento encontrado?", compeContainer);
      
      // if (!compeContainer) {
      //   console.error("Elemento #courses .grid não encontrado!");
      //   return;
      // }
  
      // if (!Array.isArray(compe)) {
      //   console.error("Resumo data is not an array:", resum);
      //   return;
      // } //como n'ao [e mais um array ele cai aqui, j[a que agora [e um objeto]]

      // 
      // 
      // 
  
      // Add competency counter

      //counterSection.innerHTML = "";

      ////////////////////////////////

      // const competencyCountHtml = Object.entries(competencyCount)
      // .map(([comp, count]) => {
      //   const colorClass = competencyColorMap[comp]; //não gostei do mix bled difference, parece meio turvo
      //   return `<span class="dynamic-text mix-blend-difference inline-block m-1 px-4 py-2 rounded-lg text-white ${colorClass}">${comp}: ${count}</span>`;
      // })
      // .join('');

      // const counterSection = document.createElement('div');
      // counterSection.className = 'cont_comp mt-8 text-center';
  
      // counterSection.innerHTML = `
      //   <div class="inline-block bg-[#1A1F2C] px-6 py-3 rounded-lg border-2 border-[#9b87f5] text-white">
      //     <p class="text-lg mb-2">${compe.text1}</p>
      //     <div class="flex flex-wrap justify-center gap-2">
      //       ${competencyCountHtml}
      //     </div>
      //   </div>
      // `;
      
      // coursesContainer.insertAdjacentElement('afterend', counterSection);

      compeContainer.innerHTML = compe
      .map(
        (cont) => {
          const competencyCountHtml = Object.entries(competencyCount)
          .map(([comp, count]) => {
            const colorClass = competencyColorMap[comp]; //não gostei do mix bled difference, parece meio turvo
            return `<span class="dynamic-text mix-blend-difference inline-block m-1 px-4 py-2 rounded-lg text-white ${colorClass}">${comp}: ${count}</span>`;
          })
          .join('');

          return `
            <div class="cont_comp mt-8 text-center">
              <div class="inline-block bg-[#1A1F2C] px-6 py-3 rounded-lg border-2 border-[#9b87f5] text-white">
              <p class="text-lg mb-2">${cont.text1}</p>
              <div class="flex flex-wrap justify-center gap-2">
                ${competencyCountHtml}
              </div>
            </div>
          `;
      })
      .join("");
      coursesContainer.insertAdjacentElement('afterend', compeContainer); //acho que não precisa, já que a div está criada no html


      // /////////////////////////////////
      // const counterSection = document.createElement('div');
      // counterSection.className = 'cont_comp mt-8 text-center';
      
      // const competencyCountHtml = Object.entries(competencyCount)
      //   .map(([comp, count]) => {
      //     const colorClass = competencyColorMap[comp]; //não gostei do mix bled difference, parece meio turvo
      //     return `<span class="dynamic-text mix-blend-difference inline-block m-1 px-4 py-2 rounded-lg text-white ${colorClass}">${comp}: ${count}</span>`;
      //   })
      //   .join('');
  
      // counterSection.innerHTML = `
      //   <div class="inline-block bg-[#1A1F2C] px-6 py-3 rounded-lg border-2 border-[#9b87f5] text-white">
      //     <p class="text-lg mb-2">${compe.text1}</p>
      //     <div class="flex flex-wrap justify-center gap-2">
      //       ${competencyCountHtml}
      //     </div>
      //   </div>
      // `;
      
      // coursesContainer.insertAdjacentElement('afterend', counterSection);
      // //////////////////////////////////

  } catch (error) {
    console.error('Error loading courses:', error);
  }
}

// Load and render courses
// async function loadCourses1() {
//   try {
//     const response = await fetch('./src/data/courses.json');
//     const data = await response.json();
//     const coursesContainer = document.querySelector('#courses .grid');
    
//     const competencyCount = {};
//     const competencyColorMap = {};
//     let colorIndex = 0;

//     // Count competencies and assign colors
//     data.courses.forEach(course => {
//       course.competencies.forEach(comp => {
//         competencyCount[comp] = (competencyCount[comp] || 0) + 1;
//         if (!competencyColorMap[comp]) {
//           competencyColorMap[comp] = colors[colorIndex % colors.length];
//           colorIndex++;
//         }
//       });

//     //
//     if (course.type) {
//       if (!courseTypeCount[course.type]) {
//         courseTypeCount[course.type] = 0;
//       }
//       courseTypeCount[course.type]++;
//     }

//     });

//     // Render courses
//     coursesContainer.innerHTML = data.courses.map(course => {
//       const competenciesHtml = course.competencies.map(comp => 
//         `<span class="dynamic-text mix-blend-difference inline-block px-3 py-1 rounded-full text-sm text-white ${competencyColorMap[comp]} m-1">${comp}</span>`
//       ).join('');

//       return `
//         <div class="bg-[#9b87f5]/10 p-6 rounded-lg border border-[#9b87f5]/20">
//           <h3 class="text-xl font-semibold text-[#9b87f5]">${course.title}</h3>
//           <p class="text-gray-400">${course.institution} • ${course.year}</p>
//           <p class="mt-2 text-gray-300">${course.description}</p>
//           ${course.hours ? `<p class="text-gray-400 text-sm mt-2">Carga horária: ${course.hours}h</p>` : ''}
//           <span class="inline-block mt-3 px-3 py-1 bg-[#9b87f5]/20 rounded-full text-sm text-[#9b87f5]">
//             ${course.type}
//           </span>
//           <div class="mt-4 flex flex-wrap gap-2">
//             ${competenciesHtml}
//           </div>
//         </div>
//       `;
//     }).join('');

//     // Criar e exibir o resumo dos tipos de cursos
//     const typeSummaryContainer = document.createElement('div');
//     typeSummaryContainer.className = 'bg-gray-900 p-4 rounded-lg text-white shadow-md';

//     // Criando o título fora da div interna
//     let typeSummaryHtml = `<h3 class="text-[#9b87f5] text-xl font-bold mb-5 text-center">Resumo dos Tipos de Cursos:</h3>`;

//     // Criando uma div para conter apenas os cursos
//     typeSummaryHtml += `<div class="flex flex-col items-center justify-center rounded-md"> <div class="flex flex-col space-y-2 p-3 rounded-md">`;

//     Object.entries(courseTypeCount).forEach(([type, count]) => {
//       typeSummaryHtml += `<p class="text-gray-300 text-sm">
//         <strong class="text-[#9b87f5]">${type}:</strong> 
//         <span class="text-green-400">${count}</span> curso(s)
//       </p>`;
//     });

//     typeSummaryHtml += `</div></div>`; // Fecha a nova div interna

//     // Adiciona o HTML gerado ao container principal
//     typeSummaryContainer.innerHTML = typeSummaryHtml;
//     coursesContainer.appendChild(typeSummaryContainer);

//     // Add competency counter
//     const counterSection = document.createElement('div');
//     counterSection.className = 'mt-8 text-center';
    
//     const competencyCountHtml = Object.entries(competencyCount)
//       .map(([comp, count]) => {
//         const colorClass = competencyColorMap[comp]; //não gostei do mix bled difference, parece meio turvo
//         return `<span class="dynamic-text mix-blend-difference inline-block m-1 px-4 py-2 rounded-lg text-white ${colorClass}">${comp}: ${count}</span>`;
//       })
//       .join('');

//     counterSection.innerHTML = `
//       <div class="inline-block bg-[#1A1F2C] px-6 py-3 rounded-lg border-2 border-[#9b87f5] text-white">
//         <p class="text-lg mb-2">Contagem de Competências:</p>
//         <div class="flex flex-wrap justify-center gap-2">
//           ${competencyCountHtml}
//         </div>
//       </div>
//     `;
    
//     coursesContainer.insertAdjacentElement('afterend', counterSection);
//   } catch (error) {
//     console.error('Error loading courses:', error);
//     const coursesContainer = document.querySelector('#courses .grid');
//     if (coursesContainer) {
//       coursesContainer.innerHTML = `
//         <div class="text-red-500 text-center p-4">
//           Erro ao carregar os cursos. Por favor, tente novamente mais tarde.
//         </div>
//       `;
//     }
//   }
// }

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
  // loadHero();
  // loadAbout();
  // loadMore();
  // loadContact();
  // loadExperiences();
  // loadCourses();
  loadProjects();
  loadTabletopProjects();
  //loadComp();
  // Initial highlight check
  highlightActiveSection();
});

// Mudança de idioma
document.getElementById("language-selector").addEventListener("change", async (event) => {
  await i18next.changeLanguage(event.target.value);
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
});

document.addEventListener("DOMContentLoaded", async () => {
  await loadFormations();
  await loadHero();
  await loadAbout();
  await loadMore();
  await loadContact();
  await loadExperiences();
  await loadCourses();

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
});

/////////////////////////////////