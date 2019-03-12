export class Employee {
  id: number;
  uid: number;
  name: string;
  lastName: string;
  position: string;
  office: string;
  salary: number;
  favColor: string;
  pickUpDate: Date;
  deliveryDate: Date;
  city: string;
  istrusted: boolean;
  favBook: string;
  hobby: string;
  orders: any[];
}

export class Order {
  fro: string;
  pickUpAddress: string;
  deliveryAddress: string;
}
