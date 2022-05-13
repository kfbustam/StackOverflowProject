import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { brown, yellow, grey } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import API_URL from '../../apiConfig'

const postListItem = {
  display: 'flex',
  flexDirection: 'row',
  height: 150
}

const filterButtonGroupStyle = {
  display: 'flex',
  margin: '15px 0px 15px 0px',
  justifyContent: 'end'
}
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

function Profile() {
  const [profile, setProfile] = useState([])
  const [repcount,setRepCount] = useState(0)
  const [reachcount, setReached] = useState(0)
  const [anscount, setAnswer]= useState(0)
  const [quescount, setQuestion] = useState(0)
  const [goldTags, setGoldtags] = useState([])
  const [silverTags, setSilvertags]= useState([])
  const [bronzeTags, setBronzetags]= useState([])
  const [about, setAbout]=useState("")
  const [tagstop, setTopTags] = useState([])
  const [questionpost, setQPost] = useState([])

  useEffect(() => {
    if (Object.values(profile).length > 0) return
    async function fetchProfile() {
      const response = await axios.get(`${API_URL}/api/user/getProfileTab/` + window.location.href
.substring(window.location.href
.lastIndexOf('/') + 1) )
      const userData = response.data.user
      setRepCount(userData["stats"]["reputationCount"])
      setAnswer(userData["stats"]["answersCount"])
      setReached(userData["stats"]["reachedCount"])
      setQuestion(userData["stats"]["questionsCount"])
      setAbout(userData["aboutMeText"])
      
      setGoldtags(userData["badges"]["topGoldTags"])
      setSilvertags(userData["badges"]["topSilverTags"])
      setBronzetags(userData["badges"]["topBronzeTags"])
      setTopTags(userData["tags"])
      setQPost(userData["posts"])
      setProfile(userData)
    }
    fetchProfile()
  }, [])
  
  const sendFilters = (value) =>{
    let filter;
    let sort;
    if(value=="All"||value=="Questions"||value=="Answers")
    {
      filter = value
      sort = "Score"
    }
    else{
      filter="All"
      sort = value
      
    }
    axios.get(`${API_URL}/api/user/getSortPost/` + window.location.href
.substring(window.location.href
.lastIndexOf('/') + 1) +"/"+filter+"/"+sort)
    .then(response=>{
      //console.log(response)
      setQPost(response.data.user)
    })
    .catch(error => {
      console.log(error.response.data.error)
   })
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '5%', margin: '10px 0px 0px 20px'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h3>Stats</h3>
        <Card variant="outlined" style={{width: 250, height: 160}}>
          
          <Grid container rowSpacing={1} style={{margin: 20}}>
            <Grid item xs={6} style={{display: 'flex', flexDirection: 'column'}}>
              <span>{repcount}</span>
              <span>reputation</span>
            </Grid>
            <Grid item xs={6} style={{display: 'flex', flexDirection: 'column'}}>
              <span>{reachcount}</span>
              <span>reached</span>
            </Grid>
            <Grid item xs={6} style={{display: 'flex', flexDirection: 'column'}}>
              <span>{anscount}</span>
              <span>answers</span>
            </Grid>
            <Grid item xs={6} style={{display: 'flex', flexDirection: 'column'}}>
              <span>{quescount}</span>
              <span>questions</span>
            </Grid>
          </Grid>
        </Card>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 40}}>
        <div>
          <h3>About</h3>
          {about}
        </div>
        <div>
          <h3>Badges</h3>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <Card variant="outlined" style={{width: 250, height: 200}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <EmojiEventsIcon sx={{ color: yellow[600] }} style={{width: 60, height: 60}}/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <h4>
                    {goldTags.length}
                  </h4>
                  <div style={{fontSize: 13}}>
                    gold badges
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', margin: 20}}>
                {goldTags.map(tag => 
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Badge badgeContent={tag.name} color="primary" style={{width: 40, margin: 'auto 0px auto'}} />
                    <br/>
                  </div>
                )}
              </div>
            </Card>
            <Card variant="outlined" style={{width: 250, height: 200}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <EmojiEventsIcon sx={{ color: grey[400] }} style={{width: 60, height: 60}}/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <h4>
                    {silverTags.length}
                  </h4>
                  <div style={{fontSize: 13}}>
                    silver badges
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', margin: 20}}>
                {silverTags.map(tag => 
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Badge badgeContent={tag.name} color="primary" style={{width: 40, margin: 'auto 0px auto'}} />
                    <br/>
                  </div>
                )}
              </div>
            </Card>
            <Card variant="outlined" style={{display: 'flex', flexDirection: 'column', width: 250, height: 200}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <EmojiEventsIcon sx={{ color: brown[400] }} style={{width: 60, height: 60}}/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <h4>
                    {bronzeTags.length}
                  </h4>
                  <div style={{fontSize: 13}}>
                    bronze badges
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', margin: 20}}>
                {bronzeTags.map(tag => 
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Badge badgeContent={tag.name} color="primary" style={{width: 40, margin: 'auto 0px auto'}} />
                    <br/>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
        <div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h3>Top tags</h3>
            <a style={{color: '#0074cc', fontSize: 14, margin: 'auto 5px auto 5px'}}>View all tags</a>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {tagstop.map((topTag) => (
                  <TableRow
                    key={topTag.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {topTag.name}
                    </TableCell>
                    <TableCell align="right">{topTag.scoreCount} score</TableCell>
                    <TableCell align="right">{topTag.postCount} posts</TableCell>
                    <TableCell align="right">{topTag.percentage} posts %</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h3>Top posts</h3>
            <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
              <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle} onClick={(e)=>sendFilters(e.target.attributes.getNamedItem('data-key').value)} >
                <Button data-key="All">All</Button>
                <Button data-key="Questions">Questions</Button>
                <Button data-key="Answers">Answers</Button>
              </ButtonGroup>
              <ButtonGroup variant="outlined" aria-label="outlined button group" onClick={(e)=>sendFilters(e.target.attributes.getNamedItem('data-key').value)} style={filterButtonGroupStyle}>
                <Button data-key="Score">Score</Button>
                <Button data-key="Newest">Newest</Button>
              </ButtonGroup>
            </div>
          </div>
          <List>
            {
              questionpost.map((post, index) => {
                const {
                _id,
                title,
                score,
                createdAt
                } = post
                return (
                  <>
                    <ListItem style={postListItem}>
                      <div style={{textAlign: 'center'}}>
                      </div>
                      <div>
                        <h3>
                          <a  style={{color: '#0074cc', fontSize: 17}} >{index+1}.{title}</a>
                          <br/>
                          <h6><b>Score:</b> {score}</h6>
                          <h6><b>CreatedAt:</b> {new Date(createdAt).toLocaleDateString("en-US", options)}</h6>
                        </h3>
                      </div>
                      {/* <div>
                      {
                        tags.map((tag) => {
                          const {name, url} = tag
                          return (
                            <Button size="small" variant="contained" href={url}>{name}</Button>
                          );
                        })
                      }
                      </div> */}
                    </ListItem>
                    <Divider />
                  </>
                );
              })
            }
          </List>
        </div>
      </div>
    </div>
  )
}

export default Profile