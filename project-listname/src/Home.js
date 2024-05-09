import React ,{useContext , useState} from 'react'
import Header from './component/Header'
import Torpbar from './component/torpbar'
import { Outlet } from 'react-router-dom'
import { Datacontext } from './page/App'

const Home = () => {

  
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row d-flex justify-content-between mt-5">
          <div className="col-md-2">
            <Torpbar />
          </div>
          <div className='col-md-9'>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
