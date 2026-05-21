/* ── Theme toggle ──────────────────────────────── */
function toggleTheme() {
    var html  = document.documentElement;
    var isDark = html.getAttribute('data-theme') !== 'light';
    var next  = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    var label = document.getElementById('theme-label');
    if (label) label.textContent = next === 'dark' ? 'Light' : 'Dark';
    /* update browser chrome colour */
    var tc = document.getElementById('meta-theme-color');
    if (tc) tc.setAttribute('content', next === 'dark' ? '#060b18' : '#f4f5fa');
    try { localStorage.setItem('portfolio-theme', next); } catch(e) {}
}

/* Restore saved theme before paint */
(function () {
    try {
        var saved = localStorage.getItem('portfolio-theme');
        if (saved === 'light' || saved === 'dark') {
            document.documentElement.setAttribute('data-theme', saved);
        }
    } catch(e) {}
    /* Update label once DOM is ready */
    document.addEventListener('DOMContentLoaded', function () {
        var theme = document.documentElement.getAttribute('data-theme') || 'light';
        var label = document.getElementById('theme-label');
        if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
    });
}());

$(document).ready(function(){
	"use strict";

    // 1. Scroll To Top
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 600) {
			$('.return-to-top').fadeIn();
		} else {
			$('.return-to-top').fadeOut();
		}
	});
	$('.return-to-top').on('click', function(){
		$('html, body').animate({ scrollTop: 0 }, 1500);
		return false;
	});

    // 2. Smooth Scroll spy
	$('.header-area').sticky({ topSpacing: 0 });

	$('li.smooth-menu a').bind("click", function(event) {
		event.preventDefault();
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 0
		}, 1200, 'easeInOutExpo');
	});

	$('body').scrollspy({ target: '.navbar-collapse', offset: 0 });

    // 3. Progress-bar
	var dataToggleTooTip = $('[data-toggle="tooltip"]');
	var progressBar = $(".progress-bar");
	if (progressBar.length) {
		progressBar.appear(function () {
			dataToggleTooTip.tooltip({ trigger: 'manual' }).tooltip('show');
			progressBar.each(function () {
				var each_bar_width = $(this).attr('aria-valuenow');
				$(this).width(each_bar_width + '%');
			});
		});
	}

});

// 4. Auto-update footer year
(function () {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
}());

// 5. Hero Canvas — Particle Network
(function () {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouse = { x: null, y: null };
    var W = 0, H = 0;
    var RAF;

    var COLOR_PARTICLE = 'rgba(182,54,255,';
    var COLOR_TEAL     = 'rgba(0,212,160,';
    var MAX_DIST = 130;
    var COUNT    = 72;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    function Particle() {
        this.reset();
    }
    Particle.prototype.reset = function () {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.r  = Math.random() * 1.8 + 0.8;
        this.alpha = Math.random() * 0.4 + 0.15;
        this.isTeal = Math.random() < 0.25;
    };
    Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
    };

    function init() {
        particles = [];
        for (var i = 0; i < COUNT; i++) particles.push(new Particle());
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.update();

            // draw dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            var col = p.isTeal ? COLOR_TEAL : COLOR_PARTICLE;
            ctx.fillStyle = col + p.alpha + ')';
            ctx.fill();

            // lines to nearby particles
            for (var j = i + 1; j < particles.length; j++) {
                var q = particles[j];
                var dx = p.x - q.x, dy = p.y - q.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    var lineAlpha = 0.07 * (1 - dist / MAX_DIST);
                    ctx.beginPath();
                    ctx.strokeStyle = COLOR_PARTICLE + lineAlpha + ')';
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }

            // interaction with mouse
            if (mouse.x !== null) {
                var mdx = p.x - mouse.x, mdy = p.y - mouse.y;
                var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mdist < 160) {
                    var mAlpha = 0.18 * (1 - mdist / 160);
                    ctx.beginPath();
                    ctx.strokeStyle = COLOR_TEAL + mAlpha + ')';
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }

        RAF = requestAnimationFrame(draw);
    }

    function start() {
        if (RAF) cancelAnimationFrame(RAF);
        resize();
        init();
        draw();
    }

    window.addEventListener('resize', function () {
        resize();
        init();
    });

    document.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    document.addEventListener('mouseleave', function () {
        mouse.x = null; mouse.y = null;
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
}());

// 6. Typing effect
(function () {
    var phrases = [
        'Java Back-End Developer',
        'Software Engineer',
        'Fintech Developer',
        'Spring Boot Specialist'
    ];
    var phraseIndex = 0, charIndex = 0, isDeleting = false;
    var typingEl = document.getElementById('typing-text');

    function typeEffect() {
        if (!typingEl) return;
        var current = phrases[phraseIndex];

        if (isDeleting) {
            typingEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        var delay = isDeleting ? 45 : 90;
        if (!isDeleting && charIndex === current.length) {
            delay = 2200; isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }
        setTimeout(typeEffect, delay);
    }

    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(typeEffect, 800);
    });
}());

