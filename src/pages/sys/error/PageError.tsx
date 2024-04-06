import { Typography } from 'antd';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import Character5 from '@/assets/images/characters/character_5.png';
import MotionContainer from '@/components/animate/motion-container';
import { varBounce } from '@/components/animate/variants/bounce';
import { useRouter } from '@/router/hooks';
import { useThemeToken } from '@/theme/hooks';

import type { FallbackProps } from 'react-error-boundary';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function PageError({ error, resetErrorBoundary }: FallbackProps) {
  const { colorBgBase, colorTextBase, colorPrimary, colorPrimaryActive } = useThemeToken();

  const { replace } = useRouter();

  const goHome = () => {
    resetErrorBoundary();
    replace(HOMEPAGE);
  };
  return (
    <div>
      <Helmet>
        <title>Sorry, Page error occurred!</title>
      </Helmet>

      <div className="m-auto flex h-screen max-w-[400px] items-center justify-center">
        <MotionContainer className="flex flex-col items-center justify-center px-2">
          <m.div variants={varBounce().in}>
            <Typography.Title level={3} className="text-center">
              Sorry, Page error occurred!
            </Typography.Title>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography.Paragraph type="secondary" className="text-center">
              {error.toString()}
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
              <path
                fill={colorPrimary}
                d="M297.46 99.296l-185.934-5.29c-6.35-.18-11.526 4.158-11.526 9.693v159.882c0 5.534 5.176 9.742 11.526 9.4l185.934-10.028c5.28-.284 9.54-4.576 9.54-9.585v-144.73c0-5.012-4.26-9.194-9.54-9.342z"
                opacity="0.12"
              />
              <path
                fill="#fff"
                d="M297.476 93.405l-180.3-5.278c-6.157-.18-11.176 4.15-11.176 9.67v159.496c0 5.521 5.019 9.718 11.176 9.377l180.3-10.003c5.12-.284 9.251-4.565 9.251-9.563v-144.38c0-5-4.131-9.172-9.251-9.32z"
              />
              <g fill="#919EAB" opacity="0.16">
                <path d="M205.131 203.668a44.088 44.088 0 01-20.975-4.875 42.576 42.576 0 01-16.793-15.549 40.54 40.54 0 01-5.98-21.153c0-23.36 19.874-41.848 43.748-41.227 23.283.606 41.804 19.248 41.804 41.569 0 22.322-18.521 40.816-41.804 41.235zM266.304 235.213a4.461 4.461 0 01-4.271 4.417l-106.87 4.074c-2.652.107-4.808-1.842-4.808-4.341v-16.97c0-2.499 2.156-4.579 4.808-4.644l106.87-2.64a4.142 4.142 0 013.018 1.168 4.128 4.128 0 011.253 2.98v15.956z" />
              </g>
              <path
                fill="#C4CDD5"
                d="M186.797 136.682a1.812 1.812 0 01-.525 1.378l-1.858 1.858 16.887 16.893a2.174 2.174 0 01-3.074 3.074l-16.886-16.892-1.859 1.859a1.803 1.803 0 01-2.685-.157l-7.916-9.615a1.8 1.8 0 01.14-2.392l5.091-5.093a1.8 1.8 0 012.392-.14l9.612 7.917c.404.32.651.797.681 1.31zM209.727 165.24l5.441 5.443a2.174 2.174 0 01-3.074 3.075l-5.441-5.443a2.175 2.175 0 013.074-3.075z"
              />
              <path
                fill="#F4F6F8"
                d="M209.727 165.24l5.441 5.443a2.176 2.176 0 010 3.075l-8.515-8.518a2.172 2.172 0 013.074 0z"
              />
              <path
                fill="url(#paint0_linear_1_160)"
                d="M238.581 194.781l-2.399 2.399c-3.425 3.431-9.046 3.315-12.32-.318l-16.564-18.475a2.176 2.176 0 01.081-2.989l9.309-9.313a2.174 2.174 0 012.978-.091l18.552 16.422.004.004c3.646 3.243 3.812 8.907.359 12.361z"
              />
              <path
                fill="url(#paint1_linear_1_160)"
                d="M240.711 138.762c-.332-1.582-2.287-2.165-3.429-1.021l-7.117 7.12a3.31 3.31 0 01-4.681 0l-3.813-3.815a3.308 3.308 0 010-4.68l7.117-7.122c1.143-1.142.561-3.098-1.02-3.43-5.355-1.126-11.157.392-15.316 4.552-5.296 5.299-6.308 13.259-3.037 19.573l-40.33 33.142a5.766 5.766 0 00-.516 8.61l6.289 6.291a5.761 5.761 0 008.607-.516l33.13-40.345c6.312 3.272 14.268 2.26 19.566-3.038 4.159-4.16 5.675-9.964 4.55-15.321zm-61.338 50.587a2.174 2.174 0 110-4.349 2.174 2.174 0 010 4.349z"
              />
              <path
                fill="#919EAB"
                d="M186.797 136.682a1.812 1.812 0 01-.525 1.378l-1.858 1.858 16.887 16.893a2.174 2.174 0 010 3.074l-29.734-29.744 2.545-2.546a1.8 1.8 0 012.391-.14l9.613 7.917c.404.32.651.797.681 1.31z"
              />
              <path
                fill="#004B50"
                d="M238.581 194.781l-1.199 1.199-25.289-25.298 4.595-4.597a2.173 2.173 0 012.977-.091l18.553 16.422.004.004c3.645 3.243 3.812 8.907.359 12.361z"
                opacity="0.24"
              />
              <path
                fill="#004B50"
                d="M236.161 154.083c-5.298 5.298-13.254 6.31-19.566 3.038l-33.13 40.345a5.761 5.761 0 01-8.607.516l-3.145-3.145 6.122-6.125a2.174 2.174 0 103.075-3.076l42.668-42.682 1.907 1.907a3.308 3.308 0 004.68 0l7.117-7.12c1.142-1.144 3.097-.561 3.429 1.021 1.125 5.357-.392 11.161-4.55 15.321z"
                opacity="0.24"
              />
              <path
                fill="url(#paint2_linear_1_160)"
                d="M249.706 290.362v3.306c0 .847-.436 1.546-1.011 1.622l-51.671 4.676a3.72 3.72 0 01-1.448-.087l-36.003-6.775c-.382-.1-.664-.6-.664-1.177v-3.494l38.198-4.727 4.917-2.324 4.889.703 2.887-.552 6.599 1.917 33.307 6.912z"
              />
              <path
                fill="url(#paint3_linear_1_160)"
                d="M249.707 290.362v3.307c0 .846-.436 1.545-1.012 1.621l-51.668 4.676a3.684 3.684 0 01-1.148-.024v-17.813l6.148-.749 4.889.703 2.886-.552 6.598 1.917 33.307 6.914z"
                opacity="0.3"
              />
              <path
                fill="url(#paint4_linear_1_160)"
                d="M209.803 281.53l-50.89 6.74 36.707 6.904c.445.115.909.142 1.366.08l52.72-4.892-39.903-8.832z"
              />
              <path
                fill="url(#paint5_linear_1_160)"
                d="M228.459 287.623c0 2.42-7.627 4.302-18.157 4.79-2.657.121-5.499.156-8.447.088-14.491-.333-26.135-3.025-26.135-6.005a.81.81 0 01.02-.214h-.02l.06-.143a.834.834 0 01.054-.139l3.342-8.724 4.037-10.526 5.652-14.753 4.325-11.293 5.381-14.042c.673-1.758 1.922-2.851 3.269-2.851.183-.001.364.019.542.059 1.138.248 2.153 1.272 2.737 2.795l5.427 14.14 4.337 11.441 5.715 15.05 4.106 10.813.065.006 3.42 8.787c.147.239.27.479.27.721z"
              />
              <path
                fill="#fff"
                d="M224.769 278.12c-3.299 1.101-8.572 1.894-14.893 2.188-2.545.12-5.237.159-8.037.107-9.736-.184-18.178-1.434-22.67-3.137l4.039-10.527c4.728 1.062 11.316 1.778 18.644 1.888 2.368.036 4.676.006 6.874-.083 4.623-.183 8.7-.626 11.913-1.255l4.071 10.812.059.007zM214.93 252.246c-2.519.272-5.287.457-8.225.54-1.573.046-3.194.063-4.849.046a112.824 112.824 0 01-12.991-.835l4.326-11.293c2.707.214 5.623.336 8.665.353 1.071.006 2.129-.001 3.172-.022 1.907-.036 3.751-.112 5.519-.23l4.383 11.441z"
              />
              <path
                fill="url(#paint6_linear_1_160)"
                d="M210.302 292.411c-2.657.122-5.499.157-8.447.089-14.491-.334-26.135-3.025-26.135-6.005a.81.81 0 01.02-.214h-.02l.06-.143a.834.834 0 01.054-.139l3.342-8.724 4.037-10.526 5.652-14.752 4.325-11.293 5.381-14.042c.673-1.758 1.922-2.851 3.269-2.851.183-.001.364.019.542.059.574 3.574 1.558 9.812 2.646 17.165.546 3.702 1.118 7.687 1.677 11.753a776.568 776.568 0 012.016 15.767c.485 4.188.899 8.185 1.192 11.754.429 5.167.604 9.441.389 12.102z"
                opacity="0.2"
              />
              <path fill="#FF5630" d="M118.108 103.182a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path fill="#FFAB00" d="M126.108 103.182a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path fill="#36B37E" d="M134.108 103.182a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <defs>
                <linearGradient
                  id="paint0_linear_1_160"
                  x1="166.881"
                  x2="166.881"
                  y1="125.454"
                  y2="199.671"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={colorPrimaryActive} />
                  <stop offset="1" stopColor={colorPrimary} />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1_160"
                  x1="166.881"
                  x2="166.881"
                  y1="125.454"
                  y2="199.671"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={colorPrimaryActive} />
                  <stop offset="1" stopColor={colorPrimary} />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1_160"
                  x1="158.912"
                  x2="249.709"
                  y1="290.69"
                  y2="290.69"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFC444" />
                  <stop offset="1" stopColor="#F36F56" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_1_160"
                  x1="226.725"
                  x2="225.966"
                  y1="290.498"
                  y2="292.586"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFC444" />
                  <stop offset="0.59" stopColor="#F8924F" />
                  <stop offset="1" stopColor="#F36F56" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_1_160"
                  x1="210.87"
                  x2="210.566"
                  y1="288.399"
                  y2="289.237"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFC444" />
                  <stop offset="0.59" stopColor="#F8924F" />
                  <stop offset="1" stopColor="#F36F56" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear_1_160"
                  x1="202.974"
                  x2="199.672"
                  y1="204.073"
                  y2="311.415"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFC444" />
                  <stop offset="1" stopColor="#F36F56" />
                </linearGradient>
                <linearGradient
                  id="paint6_linear_1_160"
                  x1="175.72"
                  x2="210.394"
                  y1="258.172"
                  y2="258.172"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFC444" />
                  <stop offset="1" stopColor="#F36F56" />
                </linearGradient>
              </defs>
              <image href={Character5} height="300" x="245" y="30" />
            </svg>
          </m.div>

          <button
            style={{ background: colorTextBase, color: colorBgBase }}
            className="rounded-md p-4"
            onClick={goHome}
          >
            Go to Home
          </button>
        </MotionContainer>
      </div>
    </div>
  );
}
