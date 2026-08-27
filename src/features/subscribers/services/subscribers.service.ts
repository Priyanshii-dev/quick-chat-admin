import { Subscriber } from "../types/subscribers.types";

const mockSubscribers: Subscriber[] = [
  {
    id: "1",
    email: "priya.sharma@gmail.com",
    source: "Landing Page Hero",
    status: "Subscribed",
    subscribedAt: "2026-08-27",
  },
  {
    id: "2",
    email: "rohit.verma@yahoo.com",
    source: "Blog Sidebar",
    status: "Subscribed",
    subscribedAt: "2026-08-25",
  },
  {
    id: "3",
    email: "contact@company.org",
    source: "Footer Form",
    status: "Subscribed",
    subscribedAt: "2026-08-22",
  },
  {
    id: "4",
    email: "dev.user@test.io",
    source: "Popup Banner",
    status: "Unsubscribed",
    subscribedAt: "2026-08-10",
  },
];

export const subscribersService = {
  getSubscribers: async (): Promise<Subscriber[]> => {
    return Promise.resolve(mockSubscribers);
  },
  addSubscriber: async (data: Partial<Subscriber>): Promise<Subscriber> => {
    const newSub: Subscriber = {
      id: String(Date.now()),
      email: data.email || "",
      source: data.source || "Website Footer",
      status: data.status || "Subscribed",
      subscribedAt: new Date().toISOString().split("T")[0],
    };
    mockSubscribers.unshift(newSub);
    return Promise.resolve(newSub);
  },
  deleteSubscriber: async (id: string): Promise<boolean> => {
    const idx = mockSubscribers.findIndex((s) => s.id === id);
    if (idx !== -1) {
      mockSubscribers.splice(idx, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },
};
