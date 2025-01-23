import React, { useEffect, useState } from 'react';
import { Card, Space, Statistic, Typography, Table, Row, Col } from 'antd';
import { 
    DollarCircleOutlined, 
    ShoppingCartOutlined, 
    ShoppingOutlined, 
    UserOutlined 
} from '@ant-design/icons';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getCustomers, getInventory } from '../API';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const getRevenue = () => {
    return fetch('https://dummyjson.com/carts').then(res => res.json());
};


export const getOrders = () => {
    return fetch('https://dummyjson.com/carts/1').then(res => res.json());
};

function DashBoard() {
    const [orders,setOrders]=useState(0) 
    const [inventory,setInventory]=useState(0)
    const [customer,setCustomer]=useState(0)
    const [revenue,setRevenue]=useState(0)

    useEffect(()=>{
        getOrders().then(res => {
            setOrders(Math.round(res.total)); 
            setRevenue(Math.round(res.discountedTotal));
        });
        getInventory().then(res => {
            setInventory(Math.round(res.total)); 
        });
        getCustomers().then(res => {
            setCustomer(Math.round(res.total)); 
        });
    },[])

    return (
        <Space size={20} direction='vertical'>
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction="horizontal">
                <DashBoardCard 
                    icon={<ShoppingCartOutlined style={iconStyle("green", "lightgreen")} />} 
                    title="Orders" 
                    value={orders} 
                />
                <DashBoardCard 
                    icon={<ShoppingOutlined style={iconStyle("blue", "lightgreen")} />} 
                    title="Inventory" 
                    value={inventory} 
                />
                <DashBoardCard 
                    icon={<UserOutlined style={iconStyle("violet", "rgb(219, 197, 156)")} />} 
                    title="Customers" 
                    value={customer} 
                />
                <DashBoardCard 
                    icon={<DollarCircleOutlined style={iconStyle("gold", "rgb(219, 162, 112)")} />} 
                    title="Revenue" 
                    value={revenue} 
                />
            </Space>

            
            <Row gutter={16}>
                <Col span={12}>
                    <RecentOrders />
                </Col>
                <Col span={12}>
                    <DashBoardChart />
                </Col>
            </Row>
        </Space>
    );
}

function DashBoardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        getOrders()
            .then(res => {
                setDataSource(res.products.splice(0, 3)); // Access products directly
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <Typography.Title level={5}>Recent Orders</Typography.Title>
            <Table
                columns={[
                    {
                        title: 'Title',
                        dataIndex: 'title',
                    },
                    {
                        title: 'Quantity',
                        dataIndex: 'quantity',
                    },
                    {
                        title: 'Price',
                        dataIndex: 'price',
                        render: (text) => text ? Math.round(text) : 0, // Fix NaN issue
                    },
                ]}
                loading={loading}
                dataSource={dataSource}
                rowKey="id"
            />
        </>
    );
}

function DashBoardChart() {
    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: []
    });


    useEffect(() => {
        getRevenue().then(res => {
            const labels = res.carts.map(cart => `User  -${cart.userId}`);
            const data = res.carts.map(cart => cart.discountedTotal);
            const dataSource = {
                labels,
                datasets: [
                    {
                        label: 'Revenue',
                        data: data,
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    },
                ],
            };

            setRevenueData(dataSource);
        });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Order Revenue',
            },
        },
    };

    return (
        <Card style={{width: '500px', height: '250px', marginTop:'60px' }}>
            <Bar options={options} data={revenueData} />
        </Card>
    );
}

const iconStyle = (color, bgColor) => ({
    color,
    fontSize: 24,
    backgroundColor: bgColor,
    borderRadius: 20,
    padding: 8,
});

export default DashBoard;