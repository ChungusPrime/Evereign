import Menu from "../../scenes/Menu";
import TextButton from "../UI_TextButton";
import Races from "../../data/Races";
import ItemData from "../../data/ItemData";

class CharacterList extends Phaser.GameObjects.Group {

    constructor(scene: Menu) {
        super(scene);
        this.refresh();
    }

    refresh() {
        const scene = this.scene as Menu;

        this.clear(true, true);

        let Y = scene.scale.height * 0.15;
        let header = scene.add.text(scene.scale.width * 0.32, Y, "Characters", { fontSize: 40, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false);
        this.add(header);

        let CharacterListY = scene.scale.height * 0.28;

        Object.keys(scene.Data.Characters).forEach(element => {
            let Character = scene.Data.Characters[element];
            let Background = scene.add.nineslice(scene.scale.width * 0.31, CharacterListY, "Kenney-UI", "panel_blue", 400, 120, 10, 10, 10, 10).setOrigin(0.5).setVisible(false);
            let CharacterSprite = scene.add.sprite(Background.getLeftCenter().x + 30, Background.getCenter().y, "Player", Races[Character.Race].Skin).setOrigin(0.5).setScale(2).setVisible(false);

            let CharacterHead = scene.add.sprite(0, 0, "PlayerHead", 0).setOrigin(0.5).setScale(2).setVisible(false);
            if (Character.Inventory.Equipment_Head !== null) {
                CharacterHead.setPosition(CharacterSprite.x, CharacterSprite.y).setTexture("PlayerHead", ItemData[Character.Inventory.Equipment_Head.ID].Texture).setOrigin(0.5).setScale(2).setVisible(false);
            }

            let CharacterBody = scene.add.sprite(0, 0, "PlayerBody", 0).setOrigin(0.5).setScale(2).setVisible(false);
            if (Character.Inventory.Equipment_Chest !== null) {
                CharacterBody.setPosition(CharacterSprite.x, CharacterSprite.y).setTexture("PlayerBody", ItemData[Character.Inventory.Equipment_Chest.ID].Texture).setOrigin(0.5).setScale(2).setVisible(false);
            }

            let CharacterLegs = scene.add.sprite(0, 0, "PlayerLegs", 0).setOrigin(0.5).setScale(2).setVisible(false);
            if (Character.Inventory.Equipment_Legs !== null) {
                CharacterLegs.setPosition(CharacterSprite.x, CharacterSprite.y).setTexture("PlayerLegs", ItemData[Character.Inventory.Equipment_Legs.ID].Texture).setOrigin(0.5).setScale(2).setVisible(false);
            }

            let CharacterHands = scene.add.sprite(0, 0, "PlayerHands", 0).setOrigin(0.5).setScale(2).setVisible(false);
            if (Character.Inventory.Equipment_Hands !== null) {
                CharacterHands.setPosition(CharacterSprite.x, CharacterSprite.y).setTexture("PlayerHands", ItemData[Character.Inventory.Equipment_Hands.ID].Texture).setOrigin(0.5).setScale(2).setVisible(false);
            }

            let CharacterFeet = scene.add.sprite(0, 0, "PlayerFeet", 0).setOrigin(0.5).setScale(2).setVisible(false);
            if (Character.Inventory.Equipment_Feet !== null) {
                CharacterFeet.setPosition(CharacterSprite.x, CharacterSprite.y).setTexture("PlayerFeet", ItemData[Character.Inventory.Equipment_Feet.ID].Texture).setOrigin(0.5).setScale(2).setVisible(false);
            }

            let CharacterButton = new TextButton(scene, scene.scale.width * 0.32, CharacterListY, `${Character.Name}\nLevel ${Character.Level} ${Character.Class}\n${Character.CurrentMap}`, () => {
                scene.StartGame(Character.Name, "Adventure");
            }, 32).setVisible(false);

            this.addMultiple([
                Background,
                CharacterButton,
                CharacterSprite,
                CharacterHead,
                CharacterBody,
                CharacterLegs,
                CharacterHands,
                CharacterFeet
            ]);

            CharacterListY += Background.height + 8;
        });

        this.setVisible(false);
    }

}

export default CharacterList;
