//--------------------------
export class KeyboardManager {
  constructor(reassignKeys){      
    this.names = ['U', 'D', 'L', 'R', 'A', 'B', 'X', 'Y', 'L1', 'L2', 'R1', 'R2', 'START', 'BACK']
    
    this.thresholds = {
      short: 50,
      medium: 100,
      long: 200
    }

    this.intervalTimers = {
      U: null,
      D: null,
      L: null,
      R: null,
      A: null,
      B: null,
      X: null,
      Y: null,
      L1: null,
      L2: null,
      R1: null,
      R2: null,
      START: null,
      BACK: null
    }

    this.intervalTimersCount = {
      U: 0,
      D: 0,
      L: 0,
      R: 0,
      A: 0,
      B: 0,
      X: 0,
      Y: 0,
      L1: 0,
      L2: 0,
      R1: 0,
      R2: 0,
      START: 0,
      BACK: 0
    }    

    this.inputs = {
      U: 0,
      D: 0,
      L: 0,
      R: 0,
      A: 0,
      B: 0,
      X: 0,
      Y: 0,
      L1: 0,
      L2: 0,
      R1: 0,
      R2: 0,
      START: 0,
      BACK: 0
    }

    this.keys = {
      U: 38,
      D: 40,
      L: 37,
      R: 39,
      A: 65,
      B: 83,
      X: 68,
      Y: 70,
      L1: 81,
      L2: 87,
      R1: 69,
      R2: 82,
      START: 13,
      BACK: 8
    }

    this.listener = () => {}

    // assign keys 
    this.reassignKeys(reassignKeys)

    // event listener keydown
    document.removeEventListener('keydown', null)
    document.addEventListener('keydown', (event) => {
      let {keys, inputs, names, thresholds, intervalTimers, intervalTimersCount} = this      
      names.forEach(name => {
        if(keys[name] === event.keyCode && inputs[name] === 0){
          inputs[name] = 1          
          intervalTimers[name] = setInterval(() => {
            intervalTimersCount[name]++            
            if(intervalTimersCount[name] > thresholds.short){
              inputs[name] = 2
            }  
            if(intervalTimersCount[name] > thresholds.medium){
              inputs[name] = 3
            }    
            if(intervalTimersCount[name] > thresholds.long){
              inputs[name] = 4
              clearInterval(intervalTimers[name])
            }                                    
          }, 1)
        }
      })   
    });

    // event listener keyup
    document.removeEventListener('keyup', null)
    document.addEventListener('keyup', (event) => {
      let {keys, inputs, names, intervalTimers, intervalTimersCount} = this
      names.forEach(name => {
        if(keys[name] === event.keyCode){
          inputs[name] = 0
          clearInterval(intervalTimers[name])
          intervalTimers[name] = null
          intervalTimersCount[name] = 0
        }
      })   
    });  
  }

  reassignThresholds(reassignKeys){
    let {thresholds} = this
    let names = ['short', 'medium', 'long']
    if(!!reassignKeys){
      names.forEach(name => {
        thresholds[name] = !!reassignKeys[name] ? reassignKeys[name] : thresholds[name]
      })
    }
  }

  reassignKeys(reassignKeys){
    let {keys, names} = this
    if(!!reassignKeys){
      names.forEach(name => {
        keys[name] = !!reassignKeys[name] ? reassignKeys[name] : keys[name]
      })
    }
  }

  read(){
    return {success: true, inputs: this.inputs}
  }

  readKey(key){
    if(!!this.inputs[key]){
      return {success: true, inputs: this.inputs[key]}
    }
    else {
      return {success: false, error: 'NO ASSIGNED KEY'}
    }
  }
  
}
//--------------------------

