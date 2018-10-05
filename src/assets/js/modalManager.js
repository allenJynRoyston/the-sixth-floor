import anime from "animejs";

export class ModalManager{
  constructor(props){
      this.modals = []      

      // set show/hide properties
      props.container.showMe = () => {
        props.container.style.zIndex = 15
      }
      props.container.hideMe = () => {        
        props.container.style.zIndex = -1        
      }   

      // get background edge
      this.modalBG = props.container.querySelector('.game-modal-bg')      
      
      // get modals
      props.container.querySelectorAll('.game-modal').forEach(modal => {        
        this.modals.push(modal)
      })


      
      this.props = props     
      this.init()       
  }  

  init(){
    let {container} = this.props
    // hide container
    container.hideMe()
    
    // hide background and reset modals to default positions
    this.bgState(false, true)
    this.modalReset()    
  }
  
  modalReset(){
    let {modals} = this
    modals.forEach(modal => {
      anime({
        targets: modal,
        translateX: 0,
        translateY: 0,
        opacity: 0,
        duration: 0
      })        
    })
  }

  bgState(state = false, instant = false){
    let {modalBG} = this
    return new Promise((resolve, reject) => {  
      anime({
        targets: modalBG,
        scaleX: state ? 1 : 0,
        opacity: state ? 1 : 0,
        duration: instant ? 0 : 800,
        easing: 'easeInQuad',
        complete: () => {
          resolve()
        }
      })  
    })
  }

  animateModals(){
    let {modals} = this
    modals.forEach((modal, index) => {
      anime({
        targets: modal,
        translateX: 0,
        translateY: 0,
        opacity: 0,
        duration: 0
      })        
    })
  }

  start(){ 
    let {container} = this.props    
    let {modalBG} = this
    container.showMe()


    let data = [
      {text:  'option 1'},
      {text:  'option 2'},
      {text:  'option 3'},
      {text:  'option 4'}
    ]

    this.bgState(true)
      .then(() => {
        



      })
  }  

}