export type StoreLocation = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  coordinates: [number, number];
};

// Replace these launch placeholders with final retail addresses and coordinates.
export const storeLocations: StoreLocation[] = [
  {
    id: "los-angeles",
    name: "Los Angeles Launch Area",
    address: "Retail partners coming soon",
    city: "Los Angeles",
    state: "CA",
    zip: "90012",
    coordinates: [34.0522, -118.2437],
  },
  {
    id: "new-york",
    name: "New York Launch Area",
    address: "Retail partners coming soon",
    city: "New York",
    state: "NY",
    zip: "10007",
    coordinates: [40.7128, -74.006],
  },
  {
    id: "miami",
    name: "Miami Launch Area",
    address: "Retail partners coming soon",
    city: "Miami",
    state: "FL",
    zip: "33130",
    coordinates: [25.7617, -80.1918],
  },
  {
    id: "austin",
    name: "Austin Launch Area",
    address: "Retail partners coming soon",
    city: "Austin",
    state: "TX",
    zip: "78701",
    coordinates: [30.2672, -97.7431],
  },
];
