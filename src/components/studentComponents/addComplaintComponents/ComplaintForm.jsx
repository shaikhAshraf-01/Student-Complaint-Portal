import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComplaint } from "../../../redux/slices/ComplaintSlice";
import { FaCamera, FaFileUpload, FaTimes } from "react-icons/fa";

function ComplaintForm() {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state) => state.auth?.currentUser
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [documents, setDocuments] = useState([]);
  const [readRules, setReadRules] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);

  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);

  // Character limits
  const TITLE_LIMIT = 50;
  const DESCRIPTION_LIMIT = 400;
  const LOCATION_LIMIT = 25;

  // Close upload menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowUploadMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Helper function to convert File to Base64 (Data URL)
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve({
          name: file.name,
          type: file.type,
          url: reader.result, // Base64 String
        });
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      // Convert all selected files into Base64 objects
      const convertedFiles = await Promise.all(
        files.map((file) => convertToBase64(file))
      );

      setDocuments((prev) => [...prev, ...convertedFiles]);
    } catch (err) {
      console.error("Error converting file to Base64:", err);
      setError("Failed to process selected file(s).");
    }

    setShowUploadMenu(false);
  };

  const removeDocument = (index) => {
    setDocuments((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Required fields
    if (
      !title.trim() ||
      !description.trim() ||
      !location.trim() ||
      !category
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Character length validation
    if (title.trim().length > TITLE_LIMIT) {
      setError(
        `Title cannot exceed ${TITLE_LIMIT} characters.`
      );
      return;
    }

    if (description.trim().length > DESCRIPTION_LIMIT) {
      setError(
        `Description cannot exceed ${DESCRIPTION_LIMIT} characters.`
      );
      return;
    }

    if (location.trim().length > LOCATION_LIMIT) {
      setError(
        `Location cannot exceed ${LOCATION_LIMIT} characters.`
      );
      return;
    }

    // Rules validation
    if (!readRules) {
      setError(
        "You must confirm you've read the rules before submitting."
      );
      return;
    }

    const newComplaint = {
      id: Date.now(),
      stdPRN: currentUser?.prn || "283",
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      category,
      documents, // Pure object format Array [{ name, type, url }] Redux & localStorage ke liye valid hai
      status: "In Progress",
      date: new Date().toISOString().split("T")[0],
      submittedBy: currentUser?.fullName || "Unknown",
    };

    dispatch(addComplaint(newComplaint));

    // Reset form
    setTitle("");
    setDescription("");
    setLocation("");
    setCategory("");
    setDocuments([]);
    setReadRules(false);
    setSubmitted(true);

    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setTimeout(() => {
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-2xl text-purple-700 font-bold">
        Complaint Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-2"
      >
        {/* Title */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label
              htmlFor="title"
              className="text-sm font-medium text-slate-700"
            >
              Title
            </label>

            <span className="text-xs text-slate-400">
              {title.length}/{TITLE_LIMIT}
            </span>
          </div>

          <input
            type="text"
            id="title"
            name="title"
            value={title}
            maxLength={TITLE_LIMIT}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter complaint title"
            className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label
              htmlFor="description"
              className="text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <span className="text-xs text-slate-400">
              {description.length}/{DESCRIPTION_LIMIT}
            </span>
          </div>

          <textarea
            id="description"
            name="description"
            value={description}
            maxLength={DESCRIPTION_LIMIT}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter complaint description"
            rows="5"
            className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label
              htmlFor="location"
              className="text-sm font-medium text-slate-700"
            >
              Location
            </label>

            <span className="text-xs text-slate-400">
              {location.length}/{LOCATION_LIMIT}
            </span>
          </div>

          <input
            type="text"
            id="location"
            name="location"
            value={location}
            maxLength={LOCATION_LIMIT}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Category + Upload */}
        <div className="grid grid-cols-2 gap-4">
          {/* Category */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="category"
              className="text-sm font-medium text-slate-700"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              <option value="academic">Academic</option>
              <option value="administrative">
                Administrative
              </option>
              <option value="facility">Facility</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Upload Documents */}
          <div
            className="flex flex-col gap-1 relative"
            ref={menuRef}
          >
            <label className="text-sm font-medium text-slate-700">
              Upload Documents
            </label>

            <button
              type="button"
              onClick={() =>
                setShowUploadMenu((prev) => !prev)
              }
              className="border border-slate-300 rounded-md p-2 text-left text-sm text-slate-500 hover:border-purple-400 transition-colors"
            >
              {documents.length > 0
                ? `${documents.length} file${
                    documents.length > 1 ? "s" : ""
                  } selected`
                : "Choose an option..."}
            </button>

            {/* Camera input */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={cameraInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File input */}
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {showUploadMenu && (
              <div className="absolute top-full mt-1 left-0 right-0 z-20 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    cameraInputRef.current?.click()
                  }
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  <FaCamera />
                  Take Photo
                </button>

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 border-t border-slate-100 transition-colors"
                >
                  <FaFileUpload />
                  Add File
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Selected Files Preview & Remove */}
        {documents.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {documents.map((fileObj, index) => (
              <div
                key={`${fileObj.name}-${index}`}
                className="flex items-center gap-2 text-xs bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-md border border-slate-200"
              >
                {/* Image thumbnail preview */}
                {fileObj.url && fileObj.url.startsWith("data:image") ? (
                  <img
                    src={fileObj.url}
                    alt={fileObj.name}
                    className="w-6 h-6 object-cover rounded"
                  />
                ) : null}

                <span className="max-w-[120px] truncate">
                  {fileObj.name}
                </span>

                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-slate-400 hover:text-rose-600 ml-1"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Rules Checkbox */}
        <div className="flex items-center gap-2 cursor-pointer mt-1">
          <input
            type="checkbox"
            name="readRules"
            id="readRules"
            checked={readRules}
            onChange={(e) => setReadRules(e.target.checked)}
            className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500 cursor-pointer"
          />

          <label
            htmlFor="readRules"
            className="text-sm font-medium text-slate-700 cursor-pointer select-none"
          >
            I have read all rules
          </label>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Success */}
        {submitted && (
          <p className="text-sm font-medium text-green-600">
            ✓ Complaint submitted successfully!
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default ComplaintForm;