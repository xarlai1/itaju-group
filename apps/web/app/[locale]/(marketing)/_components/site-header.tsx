import { Header } from '@kit/ui/marketing';

import { AppLogo } from '~/components/app-logo';

export function SiteHeader() {
  return (
    <Header
      logo={
        <AppLogo
          className="mx-auto sm:mx-0"
          href="/"
          label="Itaju Group home"
        />
      }
    />
  );
}
