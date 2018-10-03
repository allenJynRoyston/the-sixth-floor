//--------------------------
export class ControllerManager {
  constructor(ioType){      
      this.ioType = ioType
      this.names = ['U', 'D', 'L', 'R', 'A', 'B', 'X', 'Y', 'L1', 'L2', 'R1', 'R2', 'START', 'BACK']
      this.ioBuffer = []
      this.isActive = true
      this.bufferMax = 10

      this.active = {
        U: false,
        D: false,
        L: false,
        R: false,
        A: false,
        B: false,
        X: false,
        Y: false,
        L1: false, 
        L2: false, 
        R1: false, 
        R2: false, 
        START: false,
        BACK: false
      }

      window.keyboardManagerInterval = setInterval(() => {
        if(this.isActive){
          this.update()
        }
      })
  }

  update(){
    let {names, ioType, ioBuffer, active, bufferMax} = this
    names.forEach(name => {
      if(ioType.read().inputs[name] > 0 ){
        active[name] = true
        if(ioBuffer.length < bufferMax){
          ioBuffer.push( {io: name, strength: ioType.read().inputs[name], action: active[name] } )
        }
      }
      if(ioType.read().inputs[name] === 0  && active[name]){
        active[name] = false
        ioBuffer.push( {io: name, strength: ioType.read().inputs[name], action: active[name] } )
      }          
    })
  }

  next(){
    let {ioBuffer, isActive} = this
    if(isActive && ioBuffer.length > 0){
      let _return = ioBuffer[0]
      ioBuffer.shift()
      return {success: true, res: _return, remaining: ioBuffer.length}
    }
    else{
      return {success: false, remaining: ioBuffer.length}  
    }
  }

  nextSequence(){
    let {ioBuffer} = this
    if(ioBuffer.length > 0){
      let _return = ioBuffer[0]
      ioBuffer.shift()
      return {success: true, res: _return, remaining: ioBuffer.length}
    }
    else{
      return {success: false, remaining: ioBuffer.length}  
    }
  }  


  importCommands(commands){
    this.setActive(false)
    this.ioBuffer = []
    commands.forEach(command => {
      if(!!command.io){
        this.ioBuffer.push( {io: command.io, strength: command.strength, action: command.strength > 0 ? true : false } )
      }
    })
  }

  setActive(state){
    this.isActive = state
  }

  setBuffer(val){
    this.bufferMax = val
  }

}
//--------------------------

