import {ObjML} from 'obj-ml/obj-ml.js';
import {define} from 'xtal-element/lib/define.js';
import {mergeProps} from 'xtal-element/lib/mergeProps.js';
import {letThereBeProps} from 'xtal-element/lib/letThereBeProps.js';
import {getSlicedPropDefs} from 'xtal-element/lib/getSlicedPropDefs.js';
import {PropDefMap} from 'xtal-element/types.d.js';
import {TemplateInstance} from '@github/template-parts/lib/index.js';
export class TemplModel extends ObjML{
    static is = 'templ-model';
    templateInstance: TemplateInstance | undefined;
    connectedCallback(){
        super.connectedCallback();
        mergeProps(this, slicedPropDefs);
    }

    set value(nv: any){
        if(this.templateInstance !== undefined){
            this.templateInstance.update(nv);
        }
        super.value = nv;
    }
}

const propDefMap: PropDefMap<TemplModel> = {
    templateInstance: {
        type: Object,
        dry: true,
        async: true,
    }
};
const slicedPropDefs = getSlicedPropDefs(propDefMap);
letThereBeProps(TemplModel, slicedPropDefs);
define(TemplModel);

declare global {
    interface HTMLElementTagNameMap {
        "templ-model": TemplModel,
    }
}