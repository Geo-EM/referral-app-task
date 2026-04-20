"use client";

import { trpc } from "@/lib/trpc";
import { ReferralInput, referralSchema } from "@/schemas/referral";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, UseFormRegisterReturn } from "react-hook-form";

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
    <>
      <div className="flex items-center mb-6 justify-between">
        <h1 className="md:text-2xl text-lg font-bold">
          Patient Referral Intake
        </h1>

        <Link
          href={"/admin"}
          className="bg-black transition-all text-white p-1 px-2 rounded-md font-medium hover:opacity-90 disabled:opacity-50 text-sm"
        >
          Check List
        </Link>
      </div>
      <div className="bg-white shadow-2xl drop-shadow-2xl border-2 rounded-2xl p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 text-black"
        >
          {/* Patient Info */}
          <section>
            {/* Feedback */}
            {mutation.isSuccess && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
                <p className="text-base mb-1 font-medium">
                  Our team will contact the patient within 24 hours
                </p>
                <p>
                  {mutation.data.message} — ID: {mutation.data.id}
                </p>
              </div>
            )}

            {mutation.isError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                Failed to submit referral. Please try again.
              </div>
            )}

            <h2 className="text-lg font-semibold my-4">Patient Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="First Name"
                error={errors.patientFirstName?.message}
              >
                <input {...register("patientFirstName")} />
              </Field>

              <Field label="Last Name" error={errors.patientLastName?.message}>
                <input {...register("patientLastName")} />
              </Field>

              <Field label="Date of Birth" error={errors.dob?.message}>
                <input type="date" {...register("dob")} />
              </Field>

              <Field label="Phone" error={errors.phone?.message}>
                <input {...register("phone")} />
              </Field>

              <Field label="Email (optional)" error={errors.email?.message}>
                <input {...register("email")} />
              </Field>
            </div>
          </section>

          {/* Attorney Info */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Referring Attorney</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Law Firm" error={errors.lawFirm?.message}>
                <input {...register("lawFirm")} />
              </Field>

              <Field label="Attorney Name" error={errors.attorneyName?.message}>
                <input {...register("attorneyName")} />
              </Field>

              <Field
                label="Attorney Email"
                error={errors.attorneyEmail?.message}
              >
                <input {...register("attorneyEmail")} />
              </Field>

              <Field
                label="Attorney Phone"
                error={errors.attorneyPhone?.message}
              >
                <input {...register("attorneyPhone")} />
              </Field>
            </div>
          </section>

          {/* Referral Info */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Referral Details</h2>

            <Field label="Primary Complaint" error={errors.complaint?.message}>
              <textarea
                className="w-full"
                rows={4}
                {...register("complaint")}
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Preferred Location"
                error={errors.location?.message}
              >
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

              <Field
                label="Appointment Type"
                error={errors.appointmentType?.message}
              >
                <div className="flex py-[1px] w-full gap-4">
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
              className="w-full bg-black transition-all text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {mutation.isPending ? "Submitting..." : "Submit Referral"}
            </button>
          </div>

          {/* Feedback */}
          {mutation.isSuccess && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
              <p className="text-base mb-1 font-medium">
                Our team will contact the patient within 24 hours
              </p>
              <p>
                {mutation.data.message} — ID: {mutation.data.id}
              </p>
            </div>
          )}

          {mutation.isError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
              Failed to submit referral. Please try again.
            </div>
          )}
        </form>
      </div>
    </>
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
      {error && <p className="text-xs text-red-600">{error}</p>}
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
