# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an **Interactive Apology Webpage** - a beautiful, client-side web application designed to help express sincere apologies through an interactive multi-stage sequence with music, animations, and visual effects. The application is built with vanilla HTML, CSS, and JavaScript for maximum compatibility and simplicity.

## Architecture & Structure

### Core Components

The application follows a simple three-file architecture:

- **`index.html`** - Main webpage structure with semantic HTML and embedded apology stages
- **`styles.css`** - Complete styling system with CSS animations, responsive design, and visual effects
- **`script.js`** - Interactive functionality, music player, animation controllers, and user experience logic
- **`music/`** - Directory containing audio files for background music and celebrations

### Key Architectural Patterns

**Event-Driven Animation System**: The application uses a state-based approach where user interactions trigger cascading animations and visual effects through JavaScript event listeners.

**Progressive Enhancement**: Core functionality works without JavaScript, with enhanced interactivity layered on top.

**Responsive Design**: CSS Grid and Flexbox layouts with mobile-first responsive breakpoints ensure compatibility across devices.

**Audio Integration**: Dual audio player system that switches between romantic background music and celebration music based on user choices.

## Development Commands

### Local Development
```bash
# Open the webpage in default browser (Windows)
start index.html

# Open in specific browser
start chrome index.html
start firefox index.html

# Serve with Python (if you need a local server)
python -m http.server 8000
# Then open http://localhost:8000
```

### File Operations
```bash
# View project structure
tree /f

# Check file sizes (useful for music files)
dir music\ /s

# Search for specific content in code
findstr /i "animation" *.css *.js
findstr /i "music" *.js
```

## Key Features & Implementation

### Multi-Stage Apology Sequence
- **Stage Management**: JavaScript functions `showNextStage()` and state tracking via `currentStage` variable
- **Smooth Transitions**: CSS transforms and opacity animations between stages
- **Progressive Disclosure**: Each stage builds emotional narrative from acknowledgment to resolution

### Music System
- **Dual Audio Players**: Background music (`backgroundMusic`) and celebration music (`celebrationMusic`)
- **Audio Controls**: Play/pause, volume control, progress bar with click-to-seek functionality
- **Context-Aware Switching**: Automatically switches to celebration music when user forgives
- **Fallback Handling**: Graceful degradation when music files are missing

### Interactive Effects
- **Click Hearts**: Click anywhere to generate animated heart effects
- **Background Particles**: Floating animated particles for ambiance  
- **Heart Explosions**: Massive heart animations triggered by key interactions
- **Konami Code**: Easter egg that triggers special effects (Up, Up, Down, Down, Left, Right, Left, Right, B, A)

### Animation Controllers
- **`createMassiveHeartExplosion()`** - Large-scale celebratory effects
- **`createSparkleEffect()`** - Subtle stage transition effects
- **`startFloatingAnimation()`** - Continuous ambient heart animations
- **`createCelebrationHeartRain()`** - Extended celebration sequence

## Customization Points

### Music Integration
Music files should be placed in the `music/` directory:
- `romantic-song.mp3` - Plays during apology sequence
- `celebration-song.mp3` - Plays when forgiveness is granted

### Message Personalization
Key HTML elements to modify for personalization:
- Stage content in `index.html` (sections with ids `stage1` through `stage5`)
- Page title and headers
- Final celebration and understanding messages

### Visual Themes
CSS custom properties and gradients can be modified in `styles.css`:
- Color gradients in `.title` and button classes
- Animation timing in keyframe definitions
- Responsive breakpoints for different screen sizes

## Browser Compatibility

The application uses modern web standards but maintains broad compatibility:
- **CSS Grid & Flexbox**: For layout systems
- **CSS Custom Properties**: For theming and responsive design
- **Web Audio API**: For music playback with graceful fallbacks
- **CSS Animations**: For all visual effects and transitions

## Performance Considerations

### Animation Performance
- Uses `transform` and `opacity` properties for hardware acceleration
- Limits simultaneous animations to prevent performance degradation
- Implements cleanup timeouts for dynamically created elements

### Audio Loading
- Preloads music files with `preload="auto"`
- Handles autoplay restrictions with user-triggered playback
- Provides visual feedback when user interaction is required

## Development Notes

### State Management
The application maintains several global state variables:
- `currentStage` - Tracks progression through apology sequence
- `isPlaying` - Music player state
- `currentSong` - Active audio track ('romantic' or 'celebration')
- `isApologyStarted` - Prevents duplicate sequence initialization

### Error Handling
- Music loading failures are handled with fallback sources and graceful degradation
- Missing DOM elements are checked before manipulation
- Browser autoplay restrictions are detected and handled with user prompts

### Mobile Optimization
Responsive design considerations implemented:
- Touch-friendly button sizes (minimum 44px)
- Optimized font sizes for mobile viewports
- Reduced animation complexity on smaller screens
- Volume controls adapted for touch interfaces

## File Dependencies

The project has minimal external dependencies:
- **Google Fonts**: Dancing Script and Poppins font families
- **Font Awesome**: Icon fonts for music player controls
- **Audio Files**: User-provided music files (not included in repository)

All other functionality is implemented with vanilla web technologies for maximum portability and minimal setup requirements.