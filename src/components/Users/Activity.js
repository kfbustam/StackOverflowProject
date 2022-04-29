import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Answers from './Activity/Answers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === 0 && (
        <Box sx={{ p: 3 }}>
          <Answers />
        </Box>
      )}
    </div>
  );
}

function tabProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function Activity() {
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
    bronzeCount,
    goldCount,
    reputationCount,
    silverCount,
  } = user

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '5%', margin: '10px 0px 0px 20px'}}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Answers" {...tabProps(0)} />
        <Tab label="Questions" {...tabProps(1)} />
        <Tab label="Tags" {...tabProps(2)} />
        <Tab label="Badges" {...tabProps(3)} />
        <Tab label="Bookmarks" {...tabProps(4)} />
        <Tab label="Reputation" {...tabProps(5)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Answers
      </TabPanel>
      <TabPanel value={value} index={1}>
        Questions
      </TabPanel>
      <TabPanel value={value} index={2}>
        Tags
      </TabPanel>
      <TabPanel value={value} index={3}>
        Badges
      </TabPanel>
      <TabPanel value={value} index={4}>
        Bookmarks
      </TabPanel>
      <TabPanel value={value} index={5}>
        Reputation
      </TabPanel>
    </div>
  )
}

export default Activity
