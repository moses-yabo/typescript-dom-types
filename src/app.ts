//AutoBind
function autoBind(
    _:any,
    __2:string,
    descriptor:PropertyDescriptor
    ) {
    const originalMethod = descriptor.value;
    const adjDescriptor:PropertyDescriptor = {
        configurable:true,
        get(){
            const boundFn = originalMethod.bind(this);
            return boundFn
        }
    }

    return adjDescriptor
}

//ProjectInput class

class ProjectInput {
templateEl:HTMLTemplateElement;
hostElement:HTMLDivElement;
element: HTMLFormElement;
tittleInputEl:HTMLInputElement;
descrptInputEl:HTMLInputElement;
peopleInputEl:HTMLInputElement;
    constructor() {
        this.templateEl = <HTMLTemplateElement>document.getElementById("project-input")!;
        this.hostElement = <HTMLDivElement>document.getElementById('app')!;
        //
        const importedNode = <DocumentFragment>document.importNode(this.templateEl.content,true);
        this.element = <HTMLFormElement>importedNode.firstElementChild ;
        this.element.id = 'user-input';


        this.tittleInputEl = <HTMLInputElement>this.element.querySelector("#title");
        this.descrptInputEl = <HTMLInputElement>this.element.querySelector("#description");
        this.peopleInputEl = <HTMLInputElement>this.element.querySelector("#people");

        this.attach();
        this.configure();
        this.gatherUserDataInput();
    }
    @autoBind
    private submitHandler(event:Event){
        event.preventDefault();
      
   
        
    }
    private gatherUserDataInput():[string,string,number]{
        return [this.tittleInputEl.value,this.descrptInputEl.value,Number.parseInt(this.peopleInputEl.value)]
    }
    private configure(){
        this.element.addEventListener('submit',this.submitHandler)
    }
    private attach(){
        this.hostElement.insertAdjacentElement("afterbegin",this.element)
    }
}
const prjInput = new ProjectInput();