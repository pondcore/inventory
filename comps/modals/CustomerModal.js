import { Modal, Row, Col, Form, Input, Select } from 'antd';
import UploadBlock from '@/comps/forms/UploadBlock';
import useTranslation from 'next-translate/useTranslation';

const { Option } = Select;

const CustomerModal = ({ form, visible, onSubmit, onClose, provinces = [] }) => {
    let { t } = useTranslation();

    return (<Modal
        centered
        title={t('common:create_title', { text: t('customer:title') })}
        visible={visible}
        onOk={onSubmit}
        onCancel={onClose}
        width={860}
    >
        <Row>
            <Col span="14">
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 17 }}
                    layout="horizontal"
                    form={form}
                >
                    <Form.Item name="prefix" label={t('customer:form.prefix')} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="firstName" label={t('customer:form.first_name')} rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label={t('customer:form.last_name')} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label={t('customer:form.phone')} rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name="address" label={t('customer:form.address')}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="province" label={t('customer:form.province')} rules={[{ required: true }]}>
                        <Select placeholder={t('customer:form.select_default')} allowClear>
                            {provinces.data.map((item, index) =>
                                <Option key={index} value={item.province}>{item.province}</Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item name="district" label={t('customer:form.district')} rules={[{ required: true }]} >
                        <Select placeholder={t('customer:form.select_default')} allowClear disabled>
                            <Option value="1">Option 1</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="sub-district" label={t('customer:form.sub_district')} rules={[{ required: true }]}>
                        <Select placeholder={t('customer:form.select_default')} allowClear disabled>
                            <Option value="1">Option 1</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="postcode" label={t('customer:form.postcode')} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Col>
            <Col span="10">
                <div style={{ marginBottom: "6px" }}>
                    {t('customer:form.image')}
                </div>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <UploadBlock button={t('customer:form.image_upload_button')} />
                </div>
                <div>
                    {JSON.stringify(provinces)}
                </div>
            </Col>
        </Row>
    </Modal >);
}

export default CustomerModal;