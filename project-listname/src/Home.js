import React ,{useContext , useState} from 'react'
import Header from './component/Header'
import Torpbar from './component/torpbar'
import { Outlet } from 'react-router-dom'
// import { Datacontext } from './page/App'
import { DataProvider } from './data/DataContext'


const Home = () => {

  
  return (
    <DataProvider>
      <Header />
      <div className="container-fluid">
        <div className="row d-flex justify-content-between">
          <div className="col-md-2 ">
            <Torpbar />
          </div>
          <div className='col-md-10'>
            <Outlet/>
          </div>
        </div>
      </div>
    </DataProvider>
  )
}

export default Home
