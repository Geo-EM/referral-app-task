"use client";

import { trpc } from "@/lib/trpc";

export default function AdminPage() {
  const { data, isLoading } = trpc.referral.getReferrals.useQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Referrals</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Law Firm</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((r) => (
            <tr key={r.id}>
              <td>{r.patientFirstName} {r.patientLastName}</td>
              <td>{r.lawFirm}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}