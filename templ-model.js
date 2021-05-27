import { ObjML } from 'obj-ml/obj-ml.js';
import { define } from 'xtal-element/lib/define.js';
import { mergeProps } from 'xtal-element/lib/mergeProps.js';
import { letThereBeProps } from 'xtal-element/lib/letThereBeProps.js';
import { getSlicedPropDefs } from 'xtal-element/lib/getSlicedPropDefs.js';
export class TemplModel extends ObjML {
    connectedCallback() {
        super.connectedCallback();
        mergeProps(this, slicedPropDefs);
    }
    set value(nv) {
        if (this.templateInstance !== undefined) {
            this.templateInstance.update(nv);
        }
        super.value = nv;
    }
}
TemplModel.is = 'templ-model';
const propDefMap = {
    templateInstance: {
        type: Object,
        dry: true,
        async: true,
    }
};
const slicedPropDefs = getSlicedPropDefs(propDefMap);
letThereBeProps(TemplModel, slicedPropDefs);
define(TemplModel);
