import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, RefreshCw } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { ExpandableTable } from "@/components/expandable-table";
import { UpdateUserModal } from "./components/UpdateUserModal";

const fakePosts = [
    {
        id: 1,
        title: "admin",
        category: "tin-tuc",
        thumbnail: "https://picsum.photos/200/200?1",
        status: true,
        createdAt: "2025-11-01",
        description: "Bài viết giới thiệu về công ty ABC và các dịch vụ chính.",
        author: "Admin",
        views: 1500,
        tags: ["giới thiệu", "công ty"],
        comments: [
            { id: 1, user: "User1", content: "Bài viết hay", date: "2025-11-02" },
            { id: 2, user: "User2", content: "Rất hữu ích", date: "2025-11-03" }
        ],
        history: [
            { date: "2025-11-01", action: "Tạo bài viết", user: "Admin" },
            { date: "2025-11-02", action: "Cập nhật", user: "Editor" }
        ],
        stats: {
            likes: 45,
            shares: 12,
            comments: 8
        }
    },
];

export default function AdminPostList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");

    useEffect(() => {
        setTimeout(() => {
            setPosts(fakePosts);
            setLoading(false);
        }, 0);
    }, []);

    const handleCreateClick = () => {
        setSelectedUser(null);
        setIsUpdateModalOpen(true);
        setModalMode("create");
    };
    const handleUpdateClick = (userData: any) => {
        const user = {
            username: userData.title,
            fullName: userData.category,
            email: "superadmin@warehouse.com",
            phone: "0912345678",
            branch: "hanoi",
            role: "admin",
            isCurrentUser: true
        };

        setSelectedUser(user);
        setModalMode("edit");
        setIsUpdateModalOpen(true);
    };


    // Định nghĩa columns
    const columns = [
        {
            key: "title",
            header: "Tên đăng nhập",
            render: (post: any) => <span className="font-medium">{post.title}</span>
        },
        {
            key: "category",
            header: "Tên người dùng",
            render: (post: any) => <Badge variant="outline">{post.category}</Badge>
        },
        {
            key: "createdAt",
            header: "Thời gian khởi tạo",
            render: (post: any) =>
                new Date(post.createdAt).toLocaleDateString("vi-VN")
        },
        {
            key: "createdAt",
            header: "Thời gian cập nhật",
            render: (post: any) =>
                new Date(post.createdAt).toLocaleDateString("vi-VN")
        },
        {
            key: "createdAt",
            header: "Trạng thái",
            render: (post: any) =>
                new Date(post.createdAt).toLocaleDateString("vi-VN")
        }
    ];

    // Định nghĩa tabs với icon nếu muốn
    const tabs = [
        {
            key: "details",
            label: "Thông tin",
            content: (post: any) => (
                <div className="grid grid-cols-1 text-sm">
                    <table className="w-full table-auto">
                        <tbody>
                            <tr>
                                <td className="font-medium py-2 w-[200px]">Tên đăng nhập:</td>
                                <td className="py-2">{post.title}</td>
                            </tr>
                            <tr>
                                <td className="font-medium py-2">Tên người dùng:</td>
                                <td className="py-2">{post.category}</td>
                            </tr>
                            <tr>
                                <td className="font-medium py-2">Số điện thoại:</td>
                                <td className="py-2">{new Date(post.createdAt).toLocaleDateString("vi-VN")}</td>
                            </tr>
                            <tr>
                                <td className="font-medium py-2">Email:</td>
                                <td className="py-2">{post.status ? "Kích hoạt" : "Vô hiệu hóa"}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-4">
                        <Button
                            variant="default"
                            onClick={() => handleUpdateClick(post)}
                            className="flex items-center gap-2"
                        >
                            <RefreshCw size={20} />
                            Cập nhật
                        </Button>
                    </div>
                </div>
            )
        },
    ];

    return (
        <>
            <Card className="w-full h-full border-0 shadow-none rounded-md">
                <CardHeader className="flex flex-row items-center justify-end py-3">
                    <Button onClick={handleCreateClick}>
                        <Plus className="w-4 h-4" />
                        Người dùng
                    </Button>
                </CardHeader>

                <CardContent>
                    <ExpandableTable
                        data={posts}
                        columns={columns}
                        tabs={tabs}
                        loading={loading}
                        emptyMessage="Chưa có bài viết nào"
                        defaultTab="details"
                    />
                </CardContent>

                <CardFooter className="flex justify-end">
                    <Pagination totalItems={posts.length} pageSize={5} currentPage={1} onPageChange={() => { }} />
                </CardFooter>
            </Card>

            {isUpdateModalOpen && (
                <UpdateUserModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setIsUpdateModalOpen(false);
                        setSelectedUser(null);
                    }}
                    user={selectedUser}
                    mode={modalMode}
                />
            )}

        </>
    );
}