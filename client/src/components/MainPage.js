import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogOutBtn from './LogOutBtn'

const MainPage = () => {
    const navigate = useNavigate();

    const createNewTemplate = async () => {
        try {
            const response = await fetch('/api/templates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    templateName: 'New Template',
                    description: '',
                    tags: [],
                    visibility: 'private',
                    questions: [],
                }),
            });

            const text = await response.text()

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${text}`);
            }

            const data = JSON.parse(text);

            console.log('Template created:', data);
            navigate(`/CreateTemplate/${data.id}`)

        } catch (error) {
            console.error('Error creating template:', error);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className='container-fluid d-flex flex-row justify-content-end align-items-center bg-body-tertiary position-fixed top-0 border-bottom'>
                <form className="d-flex justify-content-center my-3 mx-auto w-100" role="search">
                    <div className='input-group' style={{maxWidth:'600px', height:'40px'}}>
                        <span className='input-group-text rounded-start-4'><i className="bi bi-search p-1"></i></span>
                        <input style={{boxShadow:'none'}} className="form-control rounded-end-4" type="search" placeholder="Search" aria-label="Search"/>
                    </div>
                </form>
                <LogOutBtn/>
            </div>
            <div className='d-flex flex-column justify-content-start align-items-center'>
                <div style={{maxWidth:'100%', height:'300px', marginTop:'68px'}} className='bg-body w-100 text-center border-bottom mx-3 d-flex flex-row justify-content-center align-items-center'>
                    <div style={{maxWidth:'200px'}} className='w-100'>
                        <h5 className='fw-light'>Create new</h5>
                        <button 
                            style={{maxWidth:'160px', height:'120px'}} 
                            className='btn btn-outline-light border border-success text-success w-100 m-3'
                            onClick={createNewTemplate}
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