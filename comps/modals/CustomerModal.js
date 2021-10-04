import { Modal, Row, Col, Form, Input, Select, message } from 'antd';
import UploadBlock from '@/comps/forms/UploadBlock';
import useTranslation from 'next-translate/useTranslation';
import ADDRESS_DATA from '@/constants/addressData';

import React, { useState } from 'react';

const { Option } = Select;
const { TextArea } = Input;

const CustomerModal = ({ form, visible, onSubmit, onClose, confirmLoading, imageUrl = "", setImageUrl, }) => {
    const [districts, setDistricts] = useState([]);
    const [subdistricts, setSubdistricts] = useState([]);

    let { t } = useTranslation();

    const onProvinceSelect = (value) => {
        form.resetFields(['district', 'sub-district'])
        setDistricts(ADDRESS_DATA[value]);
    }

    const onDistrictSelect = (value) => {
        let province = form.getFieldValue('province')
        form.resetFields(['sub-district'])
        setSubdistricts(ADDRESS_DATA[province][value]);
    }

    return (<Modal
        centered
        title={t('common:createTitle', { text: t('customer:title') })}
        visible={visible}
        onOk={onSubmit}
        okText={t('common:form.submit')}
        onCancel={onClose}
        cancelText={t('common:form.cancel')}
        confirmLoading={confirmLoading}
        width={860}
        forceRender
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
                    <Form.Item name="firstname" label={t('customer:form.first_name')} rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastname" label={t('customer:form.last_name')} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label={t('customer:form.phone')} rules={[{ required: true }]} >
                        <Input maxLength={10} />
                    </Form.Item>
                    <Form.Item name="address" label={t('customer:form.address')}>
                        <TextArea
                            placeholder={t('customer:form.addressPlaceholder')}
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Form.Item>
                    <Form.Item name="province" label={t('customer:form.province')} rules={[{ required: true }]}>
                        <Select
                            placeholder={t('common:form.select_default')}
                            onChange={onProvinceSelect}
                        >
                            {Object.keys(ADDRESS_DATA).map((item, index) =>
                                <Option key={index} value={item}>{item}</Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item name="district" label={t('customer:form.district')} rules={[{ required: true }]} >
                        <Select
                            placeholder={t('common:form.select_default')}
                            onChange={onDistrictSelect}
                            disabled={form.getFieldValue('province') == null}
                        >
                            {Object.keys(districts).map((item, index) =>
                                <Option key={index} value={item}>{item}</Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item name="subdistrict" label={t('customer:form.sub_district')} rules={[{ required: true }]}>
                        <Select
                            placeholder={t('common:form.select_default')}
                            disabled={form.getFieldValue('district') == null}
                        >
                            {subdistricts.map((item, index) =>
                                <Option key={index} value={item}>{item}</Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item name="postcode" label={t('customer:form.postcode')} rules={[{ required: true }]}>
                        <Input maxLength={5} />
                    </Form.Item>
                </Form>
            </Col>
            <Col span="10">
                <div style={{ marginBottom: "6px" }}>
                    {t('customer:form.image')}:
                </div>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <UploadBlock imageUrl={imageUrl} setImageUrl={setImageUrl} button={t('customer:form.image_upload_button')} />
                </div>
            </Col>
        </Row>
    </Modal >);
}

export default CustomerModal;