import * as React from "react";

import { ClientSideMenu } from "./client-side-menu";

export const SideMenu: React.FC = () => {
  return (
    <aside className="pt-8 w-full lg:py-8 lg:w-[25%] lg:max-w-[15rem] lg:block lg:sticky left-0 top-12">
      <nav>
        <p className="text-lg font-bold sr-only lg:not-sr-only lg:mb-4">
          Browse
        </p>
        <ul className="flex flex-row flex-wrap lg:flex-col gap-2">
          <ClientSideMenu />
        </ul>
      </nav>
    </aside>
  );
};
