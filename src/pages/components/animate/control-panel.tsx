import { Card } from 'antd';

import { useThemeToken } from '@/theme/hooks';

type Props = {
  variantKey: {
    type: string;
    values: string[];
  }[];
  selectedVariant: string;
  onChangeVarient: (varient: string) => void;
};
export default function ControlPanel({ variantKey, selectedVariant, onChangeVarient }: Props) {
  const { colorPrimary, colorTextBase } = useThemeToken();

  const selectedStyle = (variantKey: string) => {
    return variantKey === selectedVariant
      ? {
          backgroundColor: colorPrimary,
          color: colorTextBase,
        }
      : {};
  };
  return (
    <Card className="h-[480px] overflow-y-scroll">
      {variantKey.map((item) => (
        <div key={item.type}>
          <div className="text-xs font-medium">{item.type.toUpperCase()}</div>
          <ul className="mb-4 ml-2 mt-2 text-gray-600">
            {item.values.map((item) => (
              <li
                key={item}
                className="my-2 cursor-pointer rounded-md p-1"
                onClick={() => onChangeVarient(item)}
                style={selectedStyle(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Card>
  );
}