// 7. Section fade-in on scroll
document.addEventListener('DOMContentLoaded', function () {
    var sections = document.querySelectorAll('.fade-in-section');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sections.forEach(function (s) { observer.observe(s); });
    } else {
        sections.forEach(function (s) { s.classList.add('is-visible'); });
    }
});

// 8. PDF Viewer
(function () {
    var CV_SRC = "assets/download/CV_MIDDLE_JAVA_NGUYENQUANGNIEN.pdf";

    function showPDF() {
        document.getElementById("pdf-frame").src = CV_SRC;
        document.getElementById("pdf-viewer").style.display = "flex";
        document.getElementById("btn-view").style.display = "none";
        document.getElementById("btn-close").style.display = "inline-block";
    }
    function hidePDF() {
        document.getElementById("pdf-viewer").style.display = "none";
        document.getElementById("pdf-frame").src = "";
        document.getElementById("btn-close").style.display = "none";
        document.getElementById("btn-view").style.display = "inline-block";
    }

    document.addEventListener("DOMContentLoaded", function () {
        var btnView  = document.getElementById("btn-view");
        var btnClose = document.getElementById("btn-close");
        if (btnView)  btnView.addEventListener("click", showPDF);
        if (btnClose) btnClose.addEventListener("click", hidePDF);
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") hidePDF();
        });
    });
}());

// 9. Contact form — Formspree
document.addEventListener("DOMContentLoaded", function () {
    var contactForm = document.querySelector("#contact form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var form = this;
        var messageDiv = document.getElementById("form-message");
        var submitBtn  = form.querySelector("button[type='submit']");

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";

        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
        }).then(function (response) {
            if (response.ok) {
                messageDiv.textContent = "Message sent! I'll get back to you soon.";
                messageDiv.className = "success-message";
                form.reset();
            } else {
                messageDiv.textContent = "Oops! Something went wrong. Please try again.";
                messageDiv.className = "error-message";
            }
        }).catch(function () {
            messageDiv.textContent = "Network error — check your connection and try again.";
            messageDiv.className = "error-message";
        }).finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        });
    });
});

