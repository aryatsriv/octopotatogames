# Game Architecture - Iframe-Based Approach

This gaming platform uses an **iframe-based architecture** where Next.js acts as a game launcher and shell, not the executor. Every game runs in complete isolation for better security, performance, and compatibility.

## 🎯 Core Principles

1. **All games load via iframe** - No exceptions, even for simple JavaScript games
2. **Next.js is the shell** - Handles routing, UI chrome, and game metadata
3. **Games are self-contained** - Each game has its own `index.html` and dependencies
4. **Complete isolation** - Games can't interfere with the main app or each other

## 📁 Directory Structure

```
public/
└── games/
    ├── click-test/
    │   ├── index.html      # Entry point (loaded in iframe)
    │   ├── game.js         # Game logic
    │   └── assets/         # Game-specific assets
    ├── reaction-test/
    │   ├── index.html
    │   ├── game.js
    │   └── assets/
    └── typing-test/
        ├── index.html
        ├── game.js
        └── assets/
```

## 🎮 Supported Game Types

### 1. HTML/JS Games
**Location:** `/public/games/[game-name]/`

**Structure:**
```
game-name/
├── index.html          # Main entry point
├── game.js            # Game logic
├── style.css          # Optional styles
└── assets/            # Images, sounds, etc.
```

**Example index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="game-container">
        <!-- Game UI -->
    </div>
    <script src="game.js"></script>
</body>
</html>
```

### 2. Unity WebGL Games
**Location:** `/public/games/[game-name]/`

**Structure:**
```
game-name/
├── index.html          # Unity loader wrapper
└── Build/
    ├── game.loader.js
    ├── game.data
    ├── game.framework.js
    └── game.wasm
```

**Example Unity index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Unity Game</title>
    <style>
        body { margin: 0; overflow: hidden; }
        #unity-container { width: 100vw; height: 100vh; }
        canvas { width: 100%; height: 100%; display: block; }
    </style>
</head>
<body>
    <div id="unity-container">
        <canvas id="unity-canvas"></canvas>
    </div>
    <script src="Build/game.loader.js"></script>
    <script>
        createUnityInstance(document.querySelector("#unity-canvas"), {
            dataUrl: "Build/game.data",
            frameworkUrl: "Build/game.framework.js",
            codeUrl: "Build/game.wasm",
        });
    </script>
</body>
</html>
```

### 3. WebAssembly Games
Same approach - create an `index.html` that loads and initializes your WASM module.

## 🔧 Implementation

### GameFrame Component
Located at: `/components/GameFrame.tsx`

```tsx
export default function GameFrame({ src, title, aspectRatio }) {
  return (
    <div style={{ aspectRatio }}>
      <iframe
        src={src}
        title={title}
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
        allow="fullscreen; gamepad; accelerometer; gyroscope"
        allowFullScreen
      />
    </div>
  );
}
```

### Sandbox Permissions

The iframe uses these sandbox attributes:
- `allow-scripts` - Required for JavaScript execution
- `allow-same-origin` - Required for same-origin resources
- `allow-pointer-lock` - For FPS games and mouse capture
- `allow-forms` - For input elements in games

And these feature policies:
- `fullscreen` - Allow fullscreen mode
- `gamepad` - For controller support
- `accelerometer` / `gyroscope` - For mobile games

### Game Registration

Add games to `/lib/games-data.ts`:

```typescript
{
    id: "5-2",
    name: "Click Speed Test",
    slug: "click-test",
    description: "How many times can you click in 10 seconds?",
    config: {
        engine: "html5",
        url: "/games/click-test/index.html",
        aspectRatio: "16/9",
    },
}
```

## ✅ Benefits of This Approach

### 1. **Complete Isolation**
- Games can't access Next.js app state or cookies
- Security vulnerabilities in games don't affect the main app
- Memory leaks are isolated to the iframe

