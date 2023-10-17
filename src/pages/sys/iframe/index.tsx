type Props = {
  src: string;
};
export default function Iframe({ src = '' }: Props) {
  return (
    <div className="h-full w-full">
      <iframe src={src} title="iframe-page" className="h-full w-full" />
    </div>
  );
}
