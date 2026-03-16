import "../css/main.scss";
console.log("Main.scss bien chargé boss");
import "./cookie.js";
console.log("Cookie js bien chargé");

function rotatateTitleHero() {
    const words = ["Front-end", "Back-end"];
    const container = document.getElementById("heroRotatingText");

    if (!container) return;

    const activeEl = container.querySelector(".is-active");
    const nextEl = container.querySelector(".is-next");

    let index = 0;

    setInterval(() => {
        const nextIndex = (index + 1) % words.length;

        nextEl.textContent = words[nextIndex];

        activeEl.classList.add("is-animating-out");
        nextEl.classList.add("is-animating-in");

        setTimeout(() => {
            activeEl.textContent = words[nextIndex];

            activeEl.classList.remove("is-animating-out");
            nextEl.classList.remove("is-animating-in");

            index = nextIndex;
        }, 700);
    }, 2000);
}

function competencesCarousel() {
    const marquee = document.getElementById("competencesMarquee");
    const track = document.getElementById("competencesTrack");

    if (!marquee || !track) return;

    const originalItems = Array.from(track.children);
    if (!originalItems.length) return;

    originalItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    });

    let isPaused = false;
    let animationId = null;
    let position = 0;
    const speed = 0.6;

    const originalWidth = originalItems.reduce((total, item) => {
        const style = window.getComputedStyle(item);
        const marginRight = parseFloat(style.marginRight) || 0;
        return total + item.offsetWidth + marginRight;
    }, 0);

    function animate() {
        if (!isPaused) {
            position -= speed;

            if (Math.abs(position) >= originalWidth) {
                position = 0;
            }

            track.style.transform = `translate3d(${position}px, 0, 0)`;
        }

        animationId = requestAnimationFrame(animate);
    }

    marquee.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    marquee.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    animate();
}

document.addEventListener("DOMContentLoaded", () => {
    rotatateTitleHero();
    competencesCarousel();
});