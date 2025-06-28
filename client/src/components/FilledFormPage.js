import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FilledFormPage = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formResponse, setFormResponse] = useState(null);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://course-project-back-tv8f.onrender.com/api/forms/${formId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setFormResponse(data);
        
        const templateRes = await fetch(`https://course-project-back-tv8f.onrender.com/api/templates/${data.templateId}`);
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
    <div className="container mt-4">
      <h2>{template.templateName}</h2>
      <p className="text-muted">{template.description}</p>
      <form>
        {template.questions?.map((q, idx) => (
          <div key={idx} className="mb-3">
            <label className="form-label">{q.title}</label>
            {q.type === 'text' && (
              <input type="text" className="form-control" value={formResponse.answers[idx] || ''} disabled />
            )}
            {q.type === 'textarea' && (
              <textarea className="form-control" value={formResponse.answers[idx] || ''} disabled />
            )}
            {q.type === 'checkbox' && q.checkboxOptions?.map((opt, i) => (
              <div key={i} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`check-${idx}-${i}`}
                  checked={formResponse.answers[idx]?.includes(opt)}
                  disabled
                  readOnly
                />
                <label className="form-check-label" htmlFor={`check-${idx}-${i}`}>{opt}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">Назад</button>
      </form>
    </div>
  );
};

export default FilledFormPage;