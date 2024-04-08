export type InvoiceItem = {
  Id: string;
  itemName: string;
  quantity: number;
  price: number;
  amount: number;
};

export type InvoiceBillSundry = {
  Id: string;
  billSundryName: string;
  amount: string;
};

export type Invoice = {
  Id: string;
  Date: string;
  InvoiceNumber: number;
  CustomerName: string;
  BillingAddress: string;
  ShippingAddress: string;
  GSTIN: string;
  Items: InvoiceItem[];
  BillSundrys: InvoiceBillSundry[];
  TotalAmount: number;
};
