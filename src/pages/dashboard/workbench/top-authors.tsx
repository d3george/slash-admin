import { faker } from '@faker-js/faker';
import { Typography } from 'antd';
import Color from 'color';

import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import { useThemeToken } from '@/theme/hooks';

export default function TopAuthor() {
  const themeToken = useThemeToken();
  const getTrophyIconColor = (index: number) => {
    switch (index) {
      case 1:
        return {
          color: themeToken.colorInfo,
          bg: themeToken.colorInfoBgHover,
        };
      case 2: {
        return {
          color: themeToken.colorError,
          bg: themeToken.colorErrorBgHover,
        };
      }
      default:
        return {
          color: themeToken.colorPrimary,
          bg: themeToken.colorPrimaryBgHover,
        };
    }
  };
  return (
    <Card className="flex-col">
      <header className="self-start">
        <Typography.Title level={5}>Top Authors</Typography.Title>
      </header>
      <main className="w-full">
        {new Array(3).fill('').map((_, index) => (
          <div key={index} className="mb-4 flex">
            <img src={faker.image.avatar()} alt="" className="h-10 w-10 rounded-full" />
            <div className="ml-2 flex flex-col">
              <span>{faker.person.fullName()}</span>
              <div className="flex items-center  text-gray">
                <Iconify icon="icon-park-solid:like" size={14} />
                <span className="ml-2">
                  {faker.number.float({ min: 3, max: 9, precision: 3 })}k
                </span>
              </div>
            </div>

            <div
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                background: Color(getTrophyIconColor(index).bg).alpha(0.4).toString(),
              }}
            >
              <Iconify
                icon="solar:cup-star-bold"
                size={24}
                color={getTrophyIconColor(index).color}
              />
            </div>
          </div>
        ))}
      </main>
    </Card>
  );
}
