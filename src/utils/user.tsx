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

export interface DataType {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  detail: string;
  date: string;
  time: string;
  location: string;
  quota: number;
  duration: number;
  ticket: string;
  price: number;
  image: any;
  hosted_by: string;
  participants: string;
  end_date: string;
}

export interface AddType extends DataType {
  details: string;
}

export interface dataTicket {
  type_name: string;
  price: number;
}

export interface DetailDataType {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  details: string;
  date: string;
  time: string;
  location: string;
  quota: number;
  duration: number;
  ticket: string;
  price: number;
  image: any;
  hosted_by: string;
  participants: [
    {
      name: string;
      image: string;
    }
  ];
  types: [
    {
      id: number;
      type_name: string;
      price: number;
    }
  ];
  comments: [
    {
      name: string;
      image: string;
      comment: string;
    }
  ];
}

export interface objAddType {
  event_id: number;
  comment: string;
}

export interface EventEditType {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  details: string;
  date: string;
  time: string;
  location: string;
  quota: number;
  duration: number;
  image: any;
  hosted_by: string;
  participants: string;
}

export interface DataEditTicketType {
  id: Number;
  type_name: string;
  price: number;
}

export interface DataAddTicketType {
  event_id: Number;
  type_name: string;
  type_price: number;
}

export interface MyEventType {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  detail: string;
  date: string;
  time: string;
  location: string;
  quota: number;
  duration: number;
  ticket: string;
  price: number;
  image: any;
  hosted_by: string;
  participants: string;
  end_date: string;
}

export interface Option {
  id: string;
  name: string;
  image: string;
}

export interface DataCartType {
  event_id: number;
  type_id: number;
  type_name: string;
  type_price: number;
  qty: number;
  sub_total: number;
}

export interface ModalInvoiceType {
  total: number;
  expire: string;
  payment_method: string;
  invoice: string;
  payment_code: string;
}

export interface DataInvoice {
  total: string;
  date: string;
  expire: string;
  payment_method: string;
  status: string;
  payment_code: string;
  item_details: [
    {
      name: string;
      price: number;
      qty: number;
      sub_total: number;
    }
  ];
}

export interface DataEvent {
  event_name: string;
  invoice: string;
}

export interface DataTicket {
  date: string;
  event_name: string;
  hosted_by: string;
  location: string;
  ticket_type: string;
}
