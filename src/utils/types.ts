export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  type: string;
  description: string;
  image: string;
}

export interface IProductInCart {
  id: string;
  quantity: number;
}
