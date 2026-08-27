export interface Subscriber {
  id: string;
  email: string;
  source?: string;
  status: "Subscribed" | "Unsubscribed" | "Bounced";
  subscribedAt: string;
}
