import { z } from "zod";

export const referralSchema = z.object({
  patientFirstName: z.string().min(1, "First name is required"),
  patientLastName: z.string().min(1, "Last name is required"),

  dob: z.string().min(1, "Date of birth is required"),

  phone: z.string().min(8, "Phone number must be at least 8 digits"),

  email: z.string().email("Invalid email address").optional(),

  lawFirm: z.string().min(1, "Law firm is required"),
  attorneyName: z.string().min(1, "Attorney name is required"),

  attorneyEmail: z.string().email("Invalid attorney email"),

  attorneyPhone: z.string().min(8, "Attorney phone must be at least 8 digits"),

  complaint: z
    .string()
    .max(500, "Complaint must be under 500 characters")
    .min(1, "Complaint is required"),

  location: z.enum(
    [
      "Anaheim",
      "Culver City",
      "Downey",
      "El Monte",
      "Long Beach",
      "Los Angeles",
    ],
    {
      message: "Please select a location",
    },
  ),

  appointmentType: z.enum(["in_person", "telemedicine"], {
    message: "Please select appointment type",
  }),
});

export type ReferralInput = z.infer<typeof referralSchema>;
