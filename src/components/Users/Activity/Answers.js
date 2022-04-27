import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { brown, yellow, grey } from '@mui/material/colors';
import Card from '@mui/material/Card';
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
import Chip from '@mui/material/Chip';
import Check from '@mui/icons-material/Check';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const postListItem = {
  display: 'flex',
  flexDirection: 'column',
  height: 150,
}

const filterButtonGroupStyle = {
  display: 'flex',
  margin: '15px 0px 15px 0px',
  justifyContent: 'end'
}

function Answers() {
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
    answersCount,
    reputationCount,
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
      answeredDate: 'Oct 14, 2021 at 14:30',
      lastModified: 'modified Apr 7 at 11:14',
      isAccepted: true,
      numOfVotes: 10,
      questionTitle: 'Attempting to save only the metadata to a file from RTSP stream',
      url: 'https://stackoverflow.com/questions/71715649/attempting-to-save-only-the-metadata-to-a-file-from-rtsp-stream',
      reputationCount: 50,
      tags: [
        {
          name: 'javascript',
          url: 'https://stackoverflow.com/questions/tagged/javascript'
        },
        {
          name: 'python',
          url: 'https://stackoverflow.com/questions/tagged/javascript'
        },
        {
          name: 'pandas',
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
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>{answersCount} Answers</h3>
        <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle}>
            <Button>Score</Button>
            <Button>Activity</Button>
            <Button>Newest</Button>
          </ButtonGroup>
        </div>
      </div>
      <List>
        {
          posts.map((post) => {
            const {
              answeredDate,
              answerTitle,
              isAccepted,
              numOfVotes,
              url,
              questionTitle,
              tagLabel,
              tags,
            } = post
            return (
              <>
                <ListItem style={postListItem}>
                  <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%', gap: 5}}>
                    <div style={{display: 'flex', margin: 'auto 0px auto 0px'}}>{numOfVotes} votes</div>
                    <Chip icon={isAccepted ? <Check /> : null} label="Accepted" color="success" />
                  </div>
                  <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
                    <h3>
                      <a href={url} style={{color: '#0074cc', fontSize: 17}}>{questionTitle}</a>
                    </h3>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <>
                      {
                        tags.map(tag => {
                          const {name, url} = tag;
                          return <a className='search-tag-block me-1' href={url}>{name}</a>;
                        })
                      }
                    </>
                    <>
                      answered {answeredDate}
                    </>
                  </div>
                </ListItem>
                <Divider />
              </>
            );
          })
        }
      </List>
    </div>
  )
}

export default Answers