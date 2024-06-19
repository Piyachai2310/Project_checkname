import Logo from '../data/Image/Logo.png'

const Header = function () {
    return (
        <>
            <div className="row">
                <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
                    {/* <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Company name</a> */}
                    <a>
                        <img src={Logo} alt="check name" style={{height: '100px'}}/>
                    </a>
                <div className="d-flex justify-content-end">
                    <div className="container-fluid my-1">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb breadcrumb-chevron p-3 bg-body-tertiary rounded-3">
                                <li className="breadcrumb-item">
                                    <span className="text-white">Home</span>
                                </li>
                                <li className="breadcrumb-item">
                                    <a className="text-white text-decoration-none" href="#">Library</a>
                                </li>
                                <li className="breadcrumb-item active text-white" aria-current="page">
                                    Data
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                </header>
            </div>
        </>
    )
};
export default Header;
