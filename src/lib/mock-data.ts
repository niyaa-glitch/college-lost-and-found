export type ItemStatus = "lost" | "found" | "claimed";
export type ItemCategory = "electronics" | "books" | "clothing" | "accessories" | "documents" | "keys" | "other";

export interface Item {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
  location: string;
  date: string;
  contactEmail: string;
  imageUrl?: string;
}

export const categories: { value: ItemCategory; label: string }[] = [
  { value: "electronics", label: "Electronics" },
  { value: "books", label: "Books & Notes" },
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
  { value: "documents", label: "Documents" },
  { value: "keys", label: "Keys" },
  { value: "other", label: "Other" },
];

export const locations = [
  "Library",
  "Cafeteria",
  "Main Building",
  "Computer Lab",
  "Sports Ground",
  "Parking Area",
  "Auditorium",
  "Hostel Block A",
  "Hostel Block B",
];

export const mockItems: Item[] = [
  {
    id: "1",
    title: "Blue Backpack",
    description: "Navy blue backpack with laptop compartment. Has a small tear on the right pocket.",
    category: "accessories",
    status: "lost",
    location: "Library",
    date: "2026-03-31",
    contactEmail: "rahul@college.edu",
  },
  {
    id: "2",
    title: "iPhone Charger",
    description: "White Apple lightning cable with 20W adapter brick.",
    category: "electronics",
    status: "found",
    location: "Computer Lab",
    date: "2026-04-01",
    contactEmail: "priya@college.edu",
  },
  {
    id: "3",
    title: "Data Structures Textbook",
    description: "Cormen CLRS book, 3rd edition. Name written on first page.",
    category: "books",
    status: "found",
    location: "Cafeteria",
    date: "2026-04-02",
    contactEmail: "amit@college.edu",
  },
  {
    id: "4",
    title: "Black Hoodie",
    description: "Plain black hoodie, size L. Left in the auditorium after the cultural event.",
    category: "clothing",
    status: "lost",
    location: "Auditorium",
    date: "2026-04-01",
    contactEmail: "sneha@college.edu",
  },
  {
    id: "5",
    title: "Student ID Card",
    description: "College ID card belonging to CS department. Found near the parking lot.",
    category: "documents",
    status: "found",
    location: "Parking Area",
    date: "2026-04-02",
    contactEmail: "vikram@college.edu",
  },
  {
    id: "6",
    title: "Bunch of Keys",
    description: "3 keys on a red keychain with a small teddy bear charm.",
    category: "keys",
    status: "lost",
    location: "Sports Ground",
    date: "2026-03-30",
    contactEmail: "ananya@college.edu",
  },
];
