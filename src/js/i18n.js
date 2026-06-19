const hostname = window.location.hostname;
const pathname = window.location.pathname;

// só serve para o git hub pages, para que o i18next consiga encontrar os arquivos de tradução
// para que funcione normalmente no vercel precisa ser o codigo anterior padrão do i18 next

let basePath = '/';

// Se NÃO for localhost, extrai o nome do repositório automaticamente da URL
if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    // pathname.split('/') divide a URL "/PortfoglioTytan/endpoints..." em partes
    // O índice [1] pega exatamente a palavra "PortfoglioTytan"
    const repoName = pathname.split('/')[1]; 
    basePath = `/${repoName}/`;
}

i18next
.use(i18nextHttpBackend)
.use(i18nextBrowserLanguageDetector)
.init({
    lng: "pt",
    fallbackLng: "pt",
    debug: true,
    backend: {
        loadPath: `${basePath}locales/{{lng}}/{{ns}}.json` 
    },
    ns: [
        "about","contact","courses","experience",
        "formations","hero","more", "etc",
        "projects","tabletop-projects", "badges"
    ],
    defaultNS: "contact"
});

export default i18next;