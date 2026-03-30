import { getActiveObjects } from './types';

// ============================================================================
// Tower / Turret Sensing
// ============================================================================
// Helpers for towers or turrets that need to find and prioritise targets.
// Supports different targeting strategies (closest, weakest, etc.)
// and optional directional restrictions (for towers that only face one way).
//
// EXAMPLE USAGE:
//   const target = findTowerTarget(scene, tower.x, tower.y, {
//       range: 200,
//       priority: 'closest'
//   }, scene.Enemies);
//
//   if (target) tower.fireAt(target);
// ============================================================================


/**
 * How a tower finds and prioritises its targets.
 * 
 *   range:     How far the tower can see (pixels)
 *   priority:  Who to target first:
 *              - 'closest'        → nearest enemy
 *              - 'furthest'       → farthest enemy (good for snipers)
 *              - 'lowest_health'  → weakest enemy (finish them off)
 *              - 'highest_health' → strongest enemy (focus the tanks)
 *   arc:       Optional — limit the tower to only see in a certain direction
 *              (e.g. a wall-mounted turret that only faces one way)
 */
export interface TowerSenseConfig {
    range: number;
    priority: 'closest' | 'furthest' | 'lowest_health' | 'highest_health';
    arc?: {
        direction: number;  // Which way the tower faces (radians)
        width: number;      // How wide its vision is (radians)
    };
}


/**
 * Finds the single best target for a tower based on its config.
 * Returns null if no targets are in range.
 * 
 * @param scene        The current scene
 * @param towerX       Tower X position
 * @param towerY       Tower Y position
 * @param config       How the tower targets (see TowerSenseConfig)
 * @param targetGroup  Group of potential targets (e.g. scene.Enemies)
 */
export function findTowerTarget<T extends Phaser.GameObjects.GameObject & { x: number; y: number; Health?: number }>(
    scene: Phaser.Scene,
    towerX: number,
    towerY: number,
    config: TowerSenseConfig,
    targetGroup: Phaser.GameObjects.Group
): T | null {
    const sorted = getSortedCandidates<T>(towerX, towerY, config, targetGroup);
    return sorted.length > 0 ? sorted[0] : null;
}


/**
 * Finds ALL targets in range, sorted by priority.
 * Useful if the tower can hit multiple targets or needs a fallback list.
 * 
 * @param scene        The current scene
 * @param towerX       Tower X position
 * @param towerY       Tower Y position
 * @param config       How the tower targets
 * @param targetGroup  Group of potential targets
 */
export function findAllTowerTargets<T extends Phaser.GameObjects.GameObject & { x: number; y: number; Health?: number }>(
    scene: Phaser.Scene,
    towerX: number,
    towerY: number,
    config: TowerSenseConfig,
    targetGroup: Phaser.GameObjects.Group
): T[] {
    return getSortedCandidates<T>(towerX, towerY, config, targetGroup);
}


/**
 * Internal: finds and sorts candidates based on tower config.
 */
function getSortedCandidates<T extends Phaser.GameObjects.GameObject & { x: number; y: number; Health?: number }>(
    towerX: number,
    towerY: number,
    config: TowerSenseConfig,
    targetGroup: Phaser.GameObjects.Group
): T[] {
    // Step 1: Find all targets within range
    let candidates: Array<{ obj: T; distance: number }> = [];

    for (const target of getActiveObjects<T>(targetGroup)) {
        const distance = Phaser.Math.Distance.Between(towerX, towerY, target.x, target.y);

        // Too far away? Skip
        if (distance > config.range) continue;

        // If the tower has a limited viewing arc, check the angle
        if (config.arc) {
            const angle = Phaser.Math.Angle.Between(towerX, towerY, target.x, target.y);
            const angleDifference = Phaser.Math.Angle.Wrap(angle - config.arc.direction);
            if (Math.abs(angleDifference) > config.arc.width / 2) continue;
        }

        candidates.push({ obj: target, distance });
    }

    // Step 2: Sort by priority
    switch (config.priority) {
        case 'closest':
            candidates.sort((a, b) => a.distance - b.distance);
            break;
        case 'furthest':
            candidates.sort((a, b) => b.distance - a.distance);
            break;
        case 'lowest_health':
            candidates.sort((a, b) => (a.obj.Health ?? 0) - (b.obj.Health ?? 0));
            break;
        case 'highest_health':
            candidates.sort((a, b) => (b.obj.Health ?? 0) - (a.obj.Health ?? 0));
            break;
    }

    return candidates.map(c => c.obj);
}
