    import React from 'react'
    import Linkber from "./linkber";
    import { Link } from "react-router-dom";
    // import Showresultname from "./showresultname";


    const torpbar = () => {


        return (
            <>
                    <a href="#">
                        <span className="fs-4 text-decolation-none">Sidebar</span>
                    </a>
                    <hr />
                    <ul className="nav nav-pills flex-column gap-3 mb-auto">
                        <li className="nav-item">
                            <a href="#" className="nav-link active" aria-current="page">
                                <svg className="bi pe-none me-2" width="16" height="16"><use href="/icons.svg#home"></use></svg>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to=".." className="nav-link active bg-success">
                                เช็คชื่อ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="storename" className="nav-link active bg-success">
                                คลังรายชื่อ
                            </Link>
                        </li>

                        <li className="nav-item">
                            <a href="#" className="nav-link active" aria-current="page">
                                <svg className="bi pe-none me-2" width="16" height="16"><use href="/icons.svg#home"></use></svg>
                                คะแนนเก็บ
                            </a>
                        </li>
                        <li className="nav-item">
                                <a href="#" className="nav-link active" aria-current="page">
                                <svg className="bi pe-none me-2" width="16" height="16"><use href="/icons.svg#home"></use></svg>
                                สตาฟ
                            </a>
                        </li>

                    </ul>
                    <hr />

                    {/* <div>
                        <Showresultname />
                    </div> */}
            </>
        )
    }

    export default torpbar
