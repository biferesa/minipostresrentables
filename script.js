// ===== VARIABLES GLOBALES =====

let isCountdownActive = true;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicialización del DOM
    
    try {

        
        initializeNavigation();
        // Navegación inicializada
        
        initializeFAQ();
        // FAQ inicializado
        
        initializeAnimations();
        // Animaciones inicializadas
        
        initializePaymentOptions();
        // Opciones de pago inicializadas
        
        initializeCTAs();
        console.log('CTAs initialized successfully!');
        
        // Event listener directo para el botón de pago principal como respaldo
        const mainPaymentBtn = document.getElementById('btnPago');
        if (mainPaymentBtn) {
            mainPaymentBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handlePurchaseClick(this);
            });
        }
        
        // initializeLucideIcons() - removido
        // Íconos Lucide inicializados
        
        initializeLazyLoading();
        // Lazy loading inicializado
        
        preloadResources();
        // Recursos precargados
        
        initializeKeyboardNavigation();
        // Navegación por teclado inicializada
        
        // Sistema completamente inicializado
        
    } catch (error) {
        // Error durante inicialización
    }
});

// ===== INICIALIZAR ICONOS LUCIDE =====
// Función removida - lucide.js eliminado por errores




// ===== NAVEGACIÓN =====
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menú móvil
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
            const icon = mobileMenuBtn.querySelector('.menu-icon');
            
            if (nav.classList.contains('mobile-open')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            
            // initializeLucideIcons() - removido
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('mobile-open')) {
                nav.classList.remove('mobile-open');
                const icon = mobileMenuBtn.querySelector('.menu-icon');
                icon.setAttribute('data-lucide', 'menu');
                // initializeLucideIcons() - removido
            }
        });
    });
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Solo calcular alturas si los elementos existen
                const header = document.querySelector('.header');
                const timerBar = document.querySelector('.timer-bar');
                const headerHeight = header ? header.offsetHeight : 0;
                const timerHeight = timerBar ? timerBar.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - timerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header transparente al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header && window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else if (header) {
            header.style.backgroundColor = 'var(--fondo-tarjeta)';
            header.style.backdropFilter = 'none';
        }
    });
}

// ===== FAQ ACORDEÓN =====
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        return;
    }
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');
            
            // Cerrar todos los otros FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = '0';
                    }
                }
            });
            
            // Toggle el FAQ actual
            if (isActive) {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = '0';
            } else {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            }
        });
    });
}

// La función toggleFAQ se eliminó ya que ahora usamos event listeners en initializeFAQ()

// ===== ANIMACIONES EN SCROLL =====
function initializeAnimations() {
    // Observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Agregar clase fade-in a elementos y observarlos
    const elementsToAnimate = document.querySelectorAll(`
        .dolor-item,
        .modulo-card,
        .bono-card,
        .testimonio-card,
        .credencial-item,
        .paso,
        .faq-item
    `);
    
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
    
    // Animación especial para las tarjetas de testimonios
    const testimonialCards = document.querySelectorAll('.testimonio-card');
    testimonialCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, index * 100);
    });
}

// ===== OPCIONES DE PAGO =====
function initializePaymentOptions() {
    const paymentOptions = document.querySelectorAll('input[name="pago"]');
    const btnCompra = document.getElementById('btnCompra');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const selectedValue = this.value;
            let buttonText = '';
            let buttonAction = '';
            
            switch(selectedValue) {
                case '9.99':
                    buttonText = 'SÍ, Quiero Vender Mi Primera Docena en 15 Días';
                    buttonAction = 'pago-unico';
                    break;
                default:
                    buttonText = 'SÍ, Quiero Vender Mi Primera Docena en 15 Días';
                    buttonAction = 'pago-unico';
                    break;
            }
            
            if (btnCompra) {
                btnCompra.innerHTML = `
                    <i data-lucide="shopping-cart" class="btn-icon"></i>
                    ${buttonText}
                `;
                btnCompra.setAttribute('data-payment-type', buttonAction);
                // initializeLucideIcons() - removido
            }
        });
    });
}

// ===== CONFIGURACIÓN DE CTAs =====
function initializeCTAs() {
    const ctaButtons = document.querySelectorAll('.hero-cta, .historia-btn, .btn-principal, .btn-final, .btn-pago');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Tracking de click
            trackCTAClick(this);
            
            // Para botones de pago, redirigir inmediatamente
            if (this.classList.contains('btn-pago')) {
                e.preventDefault();
                handlePurchaseClick(this);
            }
            // Solo prevenir default si es un anchor interno (no es botón de pago)
            else if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            } else if (!this.getAttribute('href')) {
                e.preventDefault();
                handlePurchaseClick(this);
            }
        });
    });
    
    // CTA del timer
    const timerCTA = document.querySelector('.timer-cta');
    if (timerCTA) {
        timerCTA.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#oferta').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            trackCTAClick(this);
        });
    }
}

