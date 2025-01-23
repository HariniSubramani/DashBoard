import { Typography, Row, Col } from 'antd';
import React from 'react';

function AppFooter() {
  return (
    <div style={footerStyle}>
      <Row justify="space-between" align="middle">
        <Col>
          <Typography.Link 
            href='tel:+123456789' 
            style={linkStyle}
            onMouseOver={(e) => e.currentTarget.style.color = '#000000'}
            onMouseOut={(e) => e.currentTarget.style.color = '#000000'}
          >
            +123456789
          </Typography.Link>
        </Col>
        <Col>
          <Typography.Link 
            href='https://www.google.com' 
            target='_blank' 
            style={linkStyle}
            onMouseOver={(e) => e.currentTarget.style.color = '#000000'}
            onMouseOut={(e) => e.currentTarget.style.color = '#000000'}
          >
            Privacy Policy
          </Typography.Link>
          <Typography.Link 
            href='https://www.google.com' 
            target='_blank' 
            style={linkStyle}
            onMouseOver={(e) => e.currentTarget.style.color = '#000000'}
            onMouseOut={(e) => e.currentTarget.style.color = '#000000'}
          >
            Terms Of Use
          </Typography.Link>
        </Col>
      </Row>
    </div>
  );
}

const footerStyle = {
  backgroundColor: ' #FFFFFF', // Light gray background
  padding: '20px 40px', // Padding for footer
  textAlign: 'center',
  borderTop: '1px solid  #d9d9d9', // Light border
  boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow on top
};

const linkStyle = {
  margin: '0 15px',
  color: '#000000', // Black color
  fontWeight: 'bold', // Make the text bold
  transition: 'color 0.3s',
};

export default AppFooter;