// ============================================================================
// Geometry Utilities - Barrel Export
// ============================================================================
// Import everything from here for convenience:
//
//   import { getObjectsInArc, ArcWidths } from '../utils/geometry';
//   import { getObjectsInCircle, createHammerSlam } from '../utils/geometry';
//
// Or import from individual files if you prefer:
//
//   import { getObjectsInArc } from '../utils/geometry/arcs';
//   import { getObjectsInCircle } from '../utils/geometry/circles';
// ============================================================================

// Shared types and helpers
export {
    GeometryHitResult,
    MeleeAttackConfig,
    ArcWidths,
    directionToRadians,
    angleToTarget,
    getActiveObjects
} from './types';

// Arc / Cone shapes (sword swings, vision cones)
export {
    isInArc,
    getObjectsInArc,
    getPhysicsBodiesInArc,
    isInSector,
    createSwordSwing
} from './arcs';

// Circle shapes (hammer slams, explosions, AOE)
export {
    isInCircle,
    getObjectsInCircle,
    getEnemiesInCircleQuadtree,
    createHammerSlam
} from './circles';

// Triangle shapes (stab attacks, directional abilities)
export {
    createAttackTriangle,
    isInTriangle,
    getObjectsInTriangle,
    createThrustAttack
} from './triangles';

// Line shapes (thrusts, beams, line-of-sight)
export {
    createAttackLine,
    createSwingLine,
    lineIntersectsRect,
    getEnemiesOnLineQuadtree,
    getObjectsOnLine,
    hasLineOfSight,
    raycast
} from './lines';

// Polygon shapes (custom shapes)
export {
    createPolygon,
    isInPolygon,
    getObjectsInPolygon
} from './polygons';

// Tower / Turret sensing
export {
    TowerSenseConfig,
    findTowerTarget,
    findAllTowerTargets
} from './towers';
