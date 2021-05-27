import { ObjML } from 'obj-ml/obj-ml.js';
import { xc } from 'xtal-element/lib/XtalCore.js';
export class TemplModel extends ObjML {
    constructor() {
        super(...arguments);
        this.self = this;
        this.propActions = propActions;
        this.reactor = new xc.Rx(this);
    }
    connectedCallback() {
        super.connectedCallback();
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
    set value(nv) {
        if (this.templateInstance !== undefined) {
            this.templateInstance.update(nv);
        }
        super.value = nv;
    }
}
TemplModel.is = 'templ-model';
const propActions = [];
const propDefMap = {
    templateInstance: {
        type: Object,
        dry: true,
        async: true,
    }
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(TemplModel, slicedPropDefs, 'onPropChange');
xc.define(TemplModel);
