import { Table } from 'antd';

const ProductTable = ({ tableData, columns }) => {
    return (
        <Table
            dataSource={tableData}
            columns={columns}
        />
    )
}

export default ProductTable;
