import React from 'react'
import { useNavigate } from 'react-router-dom'


const MainPage = () => {
    const name = localStorage.getItem('name')
    const navigate = useNavigate();

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className='container-fluid d-flex flex-row justify-content-end align-items-center bg-light position-fixed top-0 border-bottom'>
                <form className="d-flex justify-content-center my-3 mx-auto w-100" role="search">
                    <div className='input-group' style={{maxWidth:'600px', height:'40px'}}>
                        <span className='input-group-text rounded-start-4'><i class="bi bi-search p-1"></i></span>
                        <input style={{boxShadow:'none'}} className="form-control rounded-end-4" type="search" placeholder="Search" aria-label="Search"/>
                    </div>
                </form>
                <div className='dropdown ms-3 p-0' style={{width:'50px'}}>
                    <a data-bs-toggle='dropdown' href='#' className='btn text-success px-2 py-0'>
                        <i className="bi bi-person-circle fs-2 m-0 p-0"></i>
                    </a>
                    <ul className='dropdown-menu dropdown-menu-end bg-light bg-gradient bg-opacity-50' style={{width:'150px', backdropFilter:'blur(5px)'}}>
                        <li>
                            <p className='text-center my-3 fw-bolder'>Welcome, {name}!</p>
                            <button
                                className='btn btn-outline-success dropdown-item text-center'
                                onClick={()=> {
                                    localStorage.removeItem('token');
                                    window.location.href = '/';
                                }}
                            >
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='d-flex flex-column justify-content-start align-items-center'>
                <div style={{maxWidth:'100%', height:'300px', marginTop:'68px'}} className=' bg-body w-100 text-center border-bottom mx-3 d-flex flex-column justify-content-center align-items-center'>
                    <div style={{maxWidth:'200px'}} className='w-100'>
                        <h5 className='fw-light'>Create new</h5>
                        <button 
                            style={{maxWidth:'160px', height:'120px'}} 
                            className='btn btn-light border border-success text-success w-100 m-3'
                            onClick={() => {
                                navigate('/CreateTemplate')
                            }}
                            >
                            <i class="bi bi-plus-square-dotted fs-1"></i>
                        </button>
                    </div>
                </div>
            </div> 
            <div style={{flexGrow:'1'}} className='d-flex flex-column justify-content-start align-items-center'>
                <div style={{maxWidth:'100%', height:'100%'}} className=' bg-light w-100 text-center mx-3 d-flex flex-column justify-content-start'>
                </div>
            </div> 
        </div>
    )
}

export default MainPage