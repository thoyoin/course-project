import React, { useCallback, useEffect, useState } from 'react'
import ChangeLang from './ChangeLang'
import LogOutBtn from './LogOutBtn'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const { t } = useTranslation();
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [templates, setTemplates] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const debounce = (func, delay) => {
        let timer;
        return (...arg) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...arg), delay);
        };
    };

    const getPublicTemplates = async (query = '') => {
        setLoading(true);
        try {
            const url = query
                ? `${API_URL}/api/templates/all?public=true&isPublished=true&search=${encodeURIComponent(query)}`
                : `${API_URL}/api/templates/all?public=true&isPublished=true`;
            
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch templates');

            const data = await res.json();
            setTemplates(data.filter(t => t.isPublished === true));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetch = useCallback(debounce(getPublicTemplates, 500), []);

    useEffect(() => {
        debouncedFetch(search);
    }, [search, debouncedFetch]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };
 
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <div style={{zIndex:'100'}} className='container-fluid d-flex flex-row justify-content-end align-items-center bg-body-tertiary position-fixed top-0 border-bottom'>
                <a href='#' style={{marginLeft:'20px', marginRight:'30px'}} className='navbar-brand text-success link-ease-in-out' onClick={() => navigate('/PersonalPage')}><i alt='home' className="bi bi-file-earmark-text-fill fs-2"></i></a>
                <form className="d-flex justify-content-center my-3 mx-auto w-100" role="search">
                    <div className='input-group' style={{maxWidth:'600px', height:'40px'}}>
                        <span className='input-group-text rounded-start-4'><i className="bi bi-search p-1"></i></span>
                        <input 
                            style={{boxShadow:'none'}} 
                            className="form-control rounded-end-4" 
                            type="search" 
                            placeholder={t('search')} 
                            aria-label="Search"
                            value={search}
                            onChange={handleSearchChange}/>
                    </div>
                </form>
                <ChangeLang/>
                <LogOutBtn/>
            </div>
            <div style={{marginTop:'100px', marginLeft:'50px', marginRight:'50px'}} className='d-flex flex-column'>
                <div style={{minWidth:'210px'}} className='mb-4 border-bottom border-success w-50'><h1>{t('latest')}</h1></div>
                <div style={{maxWidth:'100%', height:'300px', marginTop:'20px'}} className='bg-body text-center d-flex flex-wrap justify-content-center align-items-start'>
                    {loading && <div className="spinner-border text-success position-absolute" role="status"><span className="visually-hidden">Loading...</span></div>}
                    {templates.map((template) => (
                        <div key={template.id} className="card m-2 shadow-sm border border-success w-100" style={{ maxWidth: '16rem', minHeight:'12rem' }}>
                            <div className="card-body d-flex flex-column justify-content-between align-items-center">
                                <h5 style={{maxWidth:'200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} className="card-title mb-4">{template.templateName || t('no-title')}</h5>
                                <div className="w-100">
                                    <div style={{maxWidth:'15rem'}} className='w-100 mb-2 border-bottom border-success'><p style={{maxWidth:'200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} className="card-text mb-2">{template.description || t('no-desc')}</p></div>
                                    <p className='mb-2 text-muted'>{template.owner?.name ? `${t('by')} ${template.owner.name}` : ''}</p>
                                    <button style={{minWidth:'70px'}} className="btn btn-sm btn-outline-success mt-2"
                                        onClick={() => {
                                            const token = localStorage.getItem('token');
                                            if (!token) {
                                                navigate(`/TemplateView/${template.id}`)
                                            } else {
                                                navigate(`/FormPage/${template.id}`)
                                            };
                                        }}>
                                        {t('view')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage