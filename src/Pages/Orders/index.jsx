

import { Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../API"; 
function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
      setLoading(true);
      getOrders()
          .then(res => {
              console.log(res); 
              setDataSource(res.products); 
              setLoading(false);
          })
          .catch(err => {
              console.error(err);
              setLoading(false);
          });
  }, []);

  const columns = [
      {
          title: "Title",
          dataIndex: "title", 
      },
      {
          title: "Price",
          dataIndex: "price",
          render: (value) => <span>${Math.round(value)}</span>,
      },
      {
          title: "Discounted Price",
          dataIndex: "discountedTotal", 
          render: (value) => <span>${Math.round(value)}</span>,
      },
      {
          title: "Quantity",
          dataIndex: "quantity", 
      },
      {
          title: "Total",
          dataIndex: "total", 
          render: (value) => <span>${Math.round(value)}</span>,
      },
  ];

  return (
      <Space size={20} direction="vertical">
          <Typography.Title level={4}>Orders</Typography.Title>
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

export default Orders;