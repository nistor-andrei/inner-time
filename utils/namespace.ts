export interface UserDetails {
  confirmed_appointments: number;
  created_at: string;
  id: string;
  total_appointments: number;
  total_clients: number;
  unconfirmed_appointments: number;
  user_id: string;
}

export interface Appointments {
  appointment_date: string;
  client_name: string;
  confirmed: boolean;
  created_at: string;
  id: string;
  user_id: string;
}

export interface Response<T, K> {
  data: T;
  error: K;
}
