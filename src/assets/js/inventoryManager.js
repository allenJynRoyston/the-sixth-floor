export class InventoryManager{
    constructor(props){
        this.props = props        
        this.items = []
        this.onpage = 0
        this.fillContainer()        
    }   
    
    getItems(){
        return this.items
    }

    addItem(item){
        this.items.push(item)
        this.fillContainer()
    }    

    removeItem(index){
        this.items.splice(index, 1)
        this.fillContainer()
    }       
    
    selectItem(item, index){
        console.log(item, index)
    }

    next(instant = false){
        let {container} = this.props        
        if(this.onpage + 1 < (Math.ceil(this.items.length/10)) ){
            this.onpage++       
            this.fillContainer()            
        }
    }

    prev(instant = false){        
        if(this.onpage - 1 >= 0){
            this.onpage--      
            this.fillContainer()
        }
    }

    fillContainer(){
        let {container} = this.props   
        let {onpage} = this;
        let index = 0
        let _data = []
        let sp = (onpage * 10)
        for(var i = sp; i < (sp) + 10; i++){
            if(!!this.items[sp + index]){
                _data.push(this.items[sp + index])
            }
            index++            
        }
        this.props.update(_data)
    }
}