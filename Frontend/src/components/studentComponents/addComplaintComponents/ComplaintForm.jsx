function ComplaintForm() {
  return (
    <div>
      <h1 className="text-2xl text-purple-700 font-bold">Complaint Form</h1>
      <form className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter complaint title"
            className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter complaint description"
            className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="priority"
            className="text-sm font-medium text-slate-700"
          >
            Location
          </label>
          <input
            type="text"
            id="priority"
            name="priority"
            placeholder="Enter location"
            className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
       <div className="grid grid-cols-2 gap-4">
  {/*Left Side Container */}
  <div className="flex flex-col gap-1">
    <label htmlFor="category" className="text-sm font-medium text-slate-700">
      Category
    </label>
    <select
      id="category"
      name="category"
      className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    >
      <option value="">Select a category</option>
      <option value="academic">Academic</option>
      <option value="administrative">Administrative</option>
      <option value="facility">Facility</option>
      <option value="other">Other</option>
    </select>
  </div>

  {/*right side*/} 
  <div className="flex flex-col gap-1">
    {/* Swapped <h2> for an identical label class layout */}
    <label className="text-sm font-medium text-slate-700">
      Upload Documents
    </label>
    <input
      type="file"
      name="documents"
      multiple
      className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />
  </div>
</div>
{/* Added gap-2 to separate elements, and cursor-pointer for better UX */}
<div className="flex items-center gap-2 cursor-pointer">
  <input 
    type="checkbox" 
    name="readRules" 
    id="readRules" 
    className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500 cursor-pointer"
  />
  <label 
    htmlFor="readRules" 
    className="text-sm font-medium text-slate-700 cursor-pointer select-none"
  >
    I have read all rules
  </label>
</div>

        <button
          type="submit"
          className="bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-
800 transition duration-300"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
export default ComplaintForm;
