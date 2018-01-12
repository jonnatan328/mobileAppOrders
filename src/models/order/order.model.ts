export class Order {
  id: number;
  deliveryDate: number;
  clientEmployee: number;
  initialSuggestedTime: string;
  finalSuggestedTime: string;
  additionalInformation: string;
  productsToOrder: Array<any>;
}
