import { GameManager } from "../../../assets/js/gameManager";
import { TestUtility } from "../../../assets/js/testUtility";
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
            isReady: false,
            GameManager,
            TestUtility
        };
    },
    mounted() {
        this.GameManager = new GameManager();
        this.TestUtility = new TestUtility(this.GameManager);
        // load file
        // this.load(1)
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
        }
    }
};
//# sourceMappingURL=game.js.map