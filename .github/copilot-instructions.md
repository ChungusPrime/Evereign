# Evereign - AI Coding Guidelines

## Project Overview

Evereign is a top-down 2D action RPG built with **Phaser 3**, **TypeScript**, and **Electron**. The game features combat, character progression, settlement building, and a day/night cycle.

## Architecture

### Scene Flow
The game uses Phaser's scene system with four primary scenes:
1. **Preload** (`src/scenes/Preload.ts`) - Asset loading via manifest system
2. **Menu** (`src/scenes/Menu.ts`) - Main menu, character creation, options
3. **Game** (`src/scenes/Game.ts`) - Core gameplay scene, manages world state
4. **UI** (`src/scenes/UI.ts`) - Overlay scene for HUD, panels, dialogs

### Global State Pattern
The `Game` scene exports global singletons for cross-system access:
```typescript
export let GD: Character;     // Current character data
export let CD: Campaign;      // Current campaign data  
export let DM: DataManager;   // Static data lookups
export let Inv: Inventory;    // Inventory system
export let QM: QuestManager;  // Quest tracking
```

### Data Architecture
- **Static data** lives in `src/data/` - items, enemies, quests, campaigns, etc.
- **Runtime state** uses `Character` interface (defined in `src/types/CharacterData.ts`)
- **Persistence** uses `localStorage` with key `"EvereignData"` containing `GameData` object
- **Asset manifest** in `src/assets.ts` - all assets defined here, auto-loaded by Preload scene

### Key Directories
- `src/game_objects/` - Phaser game objects (characters, UI elements, buildings)
- `src/systems/` - Game systems (Inventory, MapBuilder, DayNightCycle)
- `src/data/` - Static game data definitions

## Development Commands

```bash
npm run dev          # Webpack watch mode (development)
npm run prod         # Production build
npm run start        # Run Electron app
npm run build        # Full build + Electron packaging
```

## Code Patterns

### Creating New Game Objects
Extend appropriate base class and add to relevant group in Game scene:
```typescript
export default class MyEnemy extends Character {
    abstract Temperament: string;  // "hostile" | "neutral" | "friendly"
    abstract Health: number;
    abstract LootTable: number[];
    // ... implement abstract properties
}
```

### Adding New Items
Add to appropriate file in `src/data/Items/`, following `ItemData` interface:
```typescript
{ ID: "unique_id", Name: "Display Name", Slot: "Equipment_Chest", Rarity: 1, ... }
```
Items are auto-registered via `addItems()` in `src/data/ItemData.ts`.

### Adding Assets
Add entries to the manifest in `src/assets.ts`. The Preload scene handles loading automatically:
```typescript
images: [{ key: 'MyImage', path: require('./assets/images/my-image.png') }]
```

### Map/Zone Handling
Maps are Tiled JSON files. The `MapBuilder` system (`src/systems/MapBuilder.ts`) handles:
- Tilemap creation and collision layers
- Object spawning from Tiled object layers via `objectTypeToClass` mapping
- Zone transitions between maps

### Character Stats & Damage
13 damage types exist (Pierce, Impact, Slash, Fire, Cold, Lightning, Poison, Arcane, True, Bleed, Radiant, Corruption, Sonic). Each has corresponding `Defence_*` stat on characters.

## Type Definitions
- Global interfaces in `src/types/index.d.ts` (GameData, InventoryItem, RaceData, etc.)
- Character-specific types in `src/types/CharacterData.ts`
- Item types in `src/types/Item.ts`

## Important Conventions
- UI components prefixed with `UI_` (e.g., `UI_ItemSlot.ts`, `UI_LootWindow.ts`)
- Building types in `src/game_objects/buildings/`
- Campaigns are self-contained in `src/data/Campaigns/{CampaignName}/`
- Game version injected via webpack DefinePlugin as `PACKAGE_VERSION`
