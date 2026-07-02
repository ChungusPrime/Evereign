interface Proficiency {
    Abilities: Ability[];
    Traits: Trait[];
    Name: string;
    Description: string;
    ID: string;
    PrimaryAttribute?: string;
}

interface Ability {
    ID: string;
    Name: string;
    Description: string;
    mana_cost: number;
    sprite: string;
    type: string;
    cooldown?: number;
    charge_time?: number;
    requires_weapon_equipped?: boolean;
    weapon_type?: string;
    apply_effect?: string;
    apply_effect_duration?: number;
    requires_trait?: string;
    targeting?: string;
    targeting_shape?: string;
    targeting_radius?: number;
    ActiviationType?: string; // "Instant", "Channeled", "Cast", "Charge"
    ChannelInterval?: number; // Time in ms between each application of the ability's effects while channeling
    MaxChannelTime?: number; // Maximum time in ms that the ability can be channeled for
    CastTime?: number; // Time in ms before the ability is performed after activation
    ChargeTime?: number; // Time in ms required to fully charge the ability
    ChargePowerMultiplier?: number; // Multiplier for the ability's effects based on how long it was charged
    OnUse?: OnUseEffect | OnUseEffect[];
}

interface Trait {
    ID: string;
    Name: string;
    Description: string;
    sprite?: string;
    RequiredTraits?: string[];
    RequiredAttributes?: {
        Fortitude?: number;
        Versatility?: number;
        Vigor?: number;
        Expertise?: number;
        Personality?: number;
        Fortune?: number;
        Grit?: number;
    };
}

interface Traits {
    [key: string]: {
        Name: string;
        Description: string;
        RequiredTraits?: string[];
        RequiredAttributes?: {
            Fortitude?: number;
            Versatility?: number;
            Vigor?: number;
            Expertise?: number;
            Personality?: number;
            Fortune?: number;
            Grit?: number;
        };
    };
}

interface Skill {
    Name: string;
    Description?: string;
    Levels?: {
        [level: number]: {
            Unlock?: string | string[] | boolean;
        };
    }
}

interface CharacterAbilities {
    [key: string]: {
        Cooldown?: number,
        Velocity?: number,
        Damage?: AbilityDamageArray,
        CooldownMax?: number
    }
}

interface EffectData {
    ID: string;
    Name: string;
    Description: string;
    Duration: number;
    TickRate: number;
    Intensity: number;
}

interface AbilityDamageArray {
    [key: number]: {
        Type: string,
        Min: number,
        Max: number,
        ApplyDebuff?: string
    }[]
}
