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


    // 2. IntersectionObserver for Scroll-Reveal Animations
    const revealElements = document.querySelectorAll(".reveal-up");
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Option: unobserve once revealed to keep performance high
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // triggers slightly before entering
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
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


    // 4. Smooth Scrolling for Nav Links (Optional fallback helper)
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
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
