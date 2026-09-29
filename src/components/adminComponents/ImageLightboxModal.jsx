import { FaTimes, FaImage } from "react-icons/fa";

export default function ImageLightboxModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] p-4 shadow-2xl flex flex-col items-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full flex justify-between items-center pb-2 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-600 flex items-center gap-2 truncate">
            <FaImage className="text-violet-600" />
            {image.name || "Attachment Preview"}
          </span>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Image Preview */}
        <div className="w-full flex-1 flex items-center justify-center overflow-auto p-2 mt-2">
          <img
            src={image.url}
            alt={image.name || "Attachment"}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}