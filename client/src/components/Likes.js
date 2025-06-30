import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LikeButton = ({ templateId }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [count, setCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const { t } = useTranslation();

    const token = localStorage.getItem('token');

    const fetchLikes = async () => {
        try {
        const res = await fetch(`${API_URL}/api/templates/${templateId}/likes`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCount(data.count);
        setLiked(data.likedByUser);
        } catch (err) {
        console.error(err);
        }
    };

    useEffect(() => {
        fetchLikes();
    }, [templateId]);

    const toggleLike = async () => {
        try {
        const res = await fetch(`${API_URL}/api/templates/${templateId}/likes`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setLiked(data.liked);
        setCount((prev) => prev + (data.liked ? 1 : -1));
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <button
        style={{height:'30px', width:'50px'}}
        onClick={toggleLike}
        disabled={!token}
        className={`btn ${liked ? 'btn-danger' : 'btn-outline-secondary'} p-0 text-center mb-5`}
        title={liked ? t('unlike') : t('like')}
        >
        <i class="bi bi-heart me-2"></i>{count}
        </button>
    );
}

export default LikeButton