import { createSlice } from "@reduxjs/toolkit";

const initialComplaints = [
  {
    id: 1,
    stdPRN: '283',
    title: "Hostel Wi-Fi down in Block B",
    category: "Infrastructure",
    description:
      "The primary Wi-Fi access point on the 3rd floor of Hostel Block B has been offline since morning, preventing students from accessing online learning portals.",
    status: "In Progress",
    date: "2026-07-16",
    adminResponse: "",
    respondedAt: null,
    isNewResponse: false,
  },
  {
    id: 2,
    stdPRN: '283',
    title: "Library water cooler leaking",
    category: "Maintenance",
    description:
      "Water is continuously pooling around the main drinking water cooler on the second floor of the library, creating a slippery slipping hazard.",
    status: "Resolved",
    date: "2026-07-15",
    adminResponse: "The water cooler has been repaired and the leak fixed.",
    respondedAt: "2026-07-15",
    isNewResponse: false,
  },
  {
    id: 3,
    stdPRN: '283',
    title: "Mess food quality issue",
    category: "Canteen & Mess",
    description:
      "The dinner served yesterday contained undercooked rice and several students complained about stomach discomfort. Urgent hygiene review needed.",
    status: "Rejected",
    date: "2026-07-14",
    adminResponse: "Could not be verified with the mess vendor. No other complaints received for that batch.",
    respondedAt: "2026-07-14",
    isNewResponse: false,
  },
  {
    id: 4,
    stdPRN: '283',
    title: "Gym equipment dumbbell rack broken",
    category: "Sports & Gym",
    description:
      "The welded frame supporting the heavy dumbbell rack in the student gymnasium has fractured completely, causing heavy weights to spill onto the floor.",
    status: "In Progress",
    date: "2026-07-13",
    adminResponse: "",
    respondedAt: null,
    isNewResponse: false,
  },
  {
    id: 5,
    stdPRN: '283',
    title: "Lab 3 projector not turning on",
    category: "Academic Facilities",
    description:
      "The roof-mounted overhead projector in Computer Lab 3 flashes a red error light and refuses to project. Classes are heavily disrupted.",
    status: "Resolved",
    date: "2026-07-12",
    adminResponse: "The projector has been replaced with a new unit.",
    respondedAt: "2026-07-12",
    isNewResponse: false,
  },
  {
    id: 6,
    stdPRN: '283',
    title: "AC malfunctioning in Seminar Hall",
    category: "Infrastructure",
    description:
      "The central split air conditioner on the left wall is blowing hot air and making a loud grinding mechanical noise during ongoing guest lectures.",
    status: "In Progress",
    date: "2026-07-11",
    adminResponse: "",
    respondedAt: null,
    isNewResponse: false,
  },
  {
    id: 7,
    stdPRN: '283',
    title: "Broken window pane in Room 102",
    category: "Maintenance",
    description:
      "A glass panel on the rear window of Classroom 102 was shattered during a windstorm, letting rainwater and wind ruin student desks.",
    status: "Resolved",
    date: "2026-07-10",
    adminResponse: "Window pane has been replaced.",
    respondedAt: "2026-07-10",
    isNewResponse: false,
  },
  {
    id: 8,
    stdPRN: '263',
    title: "Street light flickering near main gate",
    category: "Security",
    description:
      "The primary LED overhead street lamp illuminating the dark pathway towards the main exit gate is flickering intensely, compromising late-night campus safety.",
    status: "Resolved",
    date: "2026-07-09",
    adminResponse: "Faulty LED driver replaced by electrician.",
    respondedAt: "2026-07-09",
    isNewResponse: false,
  },
  {
    id: 9,
    stdPRN: '263',
    title: "Elevator stuck in Admin Building",
    category: "Infrastructure",
    description:
      "The mechanical elevator doors are repeatedly jamming on the 3rd floor, trapping occupants momentarily before releasing.",
    status: "Resolved",
    date: "2026-07-08",
    adminResponse: "Elevator serviced and door sensor recalibrated.",
    respondedAt: "2026-07-08",
    isNewResponse: false,
  },
  {
    id: 10,
    stdPRN: '263',
    title: "Parking lot drain blocked",
    category: "Maintenance",
    description:
      "The central drainage grate in the two-wheeler parking lot is completely choked with dry leaves, causing severe mud logging after minor downpours.",
    status: "In Progress",
    date: "2026-07-07",
    adminResponse: "",
    respondedAt: null,
    isNewResponse: false,
  },
  {
    id: 11,
    stdPRN: '263',
    title: "No water supply in Washroom 2nd floor",
    category: "Maintenance",
    description:
      "Both flush valves and taps in the men's washroom adjacent to the main staff room have run completely bone dry since 9:00 AM.",
    status: "Resolved",
    date: "2026-07-06",
    adminResponse: "Supply line valve was closed accidentally, reopened.",
    respondedAt: "2026-07-06",
    isNewResponse: false,
  },
  {
    id: 12,
    stdPRN: '263',
    title: "Canteen overcharging for beverages",
    category: "Canteen & Mess",
    description:
      "The vendor operating the college canteen is charging ₹5 over the printed Maximum Retail Price (MRP) on packed cold drinks and energy bottles.",
    status: "Resolved",
    date: "2026-07-05",
    adminResponse: "Vendor has been warned and MRP compliance enforced.",
    respondedAt: "2026-07-05",
    isNewResponse: false,
  },
  {
    id: 13,
    stdPRN: '263',
    title: "Socket spark in Computer Lab 1",
    category: "Electrical",
    description:
      "The dual power outlet under terminal workbench row number 4 emitted visible blue electrical sparks when a student plugged in their laptop charger.",
    status: "Resolved",
    date: "2026-07-04",
    adminResponse: "Socket replaced, wiring inspected by electrician.",
    respondedAt: "2026-07-04",
    isNewResponse: false,
  },
  {
    id: 14,
    stdPRN: '263',
    title: "ID card printer out of ink",
    category: "Administration",
    description:
      "The student helpdesk office has stopped printing replacement identity cards because the ribbon ink cartridges have run completely empty.",
    status: "Resolved",
    date: "2026-07-03",
    adminResponse: "New cartridges procured, printing resumed.",
    respondedAt: "2026-07-03",
    isNewResponse: false,
  },
  {
    id: 15,
    stdPRN: '263',
    title: "Auditorium sound system crackling",
    category: "Academic Facilities",
    description:
      "The primary wireless lapel microphone and the left stage speaker array emit a persistent, high-pitched crackling audio distortion during rehearsals.",
    status: "Resolved",
    date: "2026-07-02",
    adminResponse: "Faulty XLR cable identified and replaced.",
    respondedAt: "2026-07-02",
    isNewResponse: false,
  },
];

