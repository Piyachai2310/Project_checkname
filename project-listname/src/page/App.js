import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import ShowResultName from "../component/showresultname";
import { useParams } from 'react-router-dom';

import { DataContext } from "../data/DataContext"

export default function App() {
  const [userID, setUserID] = useState(0);
  
  const [state, setState] = useState([])
  const { Id } = useParams();  // ดึง id จากพารามิเตอร์ URL


  React.useEffect(() => {
    // console.log("Received ID:", Id);
    console.log("user ID:", userID);
  }, [Id , userID]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/check/" + Id + "/" + userID, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setState(data);
        // console.log("Check Id day: " , {id});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [Id , userID]);


  function handleOptionChange(index, value) {
    console.log("index: ", index)
    setState(pre => {
      return pre.map((item , i) => {
        if(i+1 === index){
          return {...item , Morning: value}
        }
        return item;
      })
    })
    const body = JSON.stringify({ Id: index, morning: value });

    const DoUpdate = async (Id) => {

      const response = await fetch("http://localhost:8080/updateMorning/"+ Id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body
        }

      )

    }
    DoUpdate(Id);
  }


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
              {state.map((user, index) => (
                <tr key={index}>
                  <td>{user.number}</td>
                  <td>{user.prefix}</td>
                  <td>{user.name}</td>
                  <td>{user.Year}</td>
                  <td className="text-center">
                    <input
                      type="radio"
                      value="มาเรียน"
                      checked={state[index].Morning === "มาเรียน"}
                      onChange={() => handleOptionChange(index + 1, "มาเรียน")}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="radio"
                      value="ลา"
                      checked={state[index].Morning === "ลา"}
                      onChange={() => handleOptionChange(index + 1, "ลา")}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="radio"
                      value="อื่นๆ"
                      checked={state[index].Morning === "อื่นๆ"}
                      onChange={() => handleOptionChange(index + 1, "อื่นๆ")}
                    />
                  </td>
                  {/* <td className="text-center">
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
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
