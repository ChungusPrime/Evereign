interface OnUseEffect {

    /** Restore a fixed amount of health */
    Heal?: number;

    /** Restore a fixed amount of mana */
    RestoreMana?: number;

    /** Grant a fixed amount of XP */
    GiveXP?: number;

    /** Unlock a building type so the player can construct it */
    UnlockBuilding?: string;

    /** Apply a status effect to the target */
    ApplyEffect?: {
        ID: string; 
        Duration?: number; // Duration in ms for how long the effect lasts. If absent, use default duration for that effect.
        Stacks?: number; // Number of stacks to apply. If absent, use default stack count for that effect.
    };

    /** Spawn a projectile */
    SpawnProjectile?: {
        Type: string,
        Quantity: number,
        Velocity?: number,
        Lifetime?: number,
        Direction?: "Mouse" | "Player" | "Target",
        Damage?: {
            Type: string;
            Amount: number;
        }[],
    };

    // Spawn a thrown projectile that explodes on contact or after a fuse time, dealing damage and applying effects to enemies in a radius.
    SpawnThrowable?: {
        Type: string,
        Quantity: number,
        Velocity?: number,
        Lifetime?: number,
        Direction?: "Mouse" | "Player" | "Target",
        Contact?: boolean;
        LeaveAreaEffect?: {
            Type: string;
            Duration: number;
            TickRate: number;
            Radius: number;
            Damage: {
                Type: string;
                Amount: number;
            }[];
        };
        Explosion?: {
            Quantity: number;
            ExplosionDelay: number;
            Fuse: boolean;
            FuseTime: number;
            Radius: number;
            ApplyEffect?: {
                ID: string; 
                Duration?: number; // Duration in ms for how long the effect lasts. If absent, use default duration for that effect.
                Stacks?: number; // Number of stacks to apply. If absent, use default stack count for that effect.
            };
            Damage: {
                Type: string;
                Amount: number;
            }[];
        };
        Damage?: {
            Type: string;
            Amount: number;
        }[],
    };

    /** Dash the player toward the mouse cursor */
    Charge?: {
        /** Speed multiplier applied to the player's base MovementSpeed during the dash */
        SpeedMultiplier: number;
        /** How long the dash lasts in ms */
        Duration: number;
    };

    /** Push nearby enemies away from an origin point */
    KnockBack?: {
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
    };

    /** Spawn a non-player character to assist the player */
    SpawnNPC?: { 
        Type: string;
        Quantity: number;
    };

}
