const hostname = window.location.hostname;
const pathname = window.location.pathname;

// O padrão correto para a grande maioria dos servidores (Localhost, Vercel, etc.)
let basePath = '/';

// Aplica a "gambiarra" de subpasta APENAS se o domínio for o do GitHub Pages
if (hostname.includes('github.io')) {
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