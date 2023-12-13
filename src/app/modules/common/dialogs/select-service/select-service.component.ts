import { Component, Input, OnInit } from '@angular/core';
import {
  IBranchModel,
  IChangBranchResponse,
  ITabModel,
} from './select-service.model';
import { BranchService } from '@app/shared/services/branch.service';
import { IBaseResponse } from '@shared/models/base-response.model';
import { DialogDynamicRef } from '../dialog-dynamic-ref';
import { DialogDynamicModel } from '../dialog-dynamic.model';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss'],
})
export class SelectServiceComponent implements OnInit {
  activeIndex: number = 0;
  tabs: ITabModel[] = [
    { index: 0, name: 'Pick-up' },
    { index: 1, name: 'Dine-in' },
    { index: 2, name: 'Delivery' },
  ];

  private _branchSelected: number = 1;

  set branchSelected(value: number) {
    this.selectBranch(value);
    this._branchSelected = value;
  }

  get branchSelected(): number {
    return this._branchSelected;
  }

  pickupBranches: IBranchModel[] = [];
  dineInBranches: IBranchModel[] = [];
  constructor(
    private _dialogDynamicRef: DialogDynamicRef,
    private _config: DialogDynamicModel,
    private _branchService: BranchService
  ) {}

  ngOnInit(): void {
    this._branchService
      .fetchBranches()
      .subscribe((response: IBaseResponse<IBranchModel[]>) => {
        console.log(this._config.data);
        this.pickupBranches = response.data.filter((_) => _.enablePickup);
        this.dineInBranches = response.data.filter(
          (_) => _.enableStationOrdering || _.enableReservation
        );
      });
  }

  selectTab(index: number) {
    this.activeIndex = index;
  }

  selectBranch(index: number): void {
    switch (this.activeIndex) {
      case 0:
        this.selectBranchPickup(index);
        break;
      case 1:
        this.selectBranchDineIn(index);
        break;
      default:
        break;
    }
  }

  private selectBranchDineIn(index: number): void {
    this._branchService
      .clearSessionAnnouncement()
      .subscribe((response: IBaseResponse<any>) => {
        this._dialogDynamicRef.close(response);
      });
  }

  private selectBranchPickup(index: number): void {
    this._branchService
      .selectBranch(index, false)
      .subscribe((response: IBaseResponse<IChangBranchResponse>) => {
        this._dialogDynamicRef.close(response);
      });
  }
}
