import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ILangModel } from '@app/modules/layout/components/nav/nav.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public loginForm!: UntypedFormGroup;
  public langs: ILangModel[] = [
    { label: 'English', id: 'en' },
    { label: 'Viet nam', id: 'vi' },
  ];
  public selectedLang: ILangModel;
  valCheck: string[] = ['remember'];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _translateService: TranslateService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.initLang();
    this.initForm();
  }

  public onChangeLang(langId: string) {
    this._translateService.use(langId);
    this.selectedLang =
      this.langs.find((lang) => lang.id === langId) || this.langs[0];
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this._router.navigate(['/home']);
    } else {
      return;
    }
  }

  private initLang(): void {
    if (!this.selectedLang) {
      this.onChangeLang(this.langs[0].id);
    }
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      isRemember: [false],
    });
  }
}
