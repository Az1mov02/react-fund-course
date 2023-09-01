import React, {useState, useRef} from 'react';
import Counter from "./components/Counter"
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from './components/UI/select/MySelect'

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'Description'},
    {id: 2, title: 'Python', body: 'Description'},
    {id: 3, title: 'C++ ', body: 'Description'}
  ])

  const [selectedSort, setSelectedSort] = useState('')

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  // Полусаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  console.log(sort);
  }


  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <div>
        <MySelect
          value={selectedSort}
          onChange = {sortPosts}
          defaultValue="Сортировка"
          options={[
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'}
          ]}
        />
      </div>
      {posts.length
        ? <PostList remove={removePost} posts={posts} title="Список постов про JS"/>
        : <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
      }

    </div>
  )
    ;
}

export default App;
