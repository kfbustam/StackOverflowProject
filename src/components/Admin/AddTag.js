import "./AddTag.css";
import AdminSidebar from './Sidebar';
import axios from 'axios'
import API_URL from '../../apiConfig'
import React, { useState } from 'react'


export default function NewTag() {
  const [tag, setTag] = useState('')
  const [desc, setDesc] = useState('')
  const [tagsuccess, setTagsuccess] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();

        axios.post(`${API_URL}/api/tag/addTag`, {
          name: tag,
          description: desc
      })
      .then(res => {
           
          setTagsuccess(true);
          console.log("tagsuccess",tagsuccess)

      })
      .catch(err => {
          console.log(err)
      })
  }
  const handleRefresh = (e) => {
    window.location.reload();

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
          <textarea  className = "advancedSearchTextbox" rows="10" onChange={(event) => { setDesc(event.target.value); }} ></textarea>
        </div>

        <button className="addTagButton" onClick={handleSubmit}>Create</button>
        <br>
        </br>
        <br></br>

        {tagsuccess && (<div><button className="addTagButton" onClick={handleRefresh}>Tag Added Successfully, Click to add new one</button></div>)}
      </form>
    </div>
    </div>
    </>
  );
}
