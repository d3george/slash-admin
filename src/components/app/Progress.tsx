/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import { useNProgress } from '@tanem/react-nprogress';
import { theme } from 'antd';
import { PropsWithChildren } from 'react';

type BarProps = {
  animationDuration: number;
  progress: number;
};
const { useToken } = theme;
function Bar({ animationDuration, progress }: BarProps) {
  const { token } = useToken();

  const { colorPrimary } = token;
  return (
    <div
      style={{
        background: colorPrimary,
        height: 2,
        left: 0,
        marginLeft: `${(-1 + progress) * 100}%`,
        position: 'fixed',
        top: 0,
        transition: `margin-left ${animationDuration}ms linear`,
        width: '100%',
        zIndex: 1031,
      }}
    >
      <div
        style={{
          boxShadow: `0 0 10px ${colorPrimary}, 0 0 5px ${colorPrimary}`,
          display: 'block',
          height: '100%',
          opacity: 1,
          position: 'absolute',
          right: 0,
          transform: 'rotate(3deg) translate(0px, -4px)',
          width: 100,
        }}
      />
    </div>
  );
}
type ContainerProps = {
  animationDuration: number;
  isFinished: boolean;
};
function Container({ animationDuration, children, isFinished }: PropsWithChildren<ContainerProps>) {
  return (
    <div
      style={{
        opacity: isFinished ? 0 : 1,
        pointerEvents: 'none',
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      {children}
    </div>
  );
}

type ProgressProps = {
  isAnimating: boolean;
};
function Progress({ isAnimating }: ProgressProps) {
  const { isFinished, progress, animationDuration } = useNProgress({
    isAnimating,
  });

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
      {/*
      This example doesn't use a spinner component so the UI stays
      tidy. You're free to render whatever is appropriate for your
      use-case.
      */}
    </Container>
  );
}
export default Progress;
