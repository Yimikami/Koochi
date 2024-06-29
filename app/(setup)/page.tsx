import { HomeSidebar } from "@/components/home/home-sidebar";
import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";

const SetupPage = async () => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex">
        <NavigationSideBar />
      </div>
      <main className="h-full md:pl-[72px]">
        <div className="h-full">
          <HomeSidebar />
          <main className="h-full md:pl-60">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                Welcome to Koochi! <br /> You can create a channel, invite
                friends, and start chatting or join a server.
                <span className="mt-4 block text-sm text-gray-500">
                  This project is a work in progress.
                </span>
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};

export default SetupPage;
