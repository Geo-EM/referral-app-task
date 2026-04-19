import { z } from "zod";

export const referralSchema = z.object({
  patientFirstName: z.string().min(1, "First name is required"),
  patientLastName: z.string().min(1),
  dob: z.string(),

  phone: z.string().min(8),
  email: z.email().optional(),

  lawFirm: z.string().min(1),
  attorneyName: z.string().min(1),
  attorneyEmail: z.email(),
  attorneyPhone: z.string(),

  complaint: z.string().max(500),

  location: z.enum([
    "Anaheim",
    "Culver City",
    "Downey",
    "El Monte",
    "Long Beach",
    "Los Angeles",
  ]),

  appointmentType: z.enum(["in_person", "telemedicine"]),
});

export type ReferralInput = z.infer<typeof referralSchema>;