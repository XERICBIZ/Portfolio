/* JavaScript logic for Cinematic AI Portfolio - Pratyaksh Ranjan */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Mouse Follower Orb Logic
    const cursorOrb = document.getElementById("cursorOrb");
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const speed = 0.08; // Inertia speed (lower is smoother/slower)

    document.addEventListener("mousemove", (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateOrb() {
        // Linear interpolation (lerp) for smooth motion
        currentX += (targetX - currentX) * speed;
        currentY += (targetY - currentY) * speed;

        cursorOrb.style.left = `${currentX}px`;
        cursorOrb.style.top = `${currentY}px`;

        requestAnimationFrame(animateOrb);
    }
    animateOrb();

    // Shrink/Grow orb on link hover
    const interactiveElements = document.querySelectorAll("a, button, .glass-panel-hover");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursorOrb.style.width = "500px";
            cursorOrb.style.height = "500px";
            cursorOrb.style.background = "radial-gradient(circle, rgba(255, 180, 0, 0.07) 0%, transparent 70%)";
        });
        el.addEventListener("mouseleave", () => {
            cursorOrb.style.width = "400px";
            cursorOrb.style.height = "400px";
            cursorOrb.style.background = "radial-gradient(circle, rgba(255, 180, 0, 0.04) 0%, transparent 70%)";
        });
    });


    // 1. Initial Page Load Animation
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const loadTl = gsap.timeline();
    loadTl.fromTo("header",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", force3D: true }
    )
        .fromTo(".hero-panel",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.4, ease: "power4.out", force3D: true },
            "-=0.8"
        )
        .fromTo(".nav-dock",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", force3D: true },
            "-=1.0"
        );

    // 2. GSAP Scroll-Reveal Animations

    const revealElements = document.querySelectorAll(".reveal-up");

    revealElements.forEach(el => {
        let delayVal = el.getAttribute("data-delay") || 0;
        gsap.fromTo(el,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                delay: Number(delayVal),
                ease: "power4.out",
                force3D: true, // Forces hardware acceleration
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });


    // 3. IntersectionObserver for Floating Nav Dock Highlights
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-dock .nav-item");

    const navObserverOptions = {
        threshold: 0.35, // Trigger when 35% of the section is visible
        rootMargin: "-10% 0px -40% 0px" // Adjust vertical focus area
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute("id");

                // Update nav items
                navItems.forEach(item => {
                    item.classList.remove("active");
                    const href = item.getAttribute("href");
                    if (href === `#${activeId}`) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });


    // 4. GSAP Smooth Scrolling for Nav Links
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("href");

            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: targetId, offsetY: 0 },
                ease: "power4.inOut"
            });
        });
    });


    // 5. Dynamic Mock CV Generation & Download
    const downloadBtn = document.getElementById("downloadCVBtn");
    const downloadHeader = document.getElementById("downloadCVHeader");

    const triggerCVDownload = (e) => {
        e.preventDefault();

        const cvMarkdown = `# PRATYAKSH RANJAN — AI/ML Engineer
Email: contact@pratyaksh.ai | LinkedIn: linkedin.com/in/pratyaksh | GitHub: github.com/pratyaksh

## Executive Summary
AI/ML Engineer with a background in web development, specializing in deep learning, computer vision, and quantum neural network research. Discovered celestial anomalies and pioneered quantum seismic analysis systems.

## Technical Skills
- ML & Deep Learning: PyTorch, TensorFlow, Computer Vision, CNNs, Transformers, NLP, Scikit-learn
- Languages: Python, JavaScript, C++, SQL, HTML/CSS, Bash
- Tools & DevOps: Docker, Git, CUDA, Linux, AWS Cloud, Git Actions (CI/CD)

## Professional Experience & Projects
- Quantum AI for Seismic Wave Analysis (Early Earthquake Prediction)
- Celestial Moving Object Detection (Deep space anomaly CV algorithms)

## Education
- B.Tech in Computer Science, IIIT Manipur (2020 - 2024)
`;

        const blob = new Blob([cvMarkdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Pratyaksh_Ranjan_CV.md";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (downloadBtn) downloadBtn.addEventListener("click", triggerCVDownload);
    if (downloadHeader) downloadHeader.addEventListener("click", triggerCVDownload);
});
