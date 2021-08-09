import { Modal, Row, Col, Form, Input, Select } from 'antd';

const { Option } = Select;

const CustomerModal = ({ form, visible, onSubmit, onClose }) => {

    return (<Modal width={800} title="เพืมสินค้า" visible={visible} onOk={onSubmit} onCancel={onClose}>
        <Row>
            <Col span="14">
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 17 }}
                    layout="horizontal"
                    form={form}
                    size="small"
                >
                    <Form.Item name="prefix" label="คำนำหน้า" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="firstname" label="ชื่อ" rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastname" label="สกุล" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="เบอร์โทรศัพท์" rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="ที่อยู่">
                        <Input />
                    </Form.Item>
                    <Form.Item name="province_name" label="จังหวัด" rules={[{ required: true }]}>
                        <Select allowClear disabled>
                            <Option value="1">Option 1</Option>
                            <Option value="2">Option 2</Option>
                            <Option value="3">Option 3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="amphur_name" label="อำเภอ" rules={[{ required: true }]} >
                        <Select allowClear disabled>
                            <Option value="1">Option 1</Option>
                            <Option value="2">Option 2</Option>
                            <Option value="3">Option 3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="tambon_name" label="ตำบล" rules={[{ required: true }]}>
                        <Select allowClear disabled>
                            <Option value="1">Option 1</Option>
                            <Option value="2">Option 2</Option>
                            <Option value="3">Option 3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="post_code" label="รหัสไปรษณีย์" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Col>
            <Col span="10">
                รูปภาพ
            </Col>
        </Row>
    </Modal >);
}

export default CustomerModal;