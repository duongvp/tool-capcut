"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";

// icons
import { Pencil, Trash2, PlusCircle, Plus, Minus } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

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

// Custom icon component với animation
const ExpandIcon = ({ isExpanded }: { isExpanded: boolean }) => {
    return (
        <div className="relative !h-3.5 !w-3.5 flex items-center justify-center">
            <div className={`
                absolute transition-all duration-200 ease-in-out
                ${isExpanded ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}
            `}>
                <Plus className="!h-3.5 !w-3.5" /> {/* Sử dụng thuộc tính size */}
            </div>
            <div className={`
                absolute transition-all duration-200 ease-in-out
                ${isExpanded ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}
            `}>
                <Minus className="!h-3.5 !w-3.5" /> {/* Sử dụng thuộc tính size */}
            </div>
        </div>
    );
};

export default function AdminPostList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setPosts(fakePosts);
            setLoading(false);
        }, 0);
    }, []);

    const deletePost = (id: number) => {
        if (!confirm("Xác nhận xóa bài viết?")) return;
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setExpandedRows((prev) => prev.filter((rowId) => rowId !== id));
    };

    const toggleRow = (id: number) => {
        setExpandedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const isExpanded = (id: number) => expandedRows.includes(id);

    return (
        <Card className="w-full h-full border-0 shadow-none rounded-md">
            <CardHeader className="flex flex-row items-center justify-end py-3">
                <Button onClick={() => navigate("/blog/create")}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Người dùng
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
                                <TableHead className="w-10"></TableHead>
                                <TableHead>Tiêu đề</TableHead>
                                <TableHead>Danh mục</TableHead>
                                <TableHead>Ngày đăng</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {posts.map((post) => (
                                <Collapsible
                                    key={post.id}
                                    open={isExpanded(post.id)}
                                    onOpenChange={() => toggleRow(post.id)}
                                    asChild
                                >
                                    <>
                                        <TableRow className="group">
                                            <TableCell>
                                                <CollapsibleTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-6 w-6 p-0 hover:bg-accent border rounded transition-all duration-200"
                                                    >
                                                        <ExpandIcon isExpanded={isExpanded(post.id)} />
                                                    </Button>
                                                </CollapsibleTrigger>
                                            </TableCell>
                                            <TableCell className="font-medium">{post.title}</TableCell>
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
                                            <TableCell className="text-right">
                                                <div className="flex justify-end space-x-2">
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
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow className={isExpanded(post.id) ? "bg-muted/50" : "hidden"}>
                                            <TableCell colSpan={6} className="p-0">
                                                <CollapsibleContent className="p-4 transition-all duration-200 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
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
                                                </CollapsibleContent>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                </Collapsible>
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