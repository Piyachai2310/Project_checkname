// import React, { useState, useEffect, useContext } from 'react'

// const ShowResultName = () => {
//     const [allStatus, setAllStatus] = useState([]);
//     const Datashowresultname = useContext(Datacontext);

//     useEffect(() => {
//         const calculateAllStatus = () => {
//             if (Datashowresultname && Datashowresultname.checkmoing && Datashowresultname.checkeveing) {
//                 const allStatus = Datashowresultname.checkmoing.concat(Datashowresultname.checkeveing);
//                 setAllStatus(allStatus);
//             }
//             console.log("Datashow: " , Datashowresultname)
//         }

//         calculateAllStatus();
//     }, [Datashowresultname]);

//     const handleSummaryButtonClick = () => {
//         console.log(allStatus);
//     }

//     return (
//         <div>
//             <button onClick={handleSummaryButtonClick}>แสดงของฉัน</button>
//             <div>
//                 <h3>สรุปสถานะทั้งหมด</h3>
//                 <ul>
//                     {allStatus.map((user, index) => (
//                         <li key={index}>{`ผู้ที่ ${index + 1}: ${user.Id}, ตอนเช้า: ${user.status}, ตอนค่ำ: ${user.status}`}</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default ShowResultName;
