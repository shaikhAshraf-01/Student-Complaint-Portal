import { useState } from "react";
import { FaCircle, FaImage, FaTimes } from "react-icons/fa";

function Complaint({ complaint }) {
  const { id, title, category, description, status, date, documents } = complaint;
  const [selectedImage, setSelectedImage] = useState(null);

  const statusStyles = {
    "Resolved": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "In Progress": "bg-amber-50 text-amber-700 border-amber-100",
    "Rejected": "bg-rose-50 text-rose-700 border-rose-100"
  };

  const currentStyle = statusStyles[status] || "bg-slate-50 text-slate-700 border-slate-100";

  // Filter image attachments
  const imageDocs = documents?.filter((doc) =>
    typeof doc === "object" ? doc.url?.startsWith("data:image") : false
  );

  return (
    <div className="p-3.5 md:p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all flex flex-col gap-3 group">
      {/* Header */}
      <div className="flex justify-between items-start gap-2.5">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="self-start text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-md">
            {category}
          </span>
          <h4 className="font-semibold text-slate-800 text-sm md:text-base leading-snug break-words">
            {title}
          </h4>
        </div>
        
        <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border shrink-0 ${currentStyle}`}>
          <FaCircle className="text-[6px]" />
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-50 break-words">
        {description}
      </p>

      {/* --- ATTACHED IMAGES SECTION --- */}
      {imageDocs && imageDocs.length > 0 && (
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
            <FaImage className="text-purple-600" /> Attached Images ({imageDocs.length}):
          </span>
          <div className="flex flex-wrap gap-2">
            {imageDocs.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className="relative border-2 border-purple-100 hover:border-purple-600 rounded-lg overflow-hidden transition-all duration-200 shrink-0"
              >
                <img
                  src={img.url}
                  alt={img.name || "Attachment"}
                  className="w-12 h-12 object-cover hover:scale-105 transition-transform"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center text-[11px] md:text-xs text-slate-400 border-t border-slate-50 pt-2">
        <span>Grievance ID: #{id}</span>
        <span className="font-medium text-slate-500">{date}</span>
      </div>

      {/* Lightbox / Image Preview Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full p-3 shadow-2xl flex flex-col items-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-between items-center pb-2 px-2 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-600 truncate">{selectedImage.name}</span>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-slate-500 hover:text-rose-600 bg-slate-100 p-1.5 rounded-full"
              >
                <FaTimes size={14} />
              </button>
            </div>
            <div className="w-full p-2 flex items-center justify-center">
              <img src={selectedImage.url} alt={selectedImage.name} className="max-w-full max-h-[70vh] object-contain rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaint;