"use client";

import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const {
    data = [],
    isLoading,
    isError,
  } = trpc.referral.getReferrals.useQuery();

  const [search, setSearch] = useState("");
  // const [status, setStatus] = useState("all");

  const filteredData = useMemo(() => {
    return data.filter((r) => {
      const matchesSearch =
        `${r.patientFirstName} ${r.patientLastName}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        r.email?.toLowerCase().includes(search.toLowerCase());

      // const matchesStatus = status === "all" ? true : r.status === status;

      // return matchesSearch && matchesStatus;
      return matchesSearch;
    });
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="p-8 animate-spin rounded-full border-8 mx-auto border-gray-300 border-t-gray-600 mt-28" />
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600 mt-24 mx-auto">
        Failed to load referrals.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => router.push("/")}
          role="button"
          className="border-2 -mb-1 cursor-pointer hover:opacity-70 transition-opacity rounded-full"
        >
          <div className="font-extrabold text-3xl -mt-3">←</div>
        </div>

        <h1 className="text-2xl font-bold">Referrals Dashboard</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="border-2 rounded-lg">
          <input
            placeholder="Search patient or email..."
            className="rounded-lg px-3 py-2 w-full md:w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* 
        <select
          className="border rounded-lg px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-2 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Patient</th>
              <th className="p-3">Law Firm</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              {/* <th className="p-3 text-right">Actions</th> */}
            </tr>
          </thead>

          <tbody>
            {filteredData.length ? (
              filteredData.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">
                    <div className="font-medium">
                      {r.patientFirstName} {r.patientLastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {r.email || "No email"}
                    </div>
                  </td>

                  <td className="p-3">{r.lawFirm}</td>

                  <td className="p-3">{r.location}</td>

                  <td className="p-3">
                    <StatusBadge status={r.status || "new"} />
                  </td>

                  {/* <td className="p-3 text-right">
                    <button className="text-sm text-blue-600 hover:underline">
                      View
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No referrals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Status Badge

function StatusBadge({ status }: { status: string }) {
  const base = "px-2 py-1 rounded-full text-xs font-medium";

  const styles: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`${base} ${styles[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}
