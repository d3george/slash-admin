import { Typography } from 'antd';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';

import Character4 from '@/assets/images/characters/character_4.png';
import MotionContainer from '@/components/animate/motion-container';
import { varBounce } from '@/components/animate/variants/bounce';
import { useThemeToken } from '@/theme/hooks';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function Page403() {
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
        <title> 403 No Permission!</title>
      </Helmet>

      <div className="m-auto max-w-[400px]">
        <MotionContainer className="flex flex-col items-center justify-center px-2">
          <m.div variants={varBounce().in}>
            <Typography.Title level={3} className="text-center">
              No permission
            </Typography.Title>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography.Paragraph type="secondary" className="text-center">
              The page you are trying access has restricted access. Please refer to your system
              administrator
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
              <path
                fill="url(#BG)"
                fillRule="nonzero"
                d="M0 198.78c0 41.458 14.945 79.236 39.539 107.786 28.214 32.765 69.128 53.365 114.734 53.434a148.44 148.44 0 0056.495-11.036c9.051-3.699 19.182-3.274 27.948 1.107a75.779 75.779 0 0033.957 8.01c5.023 0 9.942-.494 14.7-1.433 13.58-2.67 25.94-8.99 36.09-17.94 6.378-5.627 14.547-8.456 22.897-8.446h.142c27.589 0 53.215-8.732 74.492-23.696 19.021-13.36 34.554-31.696 44.904-53.224C474.92 234.58 480 213.388 480 190.958c0-76.93-59.774-139.305-133.498-139.305-7.516 0-14.88.663-22.063 1.899C305.418 21.42 271.355 0 232.499 0a103.651 103.651 0 00-45.88 10.661c-13.24 6.487-25.011 15.705-34.64 26.939-32.698.544-62.931 11.69-87.676 30.291C25.351 97.155 0 144.882 0 198.781z"
                opacity="0.2"
              />
              <image href={Character4} height="300" x="220" y="30" />
              <path
                fill={colorPrimary}
                d="M425.545 119.2c0-5-4.6-9-9.6-8.2-2-3.7-6-6-10.2-5.9 4.3-21.4-30-21.4-25.7 0-8.7-.8-15.1 9.4-10.4 16.8 2.1 3.5 5.9 5.6 10 5.5h38.7v-.1c4.1-.4 7.2-3.9 7.2-8.1zm-321.3 81.8c.1-4.2-4.1-7.8-8.2-7-1.7-3.2-5.1-5.1-8.8-5 3.8-18.4-25.8-18.4-22 0-7.4-.7-12.9 8.1-8.9 14.4 1.8 3 5.1 4.8 8.6 4.7h33.2v-.1c3.4-.4 6.1-3.4 6.1-7z"
                opacity="0.08"
              />
              <path
                fill="#FFAB00"
                d="M111.045 142.2c58.7-1 58.6-88.3 0-89.2-58.6 1-58.6 88.3 0 89.2z"
                opacity="0.12"
              />
              <path
                fill="#FFD666"
                d="M111.045 121c30.8-.5 30.8-46.3 0-46.8-30.8.5-30.8 46.3 0 46.8z"
              />

              {/* hand */}
              <path
                fill="#FBCDBE"
                d="M278.045 250.1c-4.6-6.5-14 5.1-18.1 7.2-.6-2.1 1.5-41.3-1.4-41.8-2.8-3-8.1-.7-8 3.3.2-4 .5-11.3-5.6-10.2-4.8.6-3.8 6.9-3.8 10.2.1-6.1-9.5-6.1-9.4 0v5.6c.2-4.2-5.7-6.4-8.3-3-2.6-.2-.4 41.8-1.1 43.3-.2 10 8.7 19 18.8 18.7 6.1.4 12.6-1.2 16.8-5.9l19.7-21c1.7-1.6 1.8-4.5.4-6.4z"
              />
              <path
                fill="#000"
                fillOpacity="0.24"
                fillRule="evenodd"
                d="M248.745 212.3v32.8h1.9v-31.9c.1-2.9-2.8-5.2-5.6-4.6 2 0 3.7 1.7 3.7 3.7zm-9.4 5.6v27.2h1.9v-26.3c.1-2.8-2.8-5.2-5.5-4.6 1.9 0 3.6 1.8 3.6 3.7zm-9.4 27.2v-21.6c.1-2-1.7-3.7-3.7-3.8 2.8-.6 5.6 1.8 5.5 4.6V245h-1.8v.1z"
                clipRule="evenodd"
              />

              {/* 0 */}
              <path
                fill={colorPrimaryTextActive}
                d="M244.945 189.8c-67.6 1.3-77 97-11 111.4 81 11.8 92.7-107.3 11-111.4zm-48.5 56.2c-1-40.4 49.8-63.8 79.9-36.9l-68.3 68.3c-7.5-8.7-11.6-19.9-11.6-31.4zm48.5 48.5c-11.5 0-22.7-4.1-31.4-11.6l68.3-68.3c27 30.1 3.5 80.9-36.9 79.9z"
              />
              {/* 4_3 */}
              <path
                fill="url(#paint0_linear_1_129)"
                d="M169.245 261h-11.3v-66.6c0-4.5-1.5-5.6-5.6-5.6-5.3.3-13.8-1.4-17.1 4l-55 68.3c-2.7 3.3-1.8 8.8-2 12.8 0 4.1 1.5 5.6 5.6 5.6h54.7v21.7c-.9 7.9 9.1 5.2 13.7 5.6 4.1 0 5.6-1.5 5.6-5.6v-21.7h11.4c4.4 0 5.6-1.5 5.6-5.6-.3-4.8 2-13.8-5.6-12.9zm-30.8 0h-36l36-44.4V261zm263.9 12.1c1.9 44.8-78.7 46-78 1.2h19.3c-.8 15.3 18.3 21.4 30.1 15.5 12.7-6 12.3-29.1-1-34-5.6-2.8-16.6-2-23.1-2.1v-15.1c6.3-.2 17.6.9 22.7-2.3 11.6-5.5 11.9-25.4.9-31.4-10.8-5.9-29 .1-28.2 14.5h-19.4c-.5-28.1 35.4-38.5 57-28.2 23.4 9 24.1 45.5-.2 54.6 12.3 3.9 20.1 14.6 19.9 27.3z"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_129"
                  x1="78.245"
                  x2="78.245"
                  y1="187.309"
                  y2="307.306"
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
