// Global variables
let currentStage = 0;
let particlesArray = [];
let isApologyStarted = false;
let musicPlayer = null;
let celebrationPlayer = null;
let isPlaying = false;
let currentVolume = 0.5;
let currentSong = 'romantic'; // 'romantic' or 'celebration'

// Photo slideshow variables
let photos = [
    'image/IMG-20240510-WA0032.jpg',
    'image/IMG_20240116_222153_502.jpg',
    'image/IMG_20240218_184306_596.jpg',
    'image/IMG_20240403_191203_884.jpg',
    'image/IMG_20240603_214305_471.jpg',
    'image/img.jpg'
];
let currentPhotoIndex = 0;
let slideshowInterval = null;
let isSlideShowActive = false;

// Photo captions (you can customize these)
let photoCaptions = [
    'Beautiful moments we shared together 💕',
    'Your smile lights up my world ✨',
    'Every memory with you is precious 💖',
    'Together we create magic 🌹',
    'You make every day special 💝',
    'Forever grateful for you 💞'
];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    setupEventListeners();
    setupClickHeartEffect();
    startFloatingAnimation();
    initializeMusicPlayer();
    
    // Try multiple autostart methods
    tryAutostart();
});

// Create animated background particles
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size and position
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    container.appendChild(particle);
}

// Setup event listeners
function setupEventListeners() {
    const heartButton = document.getElementById('heartButton');
    const yesButton = document.getElementById('yesButton');
    const maybeButton = document.getElementById('maybeButton');

    heartButton.addEventListener('click', startApologySequence);
    yesButton.addEventListener('click', showCelebration);
    maybeButton.addEventListener('click', showUnderstanding);
    
    // Add heart button animation effect
    heartButton.addEventListener('mouseenter', () => {
        heartButton.style.transform = 'scale(1.1) translateY(-5px)';
        createHeartBurst(heartButton);
    });
    
    heartButton.addEventListener('mouseleave', () => {
        heartButton.style.transform = 'scale(1) translateY(0)';
    });
}

// Start the apology sequence
function startApologySequence() {
    if (isApologyStarted) return;
    
    isApologyStarted = true;
    const messageBox = document.getElementById('messageBox');
    const heartButton = document.getElementById('heartButton');
    const apologyStages = document.getElementById('apologyStages');
    
    // Animate message box out
    messageBox.style.transform = 'scale(0.8)';
    messageBox.style.opacity = '0';
    heartButton.style.transform = 'scale(0)';
    heartButton.style.opacity = '0';
    
    // Create heart explosion effect
    createMassiveHeartExplosion();
    
    setTimeout(() => {
        messageBox.style.display = 'none';
        heartButton.style.display = 'none';
        apologyStages.style.display = 'block';
        showNextStage(1);
    }, 800);
}

// Show next stage of apology
function showNextStage(stageNumber) {
    const currentStageElement = document.getElementById('stage' + currentStage);
    const nextStageElement = document.getElementById('stage' + stageNumber);
    
    if (currentStageElement) {
        currentStageElement.classList.remove('active');
        setTimeout(() => {
            currentStageElement.style.display = 'none';
        }, 400);
    }
    
    setTimeout(() => {
        nextStageElement.style.display = 'block';
        nextStageElement.classList.add('active');
        currentStage = stageNumber;
        
        // Add some sparkle effects for each stage
        createSparkleEffect();
    }, currentStage > 0 ? 500 : 0);
}

// Show celebration response
function showCelebration() {
    const apologyStages = document.getElementById('apologyStages');
    const finalSection = document.getElementById('finalSection');
    const celebration = document.getElementById('celebration');
    
    apologyStages.style.opacity = '0';
    apologyStages.style.transform = 'scale(0.8)';
    
    // Switch to celebration music immediately
    switchToCelebrationMusic();
    
    setTimeout(() => {
        apologyStages.style.display = 'none';
        finalSection.style.display = 'block';
        celebration.classList.add('active');
        
        // Massive celebration effect
        createCelebrationExplosion();
        playJoyfulAnimation();
        
        // Extra celebration effects
        createCelebrationHeartRain();
        
        // Initialize photo slideshow after a delay to let celebration settle
        setTimeout(() => {
            initializePhotoSlideshow();
        }, 1500);
    }, 600);
}

