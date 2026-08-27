export type Subscriber = {
  email: string;
  status: string;
  subscribedAt?: string;
};
export type SubscriberSummary = { items: Subscriber[]; total: number };
