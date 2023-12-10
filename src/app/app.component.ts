import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { delay } from 'rxjs';
import { LoadingService } from '@shared/services/loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'getz-ui';
  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    private _loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.listenToLoading();
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  listenToLoading(): void {
    this._loading.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
    });
  }
}
