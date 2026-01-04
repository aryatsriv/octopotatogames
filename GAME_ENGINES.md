# Multi-Engine Game Architecture

This project supports multiple game engines. Here's how to add games for each engine type:

## Supported Engines

### 1. JavaScript Games
For custom JavaScript/Canvas games:

```typescript
{
    id: "game-id",
    name: "Game Name",
    slug: "game-slug",
    description: "Game description",
    config: {
        engine: "javascript",
        entryPoint: "/games/game-name/game.js",
        aspectRatio: "16/9", // or "4/3", "1/1", "9/16"
    }
}
```

**File Structure:**
```
public/
  games/
    game-name/
      game.js        # Main game script
      assets/        # Images, sounds, etc.
```

**Your game.js should:**
- Find the canvas: `document.getElementById('game-canvas-{game.id}')`
- Initialize and run the game
- Handle cleanup on window unload

### 2. Unity Games
For Unity WebGL builds:

```typescript
{
    id: "game-id",
    name: "Game Name",
    slug: "game-slug",
    description: "Game description",
    config: {
        engine: "unity",
        loaderUrl: "/games/game-name/Build/game-name.loader.js",
        dataUrl: "/games/game-name/Build/game-name.data",
        frameworkUrl: "/games/game-name/Build/game-name.framework.js",
        codeUrl: "/games/game-name/Build/game-name.wasm",
        aspectRatio: "16/9",
    }
}
```

**File Structure:**
```
public/
  games/
    game-name/
      Build/
        game-name.loader.js
        game-name.data
        game-name.framework.js
        game-name.wasm
```

**To export from Unity:**
1. Build Settings → WebGL
2. Build the project
3. Copy the Build folder to public/games/game-name/

### 3. HTML5 Games
For standalone HTML5 games with their own index.html:

```typescript
{
    id: "game-id",
    name: "Game Name",
    slug: "game-slug",
    description: "Game description",
    config: {
        engine: "html5",
        url: "/games/game-name/index.html",
        aspectRatio: "16/9",
    }
}
```

**File Structure:**
```
public/
  games/
    game-name/
      index.html
      game.js
      styles.css
      assets/
```

### 4. Iframe Games
For external games or games requiring iframe isolation:

```typescript
{
    id: "game-id",
    name: "Game Name",
    slug: "game-slug",
    description: "Game description",
    config: {
        engine: "iframe",
        url: "https://example.com/game" or "/games/game-name/index.html",
        aspectRatio: "16/9",
    }
}
```

## Aspect Ratios

Common aspect ratios:
- `"16/9"` - Widescreen (default for most games)
- `"4/3"` - Classic games
- `"1/1"` - Square (chess, card games)
- `"9/16"` - Portrait (mobile puzzle games)
- `"21/9"` - Ultra-wide

## Adding a New Game

1. **Prepare your game files** in `public/games/your-game-name/`

2. **Add to games-data.ts:**
```typescript
{
    id: "unique-id",
    name: "Your Game Name",
    slug: "your-game-name",
    description: "Game description",
    config: {
        engine: "javascript", // or "unity", "html5", "iframe"
        // ... engine-specific config
        aspectRatio: "16/9",
    }
}
```

3. **Test the game** by navigating to `/games/category-slug/your-game-name`

## Architecture

- **GameRenderer**: Main component that switches between engine types
- **Engine Components**:
  - `JavaScriptGameEngine`: Loads and runs custom JS games
  - `UnityGameEngine`: Handles Unity WebGL with progress tracking
  - `HTML5GameEngine`: Embeds HTML5 games via iframe
  - `IframeGameEngine`: Loads external or isolated games

Each engine component:
- Handles loading states
- Shows error messages
- Respects aspect ratio
- Cleans up on unmount
