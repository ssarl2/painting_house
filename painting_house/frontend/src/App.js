import Content from './components/Content'

const Comment = () => {
  return (
    <div>
      comments
    </div>
  )
}

const Post = () => {
  return (
    <div>
      <Content />
      <Comment />
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h2>Painting house</h2>
      <Post />
    </div>
  )
}

export default App