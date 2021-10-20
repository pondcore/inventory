import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import axios from '@/plugins/axios.config';

export async function getServerSideProps(context) {
  const data = await axios.get(`/api/summary`);
  return {
    props: { summary: data.data },
  }
}


const Home = ({ setBreadcrumb, summary }) => {
  let { t } = useTranslation();

  // useEffect(() => {
  //   setBreadcrumb([{
  //     path: '/',
  //     name: t('common:dashboard')
  //   }])
  // }, [])
  function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  return (
    <div>
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
                      <h4>{formatNumber(summary.todaySummary.toFixed(2))} บาท</h4>
                      <h4>วันนี้</h4>
                    </div>
                  </Col>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.weekSummary.toFixed(2))} บาท</h4>
                      <h4>สัปดาห์นี้</h4>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.monthSummary.toFixed(2))} บาท</h4>
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
                <h1>กำไร</h1>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.todayProfit.toFixed(2))} บาท</h4>
                      <h4>วันนี้</h4>
                    </div>
                  </Col>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.weekProfit.toFixed(2))} บาท</h4>
                      <h4>สัปดาห์นี้</h4>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.monthProfit.toFixed(2))} บาท</h4>
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
                <h1>สินค้าขายดี</h1>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.todayAmount.amount)} ชิ้น</h4>
                      <h4>วันนี้</h4>
                    </div>
                  </Col>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.weekAmount.amount)} ชิ้น</h4>
                      <h4>สัปดาห์นี้</h4>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.monthAmount.amount)} ชิ้น</h4>
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