// 10. Tech Roadmap — animated SVG bezier connection lines
(function () {
    var EDGES = [
        /* Tier 1 → Tier 2 */
        { from: 'java',          to: 'spring-boot',    cls: 'rm-line-expert'     },
        { from: 'java',          to: 'spring-mvc',     cls: 'rm-line-expert'     },
        { from: 'java',          to: 'spring-security',cls: 'rm-line-proficient' },
        /* Tier 2 → Tier 3 */
        { from: 'spring-boot',   to: 'postgresql',     cls: 'rm-line-proficient' },
        { from: 'spring-boot',   to: 'jpa',            cls: 'rm-line-proficient' },
        { from: 'spring-boot',   to: 'mysql',          cls: 'rm-line-proficient' },
        { from: 'spring-boot',   to: 'redis',          cls: 'rm-line-learning'   },
        /* Tier 3 → Tier 4 */
        { from: 'postgresql',    to: 'microservices',  cls: 'rm-line-proficient' },
        { from: 'jpa',           to: 'rest-api',       cls: 'rm-line-proficient' },
        { from: 'redis',         to: 'kafka',          cls: 'rm-line-learning'   },
        /* Tier 4 → Tier 5 */
        { from: 'microservices', to: 'git',            cls: 'rm-line-expert'     },
        { from: 'microservices', to: 'maven',          cls: 'rm-line-proficient' },
        { from: 'microservices', to: 'docker',         cls: 'rm-line-learning'   },
        { from: 'rest-api',      to: 'agile',          cls: 'rm-line-proficient' },
        /* Tier 5 → Tier 6 */
        { from: 'git',           to: 'ai-tools',       cls: 'rm-line-proficient' },
        { from: 'agile',         to: 'english',        cls: 'rm-line-proficient' }
    ];

    var animated = false;

    function center(el, br) {
        var r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - br.left, yTop: r.top - br.top, yBot: r.bottom - br.top };
    }

    function drawLines() {
        var svg   = document.getElementById('roadmap-svg');
        var board = document.getElementById('roadmap-board');
        if (!svg || !board) return;
        svg.innerHTML = '';
        animated = false;
        var br = board.getBoundingClientRect();
        svg.setAttribute('viewBox', '0 0 ' + br.width + ' ' + br.height);

        EDGES.forEach(function (edge) {
            var a = document.querySelector('[data-rmid="' + edge.from + '"]');
            var b = document.querySelector('[data-rmid="' + edge.to   + '"]');
            if (!a || !b) return;
            var pa = center(a, br), pb = center(b, br);
            var my = (pa.yBot + pb.yTop) / 2;
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d',
                'M' + pa.x + ',' + pa.yBot +
                ' C' + pa.x + ',' + my + ' ' + pb.x + ',' + my + ' ' + pb.x + ',' + pb.yTop);
            path.classList.add('rm-line', edge.cls);
            svg.appendChild(path);
            var len = 300;
            try { len = Math.ceil(path.getTotalLength()); } catch (e) {}
            path.style.strokeDasharray  = len;
            path.style.strokeDashoffset = len;
        });
    }

    function animateLines() {
        if (animated) return;
        animated = true;
        document.querySelectorAll('#roadmap-svg .rm-line').forEach(function (line, i) {
            setTimeout(function () {
                line.style.transition = 'stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)';
                line.style.strokeDashoffset = '0';
            }, i * 50);
        });
    }

    function debounceRm(fn, ms) { var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); }; }

    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(drawLines, 350);

        window.addEventListener('resize', debounceRm(function () {
            drawLines();
            if (document.querySelector('#roadmap-board.is-visible')) animateLines();
        }, 280));

        var board = document.getElementById('roadmap-board');
        if (board && 'IntersectionObserver' in window) {
            new IntersectionObserver(function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        drawLines();
                        setTimeout(animateLines, 100);
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 }).observe(board);
        }
    });
}());

// 11. Card 3-D mouse-track tilt
document.addEventListener('DOMContentLoaded', function () {
    // Blog items: stronger tilt
    var blogItems = document.querySelectorAll('.isotope .item');
    blogItems.forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
            var rect = el.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width  - 0.5;
            var y = (e.clientY - rect.top)  / rect.height - 0.5;
            el.style.transition = 'none';
            el.style.transform = 'perspective(800px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-6px)';
        });
        el.addEventListener('mouseleave', function () {
            el.style.transition = 'transform 0.45s cubic-bezier(.16,1,.3,1)';
            el.style.transform = '';
        });
    });

    // Timeline content cards: subtle tilt
    var timelineCards = document.querySelectorAll('.timeline-content');
    timelineCards.forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
            var rect = el.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width  - 0.5;
            var y = (e.clientY - rect.top)  / rect.height - 0.5;
            el.style.transition = 'none';
            el.style.transform = 'perspective(1000px) rotateX(' + (-y * 3) + 'deg) rotateY(' + (x * 3) + 'deg)';
        });
        el.addEventListener('mouseleave', function () {
            el.style.transition = 'transform 0.5s cubic-bezier(.16,1,.3,1)';
            el.style.transform = '';
        });
    });

    // Signature quote: reveal on scroll into view
    var quoteSection = document.getElementById('signature-quote');
    if (quoteSection) {
        var quoteObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('quote-visible');
                    quoteObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        quoteObserver.observe(quoteSection);
    }
});
