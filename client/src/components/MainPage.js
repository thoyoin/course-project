import React from 'react'
import { useNavigate } from 'react-router-dom'


const MainPage = () => {
    const name = localStorage.getItem('name')
    const navigate = useNavigate();

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className='container-fluid d-flex flex-row justify-content-end align-items-center bg-body-tertiary position-fixed top-0 border-bottom'>
                <form className="d-flex justify-content-center my-3 mx-auto w-100" role="search">
                    <div className='input-group' style={{maxWidth:'600px', height:'40px'}}>
                        <span className='input-group-text rounded-start-4'><i className="bi bi-search p-1"></i></span>
                        <input style={{boxShadow:'none'}} className="form-control rounded-end-4" type="search" placeholder="Search" aria-label="Search"/>
                    </div>
                </form>
                <div className='dropdown ms-3 p-0' style={{width:'50px'}}>
                    <a data-bs-toggle='dropdown' href='#' className='btn text-success px-2 py-0'>
                        <i className="bi bi-person-circle fs-2 m-0 p-0"></i>
                    </a>
                    <ul className='dropdown-menu dropdown-menu-end bg-transparent bg-opacity-50' style={{width:'150px', backdropFilter:'blur(3px)'}}>
                        <li className='text-center'>
                            <p className='text-center my-3 fw-bolder'>Welcome, {name}!</p>
                            <div className="btn-group mb-4" role="group" aria-label="Базовая группа переключателей радио">
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off"/>
                                <label className="btn btn-outline-success px-2" htmlFor="btnradio1"><i class="bi bi-brightness-low"></i></label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" defaultChecked/>
                                <label className="btn btn-outline-success px-2" htmlFor="btnradio2"><i className="bi bi-circle-half"></i></label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off"/>
                                <label className="btn btn-outline-success px-2" htmlFor="btnradio3"><i className="bi bi-moon"></i></label>
                            </div>
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
                <div style={{maxWidth:'100%', height:'300px', marginTop:'68px'}} className='bg-body w-100 text-center border-bottom mx-3 d-flex flex-row justify-content-center align-items-center'>
                    <div style={{maxWidth:'200px'}} className='w-100'>
                        <h5 className='fw-light'>Create new</h5>
                        <button 
                            style={{maxWidth:'160px', height:'120px'}} 
                            className='btn btn-outline-light border border-success text-success w-100 m-3'
                            onClick={() => {
                                navigate('/CreateTemplate')
                            }}
                            >
                            <i className="bi bi-plus-square-dotted fs-1"></i>
                        </button>
                    </div>
                </div>
            </div> 
            <div style={{flexGrow:'1'}} className='d-flex flex-column justify-content-start align-items-center'>
                <div style={{maxWidth:'100%', height:'100%'}} className='bg-body-tertiary w-100 text-center mx-3 d-flex flex-column justify-content-start'>
                </div>
            </div> 
        </div>
    )
}

export default MainPage