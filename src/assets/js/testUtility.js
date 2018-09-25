//--------------------------
export class TestUtility {
  constructor(managers){      
    this.GameManager = managers
  }

  testDialog(){
    let {DialogManager} = this.GameManager
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
    ]
    DialogManager.loadDialog(dialog) 
    this.nextDialog()
  }


  addMockItems(){
    let {InventoryManager} = this.GameManager
    // add default items
    let val = prompt("Number of items", "");
    for(let i = 0; i <= parseInt(val); i++){
      InventoryManager.addItem({name: i})
    }    
  }

  removeMockItem(){
    let {InventoryManager} = this.GameManager
    let val = prompt("Remove item number", "");
    InventoryManager.removeItem(parseInt(val))
  }


  nextDialog(){
    let {DialogManager} = this.GameManager
    DialogManager.next()
      .then(res => {
        if(res.completed){
          DialogManager.closeAndReset()
            .then( _res => {
              console.log(_res)
            })
        }
      })
      .catch((err) => {
        // no dialog setup
      })
  }

  autoplayDialog(){
    let {DialogManager} = this.GameManager
    DialogManager.autoplay()
      .then(res => {
        console.log(res)
      })
      .catch((err) => {
        // no dialog setup
      })        
  }
  
  skipDialog(){
    let {DialogManager} = this.GameManager
    DialogManager.skipDialog()
  }


}
//--------------------------

