export interface MyAssetResponse {
  error?: any;
  data: Datum[];
  count?: any;
  status: number;
  statusText: string;
}

interface Datum {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  Transaction: Transaction[];
}

interface Transaction {
  orderId: string;
  createdAt: string;
  updatedAt: string;
  PaymentSessions: PaymentSessions;
}

interface PaymentSessions {
  status: string;
  amountOut: number;
  token: string;
  paymentAmount: number;
  paymentCurrency: string;
  txnHash: string;
}
