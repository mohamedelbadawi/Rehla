import { tripData } from "@/create-trip/helper";
import { User } from "./user";

export interface HotelOption {
  name?: string;
  address?: string;
  rate?: number;
  price?: string;
  imageUrl?: string;
  description?: string;
}

interface Plan {
  name?: string;
  details?: string;
  imageUrl?: string;
  rating?: number;
  time?: string;
}

export interface Itinerary {
  day?: string;
  bestTimeToVisit?: string;
  plan?: Plan[];
}

export interface trip {
  hotelOptions?: string;
  itinerary?: Itinerary[];
}
export interface TripDocument {
  id?: string;
  tripData?: string;
  user?: User;
  userChoice?: tripData;
}
