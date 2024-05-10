import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import ShowResultName from "../component/showresultname";

import { DataContext } from "../data/DataContext"

export default function App() {
  const [users, setUsers] = useState([]);
  const [checkmoing, setCheckmoing] = useState([]);
  const [checkeveing, setCheckeveing] = useState([]);
  const [userID, setUserID] = useState(0);
  const [summary, setSummary] = useState([]);
  const [selectedSelectOptions, setSelectedSelectOptions] = useState({});
  const { setMorningUser } = useContext(DataContext);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/users", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUsers(data);
        setCheckmoing(data.map(item => ({ Id: item.number })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // function handleOptionChange(index, value) {
  //   setUsers(prevUsers => {
  //     const updatedUsers = [...prevUsers];
  //     updatedUsers[index].status = value;
  //     return updatedUsers;
  //   });
  // }

  function handleOptionChange(index, value) {
      setCheckmoing(prevCheckmoing => {
        const updatedCheckMoing = prevCheckmoing.map((user) => (user.Id === index + 1 ? { ...user, status: value } : user));
        return updatedCheckMoing;
      });

  }

  useEffect(() => {
    const updateSummary = async () => {
      // const updatedSummary = {
      //   checkmoing: [...checkmoing],
      //   checkeveing: [...checkeveing]
      // };
      // setSummary(updatedSummary);
      console.log("summary in update: ", checkmoing);
      setMorningUser(checkmoing)

    };

    const fetchDataAndUpdateSummary = async () => {
      await updateSummary();
    };

    // const response = fetch("http://localhost:8080/updateMorning" , {
    //   method: "UPDATE" , 
    //   headers: {
    //     Accept: "application/json" ,
    //     "content-type": "application/json"
    //   },
    //   body: {
    //     morning: 
    //   }
    // })

    fetchDataAndUpdateSummary();
  }, [checkmoing]);



  // console.log("summary: " , summary);



  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-between mt-5">
          <div className="row">
            <select className="col-md-2" value={userID} onChange={(e) => setUserID(e.target.value)}>
              <option value={0}>ทุกคน</option>
              <option value={1}>ชาย</option>
              <option value={2}>หญิง</option>
            </select>
            <select className="col-md-2">
              <option value={0}>ทุกชั้น</option>
              <option value={0}>ม.4</option>
              <option value={0}>ม.5</option>
              <option value={0}>ม.6</option>
            </select>
            <div className="col-md-8 d-flex justify-content-end">
              <form role="search">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
              </form>
            </div>
          </div>
          <table className="table table-striped table-sm">
            <thead>
              <tr className="text-center">
                <th scope="col" style={{ width: "10%" }}>เลขที่</th>
                <th scope="col" style={{ width: "10%" }}>คำนำหน้าชื่อ</th>
                <th scope="col" style={{ width: "20%" }}>ชื่อ</th>
                <th scope="col" style={{ width: "10%" }}>ระดับชั้น</th>
                <th scope="col" style={{ width: "10%" }}>มาเรียน</th>
                <th scope="col" style={{ width: "10%" }}>ลา</th>
                <th scope="col" style={{ width: "10%" }}>อื่นๆ</th>
                <th scope="col" style={{ width: "10%" }}>เพิ่มเติม</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.number}</td>
                  <td>{user.prefix}</td>
                  <td>{user.name}</td>
                  <td>{user.year}</td>
                  <td className="text-center">
                    <input
                      type="radio"
                      value="มาเรียน"
                      checked={checkmoing[index].status === "มาเรียน"}
                      onChange={() => handleOptionChange(index, "มาเรียน")}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="radio"
                      value="ลา"
                      checked={checkmoing[index].status === "ลา"}
                      onChange={() => handleOptionChange(index, "ลา")}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="radio"
                      value="อื่นๆ"
                      checked={checkmoing[index].status === "อื่นๆ"}
                      onChange={() => handleOptionChange(index, "อื่นๆ")}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="text"
                      value={user.additionalInfo || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setUsers(prevUsers => {
                          const updatedUsers = [...prevUsers];
                          updatedUsers[index].additionalInfo = value;
                          return updatedUsers;
                        });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
