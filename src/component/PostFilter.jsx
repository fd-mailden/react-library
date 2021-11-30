import React from 'react'
import MyInput from './UI/input/MyInput';
import MySelect from './UI/MySelect/MySelect';

function PostFilter({filter, setFilter}) {
    return (
        <div>
        <MyInput 
          value = {filter.query}
          onChange = {e =>setFilter({...filter, query: e.target.value})}
          placeholder = "saerch" />
        <MySelect  
          value = {filter.sort}
          onChange = {selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue = "sort by..." 
          options = {[
            {value: 'title', name: 'by Name'},
            {value: 'body', name: 'by Discriotion'}
        ]}/>
      </div>
    )
}

export default PostFilter