### 2. **Framework Agnostic**
- Use any framework inside the game (React, Vue, vanilla JS, etc.)
- Mix different versions of libraries
- No build conflicts

### 3. **Easy Development**
- Develop games independently
- Test games standalone before integration
- No need to understand Next.js to create games

### 4. **Better Performance**
- Games can be cached separately
- Heavy game assets don't bloat the main bundle
- Parallel loading of game resources

### 5. **Consistent Behavior**
- Unity, JS, and WASM games all work the same way
- Same security model for all game types
- Predictable resource loading

## 🚀 Adding a New Game

1. **Create game folder:**
   ```bash
   mkdir -p public/games/my-new-game
   ```

2. **Create index.html:**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>My New Game</title>
       <style>
           body { margin: 0; background: #000; }
       </style>
   </head>
   <body>
       <canvas id="game"></canvas>
       <script src="game.js"></script>
   </body>
   </html>
   ```

3. **Add game logic** (game.js, assets, etc.)

4. **Register in games-data.ts:**
   ```typescript
   {
       id: "x-y",
       name: "My New Game",
       slug: "my-new-game",
       description: "An awesome game",
       config: {
           engine: "html5",
           url: "/games/my-new-game/index.html",
           aspectRatio: "16/9",
       },
   }
   ```

5. **Access at:** `/games/[category]/my-new-game`

## 🔒 Security Considerations

### Sandbox Restrictions
- Games cannot access parent window data
- No access to localStorage/cookies from main app
- Limited to allowed permissions only

### CSP Headers
Consider adding Content Security Policy headers in `next.config.ts`:

```typescript
async headers() {
    return [
        {
            source: '/games/:path*',
            headers: [
                {
                    key: 'Content-Security-Policy',
                    value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
                }
            ]
        }
    ]
}
```

## 📱 Responsive Design

Games should handle their own responsive design. Consider:

```css
/* In game's index.html */
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
        width: 100vw; 
        height: 100vh; 
        overflow: hidden; 
    }
    canvas { 
        display: block; 
        width: 100%; 
        height: 100%; 
    }
</style>
```

## 🎨 Aspect Ratios

Common aspect ratios:
- `16/9` - Widescreen (most games)
- `4/3` - Classic
- `1/1` - Square (puzzle games, chess)
- `9/16` - Portrait (mobile games)
- `21/9` - Ultrawide

## 🔄 Communication Between Parent and Game (Optional)

If you need parent-child communication:

```javascript
// In game (child iframe)
window.parent.postMessage({ type: 'GAME_SCORE', score: 100 }, '*');

// In Next.js app (parent)
useEffect(() => {
    const handleMessage = (event) => {
        if (event.data.type === 'GAME_SCORE') {
            console.log('Score:', event.data.score);
        }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
}, []);
```

## 📦 Build Optimization

Games are static assets, so:
- They don't affect Next.js bundle size
- They're cached by the browser
- They can use CDN for distribution
- No server-side rendering needed

## 🎯 Best Practices

1. **Keep games self-contained** - Include all dependencies
2. **Optimize assets** - Compress images, minify JS
3. **Test in isolation** - Open `index.html` directly
4. **Handle errors gracefully** - Don't crash the parent app
5. **Use semantic HTML** - For accessibility
6. **Mobile-first** - Test on various screen sizes
7. **Loading states** - Show game loading progress
8. **Error boundaries** - Handle iframe loading failures

## 🛠️ Troubleshooting

### Game doesn't load
- Check browser console for CSP errors
- Verify file paths are correct
- Ensure `index.html` exists
- Check sandbox permissions

### Assets not loading
- Use relative paths: `./assets/image.png`
- Or absolute paths from public: `/games/my-game/assets/image.png`

### Performance issues
- Reduce asset sizes
- Use sprite sheets
- Implement loading screens
- Consider lazy loading

---

This architecture provides maximum flexibility while maintaining security and performance. Each game is a black box that the Next.js app simply displays and manages.
