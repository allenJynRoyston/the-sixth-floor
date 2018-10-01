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
          this.names.forEach(name => {
            if(this.ioType.read().inputs[name] > 0  && !this.active[name]){
              //this.active[name] = true
              if(this.ioBuffer.length < this.bufferMax){
                this.ioBuffer.push( {io: name, strength: this.ioType.read().inputs[name], action: this.active[name] } )
              }
            }
            if(this.ioType.read().inputs[name] === 0  && this.active[name]){
              //this.active[name] = false
              this.ioBuffer.push( {io: name, strength: this.ioType.read().inputs[name], action: this.active[name] } )
            }          
          })
        }
      })

  }

  next(){
    let {ioBuffer} = this
    if(ioBuffer.length > 0){
      let _return = ioBuffer[0]
      ioBuffer.shift()
      return {success: true, res: _return}
    }
    else{
      return {success: false}  
    }
  }

  setBuffer(val){
    this.bufferMax = val
  }

  active(){
    this.isActive = true
  }

  deactivate(){
    this.isActive = false
  }
}
//--------------------------

