import React, { useState } from 'react'
import Select from 'react-select';
import { useTranslation } from 'react-i18next'

const ModalPublishBtn = ({templateId}) => {
    const [accessType, setAccessType] = useState('public');
    
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

    const handlePublish = async () => {
        try {
            const response = await fetch(`/api/templates/${templateId}/publish`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    visibility: accessType,
                }),
            });

            if (response.ok) {
                alert('Template published successfully!');
            } else {
                const errorData = await response.json();
                console.error('Failed to publish template:', errorData.message);
                alert('Failed to publish template.');
            }
        } catch (error) {
            console.error('Error publishing template:', error);
            alert('An error occurred while publishing the template.');
        }
    };

    return (
        <div>
            <button style={{ height:'35px'}} className='btn btn-success py-1 px-3 me-5' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i className="bi bi-upload me-2"></i>
                {t('publish')}
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
                        <button type="button" className="btn" data-bs-dismiss="modal">{t('cancel')}</button>
                        <button type="button" className="btn btn-success" onClick={() => handlePublish(accessType)}>{t('publish')}</button>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default ModalPublishBtn