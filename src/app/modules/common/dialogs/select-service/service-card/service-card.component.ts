import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBranchModel } from '../select-service.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent {
  @Input({ required: true }) branch: IBranchModel;
  @Input() select: number;
  @Output('selectChange') changeBranchEvent = new EventEmitter<number>(); 
  constructor() {}

  onChangeBranch(id: number) {
    this.changeBranchEvent.emit(id);
  }
}
