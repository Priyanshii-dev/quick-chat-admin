export type LoginEvent = {
  user: string;
  email?: string;
  type?: "desktop" | "mobile" | "tablet";
  ip?: string;
  device: string;
  createdAt: string;
  location?: string;
};
