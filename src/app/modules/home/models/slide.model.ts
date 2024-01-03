export interface ISlideModel {
  arraySlideHeader: ISlidePartialModel[];
  arraySlideFooter: ISlidePartialModel[];
}

export interface ISlidePartialModel {
  id: string;
  name: string;
  isBannerHeader: boolean;
  priority: number;
  urlImage: string;
  size: number;
  status: number;
  targetLink: string;
  showDesktop: boolean;
  showMobile: boolean;
}
