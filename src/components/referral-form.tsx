"use client";

import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { referralSchema, ReferralInput } from "@/schemas/referral";
import { trpc } from "@/lib/trpc";

export default function ReferralForm() {
  const mutation = trpc.referral.submitReferral.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReferralInput>({
    resolver: zodResolver(referralSchema),
  });

  const onSubmit = (data: ReferralInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-white shadow-sm border rounded-2xl p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-black">
        {/* Patient Info */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Patient Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="First Name" error={errors.patientFirstName?.message}>
              <input {...register("patientFirstName")} />
            </Field>

            <Field label="Last Name" error={errors.patientLastName?.message}>
              <input {...register("patientLastName")} />
            </Field>

            <Field label="Date of Birth">
              <input type="date" {...register("dob")} />
            </Field>

            <Field label="Phone">
              <input {...register("phone")} />
            </Field>

            <Field label="Email (optional)">
              <input {...register("email")} />
            </Field>
          </div>
        </section>

        {/* Attorney Info */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Referring Attorney</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Law Firm">
              <input {...register("lawFirm")} />
            </Field>

            <Field label="Attorney Name">
              <input {...register("attorneyName")} />
            </Field>

            <Field label="Attorney Email">
              <input {...register("attorneyEmail")} />
            </Field>

            <Field label="Attorney Phone">
              <input {...register("attorneyPhone")} />
            </Field>
          </div>
        </section>

        {/* Referral Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Referral Details</h2>

          <Field label="Primary Complaint">
            <textarea className="w-full" rows={4} {...register("complaint")} />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Preferred Location">
              <select className="w-full" {...register("location")}>
                <option value="">Select location</option>
                <option value="Anaheim">Anaheim</option>
                <option value="Culver City">Culver City</option>
                <option value="Downey">Downey</option>
                <option value="El Monte">El Monte</option>
                <option value="Long Beach">Long Beach</option>
                <option value="Los Angeles">Los Angeles</option>
              </select>
            </Field>

            <Field label="Appointment Type">
              <div className="flex  w-full gap-4">
                <Radio
                  label="In Person"
                  value="in_person"
                  register={register("appointmentType")}
                />
                <Radio
                  label="Telemedicine"
                  value="telemedicine"
                  register={register("appointmentType")}
                />
              </div>
            </Field>
          </div>
        </section>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
          >
            {mutation.isPending ? "Submitting..." : "Submit Referral"}
          </button>
        </div>

        {/* Feedback */}
        {mutation.isSuccess && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
            {mutation.data.message} — ID: {mutation.data.id}
          </div>
        )}

        {mutation.isError && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
            Failed to submit referral. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}

/* ---------------- UI Helpers ---------------- */

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-black">
        {children}
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}

function Radio({
  label,
  value,
  register,
}: {
  label: string;
  value: string;
  register: UseFormRegisterReturn;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="radio" value={value} {...register} />
      {label}
    </label>
  );
}
