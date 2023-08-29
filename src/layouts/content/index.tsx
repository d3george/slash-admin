import { PropsWithChildren } from 'react';

function Content({ children }: PropsWithChildren) {
  return (
    <main className="border-[1px] border-gray-400 p-4">
      {/* <BreadCrumb /> */}

      {/* <!-- ===== Menu Content Start ===== --> */}
      {children}
      {/* <!-- ===== Menu Content End ===== --> */}
    </main>
  );
}

export default Content;
