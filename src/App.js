import './styles/App.css';
import Cunter from './component/Cunter';
import ClassCounter from './component/ClassCounter';
import PostList from './component/PostList';
import MyButton from './component/UI/button/MyButton';
import MyInput from './component/UI/input/MyInput';
import PostForm from './component/PostForm';
import MySelect from './component/UI/MySelect/MySelect';
import PostFilter from './component/PostFilter';
import MyModal from './component/UI/MyModal/MyModal';
import {sortedAndSerchPoost, usePosts} from './hooks/usePost';


import React,{useState, useEffect} from 'react'
import axios from 'axios';
import PostService from './API/PostService';
import Loader from './component/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount } from './units/pages';

function App() {
  
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1)
  const sortedAndSerchPoost = usePosts(posts, filter.sort, filter.query);


  const [fetchPosts, isPostsLoading, postError] = useFetching(async()=>{
    const respons  = await PostService.getAll(limit, page);
    setPosts(respons.data);
    const totalCount = respons.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));

  });

  console.log(totalPages)

  useEffect(()=>{
    fetchPosts();
  }, [])

  const createPost = (newPost) =>{
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post)=>{
    setPosts(posts.filter(p=>p.id !== post.id))
  }

  return (
    <div className="App">

      <MyButton style={{marginTop: '30px'}} onClick = {()=>setModal(true)}>
          Create Posts
      </MyButton>
      <MyModal visible={modal} setVisible = {setModal}>
        <PostForm create = {createPost}/>
      </MyModal>
      
      
      <hr style = {{margin: '15px 0'}} />
      <PostFilter 
      filter = {filter}
      setFilter = {setFilter}/>

      {postError &&
        <h1>fetch error{postError}</h1>
      }
      {isPostsLoading
        ? <div style = {{display: 'flex', justifyContent: 'center', marginTop:'50px'}}><Loader/></div>
        :<PostList remove = {removePost} posts={sortedAndSerchPoost} title={"post list"} />

      }
     
    </div>
  );
}

export default App;
