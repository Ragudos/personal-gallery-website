import * as React from "react";

import { ClientSideMenu } from "./client-side-menu";

export const SideMenu: React.FC = () => {
  return (
    <aside className="hidden lg:py-8 lg:w-[25%] lg:max-w-[15rem] lg:block lg:sticky lg:left-0 lg:min-h-[40rem]">
      <nav>
        <p className="text-lg font-bold mb-4">Browse</p>
        <ul className="flex flex-col gap-2">
          <ClientSideMenu />
        </ul>
      </nav>
    </aside>
  );
};
