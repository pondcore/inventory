import { Button, Row, Col, Input } from 'antd';
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation';

const { Search } = Input;


const IndexPageLayout = ({ children, title, onSearch, onCreate }) => {
    let { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t('common:page_title', { text: title })}</title>
            </Head>
            <Row>
                <Col span="12">
                    <Search size="large" placeholder={t('common:search_input', { text: title })} allowClear onSearch={onSearch} style={{ width: 300 }} />
                </Col>
                <Col span="12" style={{ textAlign: 'right' }}>
                    <Button size={"large"} type="primary" onClick={onCreate}>
                        {t('common:createButton', { text: title })}
                    </Button>
                </Col>
            </Row>
            <div className="page-header"><h1>{t('common:page_title', { text: title })}</h1></div>
            {children}
        </>
    )
}

export default IndexPageLayout;