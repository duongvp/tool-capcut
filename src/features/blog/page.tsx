"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

// icons
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

const fakePosts = [
    {
        id: 1,
        title: "Giới thiệu công ty ABC",
        category: "tin-tuc",
        thumbnail: "https://picsum.photos/200/200?1",
        status: true,
        createdAt: "2025-11-01",
    },
    {
        id: 2,
        title: "Dự án phần mềm quản lý ERP",
        category: "du-an",
        thumbnail: "https://picsum.photos/200/200?2",
        status: true,
        createdAt: "2025-11-02",
    },
    {
        id: 3,
        title: "Công nghệ AI trong doanh nghiệp",
        category: "cong-nghe",
        thumbnail: "https://picsum.photos/200/200?3",
        status: false,
        createdAt: "2025-11-03",
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

    return (
        <Card className="w-full h-full border-0 shadow-none rounded-md">
            <CardHeader className="flex flex-row items-center justify-end py-3">
                {/* <CardTitle>Danh sách bài viết</CardTitle> */}
                <Button onClick={() => navigate("/blog/create")}>
                    <PlusCircle className="w-4 h-4" />
                    Thêm bài viết
                </Button>
            </CardHeader>

            <CardContent>
                {loading ? (
                    <div className="text-center py-8 text-muted-foreground">Đang tải dữ liệu...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">Chưa có bài viết nào</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ảnh</TableHead>
                                <TableHead>Tiêu đề</TableHead>
                                <TableHead>Danh mục</TableHead>
                                <TableHead>Ngày đăng</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <img src={post.thumbnail} className="w-14 h-14 rounded object-cover" />
                                    </TableCell>

                                    <TableCell>{post.title}</TableCell>

                                    <TableCell>
                                        <Badge variant="outline">{post.category}</Badge>
                                    </TableCell>

                                    <TableCell>
                                        {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                                    </TableCell>

                                    <TableCell>
                                        {post.status ? (
                                            <Badge className="bg-green-500 text-white">Đã đăng</Badge>
                                        ) : (
                                            <Badge variant="secondary">Nháp</Badge>
                                        )}
                                    </TableCell>

                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => deletePost(post.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Pagination totalItems={posts.length} pageSize={5} currentPage={1} onPageChange={() => { }} />
            </CardFooter>
        </Card>
    );
}
