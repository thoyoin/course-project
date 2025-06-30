import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LikeButton from './Likes';

const Comments = ({ templateId }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { t } = useTranslation();

    const token = localStorage.getItem('token');
    let currentUserId = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            currentUserId = decoded.userId;
        } catch (err) {
            currentUserId = null;
        }
    }

    const fetchComments = async () => {
        try {
            const res = await fetch(`${API_URL}/api/comments/${templateId}/comments`);
        if (!res.ok) throw new Error('Failed to fetch comments');
            const data = await res.json();
            setComments(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchComments();
        const interval = setInterval(fetchComments, 3000);
        return () => clearInterval(interval);
    }, [templateId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/comments/${templateId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content: newComment.trim() }),
        });
        if (!res.ok) throw new Error('Failed to post comment');
        setNewComment('');
        fetchComments();
        } catch (err) {
        alert(err.message);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            const res = await fetch(`${API_URL}/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (!res.ok) throw new Error('Failed to delete comment');
            fetchComments();
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div style={{maxWidth:'700px'}} className='d-flex w-100 flex-column justify-content-center'>
            <div className=" m-3">
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <h4 className='mb-5'>{t('comments')}</h4>
                    <LikeButton templateId={templateId} />
                </div>
               
                {loading && <div className="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div>}
                {error && <p className="text-danger">{error}</p>}
                {!loading && !error && (
                    <>
                    <ul className="list-group mb-3">
                        {comments.map((comment) => (
                        <li key={comment.id} className="list-group-item border-0 border-bottom border-success">
                            <div className='d-flex flex-row justify-content-start align-items-center'>
                                <strong className='me-2'>{comment.authorId === currentUserId ? t('you') : comment.author?.name}</strong>
                                <small className="text-muted opacity-50">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </small>
                                {(currentUserId === comment.authorId) && (
                                    <button
                                        style={{background:'none'}}
                                        className="ms-auto p-0"
                                        onClick={() => handleDelete(comment.id)}
                                        title={t('delete_comment')}
                                    >
                                        <i class="bi bi-x fs-5"></i>
                                    </button>
                                )}
                            </div>
                            <p className='mt-3 mb-1 fw-light'>{comment.content}</p>
                        </li>
                        ))}
                        {comments.length === 0 && <p className='mb-1 fw-light text-muted opacity-50'>{t('nocomment')}</p>}
                    </ul>
                    <form onSubmit={handleSubmit} className='d-flex flex-row mb-5 justify-content-between'>
                        <textarea
                            className="form-control mb-2 px-3"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={t('tocomment')}
                            rows={3}
                            style={{outline: 'none', boxShadow: 'none', maxWidth: '600px', overflow: 'auto', resize: 'none'}}
                        />
                        <button style={{maxWidth:'60px', height: '75px'}} type="submit" className="btn w-100 btn-outline-success" disabled={!newComment.trim()}>
                            <i class="bi bi-send fs-5"></i>
                        </button>
                    </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default Comments