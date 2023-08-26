import { useState, useEffect, useContext } from 'react'

import { UserContext } from './UserContext'
import Post from './Post'
import dbConnection from '../services/dbConnection'

const POST_DB = 'posts'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    dbConnection
      .getData(POST_DB)
      .then(postsFromDB => setPosts(postsFromDB))
  }, [])

  return (
    <div>
      {Object.keys(user).length > 0 && (
        <table style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <tbody>
            <tr>
              <td>{user.profile.nickname}</td>
              <td><button onClick={() => setUser({})}>logout</button></td>
            </tr>
          </tbody>
        </table>
      )}
      {
        posts.map(post =>
          <Post key={post.id} parentPost={post} setPosts={setPosts} />
        )
      }
    </div>
  )
}

export default HomePage