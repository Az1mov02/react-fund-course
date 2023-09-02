import React, {useState, useRef, useMemo} from 'react';
import Counter from "./components/Counter"
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from './components/UI/select/MySelect'
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'Description 1'},
    {id: 2, title: 'Python', body: 'Description 2'},
    {id: 3, title: 'C++ ', body: 'Description 3'}
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})
const [modal, setModal] = useState(false);


  const sortedPosts = useMemo(() => {
    console.log('Отработала функция сортед постс')
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  }

  // Полусаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal >

      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов про JS"/>

    </div>
  )
    ;
}

export default App;
