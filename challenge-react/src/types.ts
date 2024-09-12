export interface DonationState {
  donate: number;
  message: string;
}

export interface DonationAction {
  type: string;
  amount?: number;
  message?: string;
}

export interface Charity {
  id: number;
  name: string;
  image: string;
  currency: string;
}

export interface Payment {
  id: number;
  charitiesId: number;
  amount: number;
  currency: string;
}

export interface AppProps {
  donate: number;
  message: string;
  updateTotalDonations?: (amount: number) => void;
}

export interface AppState {
  charities: Charity[];
  selectedAmount: number;
}
