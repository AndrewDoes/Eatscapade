document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.video-story');
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let rafID = null;

    const handleMove = (x) => {
        const walk = (x - startX) * 0.4; // adjust drag speed here
        slider.scrollLeft = scrollLeft - walk;
    };

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        if (rafID) cancelAnimationFrame(rafID);
        rafID = requestAnimationFrame(() => handleMove(e.pageX - slider.offsetLeft));
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('dragging');
        cancelAnimationFrame(rafID);
    });

    // Touch events
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        if (rafID) cancelAnimationFrame(rafID);
        rafID = requestAnimationFrame(() => {
            const x = e.touches[0].pageX - slider.offsetLeft;
            handleMove(x);
        });
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('dragging');
        cancelAnimationFrame(rafID);
    });
});
