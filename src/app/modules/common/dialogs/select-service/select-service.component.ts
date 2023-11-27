import { Component } from '@angular/core';
interface TabModel {
  index: number;
  name: string;
}

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss'],
})
export class SelectServiceComponent {
  activeIndex: number = 0;
  tabs: TabModel[] = [
    {index: 0, name: 'Pick-up'},
    {index: 1, name: 'Dine-in'},
    {index: 2, name: 'Delivery'},
  ];
  constructor() {}

  selectTab(index: number) {
    this.activeIndex = index;
  }
}
