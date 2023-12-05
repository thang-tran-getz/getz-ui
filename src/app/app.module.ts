import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { ButtonModule } from 'primeng/button';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/not-found/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    LayoutModule,
    ToastModule,
    MessagesModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
