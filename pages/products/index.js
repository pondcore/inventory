import { Table, Tag, Space } from 'antd';
import React, { useEffect } from 'react';
import axios from "axios";

const Product = () => {

    useEffect(() => {
        axios
            .get("/api/user")
            .then(response => {
                console.log("response: ", response)
                // do something about response
            })
            .catch(err => {
                console.error(err)
            })
    })

    const manageColumns = (text, record) => (
        <Space size="middle">
            <a>Edit</a>
            <a>Delete</a>
        </Space>
    );

    const columns = [
        {
            title: 'รูป',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'ชื่อ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'รหัส SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'ราคา/บาท',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'น้ำหนัก',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'จำนวน',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'จัดการ',
            key: 'action',
            render: manageColumns
        },
    ];

    const dataSource = [
        {
            key: '1',
            name: 'John Brown',
            image: 32,
            sku: '10203040',
            price: 10,
            weight: 20,
            qty: 30
        },
        {
            key: '2',
            name: 'lorem',
            image: 32,
            sku: '10203040',
            price: 10,
            weight: 20,
            qty: 30
        }, {
            key: '3',
            name: 'ipsum',
            image: 32,
            sku: '10203040',
            price: 10,
            weight: 20,
            qty: 30
        },
    ];

    // constructor = (props) => {
    //     super(props);

    //     this.state = {
    //         data: [],
    //         pagination: {
    //             current: 1,
    //             pageSize: 10,
    //         },
    //         loading: false,
    //     };
    // }


    return (
        <div>
            <div className="page-header"><h1>จัดการสินค้า</h1></div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default Product