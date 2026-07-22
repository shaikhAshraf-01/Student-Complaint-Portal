const PRIORITY_STYLES = {
  High: "bg-rose-50 text-rose-600",
  Medium: "bg-amber-50 text-amber-600",
  Low: "bg-emerald-50 text-emerald-600",
};

// Days between the complaint's submission date and today.
function daysPending(dateStr) {
  const submitted = new Date(dateStr);
  const diffMs = Date.now() - submitted.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Shows only complaints still pending ("In Progress"), oldest first — mirrors
 * the "Old Pending Complaints" table on the admin dashboard screenshot.
 * Pass `limit` to cap how many rows show (defaults to 5, like the screenshot);
 * pass `onViewAll` to wire up the "View All" link to your full complaints route.
 */
function OldPendingComplaints({ data, limit = 5, onViewAll }) {
  const pendingSorted = [...data]
    .filter((c) => c.status === "In Progress")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const rows = pendingSorted.slice(0, limit);

  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
      {/* HEADER */}
      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base md:text-lg font-bold text-slate-900">Old Pending Complaints</h3>
          <p className="text-[11px] md:text-xs text-slate-500 mt-0.5">
            Complaints not yet solved (older ones first)
          </p>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs md:text-sm font-semibold text-purple-600 hover:text-purple-700 shrink-0"
          >
            View All
          </button>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-slate-400 border-b border-slate-100">
              <th className="py-2.5 pr-4 font-semibold">ID</th>
              <th className="py-2.5 pr-4 font-semibold">Student Name</th>
              <th className="py-2.5 pr-4 font-semibold">Complaint Title</th>
              <th className="py-2.5 pr-4 font-semibold">Date Submitted</th>
              <th className="py-2.5 pr-4 font-semibold">Days Pending</th>
              <th className="py-2.5 font-semibold">Priority</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-slate-400 text-sm">
                  No pending complaints. Nice and clear.
                </td>
              </tr>
            ) : (
              rows.map((item) => {
                const pending = daysPending(item.date);
                return (
                  <tr
                    key={item.id}
                    className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3 pr-4 text-sm font-semibold text-purple-600">
                      #{item.id}
                    </td>
                    <td className="py-3 pr-4 text-sm text-slate-700">
                      {item.studentName || "—"}
                    </td>
                    <td className="py-3 pr-4 text-sm text-slate-700 max-w-[220px] truncate">
                      {item.title}
                    </td>
                    <td className="py-3 pr-4 text-sm text-slate-500">
                      {formatDate(item.date)}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 text-slate-600">
                        {pending} {pending === 1 ? "Day" : "Days"}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          PRIORITY_STYLES[item.priority] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.priority || "—"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden flex flex-col gap-3">
        {rows.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            No pending complaints. Nice and clear.
          </div>
        ) : (
          rows.map((item) => {
            const pending = daysPending(item.date);
            return (
              <div
                key={item.id}
                className="p-3.5 border border-slate-100 rounded-xl flex flex-col gap-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-purple-600">#{item.id}</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.studentName || "—"}</p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${
                      PRIORITY_STYLES[item.priority] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.priority || "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-50 pt-2">
                  <span>{formatDate(item.date)}</span>
                  <span className="font-medium text-slate-500">
                    {pending} {pending === 1 ? "Day" : "Days"} pending
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Info banner, matches screenshot */}
      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 text-xs md:text-sm px-4 py-3 rounded-lg">
        <span>Replies to complaints can only be sent from the All Complaints page.</span>
      </div>
    </div>
  );
}

export default OldPendingComplaints;