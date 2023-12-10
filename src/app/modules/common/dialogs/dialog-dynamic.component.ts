import {
  animate,
  animation,
  AnimationEvent,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  Optional,
  PLATFORM_ID,
  Renderer2,
  SkipSelf,
  Type,
  ViewChild,
  ViewEncapsulation,
  ViewRef,
} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { DialogDynamicContent } from './dialog-dynamic-content';
import { DialogDynamicRef } from './dialog-dynamic-ref';
import { DialogDynamicModel } from './dialog-dynamic.model';

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0 }),
  animate('{{transition}}', style({ transform: 'none', opacity: 1 })),
]);

const hideAnimation = animation([
  animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 })),
]);

@Component({
  selector: 'p-dynamicDialog',
  animations: [
    trigger('animation', [
      transition('void => visible', [useAnimation(showAnimation)]),
      transition('visible => void', [useAnimation(hideAnimation)]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './dialog-dynamic.component.html',
  styleUrls: ['./dialog-dynamic.component.scss'],
  host: {
    class: 'p-element',
  },
  encapsulation: ViewEncapsulation.None,
})
export class DialogDynamicComponent implements AfterViewInit, OnDestroy {
  visible: boolean = true;

  componentRef: Nullable<ComponentRef<any>>;

  mask: Nullable<HTMLDivElement>;

  resizing: boolean | undefined;

  dragging: boolean | undefined;

  maximized: boolean | undefined;

  _style: any = {};

  originalStyle: any;

  lastPageX: number | undefined;

  lastPageY: number | undefined;

  ariaLabelledBy: string | undefined;

  @ViewChild(DialogDynamicContent)
  insertionPoint: Nullable<DialogDynamicContent>;

  @ViewChild('mask') maskViewChild: Nullable<ElementRef>;

  @ViewChild('content') contentViewChild: Nullable<ElementRef>;

  @ViewChild('titlebar') headerViewChild: Nullable<ElementRef>;

  childComponentType: Nullable<Type<any>>;

  container: Nullable<HTMLDivElement>;

  wrapper: Nullable<HTMLElement>;

  documentKeydownListener: VoidListener;

  documentEscapeListener: VoidListener;

  maskClickListener: VoidListener;

  transformOptions: string = 'scale(0.7)';

  documentResizeListener: VoidListener;

  documentResizeEndListener: VoidListener;

  documentDragListener: VoidListener;

  documentDragEndListener: VoidListener;

  get minX(): number {
    return this.config.minX ? this.config.minX : 0;
  }

  get minY(): number {
    return this.config.minY ? this.config.minY : 0;
  }

  get keepInViewport(): boolean {
    return this.config.keepInViewport!;
  }

  get maximizable(): boolean {
    return this.config.maximizable!;
  }

  get maximizeIcon(): string {
    return this.config.maximizeIcon!;
  }

  get minimizeIcon(): string {
    return this.config.minimizeIcon!;
  }

  get style(): any {
    return this._style;
  }

  get position(): string {
    return this.config.position!;
  }

  set style(value: any) {
    if (value) {
      this._style = { ...value };
      this.originalStyle = value;
    }
  }

  get parent(): Element | undefined {
    const domElements = Array.from(
      this.document.getElementsByClassName('p-dialog')
    );
    if (domElements.length > 1) {
      return domElements.pop();
    }
    return undefined;
  }

  get header() {
    return this.config.header;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
    private cd: ChangeDetectorRef,
    public renderer: Renderer2,
    public config: DialogDynamicModel,
    private dialogRef: DialogDynamicRef,
    public zone: NgZone,
    public primeNGConfig: PrimeNGConfig,
    @SkipSelf() @Optional() private parentDialog: DialogDynamicComponent
  ) {}

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType!);
    this.ariaLabelledBy = this.getAriaLabelledBy();
    this.cd.detectChanges();
  }

  getAriaLabelledBy() {
    return this.header !== null ? UniqueComponentId() + '_header' : undefined;
  }

  loadChildComponent(componentType: Type<any>) {
    let viewContainerRef = this.insertionPoint?.viewContainerRef;
    viewContainerRef?.clear();

    this.componentRef = viewContainerRef?.createComponent(componentType);
  }

  moveOnTop() {
    if (this.config.autoZIndex !== false) {
      ZIndexUtils.set(
        'modal',
        this.container,
        (this.config.baseZIndex || 0) + this.primeNGConfig.zIndex.modal
      );
      (this.wrapper as HTMLElement).style.zIndex = String(
        parseInt((this.container as HTMLDivElement).style.zIndex, 10) - 1
      );
    }
  }

  onAnimationStart(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
        this.container = event.element;
        this.wrapper = (this.container as HTMLDivElement).parentElement;
        this.moveOnTop();
        if (this.parent) {
          this.unbindGlobalListeners();
        }
        this.bindGlobalListeners();

        if (this.config.modal !== false) {
          this.enableModality();
        }
        this.focus();
        break;

      case 'void':
        if (this.wrapper && this.config.modal !== false) {
          DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
        }
        break;
    }
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.onContainerDestroy();
      this.dialogRef.destroy();
    }
  }

  onContainerDestroy() {
    this.unbindGlobalListeners();

    if (this.container && this.config.autoZIndex !== false) {
      ZIndexUtils.clear(this.container);
    }

    if (this.config.modal !== false) {
      this.disableModality();
    }
    this.container = null;
  }

  close() {
    this.visible = false;
    this.cd.markForCheck();
  }

  hide() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  enableModality() {
    if (this.config.closable !== false && this.config.dismissableMask) {
      this.maskClickListener = this.renderer.listen(
        this.wrapper,
        'mousedown',
        (event: any) => {
          if (this.wrapper && this.wrapper.isSameNode(event.target)) {
            this.hide();
          }
        }
      );
    }

    if (this.config.modal !== false) {
      DomHandler.addClass(this.document.body, 'p-overflow-hidden');
    }
  }

  disableModality() {
    if (this.wrapper) {
      if (this.config.dismissableMask) {
        this.unbindMaskClickListener();
      }

      if (this.config.modal !== false) {
        DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
      }

      if (!(this.cd as ViewRef).destroyed) {
        this.cd.detectChanges();
      }
    }
  }

  onKeydown(event: KeyboardEvent) {
    // tab
    if (event.which === 9) {
      event.preventDefault();

      let focusableElements = DomHandler.getFocusableElements(
        this.container as HTMLDivElement
      );
      if (focusableElements && focusableElements.length > 0) {
        if (!focusableElements[0].ownerDocument.activeElement) {
          focusableElements[0].focus();
        } else {
          let focusedIndex = focusableElements.indexOf(
            focusableElements[0].ownerDocument.activeElement
          );

          if (event.shiftKey) {
            if (focusedIndex == -1 || focusedIndex === 0)
              focusableElements[focusableElements.length - 1].focus();
            else focusableElements[focusedIndex - 1].focus();
          } else {
            if (
              focusedIndex == -1 ||
              focusedIndex === focusableElements.length - 1
            )
              focusableElements[0].focus();
            else focusableElements[focusedIndex + 1].focus();
          }
        }
      }
    }
  }

  focus() {
    const autoFocusElement = DomHandler.findSingle(
      this.container,
      '[autofocus]'
    );
    if (autoFocusElement) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => autoFocusElement.focus(), 5);
      });

      return;
    }

    const focusableElements = DomHandler.getFocusableElements(this.container as HTMLElement);
    if (focusableElements && focusableElements.length > 0) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => focusableElements[0].focus(), 5);
      });
    }
  }

  maximize() {
    this.maximized = !this.maximized;

    if (this.maximized) {
      DomHandler.addClass(this.document.body, 'p-overflow-hidden');
    } else {
      DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
    }

    this.dialogRef.maximize({ maximized: this.maximized });
  }

  initResize(event: MouseEvent) {
    if (this.config.resizable) {
      if (!this.documentResizeListener) {
        this.bindDocumentResizeListeners();
      }

      this.resizing = true;
      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
      DomHandler.addClass(this.document.body, 'p-unselectable-text');
      this.dialogRef.resizeInit(event);
    }
  }

  onResize(event: MouseEvent) {
    if (this.resizing) {
      let deltaX = event.pageX - (this.lastPageX as number);
      let deltaY = event.pageY - (this.lastPageY as number);
      let containerWidth = DomHandler.getOuterWidth(this.container);
      let containerHeight = DomHandler.getOuterHeight(this.container);
      let contentHeight = DomHandler.getOuterHeight(
        (<ElementRef>this.contentViewChild).nativeElement
      );
      let newWidth = containerWidth + deltaX;
      let newHeight = containerHeight + deltaY;
      let minWidth = (this.container as HTMLDivElement).style.minWidth;
      let minHeight = (this.container as HTMLDivElement).style.minHeight;
      let offset = (this.container as HTMLDivElement).getBoundingClientRect();
      let viewport = DomHandler.getViewport();
      let hasBeenDragged =
        !parseInt((this.container as HTMLDivElement).style.top) ||
        !parseInt((this.container as HTMLDivElement).style.left);

      if (hasBeenDragged) {
        newWidth += deltaX;
        newHeight += deltaY;
      }

      if (
        (!minWidth || newWidth > parseInt(minWidth)) &&
        offset.left + newWidth < viewport.width
      ) {
        this._style.width = newWidth + 'px';
        (this.container as HTMLDivElement).style.width = this._style.width;
      }

      if (
        (!minHeight || newHeight > parseInt(minHeight)) &&
        offset.top + newHeight < viewport.height
      ) {
        (<ElementRef>this.contentViewChild).nativeElement.style.height =
          contentHeight + newHeight - containerHeight + 'px';

        if (this._style.height) {
          this._style.height = newHeight + 'px';
          (this.container as HTMLDivElement).style.height = this._style.height;
        }
      }

      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
    }
  }

  resizeEnd(event: MouseEvent) {
    if (this.resizing) {
      this.resizing = false;
      DomHandler.removeClass(this.document.body, 'p-unselectable-text');
      this.dialogRef.resizeEnd(event);
    }
  }

  initDrag(event: MouseEvent) {
    if (
      DomHandler.hasClass(event.target, 'p-dialog-header-icon') ||
      DomHandler.hasClass(
        (<HTMLElement>event.target).parentElement,
        'p-dialog-header-icon'
      )
    ) {
      return;
    }

    if (this.config.draggable) {
      this.dragging = true;
      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;

      (this.container as HTMLDivElement).style.margin = '0';
      DomHandler.addClass(this.document.body, 'p-unselectable-text');
      this.dialogRef.dragStart(event);
    }
  }

  onDrag(event: MouseEvent) {
    if (this.dragging) {
      let containerWidth = DomHandler.getOuterWidth(this.container);
      let containerHeight = DomHandler.getOuterHeight(this.container);
      let deltaX = event.pageX - (this.lastPageX as number);
      let deltaY = event.pageY - (this.lastPageY as number);
      let offset = (this.container as HTMLDivElement).getBoundingClientRect();
      let leftPos = offset.left + deltaX;
      let topPos = offset.top + deltaY;
      let viewport = DomHandler.getViewport();

      (this.container as HTMLDivElement).style.position = 'fixed';

      if (this.keepInViewport) {
        if (leftPos >= this.minX && leftPos + containerWidth < viewport.width) {
          this._style.left = leftPos + 'px';
          this.lastPageX = event.pageX;
          (this.container as HTMLDivElement).style.left = leftPos + 'px';
        }

        if (topPos >= this.minY && topPos + containerHeight < viewport.height) {
          this._style.top = topPos + 'px';
          this.lastPageY = event.pageY;
          (this.container as HTMLDivElement).style.top = topPos + 'px';
        }
      } else {
        this.lastPageX = event.pageX;
        (this.container as HTMLDivElement).style.left = leftPos + 'px';
        this.lastPageY = event.pageY;
        (this.container as HTMLDivElement).style.top = topPos + 'px';
      }
    }
  }

  endDrag(event: MouseEvent) {
    if (this.dragging) {
      this.dragging = false;
      DomHandler.removeClass(this.document.body, 'p-unselectable-text');
      this.dialogRef.dragEnd(event);
      this.cd.detectChanges();
    }
  }

  resetPosition() {
    (this.container as HTMLDivElement).style.position = '';
    (this.container as HTMLDivElement).style.left = '';
    (this.container as HTMLDivElement).style.top = '';
    (this.container as HTMLDivElement).style.margin = '';
  }

  bindDocumentDragListener() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.documentDragListener = this.renderer.listen(
          this.document,
          'mousemove',
          this.onDrag.bind(this)
        );
      });
    }
  }

  bindDocumentDragEndListener() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.documentDragEndListener = this.renderer.listen(
          this.document,
          'mouseup',
          this.endDrag.bind(this)
        );
      });
    }
  }

  unbindDocumentDragEndListener() {
    if (this.documentDragEndListener) {
      this.documentDragEndListener();
      this.documentDragListener = null;
    }
  }

  unbindDocumentDragListener() {
    if (this.documentDragListener) {
      this.documentDragListener();
      this.documentDragListener = null;
    }
  }

  bindDocumentResizeListeners() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.documentResizeListener = this.renderer.listen(
          this.document,
          'mousemove',
          this.onResize.bind(this)
        );
        this.documentResizeEndListener = this.renderer.listen(
          this.document,
          'mouseup',
          this.resizeEnd.bind(this)
        );
      });
    }
  }

  unbindDocumentResizeListeners() {
    if (this.documentResizeListener && this.documentResizeEndListener) {
      this.documentResizeListener();
      this.documentResizeEndListener();
      this.documentResizeListener = null;
      this.documentResizeEndListener = null;
    }
  }

  bindGlobalListeners() {
    if (this.parentDialog) {
      this.parentDialog.unbindDocumentKeydownListener();
    }
    this.bindDocumentKeydownListener();

    if (this.config.closeOnEscape !== false && this.config.closable !== false) {
      this.bindDocumentEscapeListener();
    }

    if (this.config.resizable) {
      this.bindDocumentResizeListeners();
    }

    if (this.config.draggable) {
      this.bindDocumentDragListener();
      this.bindDocumentDragEndListener();
    }
  }

  unbindGlobalListeners() {
    this.unbindDocumentKeydownListener();
    this.unbindDocumentEscapeListener();
    this.unbindDocumentResizeListeners();
    this.unbindDocumentDragListener();
    this.unbindDocumentDragEndListener();

    if (this.parentDialog) {
      this.parentDialog.bindDocumentKeydownListener();
    }
  }

  bindDocumentKeydownListener() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.documentKeydownListener) {
        return;
      } else {
        this.zone.runOutsideAngular(() => {
          this.documentKeydownListener = this.renderer.listen(
            this.document,
            'keydown',
            this.onKeydown.bind(this)
          );
        });
      }
    }
  }

  unbindDocumentKeydownListener() {
    if (this.documentKeydownListener) {
      this.documentKeydownListener();
      this.documentKeydownListener = null;
    }
  }

  bindDocumentEscapeListener() {
    const documentTarget: any = this.maskViewChild
      ? this.maskViewChild.nativeElement.ownerDocument
      : 'document';

    this.documentEscapeListener = this.renderer.listen(
      documentTarget,
      'keydown',
      (event) => {
        if (event.which == 27) {
          if (
            parseInt((this.container as HTMLDivElement).style.zIndex) ==
            ZIndexUtils.getCurrent()
          ) {
            this.hide();
          }
        }
      }
    );
  }

  unbindDocumentEscapeListener() {
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
      this.documentEscapeListener = null;
    }
  }

  unbindMaskClickListener() {
    if (this.maskClickListener) {
      this.maskClickListener();
      this.maskClickListener = null;
    }
  }

  ngOnDestroy() {
    this.onContainerDestroy();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}

