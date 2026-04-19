import ReferralForm from "@/components/referral-form";

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center pb-2">Patient Referral Intake</h1>
      <ReferralForm />
    </div>
  );
}
