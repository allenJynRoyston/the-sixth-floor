//--------------------------
export class TestUtility {
  constructor(managers){      
    this.GameManager = managers
  }

  //-------------------------------------- DIALOG MANAGER TESTS
  testDialog(){
    let {DialogManager} = this.GameManager
    let dialog = [
      {
        style: 'fast',
        speakerText: 'Name 1',
        contentText: 'This text will contain bold words.',
        bold: ['This text', 'bold words.']
      },
      {
        speakerText: 'Name 2',
        contentText: 'This text will contain emphasized words.',
        em: ['contain emphasized words.']
      },
      {
        speakerText: 'Name 1',
        contentText: 'This text will contain large words.',
        large: ['large words.']
      },
      {
        speakerText: 'Name 2',
        contentText: 'This text will contain small words.',
        small: ['small words.']
      },
      {
        speakerText: 'Name 1',
        contentText: 'This text will contain red words.',
        red: ['red words.']
      },
      {
        speakerText: 'Name 2',
        contentText: 'This text will contain shaking words.',
        shake: ['shaking']
      },
      {
        speakerText: 'Name 2',
        contentText: 'This text will contain mixed classes.',
        shake: ['mixed classes.'],
        large: ['mixed classes.'],
        red: ['mixed classes.']
      }                                                   
    ]
    DialogManager.loadDialog(dialog) 
    this.nextDialog()
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
  //--------------------------------------


  //--------------------------------------  INVENTORY MANAGER TESTS
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
  //--------------------------------------




}
//--------------------------

