import { Component } from '@angular/core';
import {
  ISlideModel,
  ISlidePartialModel,
} from '../../models/slide.model';
import { HomeService } from '@app/modules/home/services/home.service';
import { IBaseResponseModel } from '@app/cores/models/base-response.model';
import { IHomeDataRequest } from '../../models/home.model';

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
      .subscribe((response: IBaseResponseModel<ISlideModel>) => {
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
