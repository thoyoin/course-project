import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChangeLang from './ChangeLang';
import LogOutBtn from './LogOutBtn';
import { useTranslation } from 'react-i18next';

const FilledFormPage = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const { formId } = useParams();
    const navigate = useNavigate();
    const [formResponse, setFormResponse] = useState({});
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

  useEffect(() => {
    const fetchFormData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/forms/${formId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            const data = await res.json();
            const parsedAnswers = typeof data.answers === 'string' ? JSON.parse(data.answers) : data.answers;
            setFormResponse({ ...data, answers: parsedAnswers });

            const templateRes = await fetch(`${API_URL}/api/templates/${data.templateId}`);
            const templateData = await templateRes.json();
            setTemplate(templateData);
        } catch (err) {
            console.error('Failed to load form or template', err);
        } finally {
            setLoading(false);
        }
    };
    
    fetchFormData();
  }, [formId]);

  if (loading) return <p className="m-4">Загрузка данных формы...</p>;
  if (!formResponse || !template) return <p className="m-4 text-danger">Ошибка загрузки данных.</p>;

  return (
    <div>
        <div style={{height:'68px', zIndex:'100'}} className='container-fluid d-flex flex-row justify-content-between align-items-center position-fixed bg-body-tertiary top-0 border-bottom'>
            <div className='ms-4 d-flex flex-row align-items-center gap-4'>
                <a href='/MainPage' className='text-success link-ease-in-out' onClick={() => navigate('/MainPage')}><i alt='home' className="bi bi-file-earmark-text-fill fs-2"></i></a>
            </div>
            <div className='d-flex flex-row align-items-center'>
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
            <form style={{maxWidth:'700px'}} className='w-100 text-center'>
                {template.questions?.map((q, idx) => (
                <div key={idx} className="mb-3">
                    <div className='d-flex flex-row justify-content-center align-items-center'>
                        <div style={{minHeight:'150px', marginTop:'15px'}} className='bg-body-tertiary w-100 mx-3 text-start border rounded-4 d-flex flex-column justify-content-start'>
                            <label className="form-label p-4 fs-5">{q.text}</label>
                            {q.questionType === 'short text' && (
                                <input 
                                    type="text" 
                                    className="form-control w-50 ms-4 mb-5 mt-2 p-0 pb-1 border-0 border-bottom border-success rounded-0 bg-body-tertiary" 
                                    value={formResponse.answers[idx] || ''} 
                                    disabled />
                            )}
                            {q.questionType === 'integer' && (
                                <input 
                                    type="number" 
                                    className="form-control w-50 ms-4 mb-5 mt-2 p-0 pb-1 border-0 border-bottom border-success rounded-0 bg-body-tertiary" 
                                    value={formResponse.answers[idx] || ''} 
                                    disabled />
                            )}
                            {q.questionType === 'long text' && (
                                <textarea 
                                    ref={(el) => {
                                        if (el) {
                                        el.style.height = '20px';
                                        el.style.height = `${el.scrollHeight}px`;
                                        }
                                    }}
                                    style={{resize: 'none'}} 
                                    className="form-control ms-4 mb-4 mt-2 p-0 w-50 border-0 border-bottom border-success rounded-0 bg-body-tertiary" 
                                    value={formResponse.answers[idx] || ''} 
                                    disabled />
                            )}
                            {q.questionType === 'checkbox' && q.checkboxOptions?.map((opt, i) => (
                                <div key={i} className="form-check">
                                    <input
                                    type="checkbox"
                                    className="form-check-input ms-1 mb-3"
                                    style={{outline:'none', boxShadow:'none', accentColor:'black'}}
                                    id={`check-${idx}-${i}`}
                                    checked={formResponse.answers[idx]?.includes(opt)}
                                    readOnly
                                    />
                                    <label className="form-check-label ms-3" htmlFor={`check-${idx}-${i}`}>{opt}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                ))}
                <button type="button" onClick={() => navigate(-1)} className="btn btn-success my-5">{t('back')}</button>
            </form>
        </div>
    </div>
  );
};

export default FilledFormPage;