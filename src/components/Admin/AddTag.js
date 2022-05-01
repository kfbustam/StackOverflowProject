import "./AddTag.css";
import AdminSidebar from './Sidebar';

export default function NewTag() {
  return (
    <>
    <div className="containers">
       <AdminSidebar />

    
   
      <div className="newTag">
      <h1 className="addTagTitle">Add Tag</h1>
      <form className="addTagForm">
       
        <div className="addTagItem">
          <label>Name</label>
          <input type="text" placeholder="Add Tag" />
        </div>
       
        <div className="addTagItem">
          <label>Description</label>
          <textarea rows="2"></textarea>
        </div>

        <button className="addTagButton">Create</button>
      </form>
    </div>
    </div>
    </>
  );
}
