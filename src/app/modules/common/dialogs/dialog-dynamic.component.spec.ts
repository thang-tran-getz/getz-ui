import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDynamicComponent } from './dialog-dynamic.component';

describe('DialogDynamicComponent', () => {
  let component: DialogDynamicComponent;
  let fixture: ComponentFixture<DialogDynamicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDynamicComponent]
    });
    fixture = TestBed.createComponent(DialogDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
