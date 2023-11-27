import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFrameComponent } from './dialog-frame.component';

describe('DialogFrameComponent', () => {
  let component: DialogFrameComponent;
  let fixture: ComponentFixture<DialogFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFrameComponent]
    });
    fixture = TestBed.createComponent(DialogFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
