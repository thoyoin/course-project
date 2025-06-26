import React, { useState } from 'react'
import Select from 'react-select';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';

const ModalPublishBtn = ({templateId, formikValues}) => {
    const [accessType, setAccessType] = useState('private');
    const [publishAlert, setPublishAlert] = useState('');
    const [publishErrorAlert, setPublishErrorAlert] = useState('');
    const [saveAlert, setSaveAlert] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const access = [
        {value:'public',
            label: (
                <span className='d-flex flex-row align-items-center'>
                    <i className="bi bi-unlock me-2"></i>
                    {t('public')}
                </span>
            )
        },
        {value:'private',
            label: (
                <span className='d-flex flex-row align-items-center'>
                    <i className="bi bi-incognito me-2"></i>
                    {t('private')}
                </span>
            )
        }
    ];

    const colorMode = localStorage.getItem('theme')

    const saveTemplateToServer = async () => {
        try {
            const payload = {
                ...formikValues,
                newQuestion: formikValues.newQuestion.map((q) => ({
                    ...q,
                    checkboxOptions: q.checkboxOptions.filter(opt => opt.trim() !== ''),
                })),
                visibility: accessType,
            };
    
            const response = await fetch(`https://course-project-back-tv8f.onrender.com/api/templates/${templateId || ''}`, {
                method: templateId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                setSaveAlert('Failed to save template.');
                setTimeout(() => {
                    setSaveAlert('')
                }, 2000);
                throw new Error(`Failed to save template: ${errorText}`);
            } else {
                setSaveAlert('Template saved successfully!');
                setTimeout(() => {
                    setSaveAlert('')
                }, 2000);
            }
    
            console.log('Template saved to server');
        } catch (error) {
            console.error('Error saving template:', error);
        }
    };

    const handlePublish = async () => {
        try {
            const token = localStorage.getItem('token');

            const payload = {
                ...formikValues,
                newQuestion: formikValues.newQuestion.map((q) => ({
                    ...q,
                    checkboxOptions: q.checkboxOptions.filter(opt => opt.trim() !== ''),
                })),
                visibility: accessType,
                isPublished: true,
            };

            const response = await fetch(`https://course-project-back-tv8f.onrender.com/api/templates/${templateId || ''}`, {
                method: templateId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setPublishAlert('Template published successfully!')
                setTimeout(() => {
                    setPublishAlert('')
                    navigate('/MainPage');
                }, 2000);
            } else {
                const errorData = await response.json();
                console.error('Failed to publish template:', errorData.message);
                setPublishErrorAlert('Failed to publish template.')
                setTimeout(() => {
                    setPublishErrorAlert('')
                }, 2000);
            }
        } catch (error) {
            console.error('Error publishing template:', error);
            setPublishErrorAlert('An error occurred while publishing the template.')
                setTimeout(() => {
                    setPublishErrorAlert('')
                }, 2000);
        }
    };

    return (
        <div>
            <button style={{ height:'35px'}} className='btn btn-success py-1 px-3 me-5' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i className="bi bi-upload me-2"></i>
                {t('save&publish')}
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-keyboard="true" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4" id="staticBackdropLabel">{t('publication')}</h1>
                    </div>
                    <div className="modal-body d-flex flex-row align-items-center">
                        <h5 className='fw-light'>{t('shared-access')}:</h5>
                        <Select
                            options={access}
                            isSearchable={false}
                            isClearable={false}
                            placeholder={t('access')}
                            classNamePrefix="react-select"
                            value={access.find(option => option.value === accessType)}
                            onChange={(selected) => setAccessType(selected.value)}
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
                                    minWidth: '150px', 
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
                    <div className="modal-footer">
                        {/* <button type="button" className="btn" data-bs-dismiss="modal">{t('cancel')}</button> */}
                        <button className='btn btn-outline-success' onClick={() => saveTemplateToServer()}>{t('save')}</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => handlePublish(accessType)}>{t('publish')}</button>
                    </div>
                    </div>
                </div>
                </div>
                {publishAlert && <div style={{zIndex:'100', bottom:'0px', left:'42%',  backdropFilter:'blur(3px)'}} className="alert alert-success position-fixed fw-bold" role="alert">{publishAlert}</div>}
                {publishErrorAlert && <div style={{zIndex:'100', bottom:'0px', left:'42%',  backdropFilter:'blur(3px)'}} className="alert alert-danger position-fixed fw-bold" role="alert">{publishErrorAlert}</div>}
                {saveAlert && <div style={{zIndex:'100', bottom:'0px', left:'42%',  backdropFilter:'blur(3px)'}} className="alert alert-success position-fixed fw-bold" role="alert">{saveAlert}</div>}
        </div>
    )
}

export default ModalPublishBtn