import React, {useState, useRef, useMemo, useEffect} from 'react';
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
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);


  useEffect(() => {
    fetchPosts();
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  }

  async function fetchPosts() {
    setIsPostsLoading(true);
    setTimeout(async () => {
      const posts = await PostService.getAll();
      setPosts(posts);
      setIsPostsLoading(false);
    }, 1000)

  }

  // Получаем post из дочернего компон
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
      </MyModal>

      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {isPostsLoading
      ? <h1>Идет загрузка....</h1>
      :<PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов про JS"/>
      }

    </div>
  )
    ;
}

export default App;
