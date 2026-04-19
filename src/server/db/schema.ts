import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const referrals = pgTable("referrals", {
  id: uuid("id").defaultRandom().primaryKey(),

  patientFirstName: text("patient_first_name").notNull(),
  patientLastName: text("patient_last_name").notNull(),
  dob: text("dob").notNull(),

  phone: text("phone").notNull(),
  email: text("email"),

  lawFirm: text("law_firm").notNull(),
  attorneyName: text("attorney_name").notNull(),
  attorneyEmail: text("attorney_email").notNull(),
  attorneyPhone: text("attorney_phone").notNull(),

  complaint: text("complaint").notNull(),
  location: text("location").notNull(),
  appointmentType: text("appointment_type").notNull(),

  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});