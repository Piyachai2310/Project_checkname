import React, { useEffect, useState } from 'react'

const Storename = () => {
    const [users, setUsers] = useState([]);

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
                console.log(users);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);


    return (
        <>
            <div className='container-fiuld'>
                <div className='row d-flex justify-content-between'>
                        <div className='row'>
                            <div className='col-10'>

                            </div>
                            <div className='col-2'>
                                <button >Create</button>
                            </div>
                        </div>
                        <div className='row mt-3 d-flex justify-content-between'>
                            {users.map((user, index) => (
                                <div className='col-3'>
                                    <div class="card shadow-sm">
                                        <svg class="bd-placeholder-img card-img-top" width="100%" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect></svg>
                                        <div class="card-body">
                                            <p class="card-text">{user.name}</p>
                                            <p class="card-text">{user.year}</p>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="btn-group gap-2">
                                                    <button type="button" class="btn btn-sm btn-outline-secondary bg-success text-white">Edit</button>
                                                    <button type="button" class="btn btn-sm btn-outline-secondary bg-danger text-white">delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
        </>
    )
}

export default Storename;