// Show understanding response
function showUnderstanding() {
    const apologyStages = document.getElementById('apologyStages');
    const finalSection = document.getElementById('finalSection');
    const understanding = document.getElementById('understanding');
    
    apologyStages.style.opacity = '0';
    apologyStages.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        apologyStages.style.display = 'none';
        finalSection.style.display = 'block';
        understanding.classList.add('active');
        
        // Create crying emoji animation
        createCryingEmojiAnimation();
        
        // Gentle, understanding effect after crying
        setTimeout(() => {
            createGentleHeartEffect();
        }, 2000);
    }, 600);
}

// Click anywhere for hearts effect
function setupClickHeartEffect() {
    document.addEventListener('click', function(e) {
        if (!e.target.closest('button') && !e.target.closest('.stage')) {
            createClickHeart(e.clientX, e.clientY);
        }
    });
}

function createClickHeart(x, y) {
    const hearts = ['💖', '💕', '💝', '🌹', '✨', '💫', '⭐'];
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = (x - 15) + 'px';
    heart.style.top = (y - 15) + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Create heart burst effect
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            createClickHeart(
                centerX + (Math.random() - 0.5) * 100,
                centerY + (Math.random() - 0.5) * 100
            );
        }, i * 100);
    }
}

// Create massive heart explosion
function createMassiveHeartExplosion() {
    const hearts = ['💖', '💕', '💝', '🌹', '✨', '💫', '⭐', '❤️', '💗', '💘'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'click-heart';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
            heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 100);
    }
}

// Create sparkle effect for stages
function createSparkleEffect() {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'click-heart';
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * (window.innerHeight * 0.7) + 'px';
            sparkle.style.fontSize = '1rem';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, i * 200);
    }
}

// Create celebration explosion
function createCelebrationExplosion() {
    const celebrationEmojis = ['🎉', '🎊', '💖', '💕', '✨', '🌟', '💫', '🎈', '🌹', '💝'];
    
    // Create multiple waves of celebration
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const emoji = document.createElement('div');
                    emoji.className = 'click-heart';
                    emoji.innerHTML = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
                    emoji.style.left = Math.random() * window.innerWidth + 'px';
                    emoji.style.top = Math.random() * window.innerHeight + 'px';
                    emoji.style.fontSize = (Math.random() * 2.5 + 1.5) + 'rem';
                    
                    document.body.appendChild(emoji);
                    
                    setTimeout(() => {
                        emoji.remove();
                    }, 3000);
                }, i * 50);
            }
        }, wave * 1000);
    }
}

// Play joyful animation
function playJoyfulAnimation() {
    const celebration = document.getElementById('celebration');
    const hearts = celebration.querySelectorAll('.celebration-hearts span');
    
    hearts.forEach((heart, index) => {
        setTimeout(() => {
            heart.style.transform = 'scale(1.5)';
            heart.style.animation = 'bounce 0.6s ease-in-out';
            
            setTimeout(() => {
                heart.style.transform = 'scale(1)';
            }, 600);
        }, index * 200);
    });
    
    // Add screen shake effect
    document.body.style.animation = 'shake 0.5s ease-in-out 2';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 1000);
}

// Create crying emoji animation
function createCryingEmojiAnimation() {
    // Create main crying face
    createCryingFace();
    
    // Create falling tears
    createFallingTears();
    
    // Create crying emoji rain
    createCryingEmojiRain();
    
    // Add sad sound effect (visual representation)
    createSadWaves();
}

// Create large crying face in center
function createCryingFace() {
    const cryingFace = document.createElement('div');
    cryingFace.innerHTML = '😭';
    cryingFace.style.position = 'fixed';
    cryingFace.style.left = '50%';
    cryingFace.style.top = '30%';
    cryingFace.style.transform = 'translate(-50%, -50%) scale(0)';
    cryingFace.style.fontSize = '8rem';
    cryingFace.style.zIndex = '2000';
    cryingFace.style.animation = 'cryingFaceAppear 3s ease-out';
    cryingFace.style.textShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
    cryingFace.style.filter = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))';
    
    document.body.appendChild(cryingFace);
    
    setTimeout(() => {
        cryingFace.remove();
    }, 3000);
}

