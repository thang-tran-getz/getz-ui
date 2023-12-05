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
  branches: any[] = [];
  constructor(private branchService: BranchServiceService) {}

  ngOnInit(): void {
    this.branchService
      .getBranches('be8100eb-0664-4214-8824-277d7a14f227')
      .subscribe((response: any) => {
        response.forEach((element: any) => {
          const branch = {
            id: element.index,
            img: '',
            name: element.businessID,
            address: element.address,
          };
          this.branches.push(branch);
        });
      });
  }

  selectTab(index: number) {
    this.activeIndex = index;
  }
}
