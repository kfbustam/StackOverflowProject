import "./AddTag.css";
import AdminSidebar from './Sidebar';
import axios from 'axios'
import API_URL from '../../apiConfig'
import React, { useState } from 'react'


export default function NewTag() {
  const [tag, setTag] = useState('')
  const [desc, setDesc] = useState('')
  const [tagsuccess, setTagsuccess] = useState(false)


  const handleSubmit = () => {

        axios.post(`${API_URL}/api/tag/addTag`, {
          name: tag,
          description: desc
      })
      .then(res => {
          //navigate('/questions/overview')
          setTagsuccess(true);

      })
      .catch(err => {
          console.log(err)
      })
  }

  return (
    <>
    <div className="containers">
       <AdminSidebar />

    
   
      <div className="newTag">
      <h1 className="addTagTitle">Add Tag</h1>
      <form className="addTagForm">
       
        <div className="addTagItem">
          <label>Name</label>
          <input type="text" placeholder="Add Tag" onChange={(event) => { setTag(event.target.value); }} />
        </div>
       
        <div className="addTagItem">
          <label>Description</label>
          <textarea rows="5" onChange={(event) => { setDesc(event.target.value); }} ></textarea>
        </div>

        <button className="addTagButton" onClick={handleSubmit}>Create</button>

        {tagsuccess && (<div>Tag has been added successfully</div>)}
      </form>
    </div>
    </div>
    </>
  );
}
