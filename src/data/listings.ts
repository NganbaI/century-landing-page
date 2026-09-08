export type Listing = {
  id: number;
  image: string;
  tag: "House" | "Villa";
  /* The Figma frame ships a single "All" state, so the tab control needs a
     grouping the design does not draw. Tag stays exactly as designed. */
  category: "residential" | "commercial";
  name: string;
  location: string;
  detail: string;
};

export const LISTINGS: Listing[] = [
  {
    id: 1,
    image: "/assets/listing-1.png",
    tag: "House",
    category: "residential",
    name: "Canyon Ridge House with Mountain Views",
    location: "Indiranagar",
    detail: "Luxury 4 Bed Villas",
  },
  {
    id: 2,
    image: "/assets/listing-2.png",
    tag: "Villa",
    category: "residential",
    name: "Canyon Ridge House with Mountain Views",
    location: "Indiranagar",
    detail: "Luxury 4 Bed Villas",
  },
  {
    id: 3,
    image: "/assets/listing-3.png",
    tag: "House",
    category: "commercial",
    name: "Canyon Ridge House with Mountain Views",
    location: "Indiranagar",
    detail: "Luxury 4 Bed Villas",
  },
  {
    id: 4,
    image: "/assets/listing-4.png",
    tag: "Villa",
    category: "residential",
    name: "Canyon Ridge House with Mountain Views",
    location: "Indiranagar",
    detail: "Luxury 4 Bed Villas",
  },
  {
    id: 5,
    image: "/assets/listing-5.png",
    tag: "House",
    category: "residential",
    name: "Canyon Ridge House with Mountain Views",
    location: "Indiranagar",
    detail: "Luxury 4 Bed Villas",
  },
  {
    id: 6,
    image: "/assets/listing-6.png",
    tag: "House",
    category: "commercial",
    name: "Canyon Ridge House with Mountain Views",
    location: "Indiranagar",
    detail: "Luxury 4 Bed Villas",
  },
];
