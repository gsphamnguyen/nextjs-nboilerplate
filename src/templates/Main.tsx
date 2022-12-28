import type { ReactNode } from 'react';

import { montserrat } from '@/theme';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className={`${montserrat.variable} font-sans antialiased`}>
    {props.meta}
    {props.children}
  </div>
);

export { Main };