// Create falling tears animation
function createFallingTears() {
    const tearEmojis = ['💧', '💦', '😭', '😢', '😥', '😪'];
    
    // Create tears falling from center
    for (let wave = 0; wave < 4; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const tear = document.createElement('div');
                    tear.className = 'falling-tear';
                    tear.innerHTML = tearEmojis[Math.floor(Math.random() * tearEmojis.length)];
                    
                    // Start from center area
                    tear.style.left = (window.innerWidth * 0.5 + (Math.random() - 0.5) * 200) + 'px';
                    tear.style.top = (window.innerHeight * 0.25) + 'px';
                    tear.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
                    
                    document.body.appendChild(tear);
                    
                    setTimeout(() => {
                        tear.remove();
                    }, 4000);
                }, i * 150);
            }
        }, wave * 800);
    }
}

// Create crying emoji rain effect
function createCryingEmojiRain() {
    const sadEmojis = ['😭', '😢', '😥', '😪', '😓', '😔', '💧', '💦'];
    
    // Create continuous rain for 6 seconds
    let rainInterval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.className = 'crying-rain';
                emoji.innerHTML = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
                emoji.style.left = Math.random() * window.innerWidth + 'px';
                emoji.style.top = '-30px';
                emoji.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
                
                document.body.appendChild(emoji);
                
                setTimeout(() => {
                    emoji.remove();
                }, 5000);
            }, i * 100);
        }
    }, 300);
    
    // Stop the rain after 6 seconds
    setTimeout(() => {
        clearInterval(rainInterval);
    }, 6000);
}

// Create sad waves effect
function createSadWaves() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.className = 'sad-wave';
            wave.style.position = 'fixed';
            wave.style.left = '50%';
            wave.style.top = '50%';
            wave.style.transform = 'translate(-50%, -50%)';
            wave.style.width = '0px';
            wave.style.height = '0px';
            wave.style.border = '3px solid rgba(100, 149, 237, 0.3)';
            wave.style.borderRadius = '50%';
            wave.style.animation = 'sadWaveExpand 2s ease-out';
            wave.style.zIndex = '1500';
            
            document.body.appendChild(wave);
            
            setTimeout(() => {
                wave.remove();
            }, 2000);
        }, i * 700);
    }
}

// Create gentle heart effect for understanding
function createGentleHeartEffect() {
    const gentleHearts = ['💙', '💜', '🤍', '✨', '💫'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'click-heart';
            heart.innerHTML = gentleHearts[Math.floor(Math.random() * gentleHearts.length)];
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * (window.innerHeight * 0.8) + 'px';
            heart.style.fontSize = '1.2rem';
            heart.style.animationDuration = '3s';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 300);
    }
}

// Floating animation controller
function startFloatingAnimation() {
    // Add additional floating elements dynamically
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            createFloatingElement();
        }
    }, 2000);
}

function createFloatingElement() {
    const floatingElements = ['💕', '🌹', '✨', '💫'];
    const element = document.createElement('div');
    element.innerHTML = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.position = 'fixed';
    element.style.left = Math.random() * 100 + '%';
    element.style.top = '110vh';
    element.style.fontSize = '1.5rem';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '1';
    element.style.opacity = '0.6';
    element.style.animation = 'floatHearts 12s linear';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 12000);
}

// Add screen shake animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .pulse {
        animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Add typing effect for messages (bonus feature)
