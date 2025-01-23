import { Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../API";

function Inventory() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getInventory().then(res => {
            setDataSource(res.products); 
            setLoading(false); 
        }).catch(err => {
            console.error(err);
            setLoading(false); 
        });
    }, []);

    const columns = [
        {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            render: (text) => <img src= {text} alt="Product Thumbnail" style={{ width: 50, height: 50 }} />, 
          
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Price",
            dataIndex: "price",
            render:(value) => <span>${value}</span>
        },
        {
            title: "Rating",
            dataIndex: "rating",
            render:(rating) =>{
              return <Rate value={rating} allowHalf disabled />
            }
        },
        {
            title: "Stock",
            dataIndex: "stock",
        },
       
        {
            title: "Brand",
            dataIndex: "brand",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
    ];

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Inventory</Typography.Title>
            <Table 
                columns={columns} 
                dataSource={dataSource} 
                pagination={{
                  pageSize:5,
                }}
                loading={loading} 
                rowKey="id" 
            />
        </Space>
    );
}

export default Inventory;