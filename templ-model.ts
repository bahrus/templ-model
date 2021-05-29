import {ObjML} from 'obj-ml/obj-ml.js';
import {xc, IReactor,PropAction,PropDef,ReactiveSurface,PropDefMap} from 'xtal-element/lib/XtalCore.js';
import {TemplateInstance} from '@github/template-parts/lib/index.js';
import {TemplModelTemplateProp} from './types.d.js';
export class TemplModel extends ObjML implements ReactiveSurface, TemplModelTemplateProp{
    static is = 'templ-model';
    self = this;
    propActions = propActions;
    reactor: IReactor = new xc.Rx(this);
    templateInstance: TemplateInstance | undefined;
    template: HTMLTemplateElement | undefined;
    connectedCallback(){
        super.connectedCallback();
        xc.mergeProps(this, slicedPropDefs);
    }

    get value(){
        return super.value;
    }
    set value(nv: any){
        if(this.templateInstance !== undefined){
            this.templateInstance.update(nv);
        }
        super.value = nv;
    }

    __dontUpdate = false;

    onPropChange(n: string, prop:PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
}

const onTemplateInstance = ({templateInstance, self}: TemplModel) => {
    if(self.__dontUpdate){
        self.__dontUpdate = false;
        return;
    }
    if(self.value !== undefined){
        templateInstance!.update(self.value)
    }
}

const onTemplate = ({template, self}: TemplModel) => {
    self.__dontUpdate = true;
    self.templateInstance = new TemplateInstance(template!, self.value || {});
}

const propActions = [onTemplateInstance, onTemplate] as PropAction[];
const baseObj: PropDef = {
    type: Object,
    dry: true,
    async: true,
    stopReactionsIfFalsy: true,
};
const propDefMap: PropDefMap<TemplModel> = {
    templateInstance: baseObj,
    template: baseObj,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(TemplModel, slicedPropDefs, 'onPropChange');
xc.define(TemplModel);

declare global {
    interface HTMLElementTagNameMap {
        "templ-model": TemplModel,
    }
}