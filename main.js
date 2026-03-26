// main.js - NexusOS Infotainment Core Logic

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initAppLauncher();
    initClimateControl();
    initAIAssistant();
    initSimulations();
});

// Update top bar clock
function initClock() {
    const timeEl = document.getElementById('system-time');
    
    function update() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        timeEl.textContent = `${hours}:${minutes} ${ampm}`;
    }
    
    update();
    setInterval(update, 1000); // update every second just to be precise
}

// Handle switching between modules (Vehicle, Media, Settings)
function initAppLauncher() {
    const icons = document.querySelectorAll('.app-icon');
    const modules = document.querySelectorAll('.module');

    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetId = icon.getAttribute('data-target');
            if(!targetId) return; // Ignore climate button because it triggers overlay

            // Remove active states
            icons.forEach(i => i.classList.remove('active'));
            modules.forEach(m => {
                m.classList.remove('active');
            });

            // Set new active states
            icon.classList.add('active');
            const targetModule = document.getElementById(targetId);
            if(targetModule) {
                targetModule.classList.remove('hidden'); // Ensure not hidden mostly for Settings
                targetModule.classList.add('active');
            }
        });
    });

    // Handle Quick Control toggles
    document.querySelectorAll('.qc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
        });
    });

    // Handle Setting Pill toggles
    document.querySelectorAll('.pill-toggle button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parent = e.target.parentElement;
            parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Handle Color Picker toggles
    document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const parent = e.target.parentElement;
            parent.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

// Handle Climate Control overlay
function toggleClimate() {
    const overlay = document.getElementById('climate-overlay');
    if(overlay.classList.contains('show')) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.classList.add('hidden'), 400); // wait for animation
    } else {
        overlay.classList.remove('hidden');
        // trigger reflow
        void overlay.offsetWidth;
        overlay.classList.add('show');
    }
}

// Seat heater toggle logic
function initClimateControl() {
    // Dock seat heaters
    document.querySelectorAll('.dock-section .seat-heater').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent clicking climate overlay
            btn.classList.toggle('active');
        });
    });

    // AC Overlay Buttons
    document.querySelectorAll('.ac-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
        });
    });

    // Temperature changes (mock)
    document.querySelectorAll('.temp-control').forEach(ctrl => {
        const valSpan = ctrl.querySelector('.temp-val');
        const btns = ctrl.querySelectorAll('.icon-btn');
        if(!valSpan || btns.length < 2) return;
        
        let temp = parseInt(valSpan.textContent);

        btns[0].addEventListener('click', (e) => {
            e.stopPropagation();
            temp--;
            valSpan.textContent = `${temp}°`;
        });
        btns[1].addEventListener('click', (e) => {
            e.stopPropagation();
            temp++;
            valSpan.textContent = `${temp}°`;
        });
    });
}

// AI Assistant mock logic
function initAIAssistant() {
    const trigger = document.getElementById('ai-trigger');
    const overlay = document.getElementById('ai-overlay');
    const textDesc = overlay.querySelector('.ai-text');

    trigger.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        textDesc.textContent = "Listening...";
        
        // Simulate flow
        setTimeout(() => {
            textDesc.textContent = "Navigating to Home...";
        }, 2000);

        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 3500);
    });

    overlay.addEventListener('click', () => {
        overlay.classList.add('hidden');
    });
}

// Simulate some background activities (progress bar, ETA)
function initSimulations() {
    // Music Player progress simulation
    const pFill = document.querySelector('.progress-fill');
    const pTime = document.querySelector('.time-current');
    let progress = 35;
    let min = 1;
    let sec = 24;

    const playBtn = document.querySelector('.play-btn');
    let isPlaying = true;

    if(playBtn) {
        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
        });
    }

    setInterval(() => {
        if(!isPlaying) return;

        progress += 0.5;
        if(progress > 100) progress = 0;
        if(pFill) pFill.style.width = `${progress}%`;
        
        // rudimentary time simulation just for visual effect
        sec++;
        if(sec >= 60) {
            sec = 0;
            min++;
        }
        if(pTime) {
            pTime.textContent = `0${min}:${sec < 10 ? '0'+sec : sec}`;
        }
        
    }, 1000);
}

// Expose globally for inline HTML onclick attributes
window.toggleClimate = toggleClimate;
