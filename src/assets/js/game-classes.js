//--------------------------
export class GeneratorSequencer {
    constructor(props){      
        this.props = props;
        this.scriptLoader = new VJScriptLoader()
        this.obj = null        
    }
    async createNew(){
        let {ele, file, width, height} = this.props;        
        await this.scriptLoader.loadFile(file);     
        this.obj = __three.init(this.props);          
    }
}
//--------------------------

