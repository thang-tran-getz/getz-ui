import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[pDialogDynamicContent]',
    host: {
        class: 'p-element'
    }
})
export class DialogDynamicContent {
    constructor(public viewContainerRef: ViewContainerRef) {}
}