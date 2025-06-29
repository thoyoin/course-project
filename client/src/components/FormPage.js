import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChangeLang from './ChangeLang';
import LogOutBtn from './LogOutBtn';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive'
import { jwtDecode } from 'jwt-decode';

const FormPage = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const { templateId } = useParams();
    const [template, setTemplate] = useState(null);
    const [answers, setAnswers] = useState({});
    const [deleteAlert, setDeleteAlert] = useState('');
    const [submitAlert, setSubmitAlert] = useState('');
    const [submitErrorAlert, setSubmitErrorAlert] = useState('');
    const [allowance, setAllowance] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const isTablet = useMediaQuery({maxWidth: 580})

    useEffect(() => {
        const fetchTemplate = async () => {
        try {
            const res = await fetch(`${API_URL}/api/templates/${templateId}`);
            const data = await res.json();
            setTemplate(data);
            console.log('Loaded template:', data);

            const token = localStorage.getItem('token');
            if (!token) {
                setAllowance(false);
                return;
            };
            const decode = jwtDecode(token);
            const currentUserId = decode?.userId;
            
            if (currentUserId === data.ownerId) {
                setAllowance(true);
            } else {
                setAllowance(false);
            }
            
        } catch (err) {
            console.error('Failed to load template', err);
        }};


        fetchTemplate();
    }, [templateId]);

    const handleChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
        const res = await fetch(`${API_URL}/api/forms/${templateId}/submit`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ answers }),
        });

        if (res.ok) {
            setSubmitAlert('Form submitted!')
            setTimeout(() => {
                setSubmitAlert('')
                navigate('/PersonalPage');
            }, 1000)
        } else {
            setSubmitErrorAlert('Failed to submit form.')
            setTimeout(() => {
                setSubmitErrorAlert('')
            }, 2000)
        }
        } catch (err) {
            console.error('Submit error:', err);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (Object.keys(answers).length > 0) {
                e.preventDefault();
                e.returnValue = ''; 
            }
        };
      
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [answers]);
    
    if (!template) {
        return <div style={{left:'49%', top:'49%'}} className="spinner-border text-success position-absolute" role="status"><span class="visually-hidden">Loading...</span></div>;
    };

    const handleDeleteTemplate = async () => {
        try {
            const response = await fetch(`${API_URL}/api/templates/${templateId}`,{
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete template')
            }

            setDeleteAlert('Template deleted successfully!')
            setTimeout(() => {
                setDeleteAlert('')
                navigate('/PersonalPage');
            }, 1000);
        } catch (err) {
            console.error('Failed deleting template:', err);
        }
    }

    return (
        <div>
            <div style={{height:'68px', zIndex:'100'}} className='container-fluid d-flex flex-row justify-content-between align-items-center position-fixed bg-body-tertiary top-0 border-bottom'>
                <div className='ms-4 d-flex flex-row align-items-center gap-4'>
                    <a href='/PersonalPage' className='text-success link-ease-in-out' onClick={() => navigate('/PersonalPage')}><i alt='home' className="bi bi-file-earmark-text-fill fs-2"></i></a>
                    {!isTablet && <h4 className='fw-bold m-0'>{template.templateName}</h4>}
                </div>
                <div className='d-flex flex-row align-items-center'>
                    {allowance && (
                        <div className='d-flex flex-row align-items-center'>
                            <button 
                                className='btn btn-success mx-3 px-2'
                                style={{height:'35px', minWidth:'65px'}}
                                onClick={() => navigate(`/CreateTemplate/${template.id}`)}
                                >
                                <i class="bi bi-pencil me-2"></i>
                                {t('edit')}
                            </button>
                            <button 
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                                style={{height:'35px'}} 
                                className='btn btn-danger px-2 py-2 d-flex flex-row align-items-center'
                                >
                                <i className="bi bi-trash me-2"></i>
                                {t('delete')}
                            </button>
                        </div>
                    )}
                    
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
                    <ChangeLang/>
                    <LogOutBtn/>
                </div>
            </div>
            <div className='d-flex flex-column justify-content-start align-items-center'>
                    <div style={{maxWidth:'700px', minHeight:'170px', marginTop:'100px'}} className="w-100">
                            <div style={{minHeight:'170px'}} className='bg-body-tertiary mx-3 mb-4 text-start rounded-4 border border-success border-1 rounded-4'>
                                <h2
                                    className="mt-3 ps-4 fs-1 fw-bold form-control border-0 rounded-0 bg-body-tertiary" 
                                    >{template.templateName}</h2>
                                <p 
                                    className='form-control ps-4 text-muted border-0 border-bottom border-success rounded-0 bg-body-tertiary'
                                    >{template.description}</p>
                            </div>
                    </div>
                <form style={{maxWidth:'700px'}} className='w-100 text-center' onSubmit={handleSubmit}>
                    {template.questions?.map((q, idx) => (
                        <div key={idx} className="mb-4">
                            <div className='d-flex flex-row justify-content-center align-items-center'>
                                <div style={{minHeight:'150px', marginTop:'15px'}} className='bg-body-tertiary w-100 mx-3 text-start border rounded-4 d-flex flex-column justify-content-start'>
                                    <label className="form-label p-4 fs-5">{q.text}</label>
                                    {q.image && (
                                        <div className='w-100 px-4 my-3 d-flex flex-column justify-content-start align-items-center position-relative'>
                                            <img style={{maxHeight:'200px'}} src={q.image} alt='questionImage' className='img-fluid rounded'></img>
                                        </div>
                                    )}
                                    {q.questionType === 'short text' && (
                                    <input
                                        type="text" 
                                        placeholder={t('myAnswer')}
                                        style={{outline:'none', boxShadow:'none'}} 
                                        className="form-control w-50 ms-4 mb-5 mt-2 p-0 pb-1 border-0 border-bottom border-success rounded-0 bg-body-tertiary" 
                                        onChange={e => handleChange(idx, e.target.value)} />
                                    )}
                                    {q.questionType === 'integer' && (
                                    <input
                                        type="number" 
                                        placeholder={t('myAnswer')}
                                        style={{outline:'none', boxShadow:'none'}} 
                                        className="form-control w-50 ms-4 mb-5 mt-2 p-0 pb-1 border-0 border-bottom border-success rounded-0 bg-body-tertiary" 
                                        onChange={e => handleChange(idx, e.target.value)}/>
                                    )}
                                    {q.questionType === 'long text' && (
                                    <textarea 
                                        ref={(el) => {
                                            if (el) {
                                            el.style.height = '20px';
                                            el.style.height = `${el.scrollHeight}px`;
                                            }
                                        }}
                                        placeholder={t('myAnswer')}
                                        style={{outline:'none', boxShadow:'none', overflow: 'hidden', resize: 'none'}} 
                                        className="form-control ms-4 mb-4 mt-2 p-0 w-50 border-0 border-bottom border-success rounded-0 bg-body-tertiary" 
                                        onChange={e => handleChange(idx, e.target.value)}/>
                                    )}
                                    {q.questionType === 'checkbox' && q.checkboxOptions?.map((opt, i) => (
                                    <div key={i} className="form-check">
                                        <input
                                        type="checkbox"
                                        className="form-check-input ms-1 mb-3"
                                        style={{outline:'none', boxShadow:'none', accentColor:'black'}}
                                        id={`check-${idx}-${i}`}
                                        onChange={e => {
                                            const prev = answers[idx] || [];
                                            const updated = e.target.checked
                                            ? [...prev, opt]
                                            : prev.filter(item => item !== opt);
                                            handleChange(idx, updated);
                                        }}/>
                                        <label className="form-check-label ms-3" htmlFor={`check-${idx}-${i}`}>{opt}</label>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="btn btn-success mt-2 mb-5 mx-3">Submit form</button>
                </form>
                {deleteAlert && <div style={{zIndex:'100', bottom:'0', backdropFilter:'blur(3px)'}} className="alert alert-success position-fixed fw-bold" role="alert">{deleteAlert}</div>}
                {submitAlert && <div style={{zIndex:'100', bottom:'0px', left:'42%',  backdropFilter:'blur(3px)'}} className="alert alert-success position-fixed fw-bold" role="alert">{submitAlert}</div>}
                {submitErrorAlert && <div style={{zIndex:'100', bottom:'0px', left:'42%',  backdropFilter:'blur(3px)'}} className="alert alert-success position-fixed fw-bold" role="alert">{submitErrorAlert}</div>}
            </div>
        </div>
    );
};


export default FormPage;