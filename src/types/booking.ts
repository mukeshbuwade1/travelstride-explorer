
export interface Traveler {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
}

export interface ContactDetails {
  countryCode: string;
  phone: string;
  email: string;
  specialRequest: string;
  customizePlan: boolean;
}

export interface PackageDetails {
  id: number;
  name: string;
  duration: string;
  price: number;
}
