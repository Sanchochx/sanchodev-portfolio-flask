
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.fade-element, .fade-left, .fade-right, .separator').forEach(el => {
    observer.observe(el);
});

// ========== LANGUAGE TOGGLE ==========
(function () {
    var translations = {
        en: {
            nav_home: 'Home',
            nav_projects: 'Projects',
            about_title: 'ABOUT ME',
            about_p1: 'I am an IT Engineering student with a strong passion for software development and a clear goal: to apply my skills, grow professionally, and contribute to innovative IT projects.',
            about_p2: 'My technical expertise includes frontend development with Angular, React, TypeScript, and responsive design using Angular Material, combined with backend development using Node.js and Express. I work with both relational and non-relational databases, implement RESTful APIs, and apply object-oriented programming principles to create robust, maintainable code.',
            about_p3: "I'm also proficient in Python and Flask, which I leverage for personal projects and AI-driven applications. I'm actively exploring agentic AI development, using AI agents as productivity multipliers in my development workflow while maintaining architectural decision-making and code quality oversight.",
            about_p4: "I've participated in systems engineering research projects, transforming theoretical concepts into practical, working solutions. Fluent in English and Spanish, I'm highly adaptable and committed to professional growth through teamwork, continuous learning, and delivering quality software.",
            skills_title: 'SKILLS & TECHNOLOGIES',
            skill_cat_languages: 'Languages',
            skill_cat_frameworks: 'Frameworks',
            skill_cat_tools: 'Tools',
            skill_cat_databases: 'Databases',
            why_code_title: 'WHY I CODE',
            why_code_p1: "I've been fascinated by computers and software since I was a kid — there was something magical about how they worked.",
            why_code_p2: 'As I grew up, that fascination turned into a clear goal: I wanted to create things that matter.',
            why_code_p3: "Programming became my tool of choice because it lets me build solutions from scratch and help people solve real problems. Whether it's a simple website or a complex application, knowing that my code can make someone's life easier is what keeps me motivated and constantly learning.",
            contact_title: 'GET IN TOUCH',
            projects_title: 'PROJECTS',
            projects_subtitle: "A selection of things I've built — from web apps to AI integrations.",
            label_problem: 'Problem:',
            label_tech_decision: 'Tech decision:',
            label_live_demo: 'Live Demo',
            chat_header_title: 'Chat with Santiago',
            chat_header_subtitle: 'AI assistant · Powered by GPT-4o-mini',
            chat_placeholder: 'Ask me anything...',
            chat_welcome: "Hey! I'm Santiago's AI version. Ask me about his projects, stack, or how to get in touch. 👋",
            chat_suggestion_1: 'What projects have you built?',
            chat_suggestion_2: "What's your tech stack?",
            chat_suggestion_3: 'How can I contact Santiago?',
            chat_error: 'Could not reach the server. Please try again.',
            chat_error_generic: 'Something went wrong.',
        },
        es: {
            nav_home: 'Inicio',
            nav_projects: 'Proyectos',
            about_title: 'SOBRE MÍ',
            about_p1: 'Soy un estudiante de Ingeniería en TI con una fuerte pasión por el desarrollo de software y un objetivo claro: aplicar mis habilidades, crecer profesionalmente y contribuir a proyectos innovadores de TI.',
            about_p2: 'Mi experiencia técnica incluye desarrollo frontend con Angular, React, TypeScript y diseño responsivo con Angular Material, combinado con desarrollo backend usando Node.js y Express. Trabajo con bases de datos relacionales y no relacionales, implemento APIs RESTful y aplico principios de programación orientada a objetos para crear código robusto y mantenible.',
            about_p3: 'También domino Python y Flask, que utilizo para proyectos personales y aplicaciones impulsadas por IA. Estoy explorando activamente el desarrollo de IA agéntica, usando agentes de IA como multiplicadores de productividad en mi flujo de trabajo, mientras mantengo el control de las decisiones arquitectónicas y la calidad del código.',
            about_p4: 'He participado en proyectos de investigación en ingeniería de sistemas, transformando conceptos teóricos en soluciones prácticas y funcionales. Con fluidez en inglés y español, soy altamente adaptable y comprometido con el crecimiento profesional a través del trabajo en equipo, el aprendizaje continuo y la entrega de software de calidad.',
            skills_title: 'HABILIDADES Y TECNOLOGÍAS',
            skill_cat_languages: 'Lenguajes',
            skill_cat_frameworks: 'Frameworks',
            skill_cat_tools: 'Herramientas',
            skill_cat_databases: 'Bases de datos',
            why_code_title: 'POR QUÉ PROGRAMO',
            why_code_p1: 'Desde niño me fascinaron las computadoras y el software — había algo mágico en cómo funcionaban.',
            why_code_p2: 'A medida que crecí, esa fascinación se convirtió en un objetivo claro: quería crear cosas que importaran.',
            why_code_p3: 'La programación se convirtió en mi herramienta preferida porque me permite construir soluciones desde cero y ayudar a las personas a resolver problemas reales. Ya sea un sitio web sencillo o una aplicación compleja, saber que mi código puede hacer la vida de alguien más fácil es lo que me mantiene motivado y en constante aprendizaje.',
            contact_title: 'CONTACTO',
            projects_title: 'PROYECTOS',
            projects_subtitle: 'Una selección de proyectos que he construido — desde apps web hasta integraciones con IA.',
            label_problem: 'Problema:',
            label_tech_decision: 'Decisión técnica:',
            label_live_demo: 'Demo en vivo',
            chat_header_title: 'Chatea con Santiago',
            chat_header_subtitle: 'Asistente IA · Impulsado por GPT-4o-mini',
            chat_placeholder: 'Pregúntame algo...',
            chat_welcome: '¡Hola! Soy la versión IA de Santiago. Pregúntame sobre sus proyectos, stack o cómo contactarlo. 👋',
            chat_suggestion_1: '¿Qué proyectos has construido?',
            chat_suggestion_2: '¿Cuál es tu stack tecnológico?',
            chat_suggestion_3: '¿Cómo puedo contactar a Santiago?',
            chat_error: 'No se pudo conectar con el servidor. Inténtalo de nuevo.',
            chat_error_generic: 'Algo salió mal.',
        }
    };

    var currentLang = localStorage.getItem('lang') || 'en';

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var t = translations[lang];
            if (t && t[key] !== undefined) el.textContent = t[key];
        });

        document.querySelectorAll('[data-en]').forEach(function (el) {
            el.textContent = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
        });

        var inputEl = document.getElementById('chat-input');
        if (inputEl && translations[lang]) {
            inputEl.placeholder = translations[lang].chat_placeholder;
        }

        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    window.getLang = function () { return currentLang; };
    window.t = function (key) {
        var t = translations[currentLang] || translations.en;
        return t[key] !== undefined ? t[key] : key;
    };

    applyLanguage(currentLang);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            applyLanguage(this.getAttribute('data-lang'));
        });
    });
})();

