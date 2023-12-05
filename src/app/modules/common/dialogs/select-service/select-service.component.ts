import { Component, OnInit } from '@angular/core';
import { BranchModel, TabModel } from './select-service.model';
import { BranchServiceService } from '@services/branch-service.service';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss'],
})
export class SelectServiceComponent implements OnInit {
  activeIndex: number = 0;
  tabs: TabModel[] = [
    { index: 0, name: 'Pick-up' },
    { index: 1, name: 'Dine-in' },
    { index: 2, name: 'Delivery' },
  ];

  branchSelected: number = 1;
  branches: BranchModel[] = [
    {
      id: 0,
      img: '',
      name: '1. Duy Tran - Da Nang',
      address: '416 Nguyen Van Linh, Da nang',
      closedTime: new Date(),
    },
    {
      id: 1,
      img: '',
      name: '2. Duy Tran - Da Nang',
      address: '416 Nguyen Van Linh, Da nang',
      closedTime: new Date(),
    },
    {
      id: 2,
      img: '',
      name: '3. Duy Tran - Da Nang',
      address: '416 Nguyen Van Linh, Da nang',
      closedTime: new Date(),
    },
  ];
  constructor(private branchService: BranchServiceService) {}

  ngOnInit(): void {
    this.branchService
      .getBranches('f66941a1-fefb-40e7-b1fc-4bb2676e1bbe')
      .subscribe((response: any) => {
        next: console.log(response);
      });
  }

  selectTab(index: number) {
    this.activeIndex = index;
  }
}
