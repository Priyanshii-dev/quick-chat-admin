import { z } from "zod";
import {
  requiredEmail,
  requiredNumber,
  requiredPincode,
  requiredPhoneInternational,
  requiredString,
} from "@/lib/validation";

export const generalSettingsSchema = z.object({
  websiteName: requiredString("Website name"),
  email: requiredEmail(),
  mobileNo: requiredPhoneInternational("Mobile number"),
  whatsappNumber: requiredPhoneInternational("WhatsApp number"),
  city: requiredString("City"),
  state: requiredString("State"),
  zip: requiredPincode("ZIP code"),
  country: requiredString("Country"),
  address: requiredString("Address"),
  bankName: requiredString("Bank name"),
  accountHolderName: requiredString("Account holder name"),
  accountNumber: requiredNumber("Account number"),
  ifscCode: requiredString("IFSC code"),
  facebookLink: requiredString("Facebook link"),
  instagramLink: requiredString("Instagram link"),
  twitterLink: requiredString("Twitter link"),
  linkedinLink: requiredString("LinkedIn link"),
  pinterestLink: requiredString("Pinterest link"),
  youtubeLink: requiredString("YouTube link"),
});

export type GeneralSettingsInput = z.infer<typeof generalSettingsSchema>;
