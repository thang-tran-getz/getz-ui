import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardItemComponent } from './reward-item.component';

describe('RewardItemComponent', () => {
  let component: RewardItemComponent;
  let fixture: ComponentFixture<RewardItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RewardItemComponent]
    });
    fixture = TestBed.createComponent(RewardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
