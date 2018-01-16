/**
* Modelo que representa a un pedido.
* author: Jonnatan Ríos Vásquez- jrios328@gmail.com
*/

export class Order {
  id: number;
  deliveryDate: number;
  clientEmployee: number;
  initialSuggestedTime: string;
  finalSuggestedTime: string;
  additionalInformation: string;
  productsToOrder: Array<any>;
}
