// pages/AdminPostList.tsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { ExpandableTable } from "@/components/expandable-table";
const fakePosts = [
    {
        id: 1,
        title: "Giới thiệu công ty ABC",
        category: "tin-tuc",
        thumbnail: "https://picsum.photos/200/200?1",
        status: true,
        createdAt: "2025-11-01",
        description: "Bài viết giới thiệu về công ty ABC và các dịch vụ chính.",
        author: "Admin",
        views: 1500,
        tags: ["giới thiệu", "công ty"]
    },
    {
        id: 2,
        title: "Dự án phần mềm quản lý ERP",
        category: "du-an",
        thumbnail: "https://picsum.photos/200/200?2",
        status: true,
        createdAt: "2025-11-02",
        description: "Triển khai hệ thống ERP cho doanh nghiệp vừa và nhỏ.",
        author: "Manager",
        views: 890,
        tags: ["ERP", "phần mềm"]
    },
    {
        id: 3,
        title: "Công nghệ AI trong doanh nghiệp",
        category: "cong-nghe",
        thumbnail: "https://picsum.photos/200/200?3",
        status: false,
        createdAt: "2025-11-03",
        description: "Ứng dụng trí tuệ nhân tạo trong quản lý doanh nghiệp.",
        author: "Tech Lead",
        views: 450,
        tags: ["AI", "công nghệ"]
    },
];

export default function AdminPostList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPosts(fakePosts);
            setLoading(false);
        }, 0);
    }, []);

    const deletePost = (id: number) => {
        if (!confirm("Xác nhận xóa bài viết?")) return;
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };

    // Định nghĩa columns
    const columns = [
        {
            key: "title",
            header: "Tiêu đề",
            render: (post: any) => <span className="font-medium">{post.title}</span>
        },
        {
            key: "category",
            header: "Danh mục",
            render: (post: any) => <Badge variant="outline">{post.category}</Badge>
        },
        {
            key: "createdAt",
            header: "Ngày đăng",
            render: (post: any) =>
                new Date(post.createdAt).toLocaleDateString("vi-VN")
        },
        {
            key: "status",
            header: "Trạng thái",
            render: (post: any) =>
                post.status ? (
                    <Badge className="bg-green-500 text-white">Đã đăng</Badge>
                ) : (
                    <Badge variant="secondary">Nháp</Badge>
                )
        }
    ];

    // Content khi expand
    const expandedContent = (post: any) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
                <div>
                    <span className="font-medium">Mô tả:</span>
                    <p className="text-muted-foreground mt-1">
                        {post.description}
                    </p>
                </div>
                <div>
                    <span className="font-medium">Tác giả:</span>
                    <span className="text-muted-foreground ml-2">
                        {post.author}
                    </span>
                </div>
            </div>
            <div className="space-y-3">
                <div>
                    <span className="font-medium">Lượt xem:</span>
                    <span className="text-muted-foreground ml-2">
                        {post.views.toLocaleString()}
                    </span>
                </div>
                <div>
                    <span className="font-medium">Tags:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {post.tags.map((tag: string, index: number) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div>
                    <span className="font-medium">Hình ảnh:</span>
                    <div className="mt-1">
                        <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded border"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    // Actions cho mỗi row
    const actions = (post: any) => (
        <>
            <Button
                size="sm"
                variant="outline"
                data-action="edit"
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/posts/${post.id}/edit`);
                }}
            >
                <Pencil className="w-4 h-4" />
            </Button>
            <Button
                size="sm"
                variant="destructive"
                data-action="delete"
                onClick={(e) => {
                    e.stopPropagation();
                    deletePost(post.id);
                }}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </>
    );

    return (
        <Card className="w-full h-full border-0 shadow-none rounded-md">
            <CardHeader className="flex flex-row items-center justify-end py-3">
                <Button onClick={() => navigate("/blog/create")}>
                    <Plus className="w-4 h-4" />
                    Người dùng
                </Button>
            </CardHeader>

            <CardContent>
                <ExpandableTable
                    data={posts}
                    columns={columns}
                    expandedContent={expandedContent}
                    loading={loading}
                    emptyMessage="Chưa có bài viết nào"
                    actions={actions}
                />
            </CardContent>

            <CardFooter className="flex justify-end">
                <Pagination totalItems={posts.length} pageSize={5} currentPage={1} onPageChange={() => { }} />
            </CardFooter>
        </Card>
    );
}