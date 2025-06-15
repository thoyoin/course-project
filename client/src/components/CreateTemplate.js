import React, { useState } from 'react'
import Select from 'react-select';


const CreateTemplate = () => {
    const name = localStorage.getItem('name')
    const [description, setDescription] = useState('')
    const items = [
        {value: 'short text', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i class="bi bi-text-left me-3 ms-2"></i>
                Short text
            </span>)},
        {value: 'long text', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i class="bi bi-body-text me-3 ms-2"></i>
                Long text
            </span>)},
        {value: 'integer', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i class="bi bi-123 me-3 ms-2"></i>
                Integer
            </span>)},
        {value: 'checkbox', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i class="bi bi-check2-square me-3 ms-2"></i>
                Checkbox
            </span>)}
    ];
        
    return (
        <div>
            <div style={{height:'68px'}} className='container-fluid d-flex flex-row justify-content-start align-items-center position-fixed bg-light top-0 border-bottom'>
                <div className='ms-4'>
                    <a href='/MainPage' className='text-success'><i className="bi bi-file-earmark-text-fill fs-2"></i></a>
                </div>
                <div className='ms-4'>
                    <h4 className='fw-bold m-0'>New template</h4>
                </div>
                <div className='dropdown ms-3 p-0 ms-auto' style={{width:'50px'}}>
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
                <div style={{maxWidth:'800px', minHeight:'170px', marginTop:'80px'}} className=' bg-body w-100 text-center border rounded-4 mx-3 d-flex flex-column justify-content-start'>
                    <div style={{maxWidth:'800px', minHeight:'170px'}} className='bg-light w-100 text-center rounded-4'>
                        <div className="mb-3">
                            <input type="text" style={{outline:'none', boxShadow:'none', maxWidth:'800px'}} className="mt-4 fs-3 fw-bold form-control border-0 border-bottom border-success rounded-0 bg-light" placeholder='Template name'/>
                            <textarea 
                                ref={(el) => {
                                    if (el) {
                                    el.style.height = 'auto';
                                    el.style.height = `${el.scrollHeight}px`;
                                    }
                                }}
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                    setDescription(e.target.value);
                                }}
                                value={description}
                                style={{outline: 'none', boxShadow: 'none', maxWidth: '800px', overflow: 'hidden', resize: 'none'}}
                                className='form-control mt-4 border-0 border-bottom border-success rounded-0 bg-light'
                                placeholder='Enter description'
                            />
                        </div>
                    </div>
                </div>
                <div style={{maxWidth:'800px', height:'200px', marginTop:'15px'}} className=' bg-light w-100 mb-5 text-center border rounded-4 mx-3 d-flex flex-row justify-content-between'>
                    <div>
                        <input type="text" style={{outline:'none', boxShadow:'none', maxWidth:'300px'}} className="mt-4 fs-5 fw-bold form-control border-0 border-bottom border-success rounded-0 bg-light" placeholder='Question'/>
                    </div>
                    <div>
                        <Select
                            isSearchable={false}
                            options={items}
                            placeholder="Select question type"
                            classNamePrefix="react-select"
                            styles={{
                                container: (base) => ({ 
                                    ...base, 
                                    width: '300px', 
                                    margin:'15px'
                                }),
                                control: (base, state) => ({
                                    ...base,
                                    backgroundColor: '#f8f9fa',
                                    borderColor: state.isFocused ? '#198754' : '#ccc',
                                    boxShadow: state.isFocused ? '0 0 1px .2px #198754' : 'none',
                                    '&:hover': { borderColor: '#198754' },
                                    minHeight: '45px',
                                    fontWeight: 'light'
                                }),
                                menu: (base) => ({
                                    ...base,
                                    borderRadius: '8px',
                                    padding: '5px',
                                    backdropFilter:'blur(3px)',
                                    backgroundColor: 'rgba(248, 249, 250, 0.5)'
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    color: 'black',
                                    padding: '10px',
                                    marginBottom: '5px',
                                    borderRadius: '5px',
                                    backgroundColor: state.isSelected ? 'rgba(210, 211, 212, 0.38)' : state.isFocused ? 'rgba(233, 233, 233, 0.38)' : '',
                                    cursor: 'pointer',
                                }),
                            }}
                        />
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default CreateTemplate