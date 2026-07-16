import { createSlice } from "@reduxjs/toolkit";

const initialComplaints = [
  {
    id: 1,
    title: "Hostel Wi-Fi down in Block B",
    category: "Infrastructure",
    description:
      "The primary Wi-Fi access point on the 3rd floor of Hostel Block B has been offline since morning, preventing students from accessing online learning portals.",
    status: "In Progress",
    date: "2026-07-16",
  },
  {
    id: 2,
    title: "Library water cooler leaking",
    category: "Maintenance",
    description:
      "Water is continuously pooling around the main drinking water cooler on the second floor of the library, creating a slippery slipping hazard.",
    status: "Resolved",
    date: "2026-07-15",
  },
  {
    id: 3,
    title: "Mess food quality issue",
    category: "Canteen & Mess",
    description:
      "The dinner served yesterday contained undercooked rice and several students complained about stomach discomfort. Urgent hygiene review needed.",
    status: "Rejected",
    date: "2026-07-14",
  },
  {
    id: 4,
    title: "Gym equipment dumbbell rack broken",
    category: "Sports & Gym",
    description:
      "The welded frame supporting the heavy dumbbell rack in the student gymnasium has fractured completely, causing heavy weights to spill onto the floor.",
    status: "In Progress",
    date: "2026-07-13",
  },
  {
    id: 5,
    title: "Lab 3 projector not turning on",
    category: "Academic Facilities",
    description:
      "The roof-mounted overhead projector in Computer Lab 3 flashes a red error light and refuses to project. Classes are heavily disrupted.",
    status: "Resolved",
    date: "2026-07-12",
  },
  {
    id: 6,
    title: "AC malfunctioning in Seminar Hall",
    category: "Infrastructure",
    description:
      "The central split air conditioner on the left wall is blowing hot air and making a loud grinding mechanical noise during ongoing guest lectures.",
    status: "In Progress",
    date: "2026-07-11",
  },
  {
    id: 7,
    title: "Broken window pane in Room 102",
    category: "Maintenance",
    description:
      "A glass panel on the rear window of Classroom 102 was shattered during a windstorm, letting rainwater and wind ruin student desks.",
    status: "Resolved",
    date: "2026-07-10",
  },
  {
    id: 8,
    title: "Street light flickering near main gate",
    category: "Security",
    description:
      "The primary LED overhead street lamp illuminating the dark pathway towards the main exit gate is flickering intensely, compromising late-night campus safety.",
    status: "Resolved",
    date: "2026-07-09",
  },
  {
    id: 9,
    title: "Elevator stuck in Admin Building",
    category: "Infrastructure",
    description:
      "The mechanical elevator doors are repeatedly jamming on the 3rd floor, trapping occupants momentarily before releasing.",
    status: "Resolved",
    date: "2026-07-08",
  },
  {
    id: 10,
    title: "Parking lot drain blocked",
    category: "Maintenance",
    description:
      "The central drainage grate in the two-wheeler parking lot is completely choked with dry leaves, causing severe mud logging after minor downpours.",
    status: "In Progress",
    date: "2026-07-07",
  },
  {
    id: 11,
    title: "No water supply in Washroom 2nd floor",
    category: "Maintenance",
    description:
      "Both flush valves and taps in the men's washroom adjacent to the main staff room have run completely bone dry since 9:00 AM.",
    status: "Resolved",
    date: "2026-07-06",
  },
  {
    id: 12,
    title: "Canteen overcharging for beverages",
    category: "Canteen & Mess",
    description:
      "The vendor operating the college canteen is charging ₹5 over the printed Maximum Retail Price (MRP) on packed cold drinks and energy bottles.",
    status: "Resolved",
    date: "2026-07-05",
  },
  {
    id: 13,
    title: "Socket spark in Computer Lab 1",
    category: "Electrical",
    description:
      "The dual power outlet under terminal workbench row number 4 emitted visible blue electrical sparks when a student plugged in their laptop charger.",
    status: "Resolved",
    date: "2026-07-04",
  },
  {
    id: 14,
    title: "ID card printer out of ink",
    category: "Administration",
    description:
      "The student helpdesk office has stopped printing replacement identity cards because the ribbon ink cartridges have run completely empty.",
    status: "Resolved",
    date: "2026-07-03",
  },
  {
    id: 15,
    title: "Auditorium sound system crackling",
    category: "Academic Facilities",
    description:
      "The primary wireless lapel microphone and the left stage speaker array emit a persistent, high-pitched crackling audio distortion during rehearsals.",
    status: "Resolved",
    date: "2026-07-02",
  },
];

const complaintsSlice = createSlice({
  name: "complaints",
  initialState: {
    list: initialComplaints,
    loading: false,
    error: null,
  },
  reducers: {
    addComplaint: (state, action) => {
      state.list.unshift(action.payload);
    },
  },
});

export const { addComplaint } = complaintsSlice.actions;
export default complaintsSlice.reducer;
