import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

const rootStyle = {
  backgroundColor: '#232629',
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
  width: '100vw'
}

function Footer({}) {
  const navigate = useNavigate()

  return ( 
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', margin: '20px 20px 0px 20px'}}>
        <div style={{display: 'flex', flexDirection: 'row', gap: 80}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button key="stack overflow" variant="text" style={{color: '#CCCCCC', fontWeight: 700}}>STACK OVERFLOW</Button>
            <Button key="questions" variant="text" style={{color: '#CCCCCC'}}>Questions</Button>
            <Button key="help" variant="text" style={{color: '#CCCCCC'}}>Help</Button>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button key="products" variant="text" style={{color: '#CCCCCC', fontWeight: 700}}>PRODUCTS</Button>
            <Button key="teams" variant="text" style={{color: '#CCCCCC'}}>Teams</Button>
            <Button key="advertising" variant="text" style={{color: '#CCCCCC'}}>Advertising</Button>
            <Button key="collectives" variant="text" style={{color: '#CCCCCC'}}>Collectives</Button>
            <Button key="talent" variant="text" style={{color: '#CCCCCC'}}>Talent</Button>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button key="company" variant="text" style={{color: '#CCCCCC', fontWeight: 700}}>COMPANY</Button>
            <Button key="about" variant="text" style={{color: '#CCCCCC'}}>About</Button>
            <Button key="press" variant="text" style={{color: '#CCCCCC'}}>Press</Button>
            <Button key="work here" variant="text" style={{color: '#CCCCCC'}}>Work Here</Button>
            <Button key="legal" variant="text" style={{color: '#CCCCCC'}}>Legal</Button>
            <Button key="privacy policy" variant="text" style={{color: '#CCCCCC'}}>Privacy Policy</Button>
            <Button key="terms of service" variant="text" style={{color: '#CCCCCC'}}>Terms of Service</Button>
            <Button key="contact us" variant="text" style={{color: '#CCCCCC'}}>Contact Us</Button>
            <Button key="cookie settings" variant="text" style={{color: '#CCCCCC'}}>Cookie Settings</Button>
            <Button key="cookie policy" variant="text" style={{color: '#CCCCCC'}}>Cookie Policy</Button>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button key="stack exchange network" variant="text" style={{color: '#CCCCCC', fontWeight: 700}}>STACK EXCHANGE NETWORK</Button>
            <Button key="technology" variant="text" style={{color: '#CCCCCC'}}>Technology</Button>
            <Button key="culture and recreation" variant="text" style={{color: '#CCCCCC'}}>{`Culture & recreation`}</Button>
            <Button key="life and arts" variant="text" style={{color: '#CCCCCC'}}>{`Life & arts`}</Button>
            <Button key="science" variant="text" style={{color: '#CCCCCC'}}>Science</Button>
            <Button key="professional" variant="text" style={{color: '#CCCCCC'}}>Professional</Button>
            <Button key="business" variant="text" style={{color: '#CCCCCC'}}>Business</Button>
            <Button key="api" variant="text" style={{color: '#CCCCCC'}}>API</Button>
            <Button key="data" variant="text" style={{color: '#CCCCCC'}}>Data</Button>
          </div>
        </div>
        <div>
          <Button key="blog" variant="text" style={{color: '#CCCCCC'}}>Blog</Button>
          <Button key="facebook" variant="text" style={{color: '#CCCCCC'}}>Facebook</Button>
          <Button key="twitter" variant="text" style={{color: '#CCCCCC'}}>Twitter</Button>
          <Button key="linkedin" variant="text" style={{color: '#CCCCCC'}}>LinkedIn</Button>
          <Button key="instagram" variant="text" style={{color: '#CCCCCC'}}>Instagram</Button>
        </div>
      </div>
    </div>
  );
}

export default Footer