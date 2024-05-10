import React, { createContext, useState , useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [morningUser, setMorningUser] = useState([]);
  console.log("data: " , morningUser);
  const [eveningUser, setEveningUser] = useState([]);
  const [sumData , setSumData] = useState([])

  useEffect(() => {
      const DataSummary = async() => {
          setSumData([...morningUser , ...eveningUser]);
        }

    DataSummary();
  },[morningUser , eveningUser])

  useEffect(() => {
    function Dday() {
        console.log("sumData: ", sumData)
    }

    Dday();
}, [sumData])

  return (
    <DataContext.Provider value={{ morningUser, setMorningUser , eveningUser, setEveningUser }}>
      {children}
    </DataContext.Provider>
  );
};
