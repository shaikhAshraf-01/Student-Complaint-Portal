import { FaCircle } from "react-icons/fa";

function Complaint({ complaint }) {
  const { id, title, category, description, status, date } = complaint;

  const statusStyles = {
    "Resolved": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "In Progress": "bg-amber-50 text-amber-700 border-amber-100",
    "Rejected": "bg-rose-50 text-rose-700 border-rose-100"
  };

  const currentStyle = statusStyles[status] || "bg-slate-50 text-slate-700 border-slate-100";

  return (
    <div className="p-3.5 md:p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md hover:border-slate-200 transition-all duration-200 flex flex-col gap-3 group">
      
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2.5 sm:gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="self-start text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-md">
            {category}
          </span>
          <h4 className="font-semibold text-slate-800 text-sm md:text-base leading-snug group-hover:text-purple-700 transition-colors break-words">
            {title}
          </h4>
        </div>
        
        <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border self-start sm:self-auto shrink-0 ${currentStyle}`}>
          <FaCircle className="text-[6px]" />
          {status}
        </span>
      </div>

      {/* 
        DESCRIPTION CONTAINER:
        Removed "line-clamp-2" so the paragraph box can grow naturally 
        to show 100% of the long text description on any screen size.
      */}
      <p className="text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-50 break-words">
        {description}
      </p>

      {/* Footer Meta Row */}
      <div className="flex justify-between items-center text-[11px] md:text-xs text-slate-400 border-t border-slate-50 pt-2 mt-0.5">
        <span>Grievance ID: #{id}</span>
        <span className="font-medium text-slate-500">{date}</span>
      </div>
    </div>
  );
}

export default Complaint;
