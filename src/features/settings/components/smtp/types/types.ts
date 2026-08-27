export type SmtpSettingsValues = {
  host: string;
  port: string;
  username: string;
  password: string;
  encryption: string;
  enabled: boolean;
  fromEmail: string;
  fromName: string;
  fromCc: string;
  fromBcc: string;
  testEmail: string;
  content: string;
};
