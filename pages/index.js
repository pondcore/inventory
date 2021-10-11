import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import { Row, Col } from 'antd';

const Home = ({ setBreadcrumb }) => {
  let { t } = useTranslation();
  const router = useRouter()

  // useEffect(() => {
  //   setBreadcrumb([{
  //     path: '/',
  //     name: t('common:dashboard')
  //   }])
  // }, [])

  return (
    <div>locales {router.locale}
      <Row>
        <Col span={12}>
          <div style={{ border: '1px solid gray', borderRadius: '15px', margin: '1rem' }}>
            <Row style={{ margin: '1rem' }}>
              <Col span={24}>
                <h1>สรุปยอดขาย</h1>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>0.00 บาท</h4>
                      <h4>วันนี้</h4>
                    </div>
                  </Col>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>0.00 บาท</h4>
                      <h4>สัปดาห์นี้</h4>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ margin: '1rem' }}>
                      <h4>0.00 บาท</h4>
                      <h4>เดือนนี้</h4>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ border: '1px solid gray', borderRadius: '15px', margin: '1rem' }}>
            <Row style={{ margin: '1rem' }}>
              <Col span={24}>
                <h1>สรุปยอดซื้อ</h1>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>0.00 บาท</h4>
                      <h4>วันนี้</h4>
                    </div>
                  </Col>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>0.00 บาท</h4>
                      <h4>สัปดาห์นี้</h4>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ margin: '1rem' }}>
                      <h4>0.00 บาท</h4>
                      <h4>เดือนนี้</h4>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;