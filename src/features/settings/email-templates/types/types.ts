export type EmailTemplate = {
  id: string;
  name: string;
  from: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  status: "Active" | "Draft";
};
