import { Form, useNavigate , Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";


const Register = () => {
    const [showpassword, setShowpassword] = useState(false);
    const [confirmshowpassword, setConfirmshowpassword] = useState(false);
    const Navigate = useNavigate()

    const [data , setData] = useState({
        name: "",
        email: "",
        password: "",
        comfirmpassword: ""

    })

    function handleOnchange(e){
        const {name , value} = e.target 

        setData((prev) => {
            return {
                ...prev , 
                [name]: value
            }
        })

    }

    function ShowPassword() {
        setShowpassword(prev => !prev)
    }

    useEffect(() => {
        console.log("data: " , data);
    }, [data])

    async function handleOnSubmit(e){
        e.preventDefault();
        // ใช้ destructuring เพื่อให้โค้ดดูเรียบร้อยขึ้น
        const { password, comfirmpassword } = data;

        if (password !== comfirmpassword) {
            return alert("รหัสผ่านไม่ตรงกัน");
        }
        const response = await fetch("http://localhost:8080/register",{
            method: "POST" , 
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error('Registration failed');
        }

        const responsedata = await response.json();
        console.log(responsedata);
        alert('Register successful');
        Navigate('/Login')

    }

    return (
        <div className="container  mt-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-6 ">
                    <div className="card p-3 bg-body-secondary shadow">
                        <h3>Register</h3>
                        <div className="card-body">
                            <Form className="d-flex flex-column gap-2" onSubmit={handleOnSubmit}>
                                <div className="mb-3">
                                    <label className="form-label d-flex flex-start">Username</label>
                                    <input className="form-control" type="text" name="name" value={data.name} placeholder="Your username" onChange={handleOnchange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label d-flex flex-start">Email</label>
                                    <input className="form-control" type="text" name="email" value={data.email} placeholder="Your Email" onChange={handleOnchange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label d-flex flex-start">Password</label>
                                    <div className="d-flex justify-content-center align-items-center gap-3">
                                        <input className="form-control" type={showpassword ? "text" : "password"} name="password" value={data.password} onChange={handleOnchange} placeholder="Your password" required />
                                        <div style={{ cursor: "pointer" }} onClick={() => ShowPassword()}>
                                            <span>
                                                {
                                                    showpassword ? (
                                                        <FaEye />
                                                    ) : (

                                                        <FaEyeSlash />
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label d-flex flex-start">Comfirm Password</label>
                                    <div className="d-flex justify-content-center align-items-center gap-3">
                                        <input className="form-control" type={confirmshowpassword ? "text" : "password"} name="comfirmpassword" value={data.comfirmpassword} onChange={handleOnchange} placeholder="Your password" required />
                                        <div style={{ cursor: "pointer" }} onClick={() => setConfirmshowpassword(prev => !prev)}>
                                            <span>
                                                {
                                                    confirmshowpassword ? (
                                                        <FaEye />
                                                    ) : (

                                                        <FaEyeSlash />
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary " type="submit">Submit</button>
                            </Form>
                            <p>you have account? <span className="text-primary"> <Link to= "/Authan/Login"> Sign In </Link> </span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;