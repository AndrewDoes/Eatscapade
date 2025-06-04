document.addEventListener("DOMContentLoaded", () => {
    const notifBox = document.querySelector('.notif-box');
    const notifCount = document.querySelector('.notif-count');

    function updateNotif() {
        const audio = new Audio('./Assets/navbar/notif.wav');
        audio.volume = 1;
        audio.preload = 'auto';
        const currentCount = parseInt(notifCount.textContent) || 0;
        const newCount = currentCount + 1;
        notifCount.textContent = newCount;

        audio.play();
        notifBox.classList.add('active');
        notifCount.classList.add('active');
        notifCount.classList.add('pop');

        setTimeout(() => {
            notifCount.classList.remove('pop');
        }, 300);
    }

    setInterval(updateNotif, 60000); // Every 1 minute
});