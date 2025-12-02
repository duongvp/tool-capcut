// pages/AdminPostList.tsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, MessageSquare, History, FileText } from "lucide-react";
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
    // ... other posts
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

    // Định nghĩa tabs với icon nếu muốn
    const tabs = [
        {
            key: "details",
            label: "Thông tin",
            content: (post: any) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">Mô tả</h4>
                            <p className="text-gray-600">{post.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-gray-500 block text-sm">Tác giả</span>
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 block text-sm">Lượt xem</span>
                                <span className="font-medium">{post.views.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">Thống kê</h4>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center p-2 bg-blue-50 rounded">
                                    <div className="font-bold text-blue-600">{post.stats?.likes || 0}</div>
                                    <div className="text-xs text-gray-500">Likes</div>
                                </div>
                                <div className="text-center p-2 bg-green-50 rounded">
                                    <div className="font-bold text-green-600">{post.stats?.shares || 0}</div>
                                    <div className="text-xs text-gray-500">Shares</div>
                                </div>
                                <div className="text-center p-2 bg-purple-50 rounded">
                                    <div className="font-bold text-purple-600">{post.stats?.comments || 0}</div>
                                    <div className="text-xs text-gray-500">Comments</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-1">
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
                    </div>
                </div>
            )
        },
        {
            key: "comments",
            label: "Bình luận",
            content: (post: any) => (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment: any) => (
                            <div key={comment.id} className="border-l-2 border-blue-500 pl-4 py-3 bg-blue-50/50 rounded-r">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-xs font-bold text-blue-600">
                                                {comment.user.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="font-medium text-sm">{comment.user}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(comment.date).toLocaleDateString("vi-VN")}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 mt-2 ml-8">{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500">Chưa có bình luận nào</p>
                        </div>
                    )}
                </div>
            )
        },
        {
            key: "history",
            label: "Lịch sử chỉnh sửa",
            content: (post: any) => (
                <div className="space-y-3">
                    {post.history && post.history.length > 0 ? (
                        <div className="relative">
                            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                            {post.history.map((item: any, index: number) => (
                                <div key={index} className="flex items-start space-x-3 relative pl-8">
                                    <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 border-white ${index === 0 ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}></div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <span className="font-medium text-sm">{item.action}</span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(item.date).toLocaleDateString("vi-VN")}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            bởi <span className="font-medium">{item.user}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <History className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500">Chưa có lịch sử chỉnh sửa</p>
                        </div>
                    )}
                </div>
            )
        }
    ];

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
                    tabs={tabs}
                    loading={loading}
                    emptyMessage="Chưa có bài viết nào"
                    actions={actions}
                    defaultTab="details" // Tab mặc định khi mở
                />
            </CardContent>

            <CardFooter className="flex justify-end">
                <Pagination totalItems={posts.length} pageSize={5} currentPage={1} onPageChange={() => { }} />
            </CardFooter>
        </Card>
    );
}