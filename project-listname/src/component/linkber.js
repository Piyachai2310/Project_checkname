import React from 'react'

const Linkber = () => {
    return (
        <>
            <div class="container-fluid my-1">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb breadcrumb-chevron p-3 bg-body-tertiary rounded-3">
                        <li class="breadcrumb-item">
                            <span class="">Home</span>
                        </li>
                        <li class="breadcrumb-item">
                            <a class="link-body-emphasis fw-semibold text-decoration-none" href="#">Library</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            Data
                        </li>
                    </ol>
                </nav>
            </div>
        </>
    )
}

export default Linkber;
