import React from 'react';
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

function Profile() {
  const user = {
    aboutMeText: 'about',
    answersCount: 12,
    bronzeCount: 123,
    goldCount: 54,
    lastSeen: 'this week',
    lengthOfTimeAsMember: '3 days',
    profileIconSrc: 'http://placekitten.com/200/300',
    reachedCount: 42,
    reputationCount: 123,
    questionsCount: 64,
    silverCount: 12,
    username: 'kfbustam',
  }
  const {
    aboutMeText,
    answersCount,
    bronzeCount,
    goldCount,
    reputationCount,
    reachedCount,
    questionsCount,
    silverCount,
  } = user
  const topTags = [
    {name: 'Autobiographer', score: 123, postCount: 1233, postPercentage: 12, badgeType: 'gold', createDate: 'Nov 7'},
    {name: 'Legendary', score: 123, postCount: 1233, postPercentage: 12, badgeType: 'gold', createDate: 'Nov 7'},
    {name: 'Dataframe', score: 123, postCount: 1233, postPercentage: 12, badgeType: 'gold', createDate: 'Nov 7'}
  ]
  const topGoldTags = [
    {name: 'Autobiographer', createDate: 'Nov 7'},
    {name: 'Legendary', createDate: 'Nov 7'},
    {name: 'Dataframe', createDate: 'Nov 7'}
  ]
  const topSilverTags = [
    {name: 'Autobiographer', createDate: 'Nov 7'},
    {name: 'Legendary', createDate: 'Nov 7'},
    {name: 'Dataframe', createDate: 'Nov 7'}
  ]
  const topBronzeTags = [
    {name: 'Autobiographer', createDate: 'Nov 7'},
    {name: 'Legendary', createDate: 'Nov 7'},
    {name: 'Dataframe', createDate: 'Nov 7'}
  ]
  const allTagsURL = ''
  const posts = [
    {
      answerCount: 1,
      lastModified: 'modified Apr 7 at 11:14',
      questionTitle: 'Attempting to save only the metadata to a file from RTSP stream',
      url: 'https://stackoverflow.com/questions/71715649/attempting-to-save-only-the-metadata-to-a-file-from-rtsp-stream',
      reputationCount: 50,
      tags: [
        {
          name: 'javascript',
          url: 'https://stackoverflow.com/questions/tagged/javascript'
        }
      ],
      user: {
        reputationCount: 123,
        username: 'kfbustam',
        userProfileURL: 'https://stackoverflow.com/questions/tagged/javascript',
        profileIconSrc: 'http://placekitten.com/200/300' 
      },
      voteCount: 4,
      viewCount: 124
    }
  ]

  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '5%', margin: '10px 0px 0px 20px'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h3>Stats</h3>
        <Card variant="outlined" style={{width: 250, height: 160}}>
          <Grid container rowSpacing={1} style={{margin: 20}}>
            <Grid item xs={6} style={{display: 'flex', flexDirection: 'column'}}>
              <span>{reputationCount}</span>
              <span>reputation</span>
            </Grid>
            <Grid item xs={6} style={{display: 'flex', flexDirection: 'column'}}>
              <span>{reachedCount}</span>
              <span>reached</span>
            </Grid>
            <Grid item xs={6} style={{display: 'flex', flexDirection: 'column'}}>
              <span>{answersCount}</span>
              <span>answers</span>
            </Grid>
            <Grid item xs={6} style={{display: 'flex', flexDirection: 'column'}}>
              <span>{questionsCount}</span>
              <span>questions</span>
            </Grid>
          </Grid>
        </Card>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 40}}>
        <div>
          <h3>About</h3>
          {aboutMeText}
        </div>
        <div>
          <h3>Badges</h3>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <Card variant="outlined" style={{width: 250, height: 200}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <EmojiEventsIcon sx={{ color: yellow[600] }} style={{width: 60, height: 60}}/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <h4>
                    {goldCount}
                  </h4>
                  <div style={{fontSize: 13}}>
                    gold badges
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', margin: 20}}>
                {topGoldTags.map(tag => 
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Badge badgeContent={tag.name} color="primary" style={{width: 40, margin: 'auto 0px auto'}} />
                    <div>{tag.createDate}</div>
                  </div>
                )}
              </div>
            </Card>
            <Card variant="outlined" style={{width: 250, height: 200}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <EmojiEventsIcon sx={{ color: grey[400] }} style={{width: 60, height: 60}}/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <h4>
                    {silverCount}
                  </h4>
                  <div style={{fontSize: 13}}>
                    silver badges
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', margin: 20}}>
                {topSilverTags.map(tag => 
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Badge badgeContent={tag.name} color="primary" style={{width: 40, margin: 'auto 0px auto'}} />
                    <div>{tag.createDate}</div>
                  </div>
                )}
              </div>
            </Card>
            <Card variant="outlined" style={{display: 'flex', flexDirection: 'column', width: 250, height: 200}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <EmojiEventsIcon sx={{ color: brown[400] }} style={{width: 60, height: 60}}/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <h4>
                    {bronzeCount}
                  </h4>
                  <div style={{fontSize: 13}}>
                    bronze badges
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', margin: 20}}>
                {topBronzeTags.map(tag => 
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Badge badgeContent={tag.name} color="primary" style={{width: 40, margin: 'auto 0px auto'}} />
                    <div>{tag.createDate}</div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
        <div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h3>Top tags</h3>
            <a href={allTagsURL} style={{color: '#0074cc', fontSize: 14, margin: 'auto 5px auto 5px'}}>View all tags</a>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {topTags.map((topTag) => (
                  <TableRow
                    key={topTag.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {topTag.name}
                    </TableCell>
                    <TableCell align="right">{topTag.score} score</TableCell>
                    <TableCell align="right">{topTag.postCount} posts</TableCell>
                    <TableCell align="right">{topTag.postPercentage} posts %</TableCell>
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
              <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle}>
                <Button>All</Button>
                <Button>Questions</Button>
                <Button>Answers</Button>
                <Button>Articles</Button>
              </ButtonGroup>
              <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle}>
                <Button>Score</Button>
                <Button>Newest</Button>
              </ButtonGroup>
            </div>
          </div>
          <List>
            {
              posts.map((post) => {
                const {
                  answerTitle,
                  url,
                  questionTitle,
                  tagLabel,
                  tags,
                } = post
                return (
                  <>
                    <ListItem style={postListItem}>
                      <div style={{textAlign: 'center'}}>
                        {questionTitle != null && <>Q</>}
                        {answerTitle != null && <>A</>}
                        {tagLabel != null && <>tagLabel</>}
                      </div>
                      <div>
                        <Button variant="outlined" color="primary" style={{width: 100}}>
                          {reputationCount}
                        </Button>
                      </div>
                      <div>
                        <h3>
                          <a href={url} style={{color: '#0074cc', fontSize: 17}}>{questionTitle}</a>
                        </h3>
                      </div>
                      <div>
                      {
                        tags.map((tag) => {
                          const {name, url} = tag
                          return (
                            <Button size="small" variant="contained" href={url}>{name}</Button>
                          );
                        })
                      }
                      </div>
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