export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "New" | "Replied" | "Pending" | "Closed";
  createdAt: string;
}
