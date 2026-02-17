export interface UserData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  month: string;
  year: string;
  cardType: string;
}

export interface FlightTestData {
  departure: string;
  destination: string;
  user: UserData;
}
