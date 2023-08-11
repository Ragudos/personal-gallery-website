import * as React from "react";

import { ClientSideMenu } from "./client-side-menu";

export const SideMenu: React.FC = () => {
  return (
    <aside className="hidden xl:py-8 xl:w-[25%] xl:max-w-[15rem] xl:block xl:sticky xl:left-0 xl:min-h-[40rem]">
      <nav>
        <p className="text-xl font-bold mb-4">Browse</p>
        <ul className="flex flex-col gap-2">
          <ClientSideMenu />
        </ul>
      </nav>
    </aside>
  );
};
