import { useState, useEffect } from 'react'

import Post from '../components/Post'
import dbConnection from '../services/dbConnection'

const POST_DB = 'posts'

const HomePage = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    dbConnection
      .getData(POST_DB)
      .then(postsFromDB => setPosts(postsFromDB))
  }, [])

  return (
    <div>
      {
        posts.map(post => <Post key={post.id} post={post} />)
      }
    </div>
  )
}

export default HomePage