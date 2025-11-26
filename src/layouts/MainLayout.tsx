import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from "@/components/mode-toggle";

const MainLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
                <div className="flex flex-col h-full">
                    <div className="flex flex-col py-2 px-4">
                        <div className="flex justify-between align-center">
                            <SidebarTrigger />
                            <ModeToggle />
                        </div>
                        {/* <div className="mb-4">
                            <AppBreadcrumb />
                        </div> */}
                    </div>
                    <div className="bg-background-content p-4 flex-1 overflow-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </SidebarProvider>
    );
}

export default MainLayout;
