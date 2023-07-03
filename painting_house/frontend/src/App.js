import { useState, useEffect } from 'react'
import Post from './components/Post'
import dbConnection from './services/dbConnection'

const POST_DB = 'posts'

const App = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    dbConnection
      .getData(POST_DB)
      .then(postsFromDB => setPosts(postsFromDB))
  }, [])

  return (
    <div>
      <h2>Painting house</h2>
      {
        posts.map(post => <Post key={post.id} post={post} />)
      }

    </div>
  )
}

export default App