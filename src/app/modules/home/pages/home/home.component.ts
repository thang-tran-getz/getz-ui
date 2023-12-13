import { Component } from '@angular/core';
import {
  ISlideModel,
  ISlidePartialModel,
} from '../../components/slide/slide.model';
import { HomeService } from '@app/shared/services/home.service';
import { IBaseResponse } from '@app/shared/models/base-response.model';
import { IHomeDataRequest } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  slideHeaders: ISlidePartialModel[] = [];
  slideFooters: ISlidePartialModel[] = [];

  constructor(private _homeService: HomeService) {}

  ngOnInit(): void {
    this._homeService
      .fetchSlideImages()
      .subscribe((response: IBaseResponse<ISlideModel>) => {
        const { arraySlideHeader, arraySlideFooter } = response.data;
        this.slideHeaders = arraySlideHeader.sort((item) => item.priority);
        this.slideFooters = arraySlideFooter.sort((item) => item.priority);
      });

    const data: IHomeDataRequest = {
      id: null,
      cardNo: null,
      isRedeem: null,
      keyPartner: null,
      lang: null,
      loginToken: null,
      logoImg: null,
      os: null,
      phone: null,
      Postal: null,
      previewtheme: null,
      Service: null,
      srcag: null,
      StoreID: null,
      suId: null,
      templateType: null,
      theme: null,
      urlImages: null,
      utm_campaign: null,
      utm_medium: null,
      utm_source: null,
    };
    this._homeService.fetchHomeData(data).subscribe((response) => {
      console.log(response.data);
    });
  }
}
