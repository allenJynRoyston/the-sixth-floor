//--------------------------
export class MasterSequencer {
    constructor(){      
        this.sequencer = []
    }

    set(data){
        const _sequencer = function*(data){
            for(let i = 0; i < data.length; i++){
                yield data[i]
              }
              yield null
        }  
        this.sequencer = _sequencer(data)
        console.log('sequencer set')
    }

    next(){
        return new Promise((resolve, reject) => {  
            if(this.sequencer !== null){
                let order = this.sequencer.next()
                if(order.value !== null){
                    this.actions(order.value)
                }
                else{
                    resolve({completed: true, error: false})
                }
            } else {
                reject({completed: true, error: false})
            }        
        })   
    }    


    actions(order){
        console.log(order)
        switch(order.action){
            case 'LOAD':

            break
        }
    }

}
//--------------------------

