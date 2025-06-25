import React, { useState, useRef, useEffect } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Creatable from 'react-select/creatable';
import { useFormik } from 'formik';
import useLocalStorage from 'react-localstorage-hook';
import LogOutBtn from './LogOutBtn';
import ModalPublishBtn from './ModalPublishBtn';
import ChangeLang from './ChangeLang';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CreateTemplate = () => {
    const navigate = useNavigate();
    const [typeError, setTypeError] = useState('');
    const [deleteAlert, setDeleteAlert] = useState('');
    const [optionError, setOptionError] = useState('');
    const [colorMode, setColorMode] = useState(localStorage.getItem('theme'))
    const [questionImage, setQuestionImage] = useState(null)
    const [isNavigating, setIsNavigating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const { t } = useTranslation();

    const { templateId } = useParams();

    const storageKey = `template-${templateId || 'new'}`;

    const [savedForm, setSavedForm] = useLocalStorage(storageKey, {
        templateName: '',
        description: '',
        newQuestion: [{
            id: Date.now(),
            text: '',
            questionType: 'short text',
            checkboxOptions: [''],
            image: null,
        }],
        tags: [],
        visibility: 'public',
    });

    useEffect(() => {
        const fetchTemplate = async () => {
            const response = await fetch(`https://course-project-back-tv8f.onrender.com/api/templates/${templateId}`);
            const data = await response.json();
            
        if (data) {
            const localData = localStorage.getItem('savedForm');
            if (!localData || localData === '{}' || localData === 'null') {
                setSavedForm({
                    ...data,
                    newQuestion: data.newQuestion || [{
                        id: Date.now(),
                        text: '',
                        questionType: 'short text',
                        checkboxOptions: [''],
                        image: null,
                    }],
                });
                } else {
                    console.log('Skipped overwriting: localStorage has data');
                }
        };
        }

        if (templateId) {
            fetchTemplate();
            } else {
                const localDraft = localStorage.getItem('savedForm');
                if (!localDraft) {
                setSavedForm({
                    templateName: '',
                    description: '',
                    newQuestion: [{
                        id: Date.now(),
                        text: '',
                        questionType: 'short text',
                        checkboxOptions: [''],
                        image: null,
                    }],
                    tags: [],
                    visibility: 'public',
                });
                }
            }
        }, [templateId]);

    const initialValues = React.useMemo(() => savedForm, [savedForm]);
    
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            setSavedForm(values);
        }
    })

    const handleAddOption = (index) => {
        const updatedQuestions = [...formik.values.newQuestion];
        if (updatedQuestions[index].checkboxOptions.length < 4) {
            updatedQuestions[index].checkboxOptions.push('');
            formik.setFieldValue('newQuestion', updatedQuestions);
        } else {
            setOptionError(`Maximum 4 options allowed.`);
            setTimeout(() => {
                setOptionError('');
            }, 3000);
            return;
        }
    };

    const handleAddQuestion = (type) => {
        const typeCounts = formik.values.newQuestion.reduce((acc, q) => {
            acc[q.questionType] = (acc[q.questionType] || 0) + 1;
            return acc;
        }, {});
        const currentCount = typeCounts[type] || 0;
        const updatedQuestions = [...formik.values.newQuestion];
        if (currentCount >= 4) {
            setTypeError(`Maximum 4 ${type} questions allowed.`);
            setTimeout(() => {
                setTypeError('');
            }, 4000);
            return;
        }
        updatedQuestions.push({
            id: Date.now(),
            text: '',
            questionType: type,
            checkboxOptions: [''],
            image: null,
        });
        formik.setFieldValue('newQuestion', updatedQuestions);
    };

    useEffect(() => {
        setSavedForm(formik.values);
    }, [formik.values, templateId]);

    const fileInputRef = useRef();

    useEffect(() => {
        setColorMode(colorMode)
    }, []);

    const items = [
        {value: 'short text', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i className="bi bi-text-left me-3 ms-2"></i>
                {t('short-text')}
            </span>)},
        {value: 'long text', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i className="bi bi-body-text me-3 ms-2"></i>
                {t('long-text')}
            </span>)},
        {value: 'integer', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i className="bi bi-123 me-3 ms-2"></i>
                {t('int')}
            </span>)},
        {value: 'checkbox', 
        label: (
            <span className='d-flex flex-row align-items-center'>
                <i className="bi bi-check2-square me-3 ms-2"></i>
                {t('checkbox')}
            </span>)}
    ];

    const themes = [
        {value: 'education',
            label: (
                <span>{t('education')}</span>
            ),
        },
        {value: 'quiz',
            label: (
                <span>{t('quiz')}</span>
            ),
        },
        {value: 'poll',
            label: (
                <span>{t('poll')}</span>
            ),
        },
        {value: 'other',
            label: (
                <span>{t('other')}</span>
            ),
        }
    ]

    const tags = [];

    const animatedComponents = makeAnimated()

    const handleDeleteTemplate = async () => {
        try {
            const response = await fetch(`https://course-project-back-tv8f.onrender.com/api/templates/${templateId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete template')
            }
            
            setDeleteAlert('Template deleted successfully!')
            setTimeout(() => {
                setDeleteAlert('')
                navigate('/MainPage');
            }, 1000);
        } catch (err) {
            console.error('Error deleting template:', err);
        }
    }

/*     useEffect(() => {
        const handleBeforeUnload = async (event) => {
            if (!isNavigating) {
                event.preventDefault();
                await saveTemplateToServer();
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            if (!isNavigating) {
                saveTemplateToServer();
            }
        };
    }, [templateId, isNavigating]); */

/*     const handleNavigateToMainPage = async (event) => {
        event.preventDefault();
        setIsNavigating(true);
        setIsSaving(true)
        try {
            await saveTemplateToServer();
            navigate('/MainPage');
        } catch (error) {
            console.error('Failed to save template before navigating:', error);
        } finally {
            setIsNavigating(false);
            setIsSaving(false);
        }
    }; */

    return (
        <div>
            <div style={{height:'68px', zIndex:'100'}} className='container-fluid d-flex flex-row justify-content-between align-items-center position-fixed bg-body-tertiary top-0 border-bottom'>
                <div className='ms-4 d-flex flex-row align-items-center gap-4'>
                    <a href='/MainPage' className='text-success' onClick={() => navigate('/MainPage')}><i className="bi bi-file-earmark-text-fill fs-2"></i></a>
                    <h4 className='fw-bold m-0'>New template</h4>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    <button 
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        style={{height:'35px'}} 
                        className='btn btn-danger mx-5 px-3 py-2 d-flex flex-row align-items-center'
                    >
                        <i className="bi bi-trash me-2"></i>
                        {t('delete')}
                    </button>
                    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{t('sure?')}</h1>
                            </div>
                            <div className="modal-footer ">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('cancel')}</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => {
                                    handleDeleteTemplate();
                                }}>{t('delete')}</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <ModalPublishBtn templateId={templateId} formikValues={formik.values}/>
                    <ChangeLang/>
                    <LogOutBtn/>
                </div>
            </div>
            <div className='d-flex flex-column justify-content-start align-items-center'>
                <div style={{maxWidth:'800px', minHeight:'170px', marginTop:'80px'}} className='bg-body w-100 text-center border rounded-4 mx-3 d-flex flex-column justify-content-start'>
                    <div style={{maxWidth:'800px', minHeight:'170px'}} className='bg-body-tertiary w-100 text-center rounded-4'>
                        <div className="mb-3">
                            <div className='d-flex flex-row'>
                                <input 
                                    type="text" 
                                    name='templateName'
                                    style={{outline:'none', boxShadow:'none', maxWidth:'800px'}} 
                                    className="mt-4 fs-3 fw-bold form-control border-0 border-bottom border-success rounded-0 bg-body-tertiary" 
                                    placeholder={t('template-name')}
                                    value={formik.values.templateName}
                                    onChange={formik.handleChange}
                                    />
                                <Select
                                    options={themes}
                                    isSearchable={false}
                                    isClearable={false}
                                    placeholder={t('theme')}
                                    classNamePrefix="react-select"
                                    value={themes.find((theme) => theme.value === formik.values.theme)} 
                                    onChange={(selectedOption) => {
                                        formik.setFieldValue('theme', selectedOption ? selectedOption.value : '');
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary:'rgba(123, 122, 122, 0.38)',
                                            primary50:'rgba(123, 122, 122, 0.38)',
                                            neutral80: colorMode === 'dark' ? 'white' : 'black'
                                        }
                                    })}
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
                                        formik.setFieldValue('description', e.target.value);
                                    }}
                                    name='description'
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    style={{outline: 'none', boxShadow: 'none', maxWidth: '800px', overflow: 'hidden', resize: 'none'}}
                                    className='form-control mt-4 border-0 border-bottom border-success rounded-0 bg-body-tertiary'
                                    placeholder={t('description')}
                                />
                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <Creatable
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            placeholder={t('tags')}
                                            isMulti
                                            name='tags'
                                            options={tags}
                                            value={formik.values.tags}
                                            onChange={(selectedOptions) => {
                                                formik.setFieldValue('tags', selectedOptions || []);
                                            }}
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary:'rgba(123, 122, 122, 0.38)',
                                                    primary50:'rgba(123, 122, 122, 0.38)',
                                                    neutral80: colorMode === 'dark' ? 'white' : 'black',
                                                    neutral10: 'transparent'
                                                }
                                            })}
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
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                {formik.values.newQuestion?.map((q,index) => (
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
                                                    const updated = [...formik.values.newQuestion];
                                                    updated[index].text = e.target.value;
                                                    formik.setFieldValue('newQuestion', updated)
                                                }}
                                                name='text'
                                                value={q.text}
                                                onChange={formik.handleChange}
                                                style={{outline: 'none', boxShadow: 'none', overflow: 'hidden', resize: 'none'}}
                                                className='form-control mt-4 w-100 fs-5 border-0 border-bottom border-success rounded-0 bg-body-tertiary'
                                                placeholder={t('question')}
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
                                                    neutral80: colorMode === 'dark' ? 'white' : 'black'
                                                }
                                            })}
                                            onChange={(selectedOption) => {
                                                const updatedQuestions = [...formik.values.newQuestion];
                                                updatedQuestions[index].questionType = selectedOption.value;
                                                formik.setFieldValue('newQuestion', updatedQuestions);
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
                                        placeholder={t('short')}
                                        disabled
                                        />
                                    )}
                                    {q.questionType === 'long text' && (
                                        <input
                                        style={{borderBottom:'1px dashed'}}
                                        type='text'
                                        className='form-control mt-2 mb-5 w-75 border-top-0 border-start-0 border-end-0 border-secondary-subtle rounded-0 bg-body-tertiary'
                                        placeholder={t('detailed')}
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
                                            placeholder={`${t('opt')} ${idx + 1}`}
                                            value={opt}
                                            onChange={(e) => {
                                                const updatedQuestions = [...formik.values.newQuestion];
                                                updatedQuestions[index].checkboxOptions[idx] = e.target.value;
                                                formik.setFieldValue('newQuestion', updatedQuestions);
                                            }}
                                            />
                                            <button
                                            className="btn mx-2 px-1 py-0"
                                            onClick={() => {
                                                if (q.checkboxOptions.length > 1) {
                                                const updated = [...formik.values.newQuestion];
                                                updated[index].checkboxOptions.splice(idx, 1);
                                                formik.setFieldValue('newQuestion', updated);
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
                                            onClick={() => handleAddOption(index)}
                                        >
                                            {t('add-option')}
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
                                                onClick={() => handleAddQuestion(item.value)}
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
                                    const updated = formik.values.newQuestion.filter(q => q.id !== formik.values.newQuestion[index].id);
                                    if (formik.values.newQuestion.length > 1)
                                    formik.setFieldValue('newQuestion', updated)
                                }}
                            >
                                <i className="bi bi-trash fs-5"></i>
                            </button>
                        </div>
                    </div>
                </div> 
                ))}
                {typeError && <div style={{zIndex:'100', bottom:'0', backdropFilter:'blur(3px)', backgroundColor: 'rgba(249, 231, 74, 0.4)'}} className="alert alert-light position-fixed fw-bold" role="alert">{typeError}</div>}
                {deleteAlert && <div style={{zIndex:'100', bottom:'0', backdropFilter:'blur(3px)'}} className="alert alert-success position-fixed fw-bold" role="alert">{deleteAlert}</div>}
                {isSaving && <div style={{bottom:'50px', zIndex:'100'}} className="spinner-border text-success position-absolute" role="status"><span class="visually-hidden">Loading...</span></div>}
            </div>
        </div>
    )
}

export default CreateTemplate