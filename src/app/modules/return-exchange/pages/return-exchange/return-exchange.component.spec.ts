import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnExchangeComponent } from './return-exchange.component';

describe('ReturnExchangeComponent', () => {
  let component: ReturnExchangeComponent;
  let fixture: ComponentFixture<ReturnExchangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnExchangeComponent]
    });
    fixture = TestBed.createComponent(ReturnExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
