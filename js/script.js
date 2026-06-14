// ===== HAMBURGER MENU =====
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Menü linkine tıklayınca menüyü kapat (mobil)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .quick-card, .download-card, .package-card, .category-card, .contact-card, .tool-intro, .tool-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ===== ACTIVE NAV LINK =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ===== KOPYALAMA BUTONU (kod blokları için) =====
    document.querySelectorAll('.code-block').forEach(block => {
        // Buton oluştur
        const button = document.createElement('button');
        button.innerHTML = '📋 Kopyala';
        button.className = 'copy-btn';
        button.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--primary);
            color: var(--darker);
            border: none;
            padding: 5px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-family: inherit;
            font-size: 0.8rem;
            font-weight: 600;
            transition: all 0.3s;
        `;

        // Block'a göre konumlandır
        block.style.position = 'relative';
        block.appendChild(button);

        button.addEventListener('click', async () => {
            const code = block.querySelector('code') ? block.querySelector('code').innerText : block.querySelector('pre').innerText;
            try {
                await navigator.clipboard.writeText(code);
                button.innerHTML = '✅ Kopyalandı!';
                setTimeout(() => {
                    button.innerHTML = '📋 Kopyala';
                }, 2000);
            } catch (err) {
                // Eski yöntem
                const textarea = document.createElement('textarea');
                textarea.value = code;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                button.innerHTML = '✅ Kopyalandı!';
                setTimeout(() => {
                    button.innerHTML = '📋 Kopyala';
                }, 2000);
            }
        });
    });

    // ===== TYPING EFFECT (terminal için) =====
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        const lines = terminalBody.querySelectorAll('p');
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transition = 'opacity 0.3s';
            }, index * 500);
        });
    }

    // ===== CONSOLE EASTER EGG =====
    console.log('%c🐉 Kali Linux TR', 'color: #00ff88; font-size: 30px; font-weight: bold; text-shadow: 0 0 10px #00ff88;');
    console.log('%c⚠️ Bu konsola müdahale etmeyin. Hacker\'lar izliyor...', 'color: #ff4444; font-size: 14px;');
    console.log('%c📱 WhatsApp kanalımıza katılın: https://whatsapp.com/channel/0029VbBanvKDzgM7Q0X3Vy1k', 'color: #25d366; font-size: 14px;');
});

// ===== SAYFA YÜKLEME ANİMASYONU =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});