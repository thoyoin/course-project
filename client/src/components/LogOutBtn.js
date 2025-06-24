import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'


const LogOutBtn = () => {
    const name = localStorage.getItem('name')
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'auto');
    const { t } = useTranslation();

    const setTheme = (theme) => {
        const oldTheme = localStorage.getItem('theme') || 'auto';
        if (theme !== oldTheme) {
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);
            setCurrentTheme(theme);
            window.location.reload();
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'auto';
        document.documentElement.setAttribute('data-bs-theme', savedTheme); 
        setCurrentTheme(savedTheme);
    }, []);

    return (
        <div className='dropdown p-0' style={{width:'50px'}}>
            <a data-bs-toggle='dropdown' href='#' className='btn text-success px-2 py-0'>
                <i className="bi bi-person-circle fs-2 m-0 p-0"></i>
            </a>
            <ul className='dropdown-menu dropdown-menu-end bg-transparent bg-opacity-50' style={{width:'150px', backdropFilter:'blur(3px)'}}>
                <li className='text-center'>
                    <p className='text-center mt-3 mb-4 fw-bolder'>{t('welcome')}, {name}!</p>
                    <div className="btn-group mb-4" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnradio" id="light" autoComplete="off" onClick={() => setTheme('light')} defaultChecked={currentTheme === 'light'}/>
                        <label className="btn btn-outline-success px-2" htmlFor="light"><i className="bi bi-brightness-low"></i></label>

                        <input type="radio" className="btn-check" name="btnradio" id="auto" autoComplete="off" onClick={() => setTheme('auto')} defaultChecked={currentTheme === 'auto'}/>
                        <label className="btn btn-outline-success px-2" htmlFor="auto"><i className="bi bi-circle-half"></i></label>

                        <input type="radio" className="btn-check" name="btnradio" id="dark" autoComplete="off" onClick={() => setTheme('dark')} defaultChecked={currentTheme === 'dark'}/>
                        <label className="btn btn-outline-success px-2" htmlFor="dark"><i className="bi bi-moon"></i></label>
                    </div>
                    <button
                        className='btn btn-outline-success dropdown-item text-center'
                        onClick={()=> {
                            localStorage.removeItem('token');
                            window.location.href = '/';
                        }}
                    >
                        {t('logout')}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default LogOutBtn