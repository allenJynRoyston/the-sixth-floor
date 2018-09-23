import anime from 'animejs';

export class UIManager {
    constructor(props){                
        this.props = props

        this.props.inventoryele.placement = {hide: '-5%', show: '-100%'} 
        this.props.menuele.placement = { hide: '5%', show: '100%' } 

        this.props.inventorybtn.placement = {hide: '-100%', show: '0%'}         
        this.props.menubtn.placement = { hide: '100%', show: '0%' }  

        this.animation = {
            isAnimating: false
        }
        

        this.inventory = {
            ele: this.props.inventoryele,
            btn: this.props.inventorybtn,
            state: this.props.inventoryDefaultState,
            toggle: this.toggleInventory,
            open: this.openInventory 
        }

        this.menu = {
            ele: this.props.menuele,
            btn: this.props.menubtn,
            state: this.props.menuDefaultState,
            toggle: this.toggleMenu,
            open: this.openMenu
        }

        this.overlays = {
            closeall: this.props.closeall
        }
        
    }

    //-----------------------------------------
    setDefaultStates(){
        let {inventory, menu} = this        
        this.openMenu(menu.state, true)
        this.openInventory(inventory.state, true)
    }

    closeUI(state = true, instant = false){ 
        let types = ['inventory', 'menu']
        let {animation} = this

        if(!animation.isAnimating || instant){
            animation.isAnimating = true
            types.forEach(type => {            
                let {ele, btn} = this[type]
                this[type].state = !state;

                anime({
                    targets: btn,
                    translateX: !state ? btn.placement.hide : btn.placement.show,
                    duration: instant ? 0 : 500,
                    easing: !state ? 'easeOutQuad' : 'easeInQuad'
                })                
                anime({
                    targets: ele,
                    translateY: type === 'inventory' ? (!state ?  ele.placement.hide : ele.placement.show) : 0,
                    translateX: type === 'menu' ? (!state ?  ele.placement.hide : ele.placement.show) : 0,
                    opacity: !state ? 1 : 0,
                    duration: instant ? 0 : 500,
                    easing: !state ? 'easeOutQuad' : 'easeInQuad',
                    delay: 250,
                    complete: () => {
                        animation.isAnimating = false
                    }
                })   
                
                this.overlays.closeall.style.zIndex = state ? -1: 5
        
            })
        }
    }
    //-----------------------------------------

    //-----------------------------------------
    toggleInventory(){
        let {inventory} = this        
        inventory.state = !inventory.state
        this.openInventory(inventory.state)
    }
  
  
    openInventory(state, instant = false){     
        let {ele, btn} = this.inventory
        let {animation} = this
        
        if(!animation.isAnimating || instant){
            animation.isAnimating = true        
            anime({
                targets: this.menu.btn,
                translateX: state ? this.menu.btn.placement.hide : this.menu.btn.placement.show,
                duration: instant ? 0 : 500,
                easing: state ? 'easeOutQuad' : 'easeInQuad'
            })        
            anime({
                targets: btn,
                translateX: state ? btn.placement.hide : btn.placement.show,
                duration: instant ? 0 : 500,
                easing: state ? 'easeOutQuad' : 'easeInQuad'
            })
            anime({
                targets: ele,
                translateY: state ?  ele.placement.hide : ele.placement.show,
                opacity: state ? 1 : 0,
                duration: instant ? 0 : 500,
                easing: state ? 'easeOutQuad' : 'easeInQuad',
                delay: 250,
                complete: () => {
                    animation.isAnimating = false      
                }
            })
        }

        this.overlays.closeall.style.zIndex = state ? 5: -1
    }    
    //-----------------------------------------


    //-----------------------------------------
    toggleMenu(){
        let {menu} = this        
        menu.state = !menu.state
        this.openMenu(menu.state)
    }
  
  
    openMenu(state, instant = false){     
        let {ele, btn} = this.menu
        let {animation} = this
        if(!animation.isAnimating || instant){
            animation.isAnimating = true          
            anime({
                targets: this.inventory.btn,
                translateX: state ? this.inventory.btn.placement.hide : this.inventory.btn.placement.show,
                duration: instant ? 0 : 500,
                easing: state ? 'easeOutQuad' : 'easeInQuad'
            })          
            anime({
                targets: btn,
                translateX: state ? btn.placement.hide : btn.placement.show,
                duration: instant ? 0 : 500,
                easing: state ? 'easeOutQuad' : 'easeInQuad'
            })        
            anime({
                targets: ele,
                translateX: state ? ele.placement.hide : ele.placement.show,
                opacity: state ? 1 : 0,
                duration: instant ? 0 : 500,
                easing: state ? 'easeOutQuad' : 'easeInQuad',
                delay: 250, 
                complete: () => {
                    animation.isAnimating = false
                }
            })
        }

        this.overlays.closeall.style.zIndex = state ? 5: -1
    }      
    //-----------------------------------------  
}