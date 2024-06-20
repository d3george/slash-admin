import { Card, Col, Row, Typography } from 'antd';
import Color from 'color';

import glass_bag from '@/assets/images/glass/ic_glass_bag.png';
import glass_buy from '@/assets/images/glass/ic_glass_buy.png';
import glass_message from '@/assets/images/glass/ic_glass_message.png';
import glass_users from '@/assets/images/glass/ic_glass_users.png';
import { Iconify } from '@/components/icon';
import ChartBar from '@/pages/components/chart/view/chart-bar';
import ChartMixed from '@/pages/components/chart/view/chart-mixed';
import ChartPie from '@/pages/components/chart/view/chart-pie';
import ChartRadar from '@/pages/components/chart/view/chart-radar';
import { useThemeToken } from '@/theme/hooks';

import AnalysisCard from './analysis-card';
import AnalysisNews from './analysis-news';
import AnalysisOrderTimeline from './analysis-order-timeline';
import AnalysisTasks from './analysis-tasks';
import AnalysisTrafficCard from './analysis-traffic-card';

function Analysis() {
  const theme = useThemeToken();
  return (
    <div className="p-2">
      <Typography.Title level={2}>Hi, Welcome back 👋</Typography.Title>
      <Row gutter={[16, 16]} justify="center">
        <Col lg={6} md={12} span={24}>
          <AnalysisCard
            cover={glass_bag}
            title="714k"
            subtitle="Weekly Sales"
            style={{
              color: theme.colorPrimaryTextActive,
              background: `linear-gradient(135deg, ${Color(theme.colorPrimaryActive)
                .alpha(0.2)
                .toString()}, ${Color(theme.colorPrimary)
                .alpha(0.2)
                .toString()}) rgb(255, 255, 255)`,
            }}
          />
        </Col>
        <Col lg={6} md={12} span={24}>
          <AnalysisCard
            cover={glass_users}
            title="1.35m"
            subtitle="New Users"
            style={{
              color: theme.colorInfoTextActive,
              background: `linear-gradient(135deg, ${Color(theme.colorInfoActive)
                .alpha(0.2)
                .toString()}, ${Color(theme.colorInfo).alpha(0.2).toString()}) rgb(255, 255, 255)`,
            }}
          />
        </Col>
        <Col lg={6} md={12} span={24}>
          <AnalysisCard
            cover={glass_buy}
            title="1.72m"
            subtitle="New Orders"
            style={{
              color: theme.colorWarningTextActive,
              background: `linear-gradient(135deg, ${Color(theme.colorWarningActive)
                .alpha(0.2)
                .toString()}, ${Color(theme.colorWarning)
                .alpha(0.2)
                .toString()}) rgb(255, 255, 255)`,
            }}
          />
        </Col>
        <Col lg={6} md={12} span={24}>
          <AnalysisCard
            cover={glass_message}
            title="234"
            subtitle="Bug Reports"
            style={{
              color: theme.colorErrorTextActive,
              background: `linear-gradient(135deg, ${Color(theme.colorErrorActive)
                .alpha(0.2)
                .toString()}, ${Color(theme.colorError).alpha(0.2).toString()}) rgb(255, 255, 255)`,
            }}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-8" justify="center">
        <Col span={24} lg={12} xl={16}>
          <Card title="Website Visits">
            <ChartMixed />
          </Card>
        </Col>
        <Col span={24} lg={12} xl={8}>
          <Card title="Current Visits">
            <ChartPie />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-8" justify="center">
        <Col span={24} lg={12} xl={16}>
          <Card title="Conversion Rates">
            <ChartBar />
          </Card>
        </Col>
        <Col span={24} lg={12} xl={8}>
          <Card title="Current Subject">
            <ChartRadar />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-8">
        <Col span={24} lg={12} xl={16}>
          <Card title="News">
            <AnalysisNews />
          </Card>
        </Col>
        <Col span={24} lg={12} xl={8}>
          <Card title="Order Timeline">
            <AnalysisOrderTimeline />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="my-8">
        <Col span={24} lg={12} xl={8}>
          <Card title="Traffic by Site">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AnalysisTrafficCard
                  icon={<Iconify icon="bxl:facebook" size={32} color="#1877f2" />}
                  title="1.95k"
                  subtitle="FaceBook"
                />
              </Col>

              <Col span={12}>
                <AnalysisTrafficCard
                  icon={<Iconify icon="ant-design:google-outlined" size={32} color="#df3e30" />}
                  title="9.12k"
                  subtitle="Google"
                />
              </Col>

              <Col span={12}>
                <AnalysisTrafficCard
                  icon={<Iconify icon="eva:linkedin-fill" size={32} color="#006097" />}
                  title="6.98k"
                  subtitle="Linkedin"
                />
              </Col>

              <Col span={12}>
                <AnalysisTrafficCard
                  icon={<Iconify icon="eva:twitter-fill" size={32} color="#1c9cea" />}
                  title="8.49k"
                  subtitle="Twitter"
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24} lg={12} xl={16}>
          <Card title="Tasks">
            <AnalysisTasks />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Analysis;
