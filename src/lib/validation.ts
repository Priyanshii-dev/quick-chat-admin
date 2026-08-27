import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phone10Regex = /^\d{10}$/;
const phoneRegex = /^\d{8,15}$/;
const pincodeRegex = /^\d{6}$/;
const invoiceTokenRegex = /^[A-Za-z]+$/;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const cinRegex = /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
const panCompanyRegex = /^[A-Z]{3}C[A-Z][0-9]{4}[A-Z]$/;
const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const nameRegex = /^[A-Za-z\s]+$/;

const companyNameRegex = /^[A-Za-z0-9\s&.,()'-]+$/;
const numberOnlyRegex = /^[0-9]+$/;

export const requiredString = (label: string) =>
  z
    .string({
      error: (issue) =>
        issue.input == null || issue.input === ""
          ? `${label} is required`
          : "Invalid input",
    })
    .trim()
    .min(1, `${label} is required`);
export const optionalString = (label: string) =>
  z
    .string()
    .trim()
    .refine((value) => value === "" || value.length > 0, {
      message: `${label} is required`,
    });
export const requiredSelection = (label: string) =>
  z
    .string({
      error: (issue) =>
        issue.input == null || issue.input === ""
          ? `${label} is required`
          : "Invalid input",
    })
    .trim()
    .min(1, `${label} is required`);

export const requiredEmail = (label = "Email") =>
  requiredString(label)
    .max(254, `${label} must not exceed 254 characters`)
    .regex(emailRegex, "Invalid email address");
export const requiredPassword = (label = "Password") => requiredString(label);

export const requiredPasswordWithMinLength = (min = 8, label = "Password") =>
  requiredString(label).min(min, `${label} must be at least ${min} characters`);

export const requiredConfirmPassword = (label = "Confirm password") =>
  requiredString(label);

export const optionalEmail = () =>
  z
    .string()
    .trim()
    .max(254, "Email must not exceed 254 characters")
    .refine((value) => value === "" || emailRegex.test(value), {
      message: "Invalid email address",
    });

export const requiredPhone10 = (label = "Phone number") =>
  requiredString(label).regex(phone10Regex, "Invalid phone number");

export const optionalPhone10 = () =>
  z
    .string()
    .trim()
    .refine((value) => value === "" || phone10Regex.test(value), {
      message: "Invalid phone number",
    })
    .optional();

export const requiredPhoneInternational = (label = "Phone number") =>
  requiredString(label).regex(phoneRegex, "Invalid phone number");

export const requiredPincode = (label = "Pincode") =>
  requiredString(label).regex(pincodeRegex, "Invalid pincode");

export const optionalPincode = () =>
  z
    .string()
    .trim()
    .refine((value) => value === "" || pincodeRegex.test(value), {
      message: "Invalid pincode",
    })
    .optional();

export const requiredGstNumber = (label = "Company GST number") =>
  requiredString(label)
    .toUpperCase()
    .regex(gstRegex, "Invalid format. Expected: 27AAAPA1234A1Z5");

export const optionalGstNumber = () =>
  z
    .string()
    .trim()
    .toUpperCase()
    .refine((value) => value === "" || gstRegex.test(value), {
      message: "Invalid format. Expected: 27AAAPA1234A1Z5",
    })
    .optional();

export const requiredPanCompanyNumber = (label = "Company PAN number") =>
  requiredString(label)
    .toUpperCase()
    .regex(panCompanyRegex, "Invalid format. Expected: ABCCM1234Z");

export const optionalPanCompanyNumber = () =>
  z
    .string()
    .trim()
    .toUpperCase()
    .refine((value) => value === "" || panCompanyRegex.test(value), {
      message: "Invalid format. Expected: ABCCM1234Z",
    })
    .optional();

export const requiredCinNumber = (label = "CIN number") =>
  requiredString(label)
    .toUpperCase()
    .regex(cinRegex, "Invalid format. e.g: U72900PN2018PTC179181");

export const optionalCinNumber = () =>
  z
    .string()
    .trim()
    .toUpperCase()
    .refine((value) => value === "" || cinRegex.test(value), {
      message: "Invalid format. e.g: U72900PN2018PTC179181",
    })
    .optional();

export const optionalInvoiceToken = (label: string) =>
  z
    .string()
    .trim()
    .refine((value) => value === "" || invoiceTokenRegex.test(value), {
      message: "e.g: INV",
    })
    .optional();

export const positiveNumber = (label: string, decimals = 2) =>
  z.coerce
    .number({ error: `${label} is required` })
    .positive({ error: `${label} is required` })
    .max(9999999999, `${label} must not exceed 10 digits`)
    .refine(
      (val) => {
        const regex = new RegExp(`^\\d+(\\.\\d{1,${decimals}})?$`);
        return regex.test(String(val));
      },
      { message: `Max ${decimals} decimal places allowed` },
    );
export const ifsc = (label = "IFSC") =>
  requiredString(label).regex(ifscRegex, "e.g: HDFC0000001");

export const optionalUrl = () =>
  z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value),
      {
        message: "URL must start with http:// or https://",
      },
    );

export const requiredUrl = (label = "URL") =>
  requiredString(label).refine(
    (value) => /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value),
    { message: "URL must start with http:// or https://" },
  );

export const requiredName = (label = "Name") =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .min(2, `${label} must be at least 2 characters`)
    .max(50, `${label} must not exceed 50 characters`)
    .regex(nameRegex, `${label} can contain only letters and spaces`);

export const optionalName = (label = "Name") =>
  z
    .string()
    .trim()
    .max(50, `${label} must not exceed 50 characters`)
    .refine(
      (value) =>
        value === "" ||
        (value.length >= 2 && value.length <= 50 && nameRegex.test(value)),
      {
        message: `${label} must be at least 2 characters`,
      },
    )
    .optional();

export const requiredAddress = (label = "Address") =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(255, `${label} must not exceed 255 characters`);

export const optionalAddress = (label = "Address") =>
  z
    .string()
    .trim()
    .max(255, `${label} must not exceed 255 characters`)
    .optional();

export const requiredCompanyName = (label = "Company name") =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .min(2, `${label} must be at least 2 characters`)
    .max(100, `${label} must not exceed 100 characters`)
    .regex(companyNameRegex, `${label} contains invalid characters`);

export const requiredPaymentReference = (label = "Payment reference") =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(100, `${label} must not exceed 100 characters`);

export const requiredCreditReference = (label = "Credit reference") =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(100, `${label} must not exceed 100 characters`);

export const optionalInvoiceTerms = (label = "Invoice terms") =>
  z
    .string()
    .trim()
    .max(500, `${label} must not exceed 500 characters`)
    .optional();

export const requiredNumber = (label: string, maxLength = 15) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(maxLength, `${label} must not exceed ${maxLength} digits`)
    .regex(numberOnlyRegex, `${label} must contain only numbers`);

export const percentageNumber = (label: string) =>
  z.coerce
    .number()
    .min(0, `${label} cannot be negative`)
    .max(100, `${label} cannot be greater than 100`)
    .default(0);

export const amountNumber = (label: string) =>
  z.coerce.number().min(0, `${label} cannot be negative`).default(0);
