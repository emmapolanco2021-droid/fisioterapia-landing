document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica del Horario Dinámico
    function verificarHorario() {
        const ahora = new Date();
        const horaActual = ahora.getHours();
        const minutosActuales = ahora.getMinutes();
        const tiempoActualEnMinutos = horaActual * 60 + minutosActuales;

        const inicioApertura = 6 * 60;   // 6:00 AM
        const cierreCierre = 22 * 60;    // 10:00 PM

        const badge = document.getElementById('estado-negocio');
        const textoEstado = document.getElementById('texto-estado');

        if (badge && textoEstado) {
            if (tiempoActualEnMinutos >= inicioApertura && tiempoActualEnMinutos <= cierreCierre) {
                badge.className = 'badge-estado abierto';
                textoEstado.textContent = 'Abierto ahora · Cierra a las 10:00 p.m.';
            } else {
                badge.className = 'badge-estado cerrado';
                textoEstado.textContent = 'Cerrado · Abre a las 6:00 a.m.';
            }
        }
    }
    verificarHorario();
    setInterval(verificarHorario, 60000);


    // 2. Lógica del Carrusel de Testimonios
    const track = document.getElementById('carrusel-track');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('btn-next');
    const prevButton = document.getElementById('btn-prev');
    const puntosNav = document.getElementById('carrusel-puntos');
    const puntos = Array.from(puntosNav.children);
    let currentIndex = 0;

    function actualizarCarrusel(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Actualizar puntos
        puntos.forEach((punto, i) => {
            if (i === index) {
                punto.classList.add('activo');
            } else {
                punto.classList.remove('activo');
            }
        });
    }

    if (nextButton && prevButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            actualizarCarrusel(currentIndex);
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            actualizarCarrusel(currentIndex);
        });

        puntos.forEach((punto, index) => {
            punto.addEventListener('click', () => {
                currentIndex = index;
                actualizarCarrusel(currentIndex);
            });
        });
    }


    // 3. Lógica para las Preguntas Frecuentes (FAQ)
    const preguntasFaq = document.querySelectorAll('.faq-pregunta');
    preguntasFaq.forEach(pregunta => {
        pregunta.addEventListener('click', () => {
            const itemFaq = pregunta.parentElement;
            itemFaq.classList.toggle('activo');
        });
    });


    // 4. Lógica para el Selector de Modo Oscuro / Claro
    const botonModo = document.getElementById('btn-modo');
    const body = document.body;

    const modoGuardado = localStorage.getItem('modoOscuro');
    if (modoGuardado === 'true') {
        body.classList.add('modo-oscuro');
        if (botonModo) botonModo.textContent = '☀️ Modo Claro';
    }

    if (botonModo) {
        botonModo.addEventListener('click', () => {
            body.classList.toggle('modo-oscuro');

            if (body.classList.contains('modo-oscuro')) {
                botonModo.textContent = '☀️ Modo Claro';
                localStorage.setItem('modoOscuro', 'true');
            } else {
                botonModo.textContent = '🌙 Modo Oscuro';
                localStorage.setItem('modoOscuro', 'false');
            }
        });
    }
});

// 5. Animaciones suaves al hacer Scroll (Scroll Reveal)
    const elementosAAnimar = document.querySelectorAll('.hero-content, .sobre-nosotros, .servicios, .testimonios, .faq-section, .ubicacion-section');

    // Marcamos con la clase base 'animar' a cada sección seleccionada
    elementosAAnimar.forEach(el => {
        el.classList.add('animar');
    });

    const observadorOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Se activa cuando el 15% de la sección es visible en pantalla
    };

    const observadorCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: si quieres que la animación ocurra una sola vez, descomenta la siguiente línea:
                // observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observadorCallback, observadorOptions);

    elementosAAnimar.forEach(el => {
        observer.observe(el);
    });

    // 6. Configuración Automática del Año de Copyright y Modales Legales
    const spanAnio = document.getElementById('anio-actual');
    if (spanAnio) {
        spanAnio.textContent = new Date().getFullYear();
    }
 // Cierre del DOMContentLoaded existente

// Funciones globales para abrir y cerrar los modales legales
function abrirModalTerminos(event) {
    event.preventDefault();
    const modal = document.getElementById('modal-legal');
    const texto = document.getElementById('texto-modal');
    texto.innerHTML = `
        <h2>Términos y Condiciones</h2>
        <p><strong>1. Alcance del Servicio:</strong> Las consultas, valoraciones y sesiones de fisioterapia ofrecidas en este sitio web tienen carácter profesional y preventivo. Los resultados pueden variar según el diagnóstico y la constancia del paciente.</p>
        <p><strong>2. Citas y Cancelaciones:</strong> Las reservas realizadas a través de WhatsApp quedan sujetas a confirmación de disponibilidad horaria. Se agradece notificar con al menos 3 horas de anticipación en caso de reprogramación.</p>
        <p><strong>3. Responsabilidad Médica:</strong> Este sitio web ofrece orientación e información sobre salud física, la cual no sustituye un diagnóstico médico especializado de emergencia.</p>
    `;
    modal.style.display = 'flex';
}

function abrirModalPrivacidad(event) {
    event.preventDefault();
    const modal = document.getElementById('modal-legal');
    const texto = document.getElementById('texto-modal');
    texto.innerHTML = `
        <h2>Política de Privacidad y Protección de Datos</h2>
        <p><strong>1. Recopilación de Información:</strong> Nuestra plataforma no almacena bases de datos con información personal sensible de forma automatizada. Los datos compartidos vía WhatsApp se utilizan estrictamente para la gestión de citas y atención personalizada.</p>
        <p><strong>2. Confidencialidad:</strong> Los historiales, expedientes o información médica compartida por los pacientes son de carácter estrictamente confidencial bajo el secreto profesional de la salud.</p>
        <p><strong>3. Cookies y Almacenamiento Local:</strong> Solo utilizamos el almacenamiento local del navegador (<code>localStorage</code>) con el único fin de recordar tu preferencia de tema (Modo Oscuro / Claro).</p>
    `;
    modal.style.display = 'flex';
}

function cerrarModal() {
    const modal = document.getElementById('modal-legal');
    modal.style.display = 'none';
}

// Cerrar modal haciendo clic fuera de la caja blanca
window.onclick = function(event) {
    const modal = document.getElementById('modal-legal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}