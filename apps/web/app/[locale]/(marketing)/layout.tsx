import { SiteFooter } from '~/(marketing)/_components/site-footer';
import { SiteHeader } from '~/(marketing)/_components/site-header';

export const dynamic = 'force-dynamic';

function SiteLayout(props: React.PropsWithChildren) {
  return (
    <div className={'flex min-h-[100vh] flex-col'}>
      <SiteHeader />

      {props.children}

      <SiteFooter />
    </div>
  );
}

export default SiteLayout;
