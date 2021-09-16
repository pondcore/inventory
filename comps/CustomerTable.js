import { Avatar, Button, Table, Space } from 'antd';
import styles from './css/TABLE.module.css'

const CustomerTable = ({ customers }) => {

    const editCustomer = (data) => {
        console.log('Edit', data);
    }

    const deleteCustomer = (data) => {
        console.log('Delete', data);
    }

    const manageColumns = (text, record) => (
        <Space size="middle">
            <Button onClick={() => { editCustomer(record) }}>Edit</Button>
            <Button onClick={() => { deleteCustomer(record) }}>Delete</Button>
        </Space>
    );

    const columns = [
        {
            title: 'รูป',
            dataIndex: 'image',
            align: 'center',
            key: 'image',
            render: function avatar(image) {
                return (<Avatar
                    size={64}
                    src={image}
                    alt=""
                />)
            }
        },
        {
            title: 'ชื่อ',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'ที่อยู่',
            dataIndex: 'description',
            key: 'description',
            width: 'max-content',
        },
        {
            title: 'ตำบล/แขวง',
            dataIndex: 'tambon_name',
            key: 'tambon_name',
        },
        {
            title: 'อำเภอ/เขต',
            dataIndex: 'amphur_name',
            key: 'amphur_name',
        },
        {
            title: 'จังหวัด',
            dataIndex: 'province_name',
            key: 'province_name',
        },
        {
            title: 'รหัสไปรษณีย์',
            dataIndex: 'post_code',
            key: 'post_code',
        },
        {
            title: 'จัดการ',
            key: 'action',
            align: 'center',
            render: manageColumns
        },
    ];

    return (
        <Table
            dataSource={customers}
            columns={columns}
        />
    );
}

export default CustomerTable;
