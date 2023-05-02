export interface objLoginType {
  email: string;
  password: string;
}

export interface objRegisterType {
  name: string;
  email: string;
  password: string;
  address: string;
}

export interface UserEdit {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  image: any;
}
