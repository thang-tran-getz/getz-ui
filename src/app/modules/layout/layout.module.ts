import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from '@layout/pages/layout/layout.component';
import { HeaderComponent } from '@layout/components/header/header.component';
import { BodyComponent } from '@layout/components/body/body.component';
import { NavComponent } from '@layout/components/nav/nav.component';
import { FooterComponent } from '@layout/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpTranslateLoaderFactory } from '@app/cores/extend/translation-loader';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    BodyComponent,
    NavComponent,
    FooterComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    ToolbarModule,
    InputTextModule,
    MenubarModule,
    DropdownModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    LoaderComponent
  ]
})
export class LayoutModule {}
