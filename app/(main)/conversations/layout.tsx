import { HomeSidebar } from "@/components/home/home-sidebar";
import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex">
        <NavigationSideBar />
      </div>
      <main className="h-full md:pl-[72px]">
        <div className="h-full">
          <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
            <HomeSidebar />
          </div>
          <main className="h-full md:pl-60">
            <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
              {children}
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
