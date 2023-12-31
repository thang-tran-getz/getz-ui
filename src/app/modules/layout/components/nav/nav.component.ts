import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { ILangModel, IThemeModel } from './nav.model';
import { AppService } from '@app/app.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public items: MenuItem[] = [];
  public themes: IThemeModel[] = [
    { label: 'Saga green', id: 'saga-green' },
    { label: 'Saga blue', id: 'saga-blue' },
    { label: 'Saga orange', id: 'saga-orange' },
    { label: 'Saga purple', id: 'saga-purple' },
  ];
  public langs: ILangModel[] = [
    { label: 'English', id: 'en' },
    { label: 'Viet nam', id: 'vi' },
  ];
  public selectedTheme: IThemeModel;
  public selectedLang: ILangModel;

  constructor(
    private _appService: AppService,
    private _translateService: TranslateService
  ) {
    _translateService.addLangs(['en', 'vi']);
  }

  ngOnInit(): void {
    this.translateMenuItems();
    if (!this.selectedLang) {
      this.onChangeLang(this.langs[0].id);
    }
    if (!this.selectedTheme) {
      this.onChangeTheme(this.themes[0].id);
    }
  }

  public onChangeTheme(themeId: string) {
    this._appService.switchTheme(themeId);
    this.selectedTheme = this.themes.find((theme) => theme.id === themeId) || this.themes[0];
  }

  public onChangeLang(langId: string) {
    this._translateService.use(langId);
    this.selectedLang = this.langs.find((lang) => lang.id === langId) || this.themes[0];
    this.translateMenuItems();
  }

  private translateMenuItems() {
    this._translateService
      .get('menuBar')
      .subscribe((result: { [key: string]: string }) => {
        this.items = [
          {
            label: result['home'],
            routerLink: '/home',
          },
          {
            label: result['menu'],
            routerLink: '/menu',
            items: [
              {
                label: 'Category 1',
                icon: 'pi pi-fw pi-align-left',
                routerLink: '/home',
              },
              {
                label: 'Category 2',
                icon: 'pi pi-fw pi-align-right',
                routerLink: '/home',
              },
              {
                label: 'Category 3',
                icon: 'pi pi-fw pi-align-center',
                routerLink: '/home',
              },
              {
                label: 'Category 4',
                icon: 'pi pi-fw pi-align-justify',
                routerLink: '/home',
              },
            ],
          },
          {
            label: result['about'],
            routerLink: '/about',
          },
        ];
      });
  }
}
