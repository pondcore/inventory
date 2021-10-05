
import IndexPageLayout from '@/comps/layouts/IndexPageLayout';
import useTranslation from 'next-translate/useTranslation';
import OrderTable from '@/comps/table/OrderTable';

import axios from "@/plugins/axios.config";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router'

const Order = () => {
    let { t } = useTranslation();
    const tableRef = useRef(null);
    const router = useRouter()

    const onSearch = value => console.log(value);
    const openCreate = async () => {
        router.push('/orders/create')

    };
    const openEdit = async (dataId) => {
        router.push(`/orders/${dataId}/edit`)
    };
    return (
        <IndexPageLayout title={t('order:title')} onSearch={onSearch} onCreate={openCreate}>
            <OrderTable ref={tableRef} onEdit={openEdit} />
        </IndexPageLayout >
    )
}

export default Order