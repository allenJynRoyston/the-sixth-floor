//--------------------------
export class TestUtility {
  constructor(managers){      
    this.GameManager = managers
  }

  //-------------------------------------- DIALOG MANAGER TESTS
  testDialogClasses(){
    let {DialogManager} = this.GameManager
    let dialog = [
      {
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

  //-------------------------------------- DIALOG MANAGER TESTS
  testDialogStyles(){
    let {DialogManager} = this.GameManager
    let dialog = [
      {
        style: 'blurin',
        speakerText: 'Name 2',
        contentText: 'This is interferance text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
      },       
      {
        style: 'ghostly',
        speakerText: 'Name 2',
        contentText: 'This is ghostly text.',
        shake: ['This is ghostly text.'],
      }, 
      {
        style: 'interferance',
        speakerText: 'Name 2',
        contentText: 'This is interferance text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
      },             
      {
        style: 'radio',
        speakerText: 'Name 2',
        contentText: 'This is radio text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
      },      
      {
        style: 'normal',
        speakerText: 'Name 1',
        contentText: 'This is normal style text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
      },
      {
        style: 'fast',
        speakerText: 'Name 2',
        contentText: 'This is fast style text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
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

