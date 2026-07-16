import Complaint from "./Complaint";

function Complaints({ data }) {
  return (
    // Trimmed padding on mobile (p-4 md:p-6) so it fits small screens perfectly
    <div className="w-full bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
      
      {/* 
        STICKY HEADER: 
        sticky top-0 locks it to the top.
        z-10 ensures scrolling cards stay beneath it.
        bg-white prevents cards from overlapping transparently.
        -mx-4 px-4 on mobile prevents background clipping at container edges.
      */}
      <div className="sticky top-0 z-10 bg-white -mx-4 px-4 md:mx-0 md:px-0 flex justify-between items-center border-b border-slate-100 pb-4 shrink-0">
        <div>
          {/* Responsive text: smaller text on mobile, larger on desktop */}
          <h3 className="text-base md:text-lg font-bold text-slate-900">Recent Complaints</h3>
          <p className="text-[11px] md:text-xs text-slate-500 mt-0.5">Showing your submitted grievances</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full shrink-0">
          {data.length} Total
        </span>
      </div>

      {/* List Container */}
      <div className="flex flex-col gap-3 md:gap-4 max-h-[550px] overflow-y-auto pr-1 scrollbar-none">
        {data.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            No complaints logged yet.
          </div>
        ) : (
          data.map((item) => (
            <Complaint key={item.id} complaint={item} />
          ))
        )}
      </div>
    </div>
  );
}

export default Complaints;
