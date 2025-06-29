import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LogOutBtn from './LogOutBtn'
import { useMediaQuery } from 'react-responsive'
import ChangeLang from './ChangeLang'
import { useTranslation } from 'react-i18next'
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Collapse from 'bootstrap/js/dist/collapse';

const PersonalPage = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const [templates, setTemplates] = useState([]);
    const [publishedTemp, setPublishedTemp] = useState([]);
    const [userForms, setUserForms] = useState([]);
    const [viewAllVisible, setViewAllVisible] = useState(false);
    const isLaptop = useMediaQuery({maxWidth: 1024})
    const isTablet = useMediaQuery({maxWidth: 875})
    const isMobile = useMediaQuery({maxWidth: 685})
    const isLil = useMediaQuery({maxWidth: 485})
    const { t } = useTranslation();

    const visibleTemplates = isLil ? 1 : isMobile ? 2 : isTablet ? 3 : isLaptop ? 4 : 5;

    const getUserTemplateDrafts = async () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = token ? jwtDecode(token) : null;
            const currentUserId = decoded?.userId;

            const response = await fetch(`${API_URL}/api/templates/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch templates');
            }
            const data = await response.json();
            const userTemplates = data.filter(template => template.ownerId === currentUserId);
            console.log('Your templates:', userTemplates);
            setTemplates(userTemplates.filter(template => template.isPublished === false));
            setPublishedTemp(userTemplates.filter(template => template.isPublished));
        } catch (error) {
            console.error('Error fetching templates:', error);
        }
    }

    useEffect(() => {
        getUserTemplateDrafts();
    }, []);

    useEffect(() => {
        const getUserForms = async () => {
            try {
                const token = localStorage.getItem('token');
                const decoded = token ? jwtDecode(token) : null;
                const currentUserId = decoded?.userId;

                const response = await fetch(`${API_URL}/api/forms`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch forms.');
                }
                const data = await response.json();
                const userForms = data.filter(f => f.respondentId === currentUserId);
                setUserForms(userForms);
                console.log('User forms:', userForms);
            } catch (err) {
                console.error('Error to fetch forms', err);
            }
        };
        getUserForms();
    }, []);
    
    useEffect(() => {
        setViewAllVisible(templates.length > visibleTemplates);
    }, [templates, visibleTemplates]);
    
    const createNewTemplate = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/api/templates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    templateName: '',
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

            const data = text ? JSON.parse(text) : {};

            console.log('Template created:', data);
            navigate(`/CreateTemplate/${data.id}`)

        } catch (error) {
            console.error('Error creating template:', error);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <div style={{zIndex:'100'}} className='container-fluid d-flex flex-row justify-content-end align-items-center bg-body-tertiary position-fixed top-0 border-bottom'>
                <div className='mx-3 dropdown'>
                    <button style={{height:'30px', width:'40px'}} data-bs-toggle="dropdown" aria-expanded="false" className='btn btn-outline-success p-0 d-flex align-items-center justify-content-center'>
                        <i className="bi bi-three-dots fs-4"></i>
                    </button>
                    <ul className="dropdown-menu bg-transparent bg-opacity-50" style={{backdropFilter:'blur(3px)'}}>
                        <li><button 
                                className="dropdown-item"
                                onClick={() => navigate('/HomePage')}
                            >To all templates</button></li>
                    </ul>
                </div>
                <form className="d-flex justify-content-center my-3 mx-auto w-100" role="search">
                    <div className='input-group' style={{maxWidth:'600px', height:'40px'}}>
                        <span className='input-group-text rounded-start-4'><i className="bi bi-search p-1"></i></span>
                        <input style={{boxShadow:'none'}} className="form-control rounded-end-4" type="search" placeholder={t('search')} aria-label="Search"/>
                    </div>
                </form>
                <ChangeLang/>
                <LogOutBtn/>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div style={{maxWidth:'100%', height:'300px', marginTop:'68px'}} className='bg-body w-100 text-center mx-3 d-flex flex-row justify-content-center align-items-center'>
                    <div style={{maxWidth:'200px', minWidth:'120px'}} className='w-100 mx-2 d-flex flex-column align-items-center'>
                        <h5 className='fw-bold'>{t('create-new')}</h5>
                        <button 
                            style={{maxWidth:'160px', height:'120px'}} 
                            className='btn btn-outline-light border border-success text-success w-100 m-3'
                            onClick={createNewTemplate}
                            >
                            <i className="bi bi-plus-square-dotted fs-1"></i>
                        </button>
                    </div>
                    {templates.slice(0, visibleTemplates).map((template) => (
                        <div style={{maxWidth:'200px', minWidth:'120px'}} className='position-relative w-100 mx-2 d-flex flex-column align-items-center'>
                            <h5 className='fw-bold' style={{maxWidth:'200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{template.templateName || 'New template'}</h5>
                            <button 
                                style={{maxWidth:'160px', height:'120px'}} 
                                className='btn btn-outline-light border fw-lighter border-success text-success w-100 m-3 d-flex flex-column align-items-center justify-content-start'
                                onClick={() => navigate(`/CreateTemplate/${template.id}`)}
                                >
                                    <p className='m-0' style={{maxWidth:'140px', maxHeight:'120px', whiteSpace:'normal', overflowWrap: 'break-word', overflow:'hidden'}}>{template.description || t('no-desc')}</p>
                                    <span style={{top:'170px'}} className='badge position-absolute w-50 opacity-75 bg-warning text dark'>
                                        {t('draft')}
                                    </span>
                            </button>
                        </div>
                    ))}
                    {viewAllVisible && (
                        <div className='ms-3 me-4'>
                            <button
                              className="btn btn-link link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-50-hover"
                              type="button"
                              onClick={() => {
                                  const collapseElement = document.getElementById('viewAllCollapse');
                                  if (collapseElement) {
                                      const bsCollapse = new Collapse(collapseElement, {
                                          toggle: false
                                      });
                                      if (collapseElement.classList.contains('show')) {
                                          bsCollapse.hide();
                                      } else {
                                          bsCollapse.show();
                                      }
                                  }
                              }}
                            >
                              {t('view-all')}
                            </button>
                        </div>
                    )}
                </div>
                <div className="collapse w-100 border-0" id="viewAllCollapse">
                    <div className="card card-body p-0 border-0 w-100 bg-body d-flex flex-row flex-wrap justify-content-center">
                        {templates.slice(visibleTemplates).map((template, index) => (
                            <div key={index} style={{maxWidth:'200px', minWidth:'120px'}} className='position-relative w-100 mx-2 mb-5 d-flex flex-column align-items-center'>
                                <h5 className='fw-bold' style={{maxWidth:'200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{template.templateName || 'New template'}</h5>
                                <button 
                                    style={{maxWidth:'160px', height:'120px'}}
                                    className='btn btn-outline-light border fw-lighter border-success text-success w-100 m-3 d-flex flex-column align-items-center justify-content-start'
                                    onClick={() => navigate(`/CreateTemplate/${template.id}`)}
                                >
                                    <p className='m-0' style={{maxWidth:'140px', maxHeight:'120px', whiteSpace:'normal', overflowWrap: 'break-word', overflow:'hidden'}}>
                                        {template.description || t('no-desc')}
                                    </p>
                                    <span style={{top:'170px'}} className='badge position-absolute w-50 opacity-75 bg-warning text dark'>
                                        {t('draft')}
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div> 
            <div style={{flexGrow:'1'}} className='d-flex flex-column justify-content-start align-items-center'>
                <div style={{maxWidth:'100%', height:'100%'}} className='w-100 text-center mx-3 d-flex flex-column justify-content-start'>
                    <ul className="nav nav-tabs d-flex flex-row justify-content-center" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button 
                                className='nav-link active tab-btn' 
                                id="templates-tab" 
                                data-bs-toggle="tab" 
                                data-bs-target="#templates" 
                                type="button" role="tab" 
                                aria-controls="templates" 
                                aria-selected="true">
                                {t('my-temp')}
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button 
                                className='nav-link tab-btn' 
                                id="forms-tab" 
                                data-bs-toggle="tab" 
                                data-bs-target="#forms" 
                                type="button" role="tab" 
                                aria-controls="forms" 
                                aria-selected="false">
                                {t('my-forms')}
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content bg-body mb-5" id="myTabContent" style={{flexGrow: 1}}>
                        <div className="tab-pane fade show active mt-3 mx-5" id="templates" role="tabpanel" aria-labelledby="templates-tab">
                        <div className="d-flex flex-wrap justify-content-center px-3">
                            {publishedTemp.filter(t => t.isPublished).map((template, index) => (
                                <div key={index} className="card m-2 shadow-sm border border-success w-100" style={{ maxWidth: '16rem', minHeight:'12rem' }}>
                                    <div className="card-body d-flex flex-column justify-content-between align-items-center">
                                        <h5 className="card-title">{template.templateName || t('no-title')}</h5>
                                        <div className="w-100">
                                            <div style={{maxWidth:'15rem'}} className='w-100 mb-2 border-bottom border-success'><p style={{maxWidth:'200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} className="card-text mb-2">{template.description || t('no-desc')}</p></div>
                                            <a href={`/FormPage/${template.id}`} style={{minWidth:'70px'}} className="btn btn-sm btn-outline-success mt-2">
                                            {t('view')}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                        <div className="tab-pane fade mt-3 mx-5" id="forms" role="tabpanel" aria-labelledby="forms-tab">
                            {userForms.length === 0 ? (
                                <p className="mt-3">{t('no-forms')}</p>
                            ) : (
                                <div className="d-flex flex-wrap justify-content-center px-3">
                                {userForms.map((form, index) => (
                                    <div key={index} className="card m-2 shadow-sm border border-success w-100" style={{ maxWidth: '16rem', minHeight: '8rem' }}>
                                    <div className="card-body d-flex flex-column justify-content-between align-items-center">
                                        <h5 className="card-title mb-2">{form.Template.templateName}</h5>
                                        <div className='border-bottom mb-2 w-100 border-success'><p className="text-muted mt-4 small">{t('filled')}: {new Date(form.createdAt).toLocaleDateString()}</p></div>
                                        <a style={{minWidth:'70px'}} href={`/FormResponse/${form.id}`} className="btn btn-sm btn-outline-success mt-2">
                                        {t('view')}
                                        </a>
                                    </div>
                                    </div>
                                ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default PersonalPage