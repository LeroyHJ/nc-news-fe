import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom'
import './ArticleList.css';

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    supabase
    .from('articles')
    .select('*')
    .then(({ data, error }) => {
        if (error) {
            console.error('Error fetching articles:', error);
        } else {
            setArticles(data);
        }
        setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading articles...</p>;

console.log(articles)

  return (
    <>
    <h1>NC NEWS</h1>
    <div className="article-list">
      {articles.map((article) => (
        <div key={article.article_id} className="article-card">
          <img src={article.article_img_url} alt={article.title} />
          <Link to={`/articles/${article.article_id}`}>
            <h2>{article.title}</h2>
          </Link>
          <p>{article.body}</p>
          <p>By {article.author} in {article.topic}</p>
          <p>🗓 {new Date(article.created_at).toLocaleDateString()}</p>
          <p>💬 {article.votes || 0} | 👍 {article.votes}</p>
        </div>
      ))}
    </div>
    </>
  );
}

export default ArticleList;