function typeMessage(element, message, speed = 50) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < message.length) {
            element.innerHTML += message.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Easter egg: Konami code for extra hearts
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konami.length && konamiCode.every((code, i) => code === konami[i])) {
        // Easter egg activated!
        createMassiveHeartExplosion();
        createMassiveHeartExplosion();
        setTimeout(() => createMassiveHeartExplosion(), 1000);
        konamiCode = [];
    }
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Music Player Functionality
function initializeMusicPlayer() {
    musicPlayer = document.getElementById('backgroundMusic');
    celebrationPlayer = document.getElementById('celebrationMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeBtn = document.getElementById('volumeBtn');
    const progressBar = document.querySelector('.progress-bar');
    const musicPlayerContainer = document.getElementById('musicPlayer');
    
    // Set initial volume for both players
    musicPlayer.volume = currentVolume;
    celebrationPlayer.volume = currentVolume;
    volumeSlider.value = currentVolume * 100;
    
    // Play/Pause functionality
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // Volume control
    volumeSlider.addEventListener('input', function() {
        currentVolume = this.value / 100;
        musicPlayer.volume = currentVolume;
        celebrationPlayer.volume = currentVolume;
        updateVolumeIcon();
    });
    
    volumeBtn.addEventListener('click', toggleMute);
    
    // Progress bar click
    progressBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const activePlayer = getCurrentPlayer();
        activePlayer.currentTime = percentage * activePlayer.duration;
    });
    
    // Update progress and time for both players
    musicPlayer.addEventListener('timeupdate', updateProgress);
    musicPlayer.addEventListener('loadedmetadata', updateDuration);
    celebrationPlayer.addEventListener('timeupdate', updateProgress);
    celebrationPlayer.addEventListener('loadedmetadata', updateDuration);
    
    // Auto-play when apology starts
    musicPlayer.addEventListener('canplaythrough', function() {
        console.log('Music loaded and ready to play');
    });
    
    // Handle music errors gracefully
    musicPlayer.addEventListener('error', function(e) {
        console.log('Music loading error, using fallback');
        // Try to use a web-based music source as fallback
        useFallbackMusic();
    });
    
    // Add visualizer
    addMusicVisualizer();
    
    // Show music ready notification
    showMusicReadyNotification();
}

// Helper function to get currently active player
function getCurrentPlayer() {
    return currentSong === 'celebration' ? celebrationPlayer : musicPlayer;
}

// New comprehensive autostart function
function tryAutostart() {
    // Multiple attempts with different strategies
    setTimeout(() => autoStartMusic(), 100);  // Immediate attempt
    setTimeout(() => autoStartMusic(), 500);  // After 0.5s
    setTimeout(() => autoStartMusic(), 1000); // After 1s
    setTimeout(() => autoStartMusic(), 2000); // After 2s
    
    // Try on user interaction
    document.addEventListener('click', tryAutostartOnInteraction, { once: true });
    document.addEventListener('touchstart', tryAutostartOnInteraction, { once: true });
    document.addEventListener('keydown', tryAutostartOnInteraction, { once: true });
}

function tryAutostartOnInteraction() {
    if (!isPlaying) {
        autoStartMusic();
    }
}

// Enhanced auto start music function
function autoStartMusic() {
    if (!isPlaying && musicPlayer) {
        // Ensure music is loaded
        if (musicPlayer.readyState >= 3) { // HAVE_FUTURE_DATA or higher
            // Unmute the audio first
            musicPlayer.muted = false;
            musicPlayer.volume = currentVolume;
            
            const playPromise = musicPlayer.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    updateUIForPlayingState();
                    console.log('Music autostarted successfully');
                }).catch(error => {
                    console.log('Autoplay prevented:', error);
                    // Fallback: show play button prominently
                    highlightPlayButton();
                });
            }
        } else {
            // Wait for music to load
            musicPlayer.addEventListener('canplaythrough', function() {
                if (!isPlaying) {
                    autoStartMusic();
                }
            }, { once: true });
        }
    }
}

// Helper function to update UI when music starts playing
function updateUIForPlayingState() {
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const musicPlayerContainer = document.getElementById('musicPlayer');
    
    if (playIcon && pauseIcon && musicPlayerContainer) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        musicPlayerContainer.classList.add('music-playing');
        updateSongTitle();
    }
}

