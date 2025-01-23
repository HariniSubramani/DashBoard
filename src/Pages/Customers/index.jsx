

import { Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../API";

function Customers() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCustomers().then(res => {
            setDataSource(res.users); 
            setLoading(false); 
        }).catch(err => {
            console.error(err);
            setLoading(false); 
        });
    }, []);

    const columns = [
        {
            title: "Photo",
            dataIndex: "image",
            render: (text) => <img src={text} alt="User  Thumbnail" style={{ width: 50, height: 50 }} />, 
        },
        {
            title: "FirstName",
            dataIndex: "firstName", 
        },
        {
            title: "Last Name",
            dataIndex: "lastName", 
            render: (value) => <span>{value}</span> 
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Address",
            dataIndex: "address",
            render: (address) => {
                return <span>{address.address}, {address.city}</span>; // Ensure you access the correct properties
            }
        },
    ];

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Customers</Typography.Title>
            <Table 
                columns={columns} 
                dataSource={dataSource} 
                pagination={{
                    pageSize: 5,
                }}
                loading={loading} 
                rowKey="id" 
            />
        </Space>
    );
}

export default Customers;