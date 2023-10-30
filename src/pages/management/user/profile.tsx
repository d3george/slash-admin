import { Avatar } from 'antd';

import CoverImage from '@/assets/images/cover/profile-banner.png';
import Card from '@/components/card';
import { useUserInfo } from '@/store/userStore';

function UserProfile() {
  const { avatar } = useUserInfo();
  return (
    <Card className="relative h-[290px] rounded-2xl !p-0">
      <img src={CoverImage} className="absolute top-0 h-[250px]" alt="" />
      <Avatar src={avatar} size={120} shape="square" />
    </Card>
  );
}

export default UserProfile;
