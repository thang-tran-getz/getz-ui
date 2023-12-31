import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { ILangModel, IThemeModel } from './nav.model';
import { AppService } from '@app/app.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public items: MenuItem[];
  public themes: IThemeModel[];
  public selectedTheme: IThemeModel;

  public langs: ILangModel[];
  public selectedLang: ILangModel;

  constructor(
    private _appService: AppService,
    private _translateService: TranslateService
  ) {
    _translateService.addLangs(['en', 'vi']);
    _translateService.setDefaultLang('en');
    this.themes = [
      { label: 'Saga blue', id: 'saga-blue' },
      { label: 'Saga green', id: 'saga-green' },
      { label: 'Saga orange', id: 'saga-orange' },
      { label: 'Saga purple', id: 'saga-purple' },
    ];

    this.selectedTheme = {
      label: 'Saga blue',
      id: 'saga-blue',
    };

    this.langs = [
      { label: 'English', id: 'en' },
      { label: 'Viet nam', id: 'vi' },
    ];

    this.selectedLang = {
      id: 'EN',
      label: 'English',
    };

    this.items = [
      {
        label: 'Home',
        routerLink: '/home',
      },
      {
        label: 'Menu',
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
        label: 'About',
        routerLink: '/about',
      },
    ];
  }

  ngOnInit() {
    this._translateService.setDefaultLang('en');
  }

  public onChangeTheme(themeId: string) {
    this._appService.switchTheme(themeId);
    this.selectedTheme =
      this.themes.find((_) => _.id === themeId) || this.themes[0];
  }

  public onChangeLang(langId: string) {
    this._translateService.use(langId);
    this.selectedLang =
      this.langs.find((_) => _.id === langId) || this.langs[0];

  }
}
