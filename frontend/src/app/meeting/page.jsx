// "use client"
// import { useState } from "react";

// export default function MeetingPage() {
//     const [meetingURL, setMeetingURL] = useState("");

//     const startMeeting = async () => {
//         const res = await fetch("http://localhost:5000/create-meeting");
//         const data = await res.json();
//         setMeetingURL(data.meetingURL);
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen">
//             <h1 className="text-2xl font-bold">MindSync Meeting</h1>
//             <button 
//                 onClick={startMeeting} 
//                 className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//             >
//                 Start Meeting
//             </button>

//             {meetingURL && (
//                 <iframe
//                     src={meetingURL}
//                     allow="camera; microphone; fullscreen; display-capture"
//                     style={{ width: "80%", height: "500px", border: "0", marginTop: "20px" }}
//                 />
//             )}
//         </div>
//     );
// }
