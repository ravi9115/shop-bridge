export interface IProductModel {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  discount: number;
}

export interface ProductDTO {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  discount: number;
}

export class ProductModel implements IProductModel {
  public id;
  public name;
  public description;
  public price;
  public quantity;
  public discount;

  constructor(json: IProductModel) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.price = json.price;
    this.quantity = json.quantity;
    this.discount = json.discount;
  }

  public static fromArray(arr: IProductModel[]): any {
    return arr.map(product => new ProductModel(product));
  }
}
