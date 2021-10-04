import { Modal, Button, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';

import axios from '@/plugins/axios.config';

const { confirm } = Modal;

const DeleteModal = ({ deleteId, handleConfirm, buttonText = "Delete", title = "Are you sure?", content = "" }) => {
    let { t } = useTranslation();

    const showPromiseConfirm = () => {
        confirm({
            title: title,
            icon: <ExclamationCircleOutlined />,
            content: content,
            okText: t('common:form.confirm'),
            okType: 'danger',
            cancelText: t('common:form.cancel'),
            onOk() {
                return axios({
                    method: 'DELETE',
                    url: `/api/customer/${deleteId}`,
                }).then(handleConfirm).catch(err => {
                    let errorMessage = typeof err.response !== "undefined" ? err.response.data.message : err.message;
                    message.error(errorMessage);
                });
            },
            onCancel() { },
        });
    }

    return (
        <Button onClick={showPromiseConfirm} danger>{buttonText}</Button>
    )
}

export default DeleteModal;