function togglePlayPause() {
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const musicPlayerContainer = document.getElementById('musicPlayer');
    const activePlayer = getCurrentPlayer();
    
    if (isPlaying) {
        activePlayer.pause();
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        musicPlayerContainer.classList.remove('music-playing');
    } else {
        // Stop the other player first
        if (currentSong === 'celebration') {
            musicPlayer.pause();
        } else {
            celebrationPlayer.pause();
        }
        
        // Try to play current music
        const playPromise = activePlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                musicPlayerContainer.classList.add('music-playing');
                
                // Create musical hearts when music starts
                createMusicalHearts();
                updateSongTitle();
            }).catch(error => {
                console.log('Autoplay prevented:', error);
                // Show a message to user about clicking to enable music
                showMusicPrompt();
            });
        }
    }
}

// Update song title based on current song
function updateSongTitle() {
    const songTitle = document.getElementById('songTitle');
    if (currentSong === 'celebration') {
        songTitle.innerHTML = '♫ Celebration! ♫';
    } else {
        songTitle.innerHTML = '♫ Our Song ♫';
    }
}

// Show music ready notification
function showMusicReadyNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = '🎵 Music ready! Will start automatically or click play 🎵';
    notification.style.position = 'fixed';
    notification.style.top = '70px';
    notification.style.right = '20px';
    notification.style.background = 'rgba(116, 185, 255, 0.9)';
    notification.style.color = 'white';
    notification.style.padding = '0.5rem 1rem';
    notification.style.borderRadius = '10px';
    notification.style.fontSize = '0.9rem';
    notification.style.zIndex = '1001';
    notification.style.animation = 'fadeIn 0.5s ease-in-out';
    notification.style.maxWidth = '250px';
    notification.style.textAlign = 'center';
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-in-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 3000);
}

// Enhanced highlight play button when autoplay fails
function highlightPlayButton() {
    const playButton = document.getElementById('playPauseBtn');
    playButton.style.animation = 'pulse 2s ease-in-out infinite';
    playButton.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.8)';
    
    // Show tooltip
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.top = '-40px';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '0.8rem';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.zIndex = '1002';
    
    playButton.style.position = 'relative';
    playButton.appendChild(tooltip);
    
    // Also show a larger notification
    showMusicPrompt();
    
    // Remove highlighting after user clicks
    playButton.addEventListener('click', function removeHighlight() {
        playButton.style.animation = '';
        playButton.style.boxShadow = '';
        if (tooltip.parentNode) {
            tooltip.remove();
        }
        playButton.removeEventListener('click', removeHighlight);
    });
}

// Switch to celebration music
function switchToCelebrationMusic() {
    // Pause current music
    if (isPlaying) {
        musicPlayer.pause();
    }
    
    currentSong = 'celebration';
    
    // Unmute and start celebration music
    celebrationPlayer.muted = false;
    const playPromise = celebrationPlayer.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            isPlaying = true;
            const playIcon = document.getElementById('playIcon');
            const pauseIcon = document.getElementById('pauseIcon');
            const musicPlayerContainer = document.getElementById('musicPlayer');
            
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            musicPlayerContainer.classList.add('music-playing');
            
            updateSongTitle();
            console.log('Switched to celebration music');
        }).catch(error => {
            console.log('Could not play celebration music:', error);
        });
    }
}

function toggleMute() {
    const volumeIcon = document.getElementById('volumeIcon');
    const activePlayer = getCurrentPlayer();
    
    if (activePlayer.volume > 0) {
        musicPlayer.volume = 0;
        celebrationPlayer.volume = 0;
        volumeIcon.className = 'fas fa-volume-mute';
        document.getElementById('volumeSlider').value = 0;
    } else {
        musicPlayer.volume = currentVolume;
        celebrationPlayer.volume = currentVolume;
        updateVolumeIcon();
        document.getElementById('volumeSlider').value = currentVolume * 100;
    }
}

