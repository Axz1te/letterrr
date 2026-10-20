const wrapper = document.querySelector("#envelope-wrap");
const openButton = document.querySelector("#open-envelope");
const closeButton = document.querySelector("#close-letter");
const letter = document.querySelector("#letter");
const petals = document.querySelector("#petals");
const music = document.querySelector("#background-music");
const musicToggle = document.querySelector("#music-toggle");
const volumeControl = document.querySelector("#music-volume");
const volumeValue = document.querySelector("#music-volume-value");
const musicStatus = document.querySelector("#music-status");

music.volume = Number(volumeControl.value) / 100;

function updateMusicButton() {
    const isPlaying = !music.paused;
    musicToggle.textContent = isPlaying ? "Pause music" : "Play music";
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
}

function playMusic() {
    music.play().catch(() => {
        musicStatus.textContent = music.error
            ? "Add your music file at audio/background-music.mp3 to enable playback."
            : "Autoplay was blocked. Press Play music to start.";
        updateMusicButton();
    });
}

music.addEventListener("play", () => {
    musicStatus.textContent = "Background music is playing.";
    updateMusicButton();
});
music.addEventListener("pause", updateMusicButton);
music.addEventListener("error", () => {
    musicStatus.textContent = "Add your music file at audio/background-music.mp3 to enable playback.";
});

musicToggle.addEventListener("click", () => {
    if (music.paused) {
        playMusic();
    } else {
        music.pause();
        musicStatus.textContent = "Background music is paused.";
    }
});

volumeControl.addEventListener("input", () => {
    const volume = Number(volumeControl.value);
    music.volume = volume / 100;
    volumeValue.value = `${volume}%`;
    volumeValue.textContent = `${volume}%`;
});

playMusic();

openButton.addEventListener("click", () => {
    if (wrapper.classList.contains("is-opening") || wrapper.classList.contains("is-open")) return;

    wrapper.classList.add("is-opening");
    openButton.disabled = true;

    window.setTimeout(() => {
        wrapper.classList.remove("is-opening");
        wrapper.classList.add("is-open");
        letter.setAttribute("aria-hidden", "false");
        letter.inert = false;
        openButton.hidden = true;
        closeButton.focus();
    }, 720);
});

function closeLetter() {
    wrapper.classList.remove("is-opening", "is-open");
    letter.setAttribute("aria-hidden", "true");
    letter.inert = true;
    openButton.hidden = false;
    openButton.disabled = false;
    openButton.focus();
}

closeButton.addEventListener("click", closeLetter);

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && wrapper.classList.contains("is-open")) {
        closeLetter();
    }
});

for (let i = 0; i < 24; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--size", `${7 + Math.random() * 10}px`);
    petal.style.setProperty("--duration", `${8 + Math.random() * 9}s`);
    petal.style.setProperty("--delay", `${-Math.random() * 16}s`);
    petal.style.setProperty("--drift", `${-60 + Math.random() * 120}px`);
    petal.style.setProperty("--color", Math.random() > .5 ? "#f3b6c2" : "#fff0dc");
    petals.appendChild(petal);
}