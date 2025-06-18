import React, { useState, useRef } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Creatable from 'react-select/creatable';


const CreateTemplate = () => {
    const name = localStorage.getItem('name');
    const [description, setDescription] = useState('');
    const [optionError, setOptionError] = useState('');
    const [typeError, setTypeError] = useState('');
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

    const themes = [
        {value: 'education',
            label: 'Education'
        },
        {value: 'quiz',
            label: 'Quiz'
        },
        {value: 'poll',
            label: 'Poll'
        },
        {value: 'other',
            label: 'Other'
        }
    ]

    const tags = [

    ];

    const animatedComponents = makeAnimated()

    return (
        <div>
            <div style={{height:'68px', zIndex:'100'}} className='container-fluid d-flex flex-row justify-content-start align-items-center position-fixed bg-body-tertiary top-0 border-bottom'>
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
                    <ul className='dropdown-menu dropdown-menu-end bg-transparent bg-opacity-50' style={{width:'150px', backdropFilter:'blur(3px)'}}>
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
                    <div style={{maxWidth:'800px', minHeight:'170px'}} className='bg-body-tertiary w-100 text-center rounded-4'>
                        <div className="mb-3">
                            <div className='d-flex flex-row'>
                                <input type="text" style={{outline:'none', boxShadow:'none', maxWidth:'800px'}} className="mt-4 fs-3 fw-bold form-control border-0 border-bottom border-success rounded-0 bg-body-tertiary" placeholder='Template name'/>
                                <Select
                                    options={themes}
                                    isSearchable={false}
                                    isClearable={false}
                                    placeholder="Theme"
                                    classNamePrefix="react-select"
                                    styles={{
                                        container: (base) => ({ 
                                            ...base, 
                                            minWidth: '210px', 
                                            margin:'15px',
                                        }),
                                        control: (base, state) => ({
                                            ...base,
                                            backgroundColor: 'bg-body-tertiary',
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
                                            backdropFilter:'blur(5px)',
                                            backgroundColor: 'bg-body-tertiary',
                                            zIndex:'10'
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            padding: '10px',
                                            marginBottom: '5px',
                                            borderRadius: '5px',
                                            backgroundColor: state.isSelected ? 'rgba(210, 211, 212, 0.38)' : state.isFocused ? 'rgba(233, 233, 233, 0.19)' : '',
                                            cursor: 'pointer',
                                        }),
                                    }}
                                />
                            </div>
                            <div className='d-flex flex-column'>
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
                                    className='form-control mt-4 border-0 border-bottom border-success rounded-0 bg-body-tertiary'
                                    placeholder='Enter description'
                                />
                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <Creatable
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            placeholder='Enter tags...'
                                            isMulti
                                            options={tags}
                                            styles={{
                                                container: (base) => ({ 
                                                    ...base, 
                                                    minWidth: '210px',
                                                    margin:'15px 15px 1px 15px',
                                                }),
                                                control: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: 'bg-body-tertiar',
                                                    borderColor: state.isFocused ? '#198754' : '#ccc',
                                                    boxShadow: state.isFocused ? '0 0 1px .2px #198754' : 'none',
                                                    '&:hover': { borderColor: '#198754' },
                                                    maxHeight: '30px',
                                                    fontWeight: 'light'
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    borderRadius: '8px',
                                                    padding: '5px 0 5px 0',
                                                    backdropFilter:'blur(3px)',
                                                    backgroundColor: 'bg-transparent',
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    padding: '5px',
                                                    backgroundColor: state.isSelected ? 'rgba(210, 211, 212, 0.38)' : state.isFocused ? 'rgba(233, 233, 233, 0.38)' : '',
                                                    cursor: 'pointer',
                                                    maxHeight: '40px'
                                                }),
                                            }}
                                        />
                                        <div style={{height:'30px', margin:'15px 15px 0 0', width:'80px'}} className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off"/>
                                            <label className="btn btn-outline-success p-1" for="btnradio1"><i className="bi bi-unlock"></i></label>
    
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off"/>
                                            <label className="btn btn-outline-success p-1" for="btnradio2"><i className="bi bi-incognito"></i></label>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                {newQuestion.map((q,index) => (
                    <div key={q.id} className='mb-4 w-100'>
                        <div className='d-flex flex-row w-100 justify-content-center align-items-center'>
                            <div style={{maxWidth:'745px', minHeight:'200px', marginTop:'15px'}} className='bg-body-tertiary w-100 text-center border rounded-4 mx-3 d-flex flex-column justify-content-start'>
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
                                                className='form-control mt-4 w-100 fs-5 border-0 border-bottom border-success rounded-0 bg-body-tertiary'
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
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary:'rgba(123, 122, 122, 0.38)',
                                                    primary50:'rgba(123, 122, 122, 0.38)',
                                                    neutral80: 'white'
                                                }
                                            })}
                                            onChange={(selected) => {
                                                const updated = [...newQuestion];
                                                updated[index].questionType = selected?.value;
                                                setNewQuestion(updated);
                                            }}
                                            styles={{
                                                container: (base) => ({ 
                                                    ...base, 
                                                    minWidth: '120px', 
                                                    margin:'15px',
                                                }),
                                                control: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: 'bg-body-tertiary',
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
                                                    backgroundColor: 'bg-transparent'
                                                }),
                                                option: (base, state) => ({
                                                    ...base,

                                                    padding: '10px',
                                                    marginBottom: '5px',
                                                    borderRadius: '5px',
                                                    backgroundColor: state.isSelected ? 'rgba(210, 211, 212, 0.38)' : state.isFocused ? 'rgba(233, 233, 233, 0.19)' : '',
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
                                        className='form-control mt-2 mb-5 w-50 border-top-0 border-start-0 border-end-0 border-secondary-subtle rounded-0 bg-body-tertiary'
                                        placeholder='Short answer'
                                        disabled
                                        />
                                    )}
                                    {q.questionType === 'long text' && (
                                        <input
                                        style={{borderBottom:'1px dashed'}}
                                        type='text'
                                        className='form-control mt-2 mb-5 w-75 border-top-0 border-start-0 border-end-0 border-secondary-subtle rounded-0 bg-body-tertiary'
                                        placeholder='Detailed answer'
                                        disabled
                                        />
                                    )}
                                    {q.questionType === 'integer' && (
                                        <input
                                        style={{borderBottom:'1px dashed'}}
                                        type='number'
                                        className='form-control mt-2 mb-5 w-50 border-top-0 border-start-0 border-end-0 border-secondary-subtle rounded-0 bg-body-tertiary'
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
                                            className='form-control mt-2 w-100 border-top-0 border-start-0 border-end-0 border-success rounded-0 bg-body-tertiary'
                                            placeholder={`Option ${idx + 1}`}
                                            value={opt}
                                            onChange={(e) => {
                                                const updated = [...newQuestion];
                                                updated[index].checkboxOptions[idx] = e.target.value;
                                                setNewQuestion(updated);
                                            }}
                                            />
                                            <button
                                            className="btn mx-2 px-1 py-0"
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
                                            className='btn '
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
                            <div className='btn-group dropend h-100'>
                                <button 
                                    className='btn rounded-top-4 rounded-bottom-0 h-100 border border-bottom-0'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    <i className="bi bi-plus-circle fs-5"></i>
                                </button>
                                <ul className='dropdown-menu bg-body-tertiary rounded-3' style={{backdropFilter:'blur(3px)', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                                    {items.map((item) => (
                                        <li key={item.value} className='d-flex justify-content-center align-items-center' style={{height:'35px'}}>
                                            <button
                                                className='dropdown-item btn btn-light rounded-3'
                                                style={{maxWidth:'130px', height:'35px'}}
                                                type='button'
                                                onClick={() => {
                                                    const typeCounts = newQuestion.reduce((acc, q) => {
                                                        acc[q.questionType] = (acc[q.questionType] || 0) + 1;
                                                        return acc;
                                                    }, {});
                                                    const currentCount = typeCounts[item.value] || 0;
                                                    if (currentCount >= 4) {
                                                        setTypeError(`Maximum 4 ${item.value} questions allowed.`);
                                                        setTimeout(() => {
                                                            setTypeError('');
                                                        }, 4000);
                                                        return;
                                                    }
                                                    setNewQuestion([
                                                        ...newQuestion,
                                                        {
                                                            id: Date.now(),
                                                            text: '',
                                                            questionType: item.value,
                                                            checkboxOptions: [''],
                                                            image: null
                                                        }
                                                    ]);
                                                }}
                                            >
                                                {item.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button 
                                className='btn rounded-bottom-4 rounded-top-0 h-100 border border-top-0'
                                onClick={() => {
                                    const updated = newQuestion.filter(q => q.id !== newQuestion[index].id);
                                    if (newQuestion.length > 1)
                                    setNewQuestion(updated)
                                }}
                            >
                                <i className="bi bi-trash fs-5"></i>
                            </button>
                        </div>
                    </div>
                </div> 
                ))}
                {typeError && <div style={{zIndex:'100', bottom:'0', backdropFilter:'blur(3px)', backgroundColor: 'rgba(249, 231, 74, 0.4)'}} className="alert alert-light position-fixed fw-bold" role="alert">{typeError}</div>}
            </div>
        </div>
    )
}

export default CreateTemplate