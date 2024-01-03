import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { delay } from 'rxjs';
import { LoadingService } from './modules/layout/services/loading.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'getz-ui';
  loading: boolean = false;

  constructor(
    private _messageService: MessageService,
    private _loading: LoadingService,
    private _translateService: TranslateService
  ) {
    this._translateService.addLangs(['en', 'vi']);
  }

  ngOnInit(): void {
    this.listenToLoading();
  }

  show() {
    this._messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  listenToLoading(): void {
    this._loading.loadingSub$.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
    });
  }
}
