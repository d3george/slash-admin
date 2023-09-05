import Logo from '@/components/logo';

import SettingButton from './setting-button';

export default function HeaderSimple() {
  return (
    <header className="flex h-16 items-center justify-between">
      <Logo className="h-10 w-10" />
      <SettingButton />
    </header>
  );
}
