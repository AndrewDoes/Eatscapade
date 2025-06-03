document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.video-story');
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let rafID = null;

    const handleMove = (x) => {
        const walk = (x - startX) * 1.5; // adjust drag speed here
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

window.openVideo = function () {
    document.querySelector('.pop-up').classList.add('active');
};

window.closeVideo = function () {
    document.querySelector('.pop-up').classList.remove('active');
};


window.toggleLike = function (id) {
    const like = document.getElementById('like' + id);

    like.classList.toggle('active');
    like.classList.add('pop');

    // Remove 'pop' after animation completes
    setTimeout(() => {
        like.classList.remove('pop');
    }, 400); // Match CSS animation duration
};

let postIdCounter = 4; // make sure this is globally declared

window.addNewPost = function () {
    const column1 = document.getElementById('column-1');
    const column2 = document.getElementById('column-2');

    const newPost = document.createElement('div');
    newPost.className = 'post-card textImage';
    newPost.id = `post${postIdCounter}`;

    const imageCount = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const imageUrls = [
        "https://placekitten.com/300/200",
        "https://placebear.com/300/200",
        "https://placebeard.it/300x200",
        "https://placekitten.com/301/200"
    ];

    let imagesHTML = "";
    for (let i = 0; i < imageCount; i++) {
        imagesHTML += `
            <div class="image" id="image${i + 1}">
                <img src="${imageUrls[i]}" alt="Image ${i + 1}">
            </div>
        `;
    }

    newPost.innerHTML = `
        <div class="top-section">
            <div class="left">
                <div class="prof-pic"></div>
                <div class="user-info">
                    <p class="user-name">NewUser${postIdCounter}</p>
                    <p class="user-tag">@newuser${postIdCounter}</p>
                </div>
            </div>
            <div class="right">
                <i class="fa-solid fa-share"></i>
            </div>
        </div>
        <div class="paragraph-section">
            <p class="paragraph">
                This is a dynamically added post with ${imageCount} image(s).
            </p>
        </div>
        <div class="images image${imageCount}">
            ${imagesHTML}
        </div>
        <div class="interaction-section">
            <i class="fa-regular fa-heart" onclick="toggleLike()"></i>
            <i class="fa-solid fa-repeat"></i>
            <i class="fa-regular fa-comment"></i>
        </div>
    `;

    // Alternate between columns
    if (column1.children.length <= column2.children.length) {
        column1.appendChild(newPost);
    } else {
        column2.appendChild(newPost);
    }

    postIdCounter++;
};


document.querySelectorAll('.post-card').forEach(card => {
    const imageContainer = card.querySelector('.images');
    const images = imageContainer.querySelectorAll('.image');

    const count = images.length;
    imageContainer.classList.remove('image1', 'image2', 'image3', 'image4');
    if (count > 0 && count <= 4) {
        imageContainer.classList.add(`image${count}`);
    }
});

function toggleReadMore(elem) {
    const paragraph = elem.previousElementSibling;

    if (paragraph.classList.contains('expanded')) {
        paragraph.classList.remove('expanded');
        elem.innerText = 'Read more';
    } else {
        paragraph.classList.add('expanded');
        elem.innerText = 'Read less';
    }
}
