import ComplaintForm from "./addComplaintComponents/ComplaintForm";
import Rules from "./addComplaintComponents/Rules";
function AddComplaint(){
    return(
    <div className="w-full min-h-screen md:h-screen overflow-visible md:overflow-hidden px-4 py-6 md:px-10 md:py-6 bg-slate-50 flex flex-col">
            <header className="border-b border-slate-400 pb-2 ">
                <h1 className="text-2xl text-purple-700 font-bold">Add New Complaint</h1>
                <p>Submit a new complaint to your administrator</p>
            </header>
             <div className="flex flex-col lg:flex-row py-6 gap-6">
        
        {/* Complaints List Container (Takes 65% on Desktop screen, Full width on mobile) */}
        <div className="w-full lg:w-[65%] border border-slate-100 bg-white p-2 rounded-2xl shadow-sm">
          <ComplaintForm />
        </div>
        
        {/* Chart Container (Takes 35% on Desktop screen, Full width on mobile) */}
        <div className="w-full lg:w-[35%]  bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 ">
          <Rules />
        </div>
      </div>
        </div>
    )
}
export default AddComplaint;