// Toggle Between Listen and Read Sections
const listenBtn = document.getElementById("listenBtn");
const readBtn = document.getElementById("readBtn");
const listenSection = document.getElementById("listenSection");
const readSection = document.getElementById("readSection");

listenBtn.addEventListener("click", () => {
    listenSection.classList.add("visible");
    readSection.classList.remove("visible");
    listenBtn.classList.add("active");
    readBtn.classList.remove("active");
    // Pause background music when switching to listen section
    pauseAudio(); // Use the new Web Audio API pause function
    bgPlayIcon.classList.remove("hidden");
    bgPauseIcon.classList.add("hidden");
});

readBtn.addEventListener("click", () => {
    readSection.classList.add("visible");
    listenSection.classList.remove("visible");
    readBtn.classList.add("active");
    listenBtn.classList.remove("active");
    // Pause narration audio when switching to read section
    narrationAudio.pause();
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
});

// Narration Audio Player
const narrationAudio = document.getElementById("narrationAudio");
const playBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

playBtn.addEventListener("click", () => {
    if (narrationAudio.paused) {
        narrationAudio.play();
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
    } else {
        narrationAudio.pause();
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
    }
});

narrationAudio.addEventListener("timeupdate", () => {
    progressBar.value = (narrationAudio.currentTime / narrationAudio.duration) * 100;
});

progressBar.addEventListener("input", () => {
    narrationAudio.currentTime = (progressBar.value / 100) * narrationAudio.duration;
});

// Web Audio API for Background Music
let audioContext;
let source;
let audioBuffer;

async function setupAudio() {
    // Create an AudioContext
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Fetch the audio file
    const response = await fetch('Mitski - My Love Mine All Mine (Official Lyric Video).mp3');
    const arrayBuffer = await response.arrayBuffer();

    // Decode the audio data
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

function playAudio() {
    if (audioContext.state === 'suspended') {
        audioContext.resume(); // Resume the audio context if suspended
    }

    // Create a new audio source
    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true; // Loop the audio
    source.connect(audioContext.destination);
    source.start(0); // Start playing immediately
}

function pauseAudio() {
    if (source) {
        source.stop(); // Stop the audio
    }
}

// Initialize audio
setupAudio();

// Background Music Player Toggle
const bgMusicToggle = document.getElementById("bgMusicToggle");
const bgPlayIcon = document.getElementById("bgPlayIcon");
const bgPauseIcon = document.getElementById("bgPauseIcon");

let isPlaying = false;

bgMusicToggle.addEventListener("click", () => {
    if (isPlaying) {
        pauseAudio();
        bgPlayIcon.classList.remove("hidden");
        bgPauseIcon.classList.add("hidden");
    } else {
        playAudio();
        bgPlayIcon.classList.add("hidden");
        bgPauseIcon.classList.remove("hidden");
    }
    isPlaying = !isPlaying;
});

// Show Read Section by Default
readSection.classList.add("visible");
readBtn.classList.add("active");

// Parallax Scrolling Effect
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const background = document.querySelector(".background");
    background.style.transform = `translateY(${scrollY * 0.5}px)`; // Adjust the multiplier for speed
});

// Toggle Background Music Player Visibility
const toggleMusicPlayerBtn = document.getElementById("toggleMusicPlayer");
const backgroundMusicPlayer = document.getElementById("backgroundMusicPlayer");

toggleMusicPlayerBtn.addEventListener("click", () => {
    if (backgroundMusicPlayer.classList.contains("hidden")) {
        backgroundMusicPlayer.classList.remove("hidden");
        toggleMusicPlayerBtn.textContent = "Hide Music Player";
    } else {
        backgroundMusicPlayer.classList.add("hidden");
        toggleMusicPlayerBtn.textContent = "Show Music Player";
    }
});
