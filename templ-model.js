import { ObjML } from 'obj-ml/obj-ml.js';
import { xc } from 'xtal-element/lib/XtalCore.js';
import { TemplateInstance } from '@github/template-parts/lib/index.js';
export class TemplModel extends ObjML {
    constructor() {
        super(...arguments);
        this.self = this;
        this.propActions = propActions;
        this.reactor = new xc.Rx(this);
        this.__dontUpdate = false;
    }
    connectedCallback() {
        super.connectedCallback();
        xc.mergeProps(this, slicedPropDefs);
    }
    set value(nv) {
        if (this.templateInstance !== undefined) {
            this.templateInstance.update(nv);
        }
        super.value = nv;
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
}
TemplModel.is = 'templ-model';
const onTemplateInstance = ({ templateInstance, self }) => {
    if (self.__dontUpdate) {
        self.__dontUpdate = false;
        return;
    }
    if (self.value !== undefined) {
        templateInstance.update(self.value);
    }
};
const onTemplate = ({ template, self }) => {
    self.__dontUpdate = true;
    self.templateInstance = new TemplateInstance(template, self.value || {});
};
const propActions = [onTemplateInstance, onTemplate];
const baseObj = {
    type: Object,
    dry: true,
    async: true,
    stopReactionsIfFalsy: true,
};
const propDefMap = {
    templateInstance: baseObj,
    template: baseObj,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(TemplModel, slicedPropDefs, 'onPropChange');
xc.define(TemplModel);