const loadComplaints = () => {
  try {
    const saved = localStorage.getItem("complaint");
    return saved ? JSON.parse(saved) : initialComplaints;
  } catch {
    return initialComplaints;
  }
};

const saveComplaints = (list) => {
  try {
    localStorage.setItem("complaint", JSON.stringify(list));
  } catch (err) {
    console.error("Failed to save complaints:", err);
  }
};

const complaintsSlice = createSlice({
  name: "complaints",
  initialState: {
    loading: false,
    list: loadComplaints(),
  },
  reducers: {
    // Student creates a new complaint
    addComplaint: (state, action) => {
      state.list.unshift({
        adminResponse: "",
        respondedAt: null,
        isNewResponse: false,
        ...action.payload,
      });
      saveComplaints(state.list);
    },

    // Admin replies to a complaint (and optionally updates status)
    addResponse: (state, action) => {
      const { id, message, status } = action.payload;
      const complaint = state.list.find((c) => c.id === id);
      if (!complaint) return;

      complaint.adminResponse = message;
      complaint.respondedAt = new Date().toISOString().split("T")[0];
      complaint.isNewResponse = true;
      if (status) {
        complaint.status = status;
      }
      saveComplaints(state.list);
    },

    // Student opens the response — clears the "NEW" badge
    markResponseSeen: (state, action) => {
      const complaint = state.list.find((c) => c.id === action.payload);
      if (!complaint) return;
      complaint.isNewResponse = false;
      saveComplaints(state.list);
    },
  },
});

export const { addComplaint, addResponse, markResponseSeen } =
  complaintsSlice.actions;
export default complaintsSlice.reducer;