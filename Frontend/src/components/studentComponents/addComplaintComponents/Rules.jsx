import {
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCommentDots,
  FaPaperclip,
  FaClipboardList,
} from "react-icons/fa";

const Rules = () => {
  return (
    <div className="bg-white rounded-xl  p-2 ">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2 border-b border-gray-200 pb-3">
        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
          <FaShieldAlt className="text-yellow-600 text-xl" />
        </div>

        <h2 className="text-2xl font-bold text-blue-800">
          Important Rules
        </h2>
      </div>

      <div className="space-y-3">

        <div className="flex gap-4">
          <FaCheckCircle className="text-green-600 text-xl mt-1" />
          <div>
            <h3 className="font-semibold text-black">
              Provide True Information
            </h3>
            <p className="text-gray-500 text-sm">
              Submit only genuine complaints with correct details.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <FaExclamationTriangle className="text-orange-500 text-xl mt-1" />
          <div>
            <h3 className="font-semibold text-black">
              False Complaints
            </h3>
            <p className="text-gray-500 text-sm">
              Fake or misleading complaints may result in disciplinary action.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <FaCommentDots className="text-blue-500 text-xl mt-1" />
          <div>
            <h3 className="font-semibold text-black">
              Use Respectful Language
            </h3>
            <p className="text-gray-500 text-sm">
              Avoid abusive or offensive words while describing your issue.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <FaPaperclip className="text-purple-500 text-xl mt-1" />
          <div>
            <h3 className="font-semibold text-black">
              Attach Evidence
            </h3>
            <p className="text-gray-500 text-sm">
              Upload images or documents whenever possible to support your complaint.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <FaClipboardList className="text-red-500 text-xl mt-1" />
          <div>
            <h3 className="font-semibold text-black">
              No Duplicate Complaints
            </h3>
            <p className="text-gray-500 text-sm">
              Do not submit the same complaint multiple times.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Rules;