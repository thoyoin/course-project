import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChangeLang from './ChangeLang';
import LogOutBtn from './LogOutBtn';
import { useTranslation } from 'react-i18next';

const TemplateView = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    
    const { templateId } = useParams();
    const navigate = useNavigate();
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchTemplate = async () => {
        try {
            const res = await fetch(`${API_URL}/api/templates/${templateId}`);
            const data = await res.json();
            setTemplate(data);
        } catch (err) {
            console.error('Failed to load template', err);
        } finally {
            setLoading(false);
        }
        };

        fetchTemplate();
    }, [templateId]);

    if (loading) {
        return (
            <div style={{ left: '49%', top: '49%' }} className="spinner-border text-success position-absolute" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    if (!template) return <p className="m-4 text-danger">Failed to load template.</p>;

    const questionTypes = {
        short_text: 'short text',
        long_text: 'long text',
        integer: 'integer',
        checkbox: 'checkbox'
    }

    return (
        <div>
            <div
                style={{ height: '68px', zIndex: '100' }}
                className="container-fluid d-flex flex-row justify-content-between align-items-center position-fixed bg-body-tertiary top-0 border-bottom"
            >
                <div className="ms-4 d-flex flex-row align-items-center gap-4">
                    <a href='/PersonalPage' className='text-success link-ease-in-out' onClick={() => navigate('/PersonalPage')}>
                        <i alt='home' className="bi bi-file-earmark-text-fill fs-2"></i>
                    </a>
                </div>
                <div className="d-flex flex-row align-items-center">
                <ChangeLang />
                <LogOutBtn />
                </div>
            </div>
            <div className="d-flex flex-column justify-content-start align-items-center">
                <div style={{ maxWidth: '700px', marginTop: '100px' }} className="w-100">
                <div className="bg-body-tertiary mx-3 mb-4 text-start rounded-4 border border-success border-1">
                    <h2 className="mt-3 ps-4 fs-1 fw-bold form-control border-0 rounded-0 bg-body-tertiary">
                    {template.templateName}
                    </h2>
                    <p className="form-control ps-4  mb-5 text-muted border-0 border-bottom border-success rounded-0 bg-body-tertiary">
                    {template.description}
                    </p>
                </div>
                </div>

                <form style={{ maxWidth: '700px' }} className="w-100 text-center">
                {template.questions?.map((q, idx) => (
                    <div key={idx} className="mb-3">
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <div
                        style={{ minHeight: '150px', marginTop: '15px' }}
                        className="bg-body-tertiary w-100 mx-3 text-start border rounded-4 d-flex flex-column justify-content-start"
                        >
                        <label className="form-label p-4 fs-5">{q.text}</label>
                        {q.image && (
                            <div className="w-100 px-4 my-3 d-flex flex-column justify-content-start align-items-center position-relative">
                            <img
                                style={{ maxHeight: '200px' }}
                                src={q.image}
                                alt="questionImage"
                                className="img-fluid rounded"
                            />
                            </div>
                        )}
                        {q.questionType === questionTypes.short_text && (
                            <input
                            type="text"
                            className="form-control w-50 ms-4 mb-5 mt-2 p-0 pb-1 border-0 border-bottom border-success rounded-0 bg-body-tertiary"
                            disabled
                            />
                        )}
                        {q.questionType === questionTypes.integer && (
                            <input
                            type="number"
                            className="form-control w-50 ms-4 mb-5 mt-2 p-0 pb-1 border-0 border-bottom border-success rounded-0 bg-body-tertiary"
                            disabled
                            />
                        )}
                        {q.questionType === questionTypes.long_text && (
                            <textarea
                            style={{ resize: 'none' }}
                            className="form-control ms-4 mb-4 mt-2 p-0 w-50 border-0 border-bottom border-success rounded-0 bg-body-tertiary"
                            disabled
                            />
                        )}
                        {q.questionType === questionTypes.checkbox &&
                            q.checkboxOptions?.map((opt, i) => (
                            <div key={i} className="form-check">
                                <input
                                type="checkbox"
                                className="form-check-input ms-1 mb-3"
                                style={{ outline: 'none', boxShadow: 'none' }}
                                checked={false}
                                readOnly
                                />
                                <label className="form-check-label ms-3">{opt}</label>
                            </div>
                            ))}
                        </div>
                    </div>
                    </div>
                ))}
                <button type="button" onClick={() => navigate(-1)} className="btn btn-success my-5">
                    {t('back')}
                </button>
                </form>
            </div>
        </div>
    );
};

export default TemplateView;