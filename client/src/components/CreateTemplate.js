import React, { useState } from 'react'
import Select from 'react-select';


const CreateTemplate = () => {
    const name = localStorage.getItem('name')
    const [description, setDescription] = useState('')
    const [questionType, setQuestionType] = useState('short text')
    const [checkboxOptions, setCheckboxOptions] = useState(['']);
    const [optionError, setOptionError] = useState('');

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
                <div style={{maxWidth:'800px', minHeight:'200px', marginTop:'15px'}} className=' bg-light w-100 mb-5 text-center border rounded-4 mx-3 d-flex flex-column justify-content-start'>
                    <div className='d-flex flex-row justify-content-between'>
                        <div className='w-100' style={{maxWidth:'300px'}}>
                            <textarea 
                                    ref={(el) => {
                                        if (el) {
                                        el.style.height = '40px';
                                        el.style.height = `${el.scrollHeight}px`;
                                        }
                                    }}
                                    onInput={(e) => {
                                        e.target.style.height = '40px';
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}
                                    style={{outline: 'none', boxShadow: 'none', overflow: 'hidden', resize: 'none'}}
                                    className='form-control mt-4 w-100 fs-5 border-0 border-bottom border-success rounded-0 bg-light'
                                    placeholder='Question'
                                />
                        </div>
                        <div>
                            <Select
                                isSearchable={false}
                                options={items}
                                defaultValue={items[0]}
                                placeholder="Select question type"
                                classNamePrefix="react-select"
                                onChange={(selected) => setQuestionType(selected?.value)}
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
                    <div className='d-flex flex-row justify-content-between'>
                        {questionType === 'short text' && (
                            <input
                            style={{borderBottom:'1px dashed'}}
                            type='text'
                            className='form-control mt-2 w-50 border-top-0 border-start-0 border-end-0 border-secondary-subtle rounded-0 bg-light'
                            placeholder='Short answer'
                            disabled
                            />
                        )}
                        {questionType === 'long text' && (
                            <input
                            style={{borderBottom:'1px dashed'}}
                            type='text'
                            className='form-control mt-2 w-75 border-top-0 border-start-0 border-end-0 border-secondary-subtle rounded-0 bg-light'
                            placeholder='Detailed answer'
                            disabled
                            />
                        )}
                        {questionType === 'integer' && (
                            <input
                            style={{borderBottom:'1px dashed'}}
                            type='number'
                            className='form-control mt-2 w-50 border-top-0 border-start-0 border-end-0 border-secondary-subtle rounded-0 bg-light'
                            placeholder='123'
                            disabled
                            min={0}
                            />
                        )}
                        {questionType === 'checkbox' && (
                          <div className='w-100'>
                            {checkboxOptions.map((opt, idx) => (
                              <div key={idx} className='d-flex flex-row align-items-end mb-3'>
                                <i className="bi bi-app fs-4 ms-4 me-3"></i>
                                <input
                                  style={{ outline: 'none', boxShadow: 'none' }}
                                  type='text'
                                  className='form-control mt-2 w-100 border-top-0 border-start-0 border-end-0 border-success rounded-0 bg-light'
                                  placeholder={`Option ${idx + 1}`}
                                  value={opt}
                                  onChange={(e) => {
                                    const updated = [...checkboxOptions];
                                    updated[idx] = e.target.value;
                                    setCheckboxOptions(updated);
                                  }}
                                />
                                <button
                                  className="btn btn-light mx-2"
                                  onClick={() => {
                                    if (checkboxOptions.length > 1) {
                                      const updated = [...checkboxOptions];
                                      updated.splice(idx, 1);
                                      setCheckboxOptions(updated);
                                    }
                                  }}
                                  disabled={checkboxOptions.length === 1}
                                >
                                  <i className="bi bi-x-lg"></i>
                                </button>
                              </div>
                            ))}
                            <div className='d-flex flex-row align-items-center mb-3'>
                              <i className="bi bi-app fs-4 ms-4 me-3"></i>
                              <button
                                className='btn btn-light'
                                onClick={() => {
                                  if (checkboxOptions.length < 4) {
                                    setCheckboxOptions([...checkboxOptions, '']);
                                    setOptionError('');
                                  } else {
                                    setOptionError('Maximum 4 options allowed.');
                                    setTimeout(() => {
                                      setOptionError('');
                                    }, 3000);
                                  }
                                }}
                              >
                                Add option
                              </button>
                              {optionError && (
                                <span className="text-danger ms-3 small">{optionError}</span>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default CreateTemplate