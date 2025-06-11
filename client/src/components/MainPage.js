import React from 'react'

const MainPage = () => {
    return (
        <div className='container-fluid bg-light position-fixed top-0'>
                <form className="d-flex justify-content-center my-3" role="search">
                    <div className='input-group' style={{width:'600px', height:'40px'}}>
                        <span className='input-group-text rounded-start-4'><i class="bi bi-search p-1"></i></span>
                        <input style={{boxShadow:'none'}} className="form-control rounded-end-4" type="search" placeholder="Search" aria-label="Search"/>
                    </div>
                </form>
        </div>
    )
}

export default MainPage