/* Demo data for the admin / CRM. Replace with Supabase queries later. */

export interface AdminProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  fabric: string;
  price: number;
  mrp: number;
  stock: number;
  status: "active" | "draft" | "out_of_stock";
  image: string;
  palette: string[];
  sold: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment: "prepaid" | "cod";
  date: string;
  city: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  orders: number;
  spent: number;
  segment: "VIP" | "Loyal" | "New" | "At risk";
  lastOrder: string;
  joined: string;
}

const P = (palette: string[]) => palette;

export const products: AdminProduct[] = [
  { id: "p1", name: "Royal Kanjivaram Silk Saree", sku: "KS-KAN-001", category: "Kanjivaram", fabric: "Pure Silk", price: 12999, mrp: 18999, stock: 15, status: "active", image: "", palette: P(["#7a1739", "#c99a28"]), sold: 124 },
  { id: "p2", name: "Banarasi Silk Wedding Saree", sku: "KS-BAN-002", category: "Banarasi", fabric: "Banarasi Silk", price: 22999, mrp: 22999, stock: 8, status: "active", image: "", palette: P(["#961a43", "#e3b52f"]), sold: 256 },
  { id: "p3", name: "Pochampally Ikat Cotton Saree", sku: "KS-POC-003", category: "Pochampally", fabric: "Cotton", price: 2799, mrp: 4999, stock: 32, status: "active", image: "", palette: P(["#175557", "#d13c6b"]), sold: 89 },
  { id: "p4", name: "Gadwal Pattu Silk Saree", sku: "KS-GAD-004", category: "Gadwal", fabric: "Pure Silk", price: 5499, mrp: 8999, stock: 18, status: "active", image: "", palette: P(["#b82453", "#e3b52f"]), sold: 67 },
  { id: "p5", name: "Soft Linen Casual Saree", sku: "KS-LIN-005", category: "Linen", fabric: "Linen", price: 1999, mrp: 3499, stock: 0, status: "out_of_stock", image: "", palette: P(["#7c6752", "#d6c7b4"]), sold: 201 },
  { id: "p6", name: "Designer Organza Saree", sku: "KS-ORG-006", category: "Organza", fabric: "Organza", price: 6999, mrp: 10999, stock: 12, status: "active", image: "", palette: P(["#d13c6b", "#eccb52"]), sold: 43 },
  { id: "p7", name: "Handloom Cotton Khadi Saree", sku: "KS-COT-007", category: "Cotton", fabric: "Cotton", price: 1899, mrp: 1899, stock: 40, status: "active", image: "", palette: P(["#166b6d", "#eccb52"]), sold: 156 },
  { id: "p8", name: "Bridal Red Kanjivaram Saree", sku: "KS-KAN-008", category: "Kanjivaram", fabric: "Pure Silk", price: 29999, mrp: 42999, stock: 5, status: "active", image: "", palette: P(["#5e1430", "#c99a28"]), sold: 78 },
  { id: "p9", name: "Peacock Blue Silk Saree", sku: "KS-SIL-009", category: "Silk", fabric: "Pure Silk", price: 8499, mrp: 11999, stock: 0, status: "draft", image: "", palette: P(["#175557", "#37c2c0"]), sold: 0 },
];

