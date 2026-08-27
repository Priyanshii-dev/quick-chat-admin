import { ContactInquiry } from "../types/contact.types";

const mockInquiries: ContactInquiry[] = [
  {
    id: "1",
    name: "Rahul Verma",
    email: "rahul@example.com",
    subject: "Business Partnership & Ad Inquiry",
    message: "Hello team, I would like to inquire about banner advertising options on QuietChat app.",
    status: "New",
    createdAt: "2026-08-27 10:15 AM",
  },
  {
    id: "2",
    name: "Simran Kaur",
    email: "simran@gmail.com",
    subject: "Account verification query",
    message: "Hi, how long does account verification take for profile badges?",
    status: "Replied",
    createdAt: "2026-08-26 04:30 PM",
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit.p@outlook.com",
    subject: "Feedback on QuietChat app UI",
    message: "The new dark yellow theme looks amazing! Keep up the great work.",
    status: "New",
    createdAt: "2026-08-25 02:20 PM",
  },
];

export const contactService = {
  getInquiries: async (): Promise<ContactInquiry[]> => {
    return Promise.resolve(mockInquiries);
  },
  deleteInquiry: async (id: string): Promise<boolean> => {
    const idx = mockInquiries.findIndex((i) => i.id === id);
    if (idx !== -1) {
      mockInquiries.splice(idx, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },
  updateStatus: async (id: string, status: ContactInquiry["status"]): Promise<boolean> => {
    const item = mockInquiries.find((i) => i.id === id);
    if (item) {
      item.status = status;
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },
};