function updateVolumeIcon() {
    const volumeIcon = document.getElementById('volumeIcon');
    const activePlayer = getCurrentPlayer();
    const volume = activePlayer.volume;
    
    if (volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentTimeSpan = document.getElementById('currentTime');
    const activePlayer = getCurrentPlayer();
    
    if (activePlayer.duration && isPlaying) {
        const percentage = (activePlayer.currentTime / activePlayer.duration) * 100;
        progressFill.style.width = percentage + '%';
        currentTimeSpan.textContent = formatTime(activePlayer.currentTime);
    }
}

function updateDuration() {
    const totalTimeSpan = document.getElementById('totalTime');
    const activePlayer = getCurrentPlayer();
    if (activePlayer.duration) {
        totalTimeSpan.textContent = formatTime(activePlayer.duration);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}

function createMusicalHearts() {
    const musicalEmojis = ['🎵', '🎶', '♪', '♫', '💖', '💕'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const note = document.createElement('div');
            note.className = 'click-heart';
            note.innerHTML = musicalEmojis[Math.floor(Math.random() * musicalEmojis.length)];
            note.style.left = Math.random() * window.innerWidth + 'px';
            note.style.top = Math.random() * (window.innerHeight * 0.6) + 'px';
            note.style.fontSize = '1.5rem';
            note.style.animationDuration = '3s';
            
            document.body.appendChild(note);
            
            setTimeout(() => {
                note.remove();
            }, 3000);
        }, i * 200);
    }
}



function addMusicVisualizer() {
    const songInfo = document.querySelector('.song-info');
    const visualizer = document.createElement('div');
    visualizer.className = 'music-visualizer';
    
    for (let i = 0; i < 5; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        visualizer.appendChild(bar);
    }
    
    songInfo.appendChild(visualizer);
}

function useFallbackMusic() {
    // Create a simple sine wave tone as emergency fallback
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        // Don't auto-start the fallback, just prepare it
        console.log('Fallback audio context created');
    } catch (error) {
        console.log('Web Audio API not supported');
    }
}

// Integrate music with apology sequence
function startApologySequenceWithMusic() {
    // Try to start music when apology begins
    if (!isPlaying) {
        togglePlayPause();
    }
    startApologySequence();
}

// Create celebration heart rain
function createCelebrationHeartRain() {
    const celebrationEmojis = ['🎉', '🎊', '💖', '💕', '✨', '🌟', '💫', '🎈', '🌹', '💝', '🥳', '🎆'];
    
    // Create continuous rain for 10 seconds
    let rainInterval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.className = 'click-heart';
                emoji.innerHTML = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
                emoji.style.left = Math.random() * window.innerWidth + 'px';
                emoji.style.top = '-20px';
                emoji.style.fontSize = (Math.random() * 2 + 1) + 'rem';
                emoji.style.animationDuration = '4s';
                emoji.style.animationName = 'heartFall';
                
                document.body.appendChild(emoji);
                
                setTimeout(() => {
                    emoji.remove();
                }, 4000);
            }, i * 100);
        }
    }, 300);
    
    // Stop the rain after 10 seconds
    setTimeout(() => {
        clearInterval(rainInterval);
    }, 10000);
}

// Update the heart button to also start music
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const heartButton = document.getElementById('heartButton');
        if (heartButton) {
            // Remove old event listener and add new one that includes music
            heartButton.removeEventListener('click', startApologySequence);
            heartButton.addEventListener('click', startApologySequenceWithMusic);
        }
    }, 100);
});

// ===== PHOTO SLIDESHOW FUNCTIONALITY =====

// Initialize photo slideshow
function initializePhotoSlideshow() {
    if (photos.length === 0) {
        console.log('No photos found for slideshow');
        return;
    }
    
    const slideshow = document.getElementById('photoSlideshow');
    const currentPhoto = document.getElementById('currentPhoto');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('slideIndicators');
    
    if (!slideshow || !currentPhoto) {
        console.log('Slideshow elements not found');
        return;
    }
    
    // Initialize slideshow
    currentPhotoIndex = 0;
    isSlideShowActive = true;
    
    // Create indicators
    createSlideIndicators();
    
    // Load first photo
    loadPhoto(0);
    
    // Setup event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => changePhoto(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changePhoto(1));
    
    // Start automatic slideshow
    startAutoSlideshow();
    
    // Pause on hover
    slideshow.addEventListener('mouseenter', pauseSlideshow);
    slideshow.addEventListener('mouseleave', resumeSlideshow);
    
    // Show slideshow with animation
    slideshow.style.display = 'block';
    slideshow.style.opacity = '0';
    slideshow.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        slideshow.style.transition = 'all 0.8s ease-out';
        slideshow.style.opacity = '1';
        slideshow.style.transform = 'translateY(0)';
    }, 100);
}

