/* -----------------------------------------
   1. CONFIGURATION & SELECTORS
   -----------------------------------------
*/
const startDay = new Date("2025-01-31");
const endDay = new Date(startDay.getFullYear() + 100, startDay.getMonth(), startDay.getDate());

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const emojiLayer = document.getElementById('emoji-layer');

/* -----------------------------------------
   2. MUSIC AUTO-PLAY LOGIC
   -----------------------------------------
   Browsers block autoplay. This triggers the song 
   the moment she clicks, touches, or scrolls.
*/
function startMusic() {
    music.play().then(() => {
        musicBtn.innerText = "⏸ Pause Music";
        // Once it starts, stop listening for these events
        window.removeEventListener('click', startMusic);
        window.removeEventListener('touchstart', startMusic);
        window.removeEventListener('scroll', startMusic);
    }).catch(err => {
        console.log("Waiting for user to interact with the screen to play music...");
    });
}

// Event listeners for the "Autoplay" workaround
window.addEventListener('click', startMusic);
window.addEventListener('touchstart', startMusic);
window.addEventListener('scroll', startMusic);

// Manual Toggle for the button
function toggleMusic() {
    if (music.paused) {
        music.play();
        musicBtn.innerText = "⏸ Pause Music";
    } else {
        music.pause();
        musicBtn.innerText = "🎵 Play Music";
    }
}

/* -----------------------------------------
   3. COUNTER LOGIC (Days Together & 100 Years)
   -----------------------------------------
*/
function updateCounters() {
    const now = new Date();
    
    // --- Days Together Calculation ---
    const timeSince = now - startDay;
    const totalDays = Math.floor(timeSince / (1000 * 60 * 60 * 24));
    document.getElementById("days-together").innerText = totalDays;

    // --- 100 Year Promise Calculation ---
    const diff = endDay - now;
    
    // Using 365.25 to account for leap years over 100 years
    const yearsLeft = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const daysLeft = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
    
    document.getElementById("years-left").innerText = yearsLeft;
    document.getElementById("days-left").innerText = daysLeft;
}

// Run the counters every second
setInterval(updateCounters, 1000);
updateCounters(); // Initial call

/* -----------------------------------------
   4. EMOJI RAIN EFFECT (😭)
   -----------------------------------------
*/
function createCryingEmoji() {
    const emoji = document.createElement('div');
    emoji.innerText = '😭';
    emoji.className = 'falling-emoji';
    
    // Randomize position and speed
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.animationDuration = Math.random() * 2 + 3 + 's'; // Between 3s and 5s
    
    emojiLayer.appendChild(emoji);

    // Remove from DOM after it finishes falling to save memory
    setTimeout(() => {
        emoji.remove();
    }, 5000);
}

// Create a new emoji every 400ms
setInterval(createCryingEmoji, 400);