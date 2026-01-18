export interface Payment {
  payment_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

export interface PaymentsResponse {
  total: number;
  payments: Payment[];
}
