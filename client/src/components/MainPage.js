import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LogOutBtn from './LogOutBtn'
import { useMediaQuery } from 'react-responsive'
import ChangeLang from './ChangeLang'
import { useTranslation } from 'react-i18next'
import { jwtDecode } from 'jwt-decode';

const MainPage = () => {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState([]);
    /* const [viewAll, setViewAll] = useState(false); */
    const isLaptop = useMediaQuery({maxWidth: 1024})
    const isTablet = useMediaQuery({maxWidth: 768})
    const isMobile = useMediaQuery({maxWidth: 599})
    const isLil = useMediaQuery({maxWidth: 469})
    const { t } = useTranslation();

    const visibleTemplates = isLil ? 1 : isMobile ? 2 : isTablet ? 3 : isLaptop ? 4 : 5;

    const TemplatesGallery = async () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = token ? jwtDecode(token) : null;
            const currentUserId = decoded?.userId;

            const response = await fetch('https://course-project-back-tv8f.onrender.com/api/templates/all');
            if (!response.ok) {
                throw new Error('Failed to fetch templates');
            }
            const data = await response.json();
            const userTemplates = data.filter(template => template.ownerId === currentUserId);
            console.log('Your templates:', userTemplates);
            setTemplates(userTemplates);
        } catch (error) {
            console.error('Error fetching templates:', error);
        }
    }

    useEffect(() => {
        TemplatesGallery();
    }, []);
    
/*     useEffect(() => {
        templates.length > 1 ? setViewAll(true) : setViewAll(false)
    }) */
    
    const createNewTemplate = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://course-project-back-tv8f.onrender.com/api/templates', {
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
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className='container-fluid d-flex flex-row justify-content-end align-items-center bg-body-tertiary position-fixed top-0 border-bottom'>
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
                <div style={{maxWidth:'100%', height:'300px', marginTop:'68px'}} className='bg-body w-100 text-center border-bottom mx-3 d-flex flex-row justify-content-center align-items-center'>
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
                        <h5 className='fw-bold' style={{maxWidth:'200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{template.templateName}</h5>
                        <button 
                            style={{maxWidth:'160px', height:'120px', overflow: 'hidden'}} 
                            className='btn btn-outline-light border fw-lighter border-success text-success w-100 m-3 d-flex flex-column align-items-center justify-content-start'
                            onClick={() => navigate(`/CreateTemplate/${template.id}`)}
                            >
                                {template.description || t('no-desc')}
                                <span style={{top:'170px'}} className={`badge position-absolute w-50 opacity-75 ${template.isPublished ? 'bg-success' : 'bg-warning text dark'}`}>
                                    {template.isPublished ? t('published') : t('draft')}
                                </span>
                        </button>
                     </div>
                    ))}
                    {/* {viewAll &&
                        <div className='ms-3 me-4'>
                            <a href='#viewAll' role="button" aria-expanded="false" aria-controls="viewAll" data-bs-toggle="collapse" className='link-light link-offset-2 link-underline-opacity-50 link-underline-opacity-100-hover'>View All</a>
                        </div>
                    } */}
                </div>
                {/* <div className="collapse w-100 border-0" id="viewAll">
                    <div className="card card-body w-100">
                        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                    </div>
                </div> */}
            </div> 
            <div style={{flexGrow:'1'}} className='d-flex flex-column justify-content-start align-items-center'>
                <div style={{maxWidth:'100%', height:'100%'}} className='bg-body-tertiary w-100 text-center mx-3 d-flex flex-column justify-content-start'>

                </div>
            </div> 
        </div>
    )
}

export default MainPage