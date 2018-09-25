import anime from 'animejs';

//--------------------------
export class DialogManager {
    constructor(props){      
        this.props = props;    
        this.dialog = {
            speakerText: null,
            contentText: null
        }
        this.sequencer = null
        this.dialogIsOpen = false
        this.autoplayInterval = null
        this.isAutoplaying = false        
        this.specialWords = {
          bold: [], 
          em: [], 
          large: [], 
          small: [],
          red: []
        }

        // placement
        this.props.container.placement = {
            hide: '100%',
            show: '0%'
        }

        this.props.speaker.placement = {
            hide: '-50%',
            show: '0%'
        }  
        
        this.props.content.placement = {
            hide: '5%',
            show: '0%'
        }          
        
        // update text functions
        this.props.content.updateText = (content) => {
            this.props.content.innerHTML = content            
        }        
        this.props.content.getCurrentText = (content) => {
            return this.props.content.innerHTML
        }            
        this.props.speaker.updateText = (content) => {
            this.props.speaker.innerHTML = content
        }    
         
        
        // set defaults
        this.hideDialog(() => {}, true)
        this.hideSpeaker(true)
        this.hideContent(true)
    
    }
    

    loadDialog(data){
        const _sequencer = function*(data){
            for(let i = 0; i < data.length; i++){
                yield data[i]
              }
              yield null
        }  
        this.sequencer = _sequencer(data)
    }

    autoplay(){        
        return new Promise((resolve, reject) => {  
            if(!this.isAutoplaying){
                this.isAutoplaying = true            
                this.autoplayInterval = setInterval(() => {                
                    this.next()
                        .then((res) => {
                            if(res.completed){
                                this.closeAndReset()
                            }
                        })
                        .catch((err) => {
                            // no dialog setup
                        })                       
                }, 3000)     
            }      
        })
    }

    next(){
        return new Promise((resolve, reject) => {  
            if(this.sequencer !== null){
                let line = this.sequencer.next()
                if(line.value !== null){
                    let {speakerText, contentText, style, bold, em, large, small, red, shake} = line.value
                    this.specialWords.bold = !!bold ? bold : []
                    this.specialWords.em = !!em ? em : []
                    this.specialWords.large = !!large ? large : []
                    this.specialWords.small = !!small ? small : []                    
                    this.specialWords.red = !!red ? red : []
                    this.specialWords.shake = !!shake ? shake : []
                    
                    this.setText({ speakerText, contentText, style: style = !!style ? style : 'normal' })
                    this.playText()
                        .then(() => {
                            resolve({completed: false, error: false})
                        })    
                }
                else{
                    resolve({completed: true, error: false})
                }
            } else {
                reject({completed: true, error: false})
            }        
        })   
    }


    setText(data){
        let {speakerText, contentText, style} = data;        
        this.props.speaker.updateText(speakerText)
        this.dialog = {speakerText, contentText, style}        
    }

    playText(){
        return new Promise((resolve, reject) => {
            if(!this.dialogIsOpen){
                this.beginDialog(() => {
                    this.nextDialog().then(() => { resolve()})
                })
            }
            else{
                this.nextDialog().then(() => {resolve()})            
            }
        })
    }

    nextDialog(){
        return new Promise((resolve, reject) => {
            let {contentText, style} = this.dialog;
            let {content} = this.props
            let {bold, em, large, small, red, shake} = this.specialWords
            let _textstring = contentText.split(" ")


            this.showContent()
            this.showSpeaker()

            // process special characters
            bold = bold.map(phrase => {
              return phrase.split(" ")
            })
            em = em.map(phrase => {
              return phrase.split(" ")
            })
            large = large.map(phrase => {
              return phrase.split(" ")
            })     
            small = small.map(phrase => {
              return phrase.split(" ")
            })     
            red = red.map(phrase => {
              return phrase.split(" ")
            })    
            shake = shake.map(phrase => {
              return phrase.split(" ")
            })                                                


            const wordSequencer = function*(data){
                for(let i = 0; i < data.length; i++){
                    yield data[i]
                }
                yield null
            }        
            const letterSequencer = function*(data){
                for(let i = 0; i < data.length; i++){
                    yield data[i]
                }
                yield null
            }

            content.innerHTML = ''
                
            // create unique spans
            _textstring.forEach(() => {
                content.updateText(`${content.getCurrentText()}<span style='float: left; padding-left: 5px; height: 30px; display: flex; align-items: center'></span>`)
            })
            let _spans = content.querySelectorAll('span')
            _spans.forEach((span, index) => {            
                span.getText = () => {
                    return span.innerHTML
                }
                span.updateText = (newtext) => {
                    span.innerHTML = newtext
                }

                // check for keywords
                bold.forEach(_bold => {
                  _bold.forEach((word) => {
                      if(word.toLowerCase() === _textstring[index].toLowerCase()){
                          span.classList.add('__dialog--bold');                          
                      }
                  })    
                }) 
                
                // check for keywords
                em.forEach((_em) => {
                  _em.forEach((word) => {
                      if(word.toLowerCase() === _textstring[index].toLowerCase()){
                          span.classList.add('__dialog--em');        
                      }
                  })   
                })

                // check for keywords
                large.forEach((_large) => {
                  _large.forEach((word) => {
                      if(word.toLowerCase() === _textstring[index].toLowerCase()){
                          span.classList.add('__dialog--large');           
                      }
                  })  
                })
                
                // check for keywords
                small.forEach((_small) => {
                  _small.forEach((word) => {
                      if(word.toLowerCase() === _textstring[index].toLowerCase()){
                          span.classList.add('__dialog--small');          
                      }
                  })
                })
                
                // check for keywords
                red.forEach((_red) => {
                  _red.forEach((word) => {
                      if(word.toLowerCase() === _textstring[index].toLowerCase()){
                          span.classList.add('__dialog--red');
                      }
                  }) 
                })      
                
                // check for keywords
                shake.forEach((_shake) => {
                  _shake.forEach((word) => {
                    if(word.toLowerCase() === _textstring[index].toLowerCase()){
                        span.classList.add('__dialog--shake');
                    }
                  })                     
                })
            })

            // STYLES
            let transformStart, transformEasing, duration, speed;
            switch(style){
              case 'normal': 
                duration = 50
                speed = 3
                transformEasing = 'linear'
                transformStart = `opacity: 0; transform: translateY(-10px) scale(1)`
              break
              case 'fast': 
                duration = 50
                speed = 1
                transformEasing = 'linear'
                transformStart = `opacity: 0; transform: translateY(-10px) scale(1)`
              break
              case 'radio': 
                duration = 500
                speed = 5
                transformEasing = 'easeOutElastic'
                transformStart = `opacity: 0; transform: translateX(20px) scale(5)`              
              break    
              case 'interferance': 
                duration = 500
                speed = 10
                transformEasing = 'easeInElastic'
                transformStart = `opacity: 0; transform: translateX(-10px) scale(5)`
              break   
              case 'ghostly': 
                duration = 500
                speed = 50
                transformEasing = 'linear'
                transformStart = `opacity: 0; transform: translateY(-10px) scale(0)`
              break  
              case 'blurin': 
                duration = 500
                speed = 1
                transformEasing = 'linear'
                transformStart = `opacity: 0; transform: translateX(-10px) scale(5); filter: blur(10px);`
              break                                                        
            }


            // begin word sequencing
            let words = wordSequencer(_textstring)        
            let wordIndex = 0
            const nextWord = () => {        
                let text = words.next()
                if(text.value !== null){ 
                    let word = letterSequencer(text.value.split(''))                   
                    let build = () => {
                        let letter = word.next()
                        let s = _spans[wordIndex]
                        if(letter.value !== null){                        
                            // change transform properties for effect
                            s.updateText(`${s.getText()}<span class='__letter' style='display: inline-block; ${transformStart}'>${letter.value}</span>${letter.value === '.' || letter.value === ',' ? ' ' : ''}`)
                            build()
                        }
                        else{
                            s.updateText(`${s.getText()} `)                                                
                            wordIndex++
                            nextWord()                     
                        }
                    }
                    build()
                }
                else{
                    this.animateTextIn(transformEasing, duration, speed)
                        .then(() => {
                            resolve()
                        })
                }                        
            }
            nextWord()                
        })
    }

    skipDialog(){
        this.closeAndReset()
    }

    closeAndReset(){
        return new Promise((resolve, reject) => {  
            this.sequencer = null
            this.isAutoplaying = false                        
            clearInterval(this.autoplayInterval)            
            this.hideSpeaker()
            this.hideContent()
            this.hideDialog(() => {            
                resolve()
            })
        })        
    }    

    animateTextIn(easing, duration, speed){
        return new Promise((resolve, reject) => {  
            let {content} = this.props            
            let letters = content.querySelectorAll('.__letter')
            letters.forEach((letter, index) => {  
                anime({
                    targets: letter,
                    opacity: 1, 
                    scale: 1,
                    duration,
                    easing,
                    translateX: 0,
                    translateY: 0,
                    filter: 'blur(0px)',
                    delay: index*speed,     // change for speed
                    complete: () => {
                        if(index === letters.length-1){
                            resolve()
                        }
                    }
                })
            })  
        })      
    }

    hideSpeaker(force = false){
        let {speaker} = this.props;
        anime({
            targets: speaker,
            opacity: 0, 
            translateY: speaker.placement.hide,
            easing: 'easeOutQuad',
            duration: force ? 0 : 500
        })
    }

    showSpeaker(force = false){
        let {speaker} = this.props;
        anime({
            targets: speaker,
            opacity: 1, 
            translateY: speaker.placement.show,
            easing: 'easeOutQuad',
            duration: force ? 0 : 500
        })
    }    

    hideContent(force = false){
        let {content} = this.props;
        anime({
            targets: content,
            opacity: 0, 
            translateX: content.placement.hide,
            easing: 'easeOutQuad',
            duration: force ? 0 : 500
        })
    }  
    
    showContent(force = false){
        let {content} = this.props;
        anime({
            targets: content,
            opacity: 1, 
            translateX: content.placement.show,            
            duration: 0
        })
    }      

    hideDialog(callback, force = false){
        let {container} = this.props;        
        this.hideSpeaker()
        setTimeout(() => {
            this.hideContent()
        }, force ? 0 : 250)

        setTimeout(() => {
            anime({
                targets: container,
                opacity: 0, 
                translateY: container.placement.hide,
                easing: 'easeOutQuad',
                duration: force ? 0 : 500,
                complete: () => {
                    this.dialogIsOpen = false
                }

            })
        }, force ? 0 : 750)
    }    

    beginDialog(callback = () => {}){
        let {container} = this.props;
        this.dialogIsOpen = true
        anime({
            targets: container,
            translateY: container.placement.show,
            opacity: 1,
            duration: 350,
            easing: 'easeOutQuad',
            complete: () => {                
                setTimeout(() => {                    
                    callback()
                }, 10)
            }
        })  

    }
}
//--------------------------

