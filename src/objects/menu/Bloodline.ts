import Menu from "../../scenes/Menu";
import { BloodlinePerks } from "../../data/Bloodline";

class Bloodline extends Phaser.GameObjects.Group {

    public scene: Menu;

    constructor(scene: Menu) {

        super(scene);

        this.scene = scene;

        let Y = scene.scale.height * 0.18;
        let X = scene.scale.width * 0.32;

        Object.entries(BloodlinePerks).forEach(([key, perk]) => {

            let Background = scene.add.nineslice(X, Y, "Kenney-UI", "panel_blue", 400, 120, 10, 10, 10, 10).setOrigin(0.5).setVisible(false);
            let PerkIcon = scene.add.sprite(Background.getLeftCenter().x + 10, Background.getCenter().y, "BloodlineIcons", key).setOrigin(0, 0.5).setScale(2).setVisible(false);

            let Label = `${perk.name}
            ${perk.description}
            ${perk.effect}
            Soulgem Cost: ${perk.soulgemCost}\n`;

            if ( scene.Data.ReincarnationTraits.includes(key) ) {
                Label += "Unlocked";
            } else if ( scene.Data.SoulGems < perk.soulgemCost ) {
                Label += "Not enough soulgems";
            } else {
                Label += "Click to unlock";
            }

            let PerkText = this.scene.add.text(
                Background.getTopLeft().x + 80,
                Background.getTopLeft().y + 10,
                Label,
                {
                    wordWrap: {
                        width: Background.width - 70,
                        useAdvancedWrap: true
                    },
                    align: "left"
                }
            )
            .setOrigin(0)
            .setVisible(false);

            Y += Background.height + 10;

            if (Y > scene.scale.height * 0.8) {
                X = scene.scale.width * 0.69;
                Y = scene.scale.height * 0.18;
            }

            this.addMultiple([
                Background,
                PerkIcon,
                PerkText
            ]);

        });

        this.setVisible(false);
    }

}

export default Bloodline;