export const orders: Order[] = [
  { id: "#KS1042", customer: "Priya Reddy", email: "priya.r@gmail.com", items: 2, total: 15798, status: "processing", payment: "prepaid", date: "2026-11-05", city: "Hyderabad" },
  { id: "#KS1041", customer: "Lakshmi Devi", email: "lakshmi.d@gmail.com", items: 1, total: 2799, status: "shipped", payment: "cod", date: "2026-11-05", city: "Warangal" },
  { id: "#KS1040", customer: "Sneha Kumar", email: "sneha.k@gmail.com", items: 3, total: 34997, status: "pending", payment: "prepaid", date: "2026-11-04", city: "Bengaluru" },
  { id: "#KS1039", customer: "Aarti Menon", email: "aarti.m@gmail.com", items: 1, total: 22999, status: "delivered", payment: "prepaid", date: "2026-11-04", city: "Chennai" },
  { id: "#KS1038", customer: "Divya Rao", email: "divya.rao@gmail.com", items: 2, total: 7498, status: "delivered", payment: "cod", date: "2026-11-03", city: "Vijayawada" },
  { id: "#KS1037", customer: "Meena R.", email: "meena.r@gmail.com", items: 1, total: 29999, status: "cancelled", payment: "prepaid", date: "2026-11-03", city: "Mumbai" },
  { id: "#KS1036", customer: "Kavya Nair", email: "kavya.n@gmail.com", items: 4, total: 11996, status: "shipped", payment: "prepaid", date: "2026-11-02", city: "Kochi" },
  { id: "#KS1035", customer: "Ritu Shah", email: "ritu.shah@gmail.com", items: 1, total: 5499, status: "delivered", payment: "cod", date: "2026-11-02", city: "Pune" },
  { id: "#KS1034", customer: "Priya Reddy", email: "priya.r@gmail.com", items: 1, total: 6999, status: "delivered", payment: "prepaid", date: "2026-10-31", city: "Hyderabad" },
  { id: "#KS1033", customer: "Anjali Verma", email: "anjali.v@gmail.com", items: 2, total: 4698, status: "delivered", payment: "cod", date: "2026-10-30", city: "Delhi" },
];

export const customers: Customer[] = [
  { id: "c1", name: "Priya Reddy", email: "priya.r@gmail.com", phone: "+91 98765 43210", city: "Hyderabad", orders: 8, spent: 92480, segment: "VIP", lastOrder: "2026-11-05", joined: "2025-02-14" },
  { id: "c2", name: "Sneha Kumar", email: "sneha.k@gmail.com", phone: "+91 90000 11223", city: "Bengaluru", orders: 5, spent: 61200, segment: "Loyal", lastOrder: "2026-11-04", joined: "2025-05-02" },
  { id: "c3", name: "Aarti Menon", email: "aarti.m@gmail.com", phone: "+91 91234 56780", city: "Chennai", orders: 4, spent: 54990, segment: "Loyal", lastOrder: "2026-11-04", joined: "2025-06-19" },
  { id: "c4", name: "Lakshmi Devi", email: "lakshmi.d@gmail.com", phone: "+91 99887 66554", city: "Warangal", orders: 3, spent: 12497, segment: "Loyal", lastOrder: "2026-11-05", joined: "2025-08-21" },
  { id: "c5", name: "Kavya Nair", email: "kavya.n@gmail.com", phone: "+91 98111 22334", city: "Kochi", orders: 2, spent: 18994, segment: "New", lastOrder: "2026-11-02", joined: "2026-09-30" },
  { id: "c6", name: "Meena R.", email: "meena.r@gmail.com", phone: "+91 97000 00001", city: "Mumbai", orders: 1, spent: 0, segment: "At risk", lastOrder: "2026-11-03", joined: "2026-10-10" },
  { id: "c7", name: "Divya Rao", email: "divya.rao@gmail.com", phone: "+91 96000 00002", city: "Vijayawada", orders: 3, spent: 21497, segment: "Loyal", lastOrder: "2026-11-03", joined: "2025-11-11" },
  { id: "c8", name: "Ritu Shah", email: "ritu.shah@gmail.com", phone: "+91 95000 00003", city: "Pune", orders: 2, spent: 10998, segment: "New", lastOrder: "2026-11-02", joined: "2026-08-05" },
];

/** Monthly revenue (₹) for the last 12 months. */
export const revenueSeries = [
  { month: "Dec", value: 310000 }, { month: "Jan", value: 365000 }, { month: "Feb", value: 420000 },
  { month: "Mar", value: 398000 }, { month: "Apr", value: 455000 }, { month: "May", value: 510000 },
  { month: "Jun", value: 478000 }, { month: "Jul", value: 540000 }, { month: "Aug", value: 605000 },
  { month: "Sep", value: 690000 }, { month: "Oct", value: 742000 }, { month: "Nov", value: 318000 },
];

export const categorySplit = [
  { label: "Kanjivaram", value: 34 },
  { label: "Banarasi", value: 24 },
  { label: "Cotton", value: 18 },
  { label: "Pochampally", value: 12 },
  { label: "Others", value: 12 },
];

export const stats = {
  revenue: 742000,
  revenueDelta: 7.5,
  orders: 1284,
  ordersDelta: 12.3,
  customers: 3120,
  customersDelta: 5.1,
  aov: 5780,
  aovDelta: -2.4,
};
