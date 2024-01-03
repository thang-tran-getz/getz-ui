import { Component } from '@angular/core';
import { SelectServiceComponent } from '../dialogs/select-service/select-service.component';
import { DialogDynamicService } from '../dialogs/dialog-dynamic.service';
import { DialogDynamicRef } from '../dialogs/dialog-dynamic-ref';
import { HomeService } from '@app/modules/home/services/home.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent {
  loading = false;
  dialogDynamicRef: DialogDynamicRef | null;

  constructor(private _dialogService: DialogDynamicService,
    private _homeService: HomeService) {}

  load() {
    this.loading = true;
    setTimeout(() => (this.loading = false), 1000);
  }

  selectServices() {
    this.dialogDynamicRef = this._dialogService.open(SelectServiceComponent, {
      header: 'SELECT YOUR DESIRED SERVICE',
      data: { message: 'I am a dynamic component inside of a dialog!' },
      width: '60%',
      contentStyle: { overflow: 'auto' },
      backable: true,
    });

    this.dialogDynamicRef?.onClose.subscribe((result) => {
      console.log('Dialog closed', result);
      this._homeService.signUp().subscribe(response => {
        console.log(response);
      });
    });
  }
}
