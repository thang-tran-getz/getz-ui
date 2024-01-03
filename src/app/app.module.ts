import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';
import { PascalToCamelInterceptor } from './cores/interceptors/pascal-to-camel.interceptor';
import { NgxsModule } from '@ngxs/store';
import { CategoryState } from './store/states/category.state';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpTranslateLoaderFactory } from './cores/extend/translation-loader';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ToastModule,
    MessagesModule,
    SharedModule,
    HttpClientModule,
    ProgressSpinnerModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxsModule.forRoot([CategoryState]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PascalToCamelInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
