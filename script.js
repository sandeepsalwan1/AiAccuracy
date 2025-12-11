// ===== COOL COLOR PALETTE =====
const colors = ['#00d4ff', '#7000ff', '#9933ff', '#00d4ff', '#ccf0ff'];

let mouseX = 0, mouseY = 0;

// ===== MOUSE TRAIL =====
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    trail.style.background = color;
    trail.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
    
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 600);
});

// ===== CURSOR GLOW =====
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

function updateCursor() {
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
    requestAnimationFrame(updateCursor);
}
updateCursor();

// ===== MATRIX RAIN =====
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = '01アイウエオカキクケコHALLUCINATE';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(0).map(() => Math.random() * -100);

function drawMatrix() {
    ctx.fillStyle = 'rgba(2, 2, 4, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Electric blue or purple
        ctx.fillStyle = Math.random() > 0.5 ? '#00d4ff' : '#7000ff';
        ctx.globalAlpha = Math.random() * 0.2 + 0.05;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;
        
        if (y > canvas.height && Math.random() > 0.98) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
        createParticle();
    }, (duration + delay) * 1000);
}

for (let i = 0; i < 30; i++) {
    setTimeout(createParticle, i * 200);
}

// ===== SCROLL PROGRESS =====
const progressFill = document.querySelector('.progress-fill');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressFill.style.width = scrollPercent + '%';
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-target], .counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    const target = parseFloat(counter.dataset.target || counter.textContent);
                    animateCounter(counter, target);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats, .stats-grid, .model-bars').forEach(el => {
    counterObserver.observe(el);
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '-50px' });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(section);
});

const style = document.createElement('style');
style.textContent = `.section.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ===== PREDICTED TOKEN =====
const predictedToken = document.getElementById('predicted-token');
const predictions = ['John', 'elected', 'sworn', 'named', 'Harrison'];
let predictionIndex = 0;

if (predictedToken) {
    setInterval(() => {
        predictedToken.style.opacity = '0';
        predictedToken.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            predictedToken.textContent = predictions[predictionIndex];
            predictedToken.style.opacity = '1';
            predictedToken.style.transform = 'scale(1)';
            predictionIndex = (predictionIndex + 1) % predictions.length;
        }, 200);
    }, 2000);
}

// ===== NAV SCROLL =====
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(2, 2, 4, 0.95)';
        nav.style.borderBottomColor = 'rgba(0, 212, 255, 0.2)';
    } else {
        nav.style.background = 'rgba(2, 2, 4, 0.8)';
        nav.style.borderBottomColor = 'rgba(0, 212, 255, 0.1)';
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== 3D CARD HOVER =====
document.querySelectorAll('.solution-card, .stat-box, .mechanism-card, .stat-card, .action-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.cta-button, .nav-logo').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ===== BAR ANIMATIONS =====
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.prob-fill, .model-fill');
            bars.forEach((bar, i) => {
                bar.style.animationDelay = `${i * 0.12}s`;
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.prediction-demo, .model-bars').forEach(el => barObserver.observe(el));

// ===== SPARKLE EFFECT =====
function createSparkle() {
    const sparkle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    sparkle.style.cssText = `
        position: fixed;
        width: 3px;
        height: 3px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        box-shadow: 0 0 6px ${color}, 0 0 12px ${color};
        animation: sparkleFade 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFade {
        0% { transform: scale(0); opacity: 1; }
        50% { transform: scale(1.5); opacity: 1; }
        100% { transform: scale(0); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);

setInterval(createSparkle, 300);

// ===== TERMINAL CURSOR =====
const terminalPrompt = document.querySelector('.terminal-prompt');
if (terminalPrompt) {
    const cursor = document.createElement('span');
    cursor.textContent = '█';
    cursor.style.cssText = 'animation: blink 1s step-end infinite; color: #00cc88;';
    terminalPrompt.appendChild(cursor);
    
    const blinkStyle = document.createElement('style');
    blinkStyle.textContent = '@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }';
    document.head.appendChild(blinkStyle);
}

// ===== CONSOLE =====
console.log('%c🧠 Hallucinations', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cWhen AI Lies', 'color: #7000ff; font-size: 14px;');