// Create slide indicators
function createSlideIndicators() {
    const indicators = document.getElementById('slideIndicators');
    if (!indicators) return;
    
    indicators.innerHTML = '';
    
    for (let i = 0; i < photos.length; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.addEventListener('click', () => goToPhoto(i));
        indicators.appendChild(indicator);
    }
    
    updateIndicators();
}

// Update active indicator
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentPhotoIndex);
    });
}

// Load photo by index
function loadPhoto(index) {
    const currentPhoto = document.getElementById('currentPhoto');
    const photoCaption = document.getElementById('photoCaption');
    
    if (!currentPhoto || index < 0 || index >= photos.length) return;
    
    // Add transition effect
    currentPhoto.classList.add('photo-transition');
    
    setTimeout(() => {
        currentPhoto.src = photos[index];
        if (photoCaption && photoCaptions[index]) {
            photoCaption.textContent = photoCaptions[index];
        }
        
        // Remove transition class after animation
        setTimeout(() => {
            currentPhoto.classList.remove('photo-transition');
        }, 800);
    }, 50);
    
    currentPhotoIndex = index;
    updateIndicators();
    
    // Add magical hearts effect
    createPhotoHearts();
}

// Change photo by direction
function changePhoto(direction) {
    let newIndex = currentPhotoIndex + direction;
    
    if (newIndex >= photos.length) {
        newIndex = 0; // Loop to first photo
    } else if (newIndex < 0) {
        newIndex = photos.length - 1; // Loop to last photo
    }
    
    loadPhoto(newIndex);
    resetAutoSlideshow();
}

// Go to specific photo
function goToPhoto(index) {
    if (index !== currentPhotoIndex) {
        loadPhoto(index);
        resetAutoSlideshow();
    }
}

// Start automatic slideshow
function startAutoSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    
    slideshowInterval = setInterval(() => {
        if (isSlideShowActive) {
            changePhoto(1);
        }
    }, 4000); // Change photo every 4 seconds
    
    // Start timer bar animation
    const timerBar = document.getElementById('timerBar');
    if (timerBar) {
        timerBar.classList.add('running');
    }
}

// Pause slideshow
function pauseSlideshow() {
    isSlideShowActive = false;
    const timerBar = document.getElementById('timerBar');
    if (timerBar) {
        timerBar.style.animationPlayState = 'paused';
    }
}

// Resume slideshow
function resumeSlideshow() {
    isSlideShowActive = true;
    const timerBar = document.getElementById('timerBar');
    if (timerBar) {
        timerBar.style.animationPlayState = 'running';
    }
}

// Reset auto slideshow
function resetAutoSlideshow() {
    const timerBar = document.getElementById('timerBar');
    if (timerBar) {
        timerBar.classList.remove('running');
        setTimeout(() => {
            timerBar.classList.add('running');
        }, 50);
    }
    
    startAutoSlideshow();
}

// Create magical hearts when photo changes
function createPhotoHearts() {
    const photoEmojis = ['💖', '💕', '💝', '🌹', '✨', '💞', '💗'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'click-heart';
            heart.innerHTML = photoEmojis[Math.floor(Math.random() * photoEmojis.length)];
            heart.style.left = (Math.random() * (window.innerWidth - 100) + 50) + 'px';
            heart.style.top = (Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2) + 'px';
            heart.style.fontSize = '1.5rem';
            heart.style.animationDuration = '2.5s';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2500);
        }, i * 150);
    }
}

// Cleanup slideshow when needed
function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
    isSlideShowActive = false;
}
