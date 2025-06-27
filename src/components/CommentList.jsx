import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './CommentList.css'; 

function CommentList({ articleId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('comments')
      .select('*')
      .eq('article_id', articleId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching comments:', error);
        } else {
          setComments(data);
        }
        setLoading(false);
      });
  }, [articleId]);

  if (loading) return <p>Loading comments...</p>;

  console.log(comments, '<<< this is the comments')

  return (
    <div className="comment-list">
      <h3>Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-card">
          <p><strong>{comment.author}</strong> 🗓 {new Date(comment.created_at).toLocaleDateString()}</p>
          <p>{comment.body}</p>
          <p>👍 {comment.votes}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
