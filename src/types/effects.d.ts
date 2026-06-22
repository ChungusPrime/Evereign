/** Shared fields present on every projectile type. */
interface ProjectileEffectBase {
    /** Speed in pixels/s */
    Velocity: number;
    /** Damage array passed to the projectile */
    Damage: { Type: string; Amount: number }[];
    /** Lifetime in ms before the projectile expires (default varies per type) */
    Lifetime?: number;
    Quantity?: number; // for future use when we want to spawn multiple projectiles at once (e.g. shotgun pellets)
}

/**
 * Arc-physics grenade that travels in a parabola and explodes on impact or when its lifetime expires.
 */
interface GrenadeProjectileEffect extends ProjectileEffectBase {
    Type: "Grenade";
}

/**
 * Charged Slug — straight-line shot with a coloured glow and optional point light.
 */
interface ChargedSlugProjectileEffect extends ProjectileEffectBase {
    Type: "ChargedSlug";
    Velocity: number; // override default velocity
    Damage: { Type: string; Amount: number }[]; // override default damage
}

interface PyroPelletProjectileEffect extends ProjectileEffectBase {
    Type: "PyroPellet";
    Velocity: number; // override default velocity
    Damage: { Type: string; Amount: number }[]; // override default damage
}

/**
 * Config for a projectile spawned when an item is used.
 */
type ProjectileEffect =
    | GrenadeProjectileEffect
    | ChargedSlugProjectileEffect
    | PyroPelletProjectileEffect;

/**
 * Dash the player toward the mouse cursor at a burst speed, then restore normal movement.
 */
interface ChargeEffect {
    /** Speed multiplier applied to the player's base MovementSpeed during the dash */
    SpeedMultiplier: number;
    /** How long the dash lasts in ms */
    Duration: number;
}

/**
 * Push all enemies within a radius away from an origin point.
 */
interface KnockBackEffect {
    /** Radius in pixels to search for targets */
    Radius: number;
    /** Force (pixels/s) applied to each target */
    Force: number;
    /**
     * Origin of the knock-back.
     * "player"  — from the player's current position (default)
     * "mouse"   — from the mouse cursor position
     */
    Origin?: "player" | "mouse";
}

interface ApplyEffectType {
    ID: string; 
    Duration?: number; // Duration in ms for how long the effect lasts. If absent, use default duration for that effect.
}

/**
 * Describes the effects that are applied when an item or ability is used.
 * Each key maps to a handler in OnUseProcessor.ts.
 *
 * Add new effect types here and implement them in the processor.
 */
interface OnUseEffect {
    /** Restore a fixed amount of health */
    Heal?: number;
    /** Restore a fixed amount of mana */
    RestoreMana?: number;
    /** Grant a fixed amount of XP */
    GiveXP?: number;
    /** Unlock a building type so the player can construct it */
    UnlockBuilding?: string;
    ApplyEffect?: ApplyEffectType;
    /** Spawn a projectile aimed at the mouse cursor */
    SpawnProjectile?: ProjectileEffect;
    /** Dash the player toward the mouse cursor */
    Charge?: ChargeEffect;
    /** Push nearby enemies away from an origin point */
    KnockBack?: KnockBackEffect;
}
