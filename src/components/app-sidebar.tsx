import { ChevronDown } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { MenuItem } from "@/types/menu"
import Dashboard from "@/features/admin/dashboard/page"
import SplitVoice from "@/features/admin/splitVoice/page"
import Blog from "@/features/admin/blog/page"
import BlogCreate from "@/features/admin/blog/create/page"
import Users from "@/features/admin/user/page"
import { Link } from "react-router-dom"

export const items: MenuItem[] = [
    { title: "Tổng quan", path: "/", element: <Dashboard /> },
    { title: "Bài viết", path: "/blog", element: <Blog /> },
    // { title: "Blog", path: "/blog/create", element: <BlogCreate /> },
    // { title: "Split Voice", path: "/split-voice", element: <SplitVoice /> },
    // {
    //     title: "Settings",
    //     children: [
    //         {
    //             title: "Users",
    //             children: [
    //                 {
    //                     title: "Roles",
    //                     children: [
    //                         { title: "Edit", path: "/settings/users/roles/edit", element: <div>Edit Role</div> },
    //                     ],
    //                 },
    //             ],
    //         },
    //         { title: "Reports", path: "/settings/reports", element: <div>Reports Page</div> },
    //     ],
    // },
    { title: "Cài đặt trang", path: "/users", element: <Users /> },
    { title: "Banner", path: "/users", element: <Users /> },
    { title: "Liên hệ", path: "/users", element: <Users /> },
    { title: "Quản lý tuyển dụng", path: "/users", element: <Users /> },
    { title: "Đối tác", path: "/users", element: <Users /> },
    { title: "Thành viên", path: "/users", element: <Users /> },
    { title: "Đánh giá", path: "/users", element: <Users /> },
    { title: "Dự án dịch vụ", path: "/users", element: <Users /> },
    { title: "Ảnh dự án", path: "/users", element: <Users /> },
    { title: "Dịch vụ", path: "/users", element: <Users /> },
    { title: "Quản trị viên", path: "/users", element: <Users /> },
]

export const items2: MenuItem[] = [
    {
        title: "soray",
        children: [
            {
                title: "model",
                children: [
                    {
                        title: "rotate",
                        children: [
                            { title: "Edit", path: "/settings/users/rotate/edit", element: <div>Edit rotate</div> },
                        ],
                    },
                ],
            },
            { title: "message", path: "/chat/message", element: <div>message Page</div> },
        ],
    },
]

export const sidebarGroups = [
    {
        label: "Menu",
        items,
    },
    {
        label: "Projects",
        items: items2,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent className="bg-white border-0 outline-0">
                {sidebarGroups.map((group) => (
                    <SidebarGroup key={group.label}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="border-0">{renderMenuItems(group.items)}</SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
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
                    <Link to={item.path}>
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    })
}
