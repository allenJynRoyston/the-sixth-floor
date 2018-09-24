import { UIManager } from "../../../assets/js/uiManager";
import { InventoryManager } from "../../../assets/js/inventoryManager";
import { DialogManager } from "../../../assets/js/dialogManager";
export default {
    data() {
        return {
            store: this.$store,
            component: [],
            files: [
                { filename: "Demo", file: "src/_pixi/pixi.test.js" },
                { filename: "Water", file: "src/_pixi/pixi.water.js" }
            ],
            selected: null,
            currentfile: null,
            UIManager: null,
            InventoryManager: null,
            DialogManager: null,
            inventory: []
        };
    },
    mounted() {
        // setup UI 
        this.UIManager = new UIManager({
            inventoryele: document.querySelector(".game-inventory"),
            inventorybtn: document.querySelector(".game-inventory-btn"),
            inventoryDefaultState: false,
            menuele: document.querySelector(".game-menu"),
            menubtn: document.querySelector(".game-menu-btn"),
            menuDefaultState: false,
            closeall: document.querySelector(".game-closeall")
        });
        this.UIManager.setDefaultStates();
        // setup inventory
        this.InventoryManager = new InventoryManager({
            container: document.querySelector(".game-item-container"),
            update: (data) => {
                this.inventory = data;
            }
        });
        // add default items
        for (let i = 0; i <= 2; i++) {
            this.InventoryManager.addItem({ name: i });
        }
        this.InventoryManager.removeItem(4);
        // add dialog system
        this.DialogManager = new DialogManager({
            container: document.querySelector(".game-dialog-modal"),
            speaker: document.querySelector(".game-dialog-modal .speaker p"),
            content: document.querySelector(".game-dialog-modal .content p"),
        });
        // load file
        this.load(1);
    },
    methods: {
        load(index) {
            this.selected = this.files[index].filename;
            this.currentfile = this.files[index];
            this.loadfile();
        },
        onchange() {
            let { files, selected } = this;
            let res = files.filter(file => {
                return file.filename === selected;
            });
            this.currentfile = res[0];
            this.loadfile();
        },
        loadfile() {
            this.component[0].loadFile(this.currentfile.file);
        },
        testDialog() {
            let { DialogManager } = this;
            let dialog = [
                {
                    speakerText: 'Name 1',
                    contentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
                },
                {
                    speakerText: 'Name 2',
                    contentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
                },
                {
                    speakerText: 'Name 1',
                    contentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
                },
                {
                    speakerText: 'Name 2',
                    contentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
                }
            ];
            DialogManager.loadDialog(dialog);
            this.nextDialog();
        },
        nextDialog() {
            let { DialogManager } = this;
            DialogManager.next()
                .then(res => {
                if (res.completed) {
                    DialogManager.closeAndReset()
                        .then(_res => {
                        console.log(_res);
                    });
                }
            })
                .catch((err) => {
                // no dialog setup
            });
        },
        autoplayDialog() {
            let { DialogManager } = this;
            DialogManager.autoplay()
                .then(res => {
                console.log(res);
            })
                .catch((err) => {
                // no dialog setup
            });
        },
        skipDialog() {
            let { DialogManager } = this;
            DialogManager.skipDialog();
        }
    }
};
//# sourceMappingURL=game.js.map