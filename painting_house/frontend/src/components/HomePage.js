import { useState, useEffect } from 'react'

import Post from './Post'
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
        posts.map(post => <Post key={post.id} parentPost={post} setPosts={setPosts} />)
      }
    </div>
  )
}

export default HomePage