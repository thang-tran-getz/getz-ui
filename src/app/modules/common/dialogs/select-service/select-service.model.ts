export interface ITabModel {
  index: number;
  name: string;
}

export interface IBranchModel {
  bucket: string;
  index: number;
  originalAddress: string;
  originalAddress2: string;
  address: string;
  address2: string;
  addressCombine: string;
  businessID: string;
  description: string;
  lat: number;
  lon: number;
  phone: string;
  zipCode: string;
  enablePickup: boolean;
  enableDelivery: boolean;
  enableStationOrdering: boolean;
  enableReservation: boolean;
  defaultStationId: string;
  isToday: boolean;
  timeZone: string;
  isBlockoutPickup: boolean;
  endDatePickupString: string;
  isCloseToDay: boolean;
}

export interface IChangBranchResponse {
  success: boolean
  isExistedItemHide: boolean
  listProductInvalid: any
  currentService: number
  stepShowCalendar: number
  currentDate: string
  timeselected: string
  deliveryTime: number
  settingTime: ISettingTime
  listAvailableTimes: IAvailableTime[]
  preparationTime: number
  settingBlockOut: any[]
  autoCollectDate: string
  autoCollectTime: string
  isAutoRedirect: boolean
  autoRedirectType: number
  blockOuts: any[]
  outletAvailableTimes: IAvailableTime[]
  serviceTitle: string
  postalCode: string
  outletTitle: string
  outletAddress: string
  outletIndex: number
  outletId: string
}

export interface ISettingTime {
  docId: string
  BranchId: string
  BranchName: string
  AddressCombine: any
  BranchIndex: number
  status: boolean
  allowAutoAcceptOrder: boolean
  prepareTime: string
  arrayDayOfWeekSetting: IArrayDayOfWeekSetting[]
  allowSound: boolean
  allowPushNotification: boolean
  allowSendEmail: boolean
  allowSendSMS: boolean
  limitNumberOrder: number
  isDisableExtendBlockTime: boolean
}

export interface IArrayDayOfWeekSetting {
  dayOfWeek: number
  option: number
  split_OpeningStart: string
  split_OpeningEnd: string
  split_ClosingStart: string
  split_ClosingEnd: string
  open_Opening: string
  open_Closing: string
}

export interface IAvailableTime {
  dayOfWeek: number
  itemAvailableTimes: string
  begin_time: string
  beginDateTime: string
  endDateTime: string
  end_time: string
  arrayAvailableTimeBlockout: string
}
