import { Typography } from 'antd';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';

import Character6 from '@/assets/images/characters/character_6.png';
import MotionContainer from '@/components/animate/motion-container';
import { varBounce } from '@/components/animate/variants/bounce';
import { useThemeToken } from '@/theme/hooks';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function Page404() {
  const {
    colorBgBase,
    colorTextBase,
    colorPrimary,
    colorPrimaryActive,
    colorPrimaryTextActive,
    colorPrimaryHover,
  } = useThemeToken();
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found!</title>
      </Helmet>

      <div className="m-auto max-w-[400px]">
        <MotionContainer className="flex flex-col items-center justify-center px-2">
          <m.div variants={varBounce().in}>
            <Typography.Title level={3} className="text-center">
              Sorry, Page Not Found!
            </Typography.Title>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography.Paragraph type="secondary" className="text-center">
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
              Be sure to check your spelling.
            </Typography.Paragraph>
          </m.div>

          <m.div variants={varBounce().in}>
            <svg
              viewBox="0 0 480 360"
              xmlns="http://www.w3.org/2000/svg"
              width={400}
              height={400}
              className="w-full"
            >
              <defs>
                <linearGradient id="BG" x1="19.496%" x2="77.479%" y1="71.822%" y2="16.69%">
                  <stop offset="0%" stopColor={colorPrimary} />
                  <stop offset="100%" stopColor={colorPrimary} stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* background */}
              <path
                fill="url(#BG)"
                fillRule="nonzero"
                d="M0 198.78c0 41.458 14.945 79.236 39.539 107.786 28.214 32.765 69.128 53.365 114.734 53.434a148.44 148.44 0 0056.495-11.036c9.051-3.699 19.182-3.274 27.948 1.107a75.779 75.779 0 0033.957 8.01c5.023 0 9.942-.494 14.7-1.433 13.58-2.67 25.94-8.99 36.09-17.94 6.378-5.627 14.547-8.456 22.897-8.446h.142c27.589 0 53.215-8.732 74.492-23.696 19.021-13.36 34.554-31.696 44.904-53.224C474.92 234.58 480 213.388 480 190.958c0-76.93-59.774-139.305-133.498-139.305-7.516 0-14.88.663-22.063 1.899C305.418 21.42 271.355 0 232.499 0a103.651 103.651 0 00-45.88 10.661c-13.24 6.487-25.011 15.705-34.64 26.939-32.698.544-62.931 11.69-87.676 30.291C25.351 97.155 0 144.882 0 198.781z"
                opacity="0.2"
              />
              {/* character */}
              <image href={Character6} height="300" x="205" y="30" />
              {/* sun */}
              <path
                fill="#FFAB00"
                d="M111.1 141.2c58.7-1 58.6-88.3 0-89.2-58.6 1-58.6 88.3 0 89.2z"
                opacity="0.12"
              />
              {/* sun */}
              <path
                fill="#FFD666"
                d="M111.1 120c30.8-.5 30.8-46.3 0-46.8-30.8.5-30.8 46.3 0 46.8z"
              />
              {/* 0 */}
              <path
                fill={colorPrimaryTextActive}
                d="M244.9 182.5c82.3 1.4 82.2 123.8 0 125.2-82.3-1.5-82.3-123.8 0-125.2zm0 23.1c-51.8.9-51.8 77.9 0 78.8 51.8-.9 51.7-77.9 0-78.8z"
              />
              {/* 4_4 */}
              <path
                fill="url(#paint0_linear_1_119)"
                d="M175 265.6c1-8.7-12.1-4.8-17-5.6v-66.6c0-4.5-1.5-5.6-5.6-5.6-5.3.3-13.8-1.4-17.1 4l-55 68.3c-2.7 3.3-1.8 8.8-2 12.8 0 4.1 1.5 5.6 5.6 5.6h54.7v21.7c-.9 7.9 9.1 5.2 13.7 5.6 4.1 0 5.6-1.5 5.6-5.6v-21.7c13.8-1.1 18.1 4.5 17.1-12.9zm-72.5-5.6l36-44.4V260h-36zm309.1 5.6c1-8.7-12.2-4.8-17.1-5.6v-66.6c0-4.5-1.5-5.6-5.6-5.6-5.3.3-13.7-1.4-17.1 4l-55 68.3c-2.7 3.3-1.9 8.8-2 12.8 0 4.1 1.5 5.6 5.6 5.6h54.7v21.7c-.9 7.9 9.1 5.2 13.7 5.6 4.1 0 5.6-1.5 5.6-5.6v-21.7c14.1-1.1 18.2 4.5 17.2-12.9zm-72.4-5.6l36-44.4V260h-36z"
              />
              {/* cloud */}
              <path
                fill={colorPrimary}
                d="M425.6 118.2c0-5-4.6-9-9.6-8.2-2-3.7-6-6-10.2-5.9 4.3-21.4-30-21.4-25.7 0-8.7-.8-15.1 9.4-10.4 16.8 2.1 3.5 5.9 5.6 10 5.5h38.7v-.1c4.1-.4 7.2-3.9 7.2-8.1zM104.3 200c.1-4.2-4.1-7.8-8.2-7-1.7-3.2-5.1-5.1-8.8-5 3.8-18.4-25.8-18.4-22 0-7.4-.7-12.9 8.1-8.9 14.4 1.8 3 5.1 4.8 8.6 4.7h33.2v-.1c3.4-.4 6.1-3.4 6.1-7z"
                opacity="0.08"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_119"
                  x1="78.3"
                  x2="78.3"
                  y1="187.77"
                  y2="305.935"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={colorPrimaryHover} />
                  <stop offset="1" stopColor={colorPrimaryActive} />
                </linearGradient>
              </defs>
            </svg>
          </m.div>

          <NavLink
            to={HOMEPAGE}
            style={{ background: colorTextBase, color: colorBgBase }}
            className="rounded-md p-4"
          >
            Go to Home
          </NavLink>
        </MotionContainer>
      </div>
    </>
  );
}
