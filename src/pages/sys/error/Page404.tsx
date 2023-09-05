import { Button, Typography } from 'antd';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import MotionContainer from '@/components/animate/motion-container';
import { varBounce } from '@/components/animate/variants/bounce';
import { useThemeToken } from '@/theme/hooks';

export default function Page404() {
  const { colorBgBase, colorTextBase } = useThemeToken();
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found!</title>
      </Helmet>

      <div className="m-auto max-w-[400px]">
        <MotionContainer className="flex flex-col items-center justify-center">
          <m.div variants={varBounce().in}>
            <Typography.Title level={2}>Sorry, Page Not Found!</Typography.Title>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography.Paragraph type="secondary">
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
              Be sure to check your spelling.
            </Typography.Paragraph>
          </m.div>

          <Button size="large" style={{ background: colorTextBase, color: colorBgBase }}>
            Go to Home
          </Button>
        </MotionContainer>
      </div>
    </>
  );
}
