import anime from 'animejs';
import {UIManager} from "../../../assets/js/uiManager";
import {InventoryManager} from "../../../assets/js/inventoryManager";

export default {
  data():any {
    return {
      store: this.$store,
      component: [],
      files: [
        {filename: "Demo", file: "src/_pixi/pixi.test.js"}, 
        {filename: "Water", file: "src/_pixi/pixi.water.js"}
      ],
      selected: null,
      currentfile: null,
      UIManager: null,
      inventoryManager: null,
      inventory: []
    };
  },
  mounted():void {
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
    this.UIManager.setDefaultStates()

    // setup inventory
    this.inventoryManager = new InventoryManager({
      container: document.querySelector(".game-item-container"),    
      update: (data) => {
        this.inventory = data
      }
    })

    for(let i = 0; i <= 2; i++){
      this.inventoryManager.addItem({name: i})
    }    
    this.inventoryManager.removeItem(4)
   

    // load file
    this.load(1)
  },  
  methods: {
    load(index:number){
      this.selected = this.files[index].filename
      this.currentfile = this.files[index]
      this.loadfile()
    },

    onchange(){
      let {files, selected} = this
      let res = files.filter(file => {
        return file.filename === selected        
      })
      this.currentfile = res[0]
      this.loadfile()
    },

    loadfile(){
      this.component[0].loadFile(this.currentfile.file)
    },

  }
};