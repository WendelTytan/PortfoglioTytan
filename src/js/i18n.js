i18next
.use(i18nextHttpBackend)
.use(i18nextBrowserLanguageDetector)
.init({
    lng: "pt",
    fallbackLng: "pt",
    debug: true,
    backend: {
        loadPath: "locales/{{lng}}/{{ns}}.json" //"/locales/{{lng}}/{{ns}}.json" 
                                                // tirei a primeira barra
    },
    ns: [
        "about","contact","courses","experience",
        "formations","hero","more", "etc",
        "projects","tabletop-projects"
    ],
    defaultNS: "formations"
});

export default i18next;