export class FetchProduct {
  static readonly type = '[Product] Fetch product';
  constructor(public payload: { merchantId: string }) {}
}
