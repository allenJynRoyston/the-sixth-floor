import {UIManager} from "./uiManager";
import {InventoryManager} from "./inventoryManager";
import {DialogManager} from "./dialogManager";
import {MasterSequencer} from "./masterSequencer";

//--------------------------
export class GameManager {
  constructor(PIxiComponents){      
      //-------------------------------------------------------------------  SETUP UI MANAGER
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
      //-------------------------------------------------------------------

      //------------------------------------------------------------------- SETUP INVENTORY MANAGER
      // setup inventory
      this.InventoryManager = new InventoryManager({
        container: document.querySelector(".game-item-container")
      })
      //-------------------------------------------------------------------

      //-------------------------------------------------------------------  ADD DIALOG MANAGER
      this.DialogManager = new DialogManager({
        container: document.querySelector(".game-dialog-modal"),  
        speaker: document.querySelector(".game-dialog-modal .speaker p"),  
        content: document.querySelector(".game-dialog-modal .content p"),  
      })      
      //-------------------------------------------------------------------

      //-------------------------------------------------------------------
      this.MasterSequencer = new MasterSequencer()
      //-------------------------------------------------------------------


      //-------------------------------------------------------------------
      this.PixiContainers = PIxiComponents
      //-------------------------------------------------------------------
      
      return {
        PixiContainers: this.PixiContainers,
        MasterSequencer: this.MasterSequencer,
        UIManager: this.UIManager,
        InventoryManager: this.InventoryManager,
        DialogManager: this.DialogManager
      }
  }

}
//--------------------------

