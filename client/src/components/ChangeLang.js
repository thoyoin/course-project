import React from 'react'
import { useTranslation } from 'react-i18next'


const ChangeLang = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    const setLang = (lang) => {
        localStorage.setItem('language', lang);
    }

  return (
    <div className='dropdown mx-5'>
        <button className="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-translate"></i>
        </button>
        <ul className="dropdown-menu custom-dropdown">
            <li><h6 className="dropdown-header">{t('pick')}</h6></li>
            <li><a className="dropdown-item" href="#" onClick={() => {
                setLang('English')
                changeLanguage('en');
                }
                }>{t('english')}</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => {
                setLang('Spanish')
                changeLanguage('es');
                }
                }>{t('spanish')}</a></li>
        </ul>
    </div>
  )
}

export default ChangeLang