function trackCTAClick(button) {
    const buttonText = button.textContent.trim();
    const buttonLocation = getButtonLocation(button);
    
    // Aquí puedes agregar código de tracking (Google Analytics, Facebook Pixel, etc.)
    // CTA clickeado
    
    // Ejemplo de Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'CTA',
            'event_label': buttonText,
            'value': 1
        });
    }
    
    // Ejemplo de Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: buttonText,
            content_category: 'CTA Button'
        });
    }
}

function getButtonLocation(button) {
    if (button.classList.contains('hero-cta')) return 'Hero Section';
    if (button.classList.contains('historia-btn')) return 'Historia Section';
    if (button.classList.contains('btn-principal')) return 'Offer Section';
    if (button.classList.contains('btn-final')) return 'Final CTA';
    if (button.classList.contains('timer-cta')) return 'Timer Bar';
    return 'Unknown';
}

function handlePurchaseClick(button) {
    try {
        const paymentType = button.getAttribute('data-payment-type') || 'unico';
        const price = button.closest('.oferta')?.querySelector('input[name="pago"]:checked')?.value || '9.99';
        
        // Track conversion (sin errores)
        try {
            trackConversion({ amount: price, payment_type: paymentType, product: 'Sistema 3 Estrellas', timestamp: new Date().toISOString() });
        } catch (e) {
            // Error de tracking ignorado
        }
        
        // Redirigir inmediatamente al enlace de Hotmart
        window.location.href = 'https://pay.hotmart.com/A103328956G?off=7fxf5hay&checkoutMode=10';
        
    } catch (error) {
        // Even if there's an error, still redirect
        window.location.href = 'https://pay.hotmart.com/A103328956G?off=7fxf5hay&checkoutMode=10';
    }
}

function trackConversion(paymentData) {
    // Google Analytics Enhanced E-commerce
    if (typeof gtag !== 'undefined') {
        gtag('event', 'purchase', {
            transaction_id: 'TXN_' + Date.now(),
            value: parseFloat(paymentData.amount),
            currency: 'USD',
            items: [{
                item_id: 'sistema-3-estrellas',
                item_name: 'Sistema 3 Estrellas - Mini Postres Rentables',
                category: 'Digital Product',
                quantity: 1,
                price: parseFloat(paymentData.amount)
            }]
        });
    }
    
    // Facebook Pixel Purchase Event
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Purchase', {
            value: parseFloat(paymentData.amount),
            currency: 'USD',
            content_name: 'Sistema 3 Estrellas',
            content_category: 'Digital Product'
        });
    }
}

// ===== UTILIDADES =====

// Función para debounce (evitar múltiples ejecuciones)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para throttle (limitar frecuencia de ejecución)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    // Error de JavaScript
    // Aquí puedes enviar errores a un servicio como Sentry
});

// ===== OPTIMIZACIÓN DE PERFORMANCE =====

// Lazy loading para imágenes (si tienes muchas)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Preload de recursos críticos
function preloadResources() {
    const criticalResources = [
        // Agrega URLs de recursos críticos aquí
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'font' || 'image' || 'script' || 'style';
        document.head.appendChild(link);
    });
}

// ===== FUNCIONES DE ACCESIBILIDAD =====

// Mejorar navegación por teclado
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape para cerrar menú móvil
        if (e.key === 'Escape') {
            const nav = document.getElementById('nav');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            
            if (nav && nav.classList.contains('mobile-open')) {
                nav.classList.remove('mobile-open');
                const icon = mobileMenuBtn.querySelector('.menu-icon');
                icon.setAttribute('data-lucide', 'menu');
                // initializeLucideIcons() - removido
                mobileMenuBtn.focus();
            }
        }
        
        // Enter y Space para activar botones FAQ
        if (e.key === 'Enter' || e.key === ' ') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.classList.contains('faq-question')) {
                e.preventDefault();
                activeElement.click();
            }
        }
    });
}





// ===== EXPORTAR FUNCIONES PARA TESTING (si es necesario) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackCTAClick,
        trackConversion,
        debounce,
        throttle
    };
}