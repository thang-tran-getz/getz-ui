export class FetchCategory {
  static readonly type = '[Category] Fetch category';
  constructor(public payload: { merchantId: string }) {}
}