// ========== CURSOR TRAIL ==========
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const particles = [];
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    window.addEventListener('resize', function () {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });

    document.addEventListener('mousemove', function (e) {
        for (let i = 0; i < 4; i++) {
            particles.push({
                x: e.clientX,
                y: e.clientY,
                r: Math.random() * 2.5 + 0.5,
                alpha: 0.7 + Math.random() * 0.3,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                decay: 0.03 + Math.random() * 0.02,
            });
        }
    });

    function loop() {
        ctx.clearRect(0, 0, W, H);
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#22c55e';
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;
            if (p.alpha <= 0) { particles.splice(i, 1); continue; }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(34, 197, 94, ' + p.alpha + ')';
            ctx.fill();
        }
        ctx.shadowBlur = 0;
        requestAnimationFrame(loop);
    }

    loop();
})();

// ========== CHAT WIDGET ==========
(function () {
    const toggleBtn = document.getElementById('chat-toggle');
    const panel = document.getElementById('chat-panel');
    const iconOpen = document.getElementById('chat-icon-open');
    const iconClose = document.getElementById('chat-icon-close');
    const messagesEl = document.getElementById('chat-messages');
    const inputEl = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');

    if (!toggleBtn || !panel) return;

    let chatHistory = [];
    let isLoading = false;
    let isOpen = false;

    toggleBtn.addEventListener('click', function () {
        isOpen = !isOpen;
        panel.classList.toggle('chat-open', isOpen);
        panel.setAttribute('aria-hidden', String(!isOpen));
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
        iconOpen.style.display = isOpen ? 'none' : '';
        iconClose.style.display = isOpen ? '' : 'none';
        if (isOpen) {
            if (chatHistory.length === 0 && !messagesEl.hasChildNodes()) {
                appendBubble('assistant', window.t('chat_welcome'));
                appendSuggestions();
            }
            inputEl.focus();
        }
    });

    sendBtn.addEventListener('click', sendMessage);

    inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    inputEl.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    function sendMessage() {
        const text = inputEl.value.trim();
        if (!text || isLoading) return;

        removeSuggestions();
        inputEl.value = '';
        inputEl.style.height = 'auto';

        appendBubble('user', text);
        chatHistory.push({ role: 'user', content: text });

        const typingEl = appendTypingIndicator();
        setLoading(true);

        const historyToSend = chatHistory.slice(0, -1);

        fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, history: historyToSend })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            typingEl.remove();
            if (data.reply) {
                appendBubble('assistant', data.reply);
                chatHistory.push({ role: 'assistant', content: data.reply });
            } else {
                appendBubble('error', data.error || window.t('chat_error_generic'));
                chatHistory.pop();
            }
        })
        .catch(function () {
            typingEl.remove();
            appendBubble('error', window.t('chat_error'));
            chatHistory.pop();
        })
        .finally(function () {
            setLoading(false);
        });
    }

    function appendBubble(role, text) {
        const div = document.createElement('div');
        div.className = 'chat-bubble ' + role;
        div.textContent = text;
        messagesEl.appendChild(div);
        scrollToBottom();
        return div;
    }

    function appendTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        messagesEl.appendChild(div);
        scrollToBottom();
        return div;
    }

    function appendSuggestions() {
        const keys = ['chat_suggestion_1', 'chat_suggestion_2', 'chat_suggestion_3'];
        const container = document.createElement('div');
        container.className = 'chat-suggestions';
        container.id = 'chat-suggestions';
        keys.forEach(function (key) {
            const btn = document.createElement('button');
            btn.className = 'chat-suggestion';
            btn.setAttribute('data-i18n', key);
            btn.textContent = window.t(key);
            btn.addEventListener('click', function () {
                inputEl.value = btn.textContent;
                sendMessage();
            });
            container.appendChild(btn);
        });
        messagesEl.appendChild(container);
        scrollToBottom();
    }

    function removeSuggestions() {
        const container = document.getElementById('chat-suggestions');
        if (container) container.remove();
    }

    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function setLoading(state) {
        isLoading = state;
        sendBtn.disabled = state;
        inputEl.disabled = state;
    }
})();
