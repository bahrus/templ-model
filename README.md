# templ-model

templ-model extends [obj-ml](https://github.com/bahrus/obj-ml), but integrates with (for now) Github's [template-parts library](https://github.com/github/template-parts).

templ-model is a web component that enables a declarative, HTML-based markup language to instantiate, and update, a JavaScript object, together with a view that is bound to the JavaScript object by way of Template Instantiation syntax.

templ-model supports a property, "templateInstance", which is expected to have a method called ["update"](https://github.com/github/template-parts/blob/main/src/template-instance.ts#L55) which the value of templ-model can be passed to as it changes.