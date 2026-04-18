export const SEPARA_DATA = {
    title: "SE-PA-RÁ",
    tagline: <>SE‑PA‑RÁ nació de una <span className="serif-title" style={{ fontSize: '1.2em' }}>inquietud concreta</span>: ¿cómo logramos que separar residuos sea parte de la rutina diaria? Mi objetivo fue diseñar una experiencia digital clara que motivara al <span className="serif-title" style={{ fontSize: '1.2em' }}>accionar</span> ciudadano.</>,
    mainImage: "/separa-mockup.webp",
    figmaLink: "https://www.figma.com/proto/9tZ8o95QpwKsMJEE9Iqw96/Proyecto-SE-PA-RA?node-id=65-59&starting-point-node-id=65%3A55&t=ethJmLuKXdVEIEMc-1&hide-ui=1",
    metadata: [
        { label: "Rol", value: "UX/UI Designer" },
        { label: "Tiempo", value: "4 Semanas" },
        { label: "Herramientas", value: "Figma, FigJam" }
    ],
    sections: [
        {
            title: "El punto de partida",
            text: "Mi hipótesis inicial fue que la falta de conocimiento imposibilitaba el correcto funcionamiento de la separación de residuos. El programa SE‑PA‑RÁ no estaba siendo eficiente porque la gente no separaba sus residuos por falta de información e infraestructura. Como UX designer en formación, mi motivación fue transformar esa situación en una oportunidad: mejorar la difusión y el aprendizaje sobre reciclaje y sus beneficios, con la meta de lograr una ciudad más limpia.",
            image: "/Capitulo-1.webp"
        },
        {
            title: "Mapear el viaje del usuario",
            text: (
                <>
                    Para empatizar con las personas, desarrollé un Journey Map y descubrí que en cada etapa (informarse, separar, llevar al eco punto) el proceso se frustraba. Transformé estos hallazgos en requerimientos funcionales:
                    <ul style={{ marginTop: 'var(--space-4)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        <li><strong>Problema:</strong> Información dispersa y confusa. <br/><span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>↳</span> <strong>Oportunidad:</strong> Módulo de educación centralizado (Talleres).</li>
                        <li><strong>Problema:</strong> Poco incentivo y escasez de bolsas verdes. <br/><span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>↳</span> <strong>Oportunidad:</strong> Programa de Recompensas por comprometerse.</li>
                        <li><strong>Problema:</strong> Desconocimiento de puntos de recolección. <br/><span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>↳</span> <strong>Oportunidad:</strong> Mapa interactivo con la red de EcoPuntos cercana.</li>
                    </ul>
                </>
            ),
            image: "/Capitulo-2.webp"
        },
        {
            title: "El flujo dentro de la app",
            text: "Con esos hallazgos, definí el user flow de la aplicación. El recorrido empezaba con una bienvenida motivadora, luego el registro o ingreso, y desde el inicio el usuario podía elegir entre aprender sobre reciclaje o conocer eco puntos cercanos. Si elegía aprender, accedía a talleres con textos, videos y animaciones. Si elegía eco puntos, veía un mapa y podía activar notificaciones.",
            image: "/User-flow-separa.webp"
        },
        {
            title: "Iterar y ajustar",
            layout: "full",
            text: "El proceso pasó de wireframes de baja fidelidad, donde definí la estructura y jerarquía básica, a wireframes de alta fidelidad, donde integré tipografía, color, iconografía y un tono más motivador en el onboarding.",
            isCompare: true,
            mobileFrame: true,
            image: null // We'll handle the CompareCarousel separately for now or pass it via children
        }
    ],
    learning: "Lo más valioso fue entender que el diseño puede ser un motor de cambio social. Lograr que una tarea tediosa se sienta gratificante a través de la gamificación y el diseño claro es el núcleo de este proyecto.",
    epilogue: "Este proyecto fue parte de mi primera experiencia formándome como UX de manera autodidacta en Udemy, obteniendo el certificado que valida mi recorrido inicial."
};

export const TIENDA_DATA = {
    title: "TIENDA TECNO",
    tagline: <>Tienda Tecno nace como respuesta a la necesidad de expandirse al <span className="serif-title" style={{ fontSize: '1.2em' }}>mundo digital</span>. El objetivo era crear un <span style={{ whiteSpace: 'nowrap' }}>e-commerce</span> que no solo venda hardware, sino que asesore y acompañe al usuario en su compra.</>,
    mainImage: "/tienda-mockup.webp",
    figmaLink: "https://www.figma.com/proto/BerM7QNvQfAiNONrNjHLVX/Wireframe-Tienda-Tecno.?node-id=232-705&t=WoaQTWZcyQQrxDfD-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=232%3A705&hide-ui=1",
    metadata: [
        { label: "Rol", value: "UX/UI Designer" },
        { label: "Tiempo", value: "4 Meses" },
        { label: "Herramientas", value: "Figma, FigJam" }
    ],
    sections: [
        {
            title: "El punto de partida",
            text: "El cliente tenía dos locales físicos en Buenos Aires pero ninguna presencia digital. La meta era clara: crear una tienda online accesible y funcional, capaz de mostrar el catálogo completo, ampliar el alcance geográfico y generar confianza en un mercado competitivo.",
            image: "/Tienda-Tecno-punto-de-partida_page-0001.webp"
        },
        {
            title: "Investigación y competencia",
            text: (
                <>
                    Analicé competidores directos como Maximus, Gaming City y ArmyTech. Identifiqué oportunidades clave donde Tienda Tecno podía destacarse de la media:
                    <ul style={{ marginTop: 'var(--space-4)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        <li><strong>Fortalezas del mercado:</strong> Alta variedad de hardware y asesoramiento técnico.</li>
                        <li><strong>Debilidades detectadas:</strong> Fricción en el checkout y mala atención postventa.</li>
                    </ul>
                </>
            ),
            image: "/Tienda-Tecno-benchmark_page-0001.webp"
        },
        {
            title: "Estructura y flujo",
            text: "Armé el sitemap con secciones clave: productos, armá tu PC, guía y asesoramiento, comunidad y carrito. El foco estuvo en reducir fricciones y dar seguridad en cada paso.",
            image: "/tienda-tecno-user-flow.webp"
        }
    ],
    learning: "Este proyecto me enseñó que un e‑commerce no se trata solo de mostrar productos, sino de transmitir confianza en cada paso. Las migas de pan fueron un recurso simple pero poderoso para dar seguridad.",
    epilogue: "Este proyecto fue parte de mi experiencia en el bootcamp intensivo Digitalers de Telecom junto a Education IT, donde fui becado durante 4 meses."
};
