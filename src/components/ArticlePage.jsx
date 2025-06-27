import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import CommentList from './CommentList';
import './ArticlePage.css'; 

function ArticlePage() {
  const { article_id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voteCount, setVoteCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

function handleVote(change) {
    const newVoteCount = voteCount + change;
    setVoteCount(newVoteCount); 
    setErrorMsg(''); 

    supabase
    .from('articles')
    .update({ votes: newVoteCount })
    .eq('article_id', article_id)
    .then(({ error }) => {
        if (error) {
        setVoteCount(voteCount);
        setErrorMsg('Failed to update vote. Please try again.');
        console.error(error);
        }
    });
  }

  function handleSubmitComment() {
    if (newComment.trim() === '') return;
  
    setIsSubmitting(true);
    setSubmitError('');
  
    const commentData = {
      author: 'guest_user',
      body: newComment.trim(),
      article_id: article_id,
      created_at: new Date().toISOString(),
      votes: 0,
    };
  
    supabase
      .from('comments')
      .insert([commentData])
      .then(({ data, error }) => {
        if (error) {
          setSubmitError('Failed to post comment. Try again.');
          console.error(error);
        } else {
          setComments((prev) => [data[0], ...prev]);
          setNewComment('');
        }
        setIsSubmitting(false);
      });
  }
  


    useEffect(() => {
    supabase
    .from('articles')
    .select('*')
    .eq('article_id', article_id)
    .single()
    .then(({ data, error }) => {
        if (error) {
            console.error('Error fetching article:', error);
        } else {
            setArticle(data);
            setVoteCount(data.votes)
        }
        setLoading(false);
    });
    }, [article_id]);

    if (loading) return <p>Loading article...</p>;
    if (!article) return <p>Article not found.</p>;

    return (
    <div className="article-page">
        <h1>{article.title}</h1>
      <img src={article.article_img_url} alt={article.title} />
      <p className="meta">
        By {article.author} in {article.topic} — 🗓 {new Date(article.created_at).toLocaleDateString()}
      </p>
      <p>{article.body}</p>
      <p>💬 {article.comment_count || 0} | 👍 {voteCount}</p>

      <div className="vote-controls">
        <button onClick={() => handleVote(1)}>👍 Upvote</button>
        {/* <span>{voteCount} votes</span> */}
        <button onClick={() => handleVote(-1)}>👎 Downvote</button>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </div>

      <div className="comment-form">
        <h3>Leave a Comment</h3>
        <textarea
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="4"
            cols="50"
            disabled={isSubmitting}
        />
        <br />
        <button
            onClick={handleSubmitComment}
            disabled={isSubmitting || newComment.trim() === ''}
        >
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
        {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
    </div>

      <CommentList articleId={article_id}/>
    </div>
  );
}

export default ArticlePage;
