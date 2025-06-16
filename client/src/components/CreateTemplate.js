import React, { useState, useRef } from 'react'
import Select from 'react-select';


const CreateTemplate = () => {
    const name = localStorage.getItem('name');
    const [description, setDescription] = useState('');
    const [optionError, setOptionError] = useState('');
    const [questionImage, setQuestionImage] = useState(null)
    const [newQuestion, setNewQuestion] = useState([
        {
            id: Date.now(),
            text: '',
            questionType: 'short text',
            checkboxOptions: [''],
            image: null
        }
    ]);
    const fileInputRef = useRef();

    const items = [
        {value: 'short text', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i className="bi bi-text-left me-3 ms-2"></i>
                Short text
            </span>)},
        {value: 'long text', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i className="bi bi-body-text me-3 ms-2"></i>
                Long text
            </span>)},
        {value: 'integer', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i className="bi bi-123 me-3 ms-2"></i>
                Integer
            </span>)},
        {value: 'checkbox', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i class="bi bi-check2-square me-3 ms-2"></i>
                Checkbox
            </span>)}
    ];

    const addNewQuestion = () => {
        setNewQuestion([
            ...newQuestion,
            {
                id: Date.now(),
                text: '',
                questionType: 'short text',
                checkboxOptions: [''],
                image: null
            }
        ]);
    }
        
    return (
        <div>
            <div style={{height:'68px', zIndex:'100'}} className='container-fluid d-flex flex-row justify-content-start align-items-center position-fixed bg-light top-0 border-bottom'>
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
                <div style={{maxWidth:'800px', minHeight:'170px', marginTop:'80px'}} className='bg-body w-100 text-center border rounded-4 mx-3 d-flex flex-column justify-content-start'>
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
                {newQuestion.map((q,index) => (
                    <div key={q.id} className='mb-4 w-100'>
                        <div className='d-flex flex-row w-100 justify-content-center align-items-center'>
                            <div style={{maxWidth:'745px', minHeight:'200px', marginTop:'15px'}} className='bg-light w-100 text-center border rounded-4 mx-3 d-flex flex-column justify-content-start'>
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
                                                    const updated = [...newQuestion];
                                                    updated[index].text = e.targer.value;
                                                    setNewQuestion(updated)
                                                }}
                                                value={q.text}
                                                style={{outline: 'none', boxShadow: 'none', overflow: 'hidden', resize: 'none'}}
                                                className='form-control mt-4 w-100 fs-5 border-0 border-bottom border-success rounded-0 bg-light'
                                                placeholder='Question'
                                            />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <i 
                                            className="bi bi-card-image fs-3 text-secondary"
                                            role='button'
                                            onClick={() => fileInputRef.current.click()}
                                            title='Attach image'
                                            >
                                        </i>
                                        {questionImage && 
                                            <i 
                                                className="bi bi-x-lg fs-5 ms-3"
                                                onClick={() => setQuestionImage(null)}
                                                style={{cursor:'pointer'}}
                                            ></i>
                                        }
                                        <input
                                            type='file'
                                            accept='image/*'
                                            ref={fileInputRef}
                                            style={{display:'none'}}
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (!file ) return;
                                                const formData = new FormData();
                                                formData.append('file', file)
                                                formData.append('upload_preset', 'template_Images')
                                                try {
                                                    const res = await fetch('https://api.cloudinary.com/v1_1/dhbcwjaky/image/upload', {
                                                        method: 'POST',
                                                        body: formData
                                                    });
                                                    const data = await res.json();
                                                    setQuestionImage(data.secure_url);
                                                } catch (err) {
                                                    console.error('Image upload failed', err);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            isSearchable={false}
                                            options={items}
                                            value={items.find(item => item.value === q.questionType)}
                                            placeholder="Select question type"
                                            classNamePrefix="react-select"
                                            onChange={(selected) => {
                                                const updated = [...newQuestion];
                                                updated[index].questionType = selected?.value;
                                                setNewQuestion(updated);
                                            }}
                                            styles={{
                                                container: (base) => ({ 
                                                    ...base, 
                                                    maxWidth: '300px', 
                                                    margin:'15px',
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
                                {questionImage && (
                                    <div className='w-100 px-4 my-3 d-flex flex-column justify-content-start align-items-center position-relative'>
                                        <img style={{maxHeight:'200px'}} src={questionImage} alt='questionImage' className='img-fluid rounded'></img>
                                    </div>
                                )}
                                <div className='d-flex flex-row justify-content-between'>
                                    {q.questionType === 'short text' && (
                                        <input
                                        style={{borderBottom:'1px dashed'}}
                                        type='text'
                                        className='form-control mt-2 mb-5 w-50 border-top-0 border-start-0 border-end-0 border-secondary-subtle rounded-0 bg-light'
                                        placeholder='Short answer'
                                        disabled
                                        />
                                    )}
                                    {q.questionType === 'long text' && (
                                        <input
                                        style={{borderBottom:'1px dashed'}}
                                        type='text'
                                        className='form-control mt-2 mb-5 w-75 border-top-0 border-start-0 border-end-0 border-secondary-subtle rounded-0 bg-light'
                                        placeholder='Detailed answer'
                                        disabled
                                        />
                                    )}
                                    {q.questionType === 'integer' && (
                                        <input
                                        style={{borderBottom:'1px dashed'}}
                                        type='number'
                                        className='form-control mt-2 mb-5 w-50 border-top-0 border-start-0 border-end-0 border-secondary-subtle rounded-0 bg-light'
                                        placeholder='123'
                                        disabled
                                        min={0}
                                        />
                                    )}
                                    {q.questionType === 'checkbox' && (
                                    <div className='w-100'>
                                        {q.checkboxOptions.map((opt, idx) => (
                                        <div key={idx} className='d-flex flex-row align-items-end mb-3'>
                                            <i className="bi bi-app fs-4 ms-4 me-3"></i>
                                            <input
                                            style={{ outline: 'none', boxShadow: 'none' }}
                                            type='text'
                                            className='form-control mt-2 w-100 border-top-0 border-start-0 border-end-0 border-success rounded-0 bg-light'
                                            placeholder={`Option ${idx + 1}`}
                                            value={opt}
                                            onChange={(e) => {
                                                const updated = [...newQuestion];
                                                updated[index].checkboxOptions[idx] = e.target.value;
                                                setNewQuestion(updated);
                                            }}
                                            />
                                            <button
                                            className="btn btn-light mx-2"
                                            onClick={() => {
                                                if (q.checkboxOptions.length > 1) {
                                                const updated = [...newQuestion];
                                                updated[index].checkboxOptions.splice(idx, 1);
                                                setNewQuestion(updated);
                                                }
                                            }}
                                            disabled={q.checkboxOptions.length === 1}
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
                                            if (q.checkboxOptions.length < 4) {
                                                const updated = [...newQuestion]
                                                updated[index].checkboxOptions.push('');
                                                setNewQuestion(updated);
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
                        <div style={{maxWidth:'40px', height:'150px', marginTop:'15px'}} className="w-100 rounded-4 me-3 d-flex flex-column justify-content-center align-items-center">
                            <button 
                                className='btn btn-light rounded-top-4 rounded-bottom-0 h-100 border border-bottom-0'
                                onClick={addNewQuestion}
                            >
                                <i class="bi bi-plus-circle fs-5"></i>
                            </button>
                            <button 
                                className='btn btn-light rounded-bottom-4 rounded-top-0 h-100 border border-top-0'
                                onClick={() => {
                                    const updated = newQuestion.filter(q => q.id !== newQuestion[index].id);
                                    if (newQuestion.length > 1)
                                    setNewQuestion(updated)
                                }}
                            >
                                <i class="bi bi-trash fs-5"></i>
                            </button>
                        </div>
                    </div>
                </div> 
                ))}
            </div>
        </div>
    )
}

export default CreateTemplate