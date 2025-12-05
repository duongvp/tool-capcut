import {
    ChevronDown,
    Home,
    Images,
    Users,
    Star,
    FileText,
    Mail,
    Briefcase,
    FolderKanban,
    UserCog,
    Settings,
    LogOut
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { MenuItem } from "@/types/menu"
import Dashboard from "@/features/admin/dashboard/page"
import Blog from "@/features/admin/blog/page"
import UsersPage from "@/features/admin/user/page"
import BannerPage from "@/features/admin/banner/page"
import ProjectsPage from "@/features/admin/projects/page"
import PartnersPage from "@/features/admin/partners/page"
import ReviewsPage from "@/features/admin/reviews/page"
import TeamsPage from "@/features/admin/teams/page"
import RecruitmentsPage from "@/features/admin/recruitments/page"
import ContactsPage from "@/features/admin/contacts/page"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"


export const items: MenuItem[] = [
    { title: "Tổng quan", path: "/", element: <Dashboard />, icon: Home },
    { title: "Quản lý Banner", path: "/banners", element: <BannerPage />, icon: Images },
    { title: "Đối tác / Khách hàng", path: "/partners", element: <PartnersPage />, icon: Users },
    { title: "Đội ngũ / Ban lãnh đạo", path: "/teams", element: <TeamsPage />, icon: Users },
    { title: "Đánh giá khách hàng", path: "/reviews", element: <ReviewsPage />, icon: Star },
    { title: "Blog – Tin tức", path: "/blogs", element: <Blog />, icon: FileText },
    { title: "Dự án dịch vụ", path: "/projects", element: <ProjectsPage />, icon: FolderKanban },
    { title: "Liên hệ - Khách hàng", path: "/contacts", element: <ContactsPage />, icon: Mail },
    { title: "Tuyển dụng", path: "/recruitments", element: <RecruitmentsPage />, icon: Briefcase },
    { title: "Quản trị viên", path: "/admins", element: <UsersPage />, icon: UserCog },
    { title: "Cài đặt hệ thống", path: "/system-settings", element: <></>, icon: Settings },
]

export const sidebarGroups = [
    {
        label: "Tổng quan",
        items: [
            items[0], // Dashboard
        ],
    },
    {
        label: "Quản lý nội dung",
        items: [
            items[1], // Banner
            items[2], // Đối tác / KH
            items[3], // Đội ngũ
            items[4], // Đánh giá
            items[5], // Blog
            items[6], // Dự án dịch vụ
            items[7], // Liên hệ
            items[8], // Tuyển dụng
        ],
    },
    {
        label: "Quản lý người dùng",
        items: [
            items[9], // Admin
        ],
    },
    {
        label: "Hệ thống",
        items: [
            items[10], // Cài đặt hệ thống
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="bg-white border-b border-gray-200 dark:border-gray-800 p-4">
                <img src="/logo.png" className="h-[44px] object-contain" alt="logo" />
            </SidebarHeader>
            <SidebarContent className="bg-white border-0 outline-0">
                {sidebarGroups.map((group) => (
                    <SidebarGroup key={group.label}>
                        {/* <img src="/logo.png" className="h-[44px] object-contain" alt="logo" /> */}
                        <div className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {group.label}
                        </div>
                        <SidebarGroupContent className="pt-1">
                            <SidebarMenu className="border-0">{renderMenuItems(group.items)}</SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="bg-white border-t border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/avatar-placeholder.jpg" alt="User" />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                                AG
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                Nguyễn Văn A
                            </h4>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
                {/* Copyright */}
                <div className=" border-gray-100 dark:border-gray-800 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        © 2025 ASIA GROUP
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        v2.1.0 • Đang hoạt động
                    </p>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

// Hàm đệ quy render menu
function renderMenuItems(items: any[]) {
    return items.map((item) => {
        if (item.children && item.children.length > 0) {
            return (
                <Collapsible key={item.title}>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="group flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                {item.icon && <item.icon className="h-4 w-4" />}
                                <span>{item.title}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenu>
                            {item.children.map((child: any) => (
                                <SidebarMenuItem key={child.title} className="pl-4 border-l">
                                    {renderMenuItems([child])}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </CollapsibleContent>
                </Collapsible>
            )
        }

        return (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                    <Link to={item.path} className="h-[40px] flex items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    })
}