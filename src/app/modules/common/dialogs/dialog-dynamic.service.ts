import { Injectable, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef, Inject, createComponent } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { DOCUMENT } from '@angular/common';
import { DialogDynamicRef } from './dialog-dynamic-ref';
import { DialogDynamicComponent } from './dialog-dynamic.component';
import { DialogDynamicModel } from './dialog-dynamic.model';
import { DialogDynamicInjector } from './dialog-dynamic-injector';
/**
 * Dynamic Dialog component methods.
 * @group Service
 */
@Injectable()
export class DialogDynamicService {
    dialogComponentRefMap: Map<DialogDynamicRef, ComponentRef<DialogDynamicComponent>> = new Map();

    constructor(private appRef: ApplicationRef, private injector: Injector, @Inject(DOCUMENT) private document: Document) {}
    /**
     * Displays the dialog using the dynamic dialog object options.
     * @param {*} componentType - Dynamic component for content template.
     * @param {DynamicDialogConfig} config - DynamicDialog object.
     * @returns {DynamicDialogRef} DynamicDialog instance.
     * @group Method
     */
    public open(componentType: Type<any>, config: DialogDynamicModel): DialogDynamicRef | null{
        if (!this.duplicationPermission(componentType, config)) {
            return null;
        }

        const dialogRef = this.appendDialogComponentToBody(config);

        (this.dialogComponentRefMap.get(dialogRef) as ComponentRef<DialogDynamicComponent>).instance.childComponentType = componentType;

        return dialogRef;
    }

    private appendDialogComponentToBody(config: DialogDynamicModel) {
        const map = new WeakMap();
        map.set(DialogDynamicModel, config);

        const dialogRef = new DialogDynamicRef();
        map.set(DialogDynamicRef, dialogRef);

        const sub = dialogRef.onClose.subscribe(() => {
            (this.dialogComponentRefMap.get(dialogRef) as ComponentRef<DialogDynamicComponent>).instance.close();
        });

        const destroySub = dialogRef.onDestroy.subscribe(() => {
            this.removeDialogComponentFromBody(dialogRef);
            destroySub.unsubscribe();
            sub.unsubscribe();
        });

        const componentRef = createComponent(DialogDynamicComponent, { environmentInjector: this.appRef.injector, elementInjector: new DialogDynamicInjector(this.injector, map) });

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        if (!config.appendTo || config.appendTo === 'body') {
            this.document.body.appendChild(domElem);
        } else {
            DomHandler.appendChild(domElem, config.appendTo);
        }

        this.dialogComponentRefMap.set(dialogRef, componentRef);

        return dialogRef;
    }

    private removeDialogComponentFromBody(dialogRef: DialogDynamicRef) {
        if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
            return;
        }

        const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef) as ComponentRef<DialogDynamicComponent>;
        this.appRef.detachView(dialogComponentRef.hostView);
        dialogComponentRef.destroy();
        this.dialogComponentRefMap.delete(dialogRef);
    }

    private duplicationPermission(componentType: Type<any>, config: DialogDynamicModel): boolean {
        if (config.duplicate) {
            return true;
        }
        let permission = true;
        for (const [key, value] of this.dialogComponentRefMap) {
            if (value.instance.childComponentType === componentType) {
                permission = false;
                break;
            }
        }
        return permission;
    }
}