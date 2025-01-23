import { Badge, Image, Typography, Space, Drawer, List } from "antd";
import { BellFilled, MailOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getComments, getOrders } from "../../Pages/API";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen,setCommentsOpen]=useState(false)
  const [notificationsOpen,setNotificationsOpen]=useState(false)

  useEffect(() => {
    getComments().then(res => {
      setComments(res.comments); 
    })
    getOrders().then(res => {
      setOrders(res.products); 
    })
  }, []); 

  return (
    <div className="AppHeader" style={headerStyle}>
      <Image
        width={50} 
        src="https://i.pinimg.com/736x/f9/a2/a3/f9a2a3611b3ade195f5cd0ce456f1943.jpg" 
        alt="Logo"
        style={{ borderRadius: '50%', marginRight: '10px' }} 
      />
      <Typography.Title level={3} style={{ margin: 0, color: '#333' }}>
        Harini's Dashboard
      </Typography.Title>
      <Space style={{ marginLeft: 'auto' }}>
        <Badge count={comments.length} dot>
          <MailOutlined style={iconStyle} onClick={()=>{
              setCommentsOpen(true)
          }} />
        </Badge>
        <Badge count={orders.length}>
          <BellFilled style={iconStyle} onClick={()=>{
              setNotificationsOpen(true)
          }}/>
        </Badge>
      </Space>
      <Drawer title="Comments" open={commentsOpen} onClose={()=>{
        setCommentsOpen(false)
      }}  maskClosable>
        <List dataSource={comments} renderItem={(item)=>{
           return <List.Item>{item.body}</List.Item>
        }}></List>
      </Drawer>
      <Drawer title="Notifications" open={notificationsOpen} onClose={()=>{
        setNotificationsOpen(false)
      }}  maskClosable>
        <List dataSource={orders} renderItem={(item)=>{
           return <List.Item><Typography.Text strong>{item.title} </Typography.Text>has been ordered</List.Item>
        }}></List>
      </Drawer>
    </div>
  );
}

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 40px 10px 10px', 
  backgroundColor: '#ffffff', 
  borderBottom: '1px solid #e0e0e0', 
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const iconStyle = {
  fontSize: 24,
  color: '#000000', 
};

export default AppHeader;