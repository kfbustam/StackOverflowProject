import "./Sidebar.css";
import { Timeline, PermIdentity, BarChart, DynamicFeed, WorkOutline, } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/addtag" className="link">
            <li className="sidebarListItem active">
            <WorkOutline className="sidebarIcon" />
              Add Tag
            </li>
            </Link>
            <Link to="/reviewquestion" className="link">
            <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
              Review Question
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Analytics</h3>
          <ul className="sidebarList">
            <Link to="/userlist" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users Reputation
              </li>
            </Link>
            <Link to="/quesgraph" className="link">
              <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
                Questions/Day
              </li>
            </Link>
            <Link to="/toptags" className="link">
            <li className="sidebarListItem">
            
              <BarChart className="sidebarIcon" />
              Top 10 Tags
            </li>
            </Link> 
            <Link to="/questionlist" className="link">
            <li className="sidebarListItem">
            <DynamicFeed className="sidebarIcon" />
              Top 10 Questions
            </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}