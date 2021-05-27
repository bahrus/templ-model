import {ObjML} from 'obj-ml/obj-ml.js';
import {xc, IReactor, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {TemplateInstance} from '@github/template-parts/lib/index.js';
export class TemplModel extends ObjML implements ReactiveSurface{
    static is = 'templ-model';
    self = this;
    propActions = propActions;
    reactor: IReactor = new xc.Rx(this);
    templateInstance: TemplateInstance | undefined;
    connectedCallback(){
        super.connectedCallback();
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
    set value(nv: any){
        if(this.templateInstance !== undefined){
            this.templateInstance.update(nv);
        }
        super.value = nv;
    }
}
const propActions = [] as PropAction[];

const propDefMap: PropDefMap<TemplModel> = {
    templateInstance: {
        type: Object,
        dry: true,
        async: true,
    }
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(TemplModel, slicedPropDefs, 'onPropChange');
xc.define(TemplModel);