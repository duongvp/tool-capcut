import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, RefreshCw, Pencil, Trash2, Download, Image, Calendar, ExternalLink, EyeOff, Eye as EyeIcon } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { ExpandableTable } from "@/components/expandable-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UpdateBannerModal } from "./components/UpdateBannerModal";

const fakeBanners = [
    {
        id: 1,
        title: "Khuyến mãi mùa hè 2025",
        description: "Giảm giá đến 50% cho tất cả dịch vụ",
        imageUrl: "https://picsum.photos/seed/banner1/800/400",
        thumbnailUrl: "https://picsum.photos/seed/banner1-thumb/200/100",
        type: "main",
        position: "homepage-top",
        status: "active",
        startDate: "2025-06-01",
        endDate: "2025-08-31",
        linkUrl: "/promotions/summer-2025",
        linkText: "Xem chi tiết",
        target: "_self",
        order: 1,
        clicks: 1245,
        impressions: 18900,
        ctr: 6.58,
        backgroundColor: "#FF6B35",
        textColor: "#FFFFFF",
        buttonColor: "#FFFFFF",
        buttonTextColor: "#FF6B35",
        createdAt: "2025-05-15",
        updatedAt: "2025-11-20",
        createdBy: "Admin User",
        tags: ["summer", "promotion", "homepage"],
        devices: ["desktop", "mobile", "tablet"],
        categories: ["promotion", "homepage"],
        customCss: "",
        analyticsCode: "BANNER_SUMMER_2025"
    },
    {
        id: 2,
        title: "Tuyển dụng nhân tài",
        description: "Cơ hội làm việc trong môi trường chuyên nghiệp",
        imageUrl: "https://picsum.photos/seed/banner2/800/400",
        thumbnailUrl: "https://picsum.photos/seed/banner2-thumb/200/100",
        type: "sidebar",
        position: "career-sidebar",
        status: "active",
        startDate: "2025-10-01",
        endDate: "2025-12-31",
        linkUrl: "/careers",
        linkText: "Ứng tuyển ngay",
        target: "_self",
        order: 2,
        clicks: 890,
        impressions: 12500,
        ctr: 7.12,
        backgroundColor: "#2E86AB",
        textColor: "#FFFFFF",
        buttonColor: "#F24236",
        buttonTextColor: "#FFFFFF",
        createdAt: "2025-09-20",
        updatedAt: "2025-11-15",
        createdBy: "HR Manager",
        tags: ["recruitment", "career", "sidebar"],
        devices: ["desktop", "mobile"],
        categories: ["recruitment"],
        customCss: "",
        analyticsCode: "BANNER_RECRUITMENT_2025"
    },
    {
        id: 3,
        title: "Dịch vụ mới - Tư vấn AI",
        description: "Trải nghiệm công nghệ AI trong tư vấn doanh nghiệp",
        imageUrl: "https://picsum.photos/seed/banner3/800/400",
        thumbnailUrl: "https://picsum.photos/seed/banner3-thumb/200/100",
        type: "popup",
        position: "homepage-popup",
        status: "inactive",
        startDate: "2025-11-01",
        endDate: "2025-12-31",
        linkUrl: "/services/ai-consulting",
        linkText: "Khám phá ngay",
        target: "_blank",
        order: 3,
        clicks: 0,
        impressions: 0,
        ctr: 0,
        backgroundColor: "#6A0572",
        textColor: "#FFFFFF",
        buttonColor: "#FFD166",
        buttonTextColor: "#000000",
        createdAt: "2025-10-25",
        updatedAt: "2025-11-10",
        createdBy: "Marketing Team",
        tags: ["ai", "new-service", "popup"],
        devices: ["desktop"],
        categories: ["service", "technology"],
        customCss: "animation: fadeIn 0.5s ease-in;",
        analyticsCode: "BANNER_AI_SERVICE"
    },
    {
        id: 4,
        title: "Sự kiện năm 2026",
        description: "Đăng ký tham gia sự kiện công nghệ hàng đầu",
        imageUrl: "https://picsum.photos/seed/banner4/800/400",
        thumbnailUrl: "https://picsum.photos/seed/banner4-thumb/200/100",
        type: "notification",
        position: "global-notification",
        status: "scheduled",
        startDate: "2026-01-01",
        endDate: "2026-01-31",
        linkUrl: "/events/2026-tech-summit",
        linkText: "Đăng ký tham dự",
        target: "_self",
        order: 4,
        clicks: 0,
        impressions: 0,
        ctr: 0,
        backgroundColor: "#06D6A0",
        textColor: "#000000",
        buttonColor: "#118AB2",
        buttonTextColor: "#FFFFFF",
        createdAt: "2025-11-01",
        updatedAt: "2025-11-05",
        createdBy: "Event Manager",
        tags: ["event", "2026", "notification"],
        devices: ["desktop", "mobile", "tablet"],
        categories: ["event"],
        customCss: "",
        analyticsCode: "BANNER_EVENT_2026"
    },
    {
        id: 5,
        title: "Hợp tác đối tác chiến lược",
        description: "Cùng nhau phát triển và mở rộng thị trường",
        imageUrl: "https://picsum.photos/seed/banner5/800/400",
        thumbnailUrl: "https://picsum.photos/seed/banner5-thumb/200/100",
        type: "main",
        position: "partners-page",
        status: "expired",
        startDate: "2025-01-01",
        endDate: "2025-06-30",
        linkUrl: "/partners",
        linkText: "Tìm hiểu thêm",
        target: "_self",
        order: 5,
        clicks: 2345,
        impressions: 45600,
        ctr: 5.14,
        backgroundColor: "#FF9F1C",
        textColor: "#FFFFFF",
        buttonColor: "#2EC4B6",
        buttonTextColor: "#FFFFFF",
        createdAt: "2024-12-15",
        updatedAt: "2025-07-01",
        createdBy: "Partnership Manager",
        tags: ["partnership", "collaboration"],
        devices: ["desktop", "mobile"],
        categories: ["partnership"],
        customCss: "",
        analyticsCode: "BANNER_PARTNERS_2025"
    }
];

export default function BannerManagement() {
    const [banners, setBanners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBanner, setSelectedBanner] = useState<any>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [previewBanner, setPreviewBanner] = useState<any>(null);

    useEffect(() => {
        setTimeout(() => {
            setBanners(fakeBanners);
            setLoading(false);
        }, 500);
    }, []);

    const handleCreateClick = () => {
        setSelectedBanner({
            title: "",
            description: "",
            imageUrl: "",
            thumbnailUrl: "",
            type: "main",
            position: "homepage-top",
            status: "draft",
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
            linkUrl: "",
            linkText: "Xem thêm",
            target: "_self",
            order: banners.length + 1,
            backgroundColor: "#3B82F6",
            textColor: "#FFFFFF",
            buttonColor: "#FFFFFF",
            buttonTextColor: "#3B82F6",
            tags: [],
            devices: ["desktop", "mobile"],
            categories: []
        });
        setModalMode("create");
        setIsUpdateModalOpen(true);
    };

    const handleUpdateClick = (banner: any) => {
        setSelectedBanner(banner);
        setModalMode("edit");
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa banner này?")) {
            setBanners(banners.filter(item => item.id !== id));
        }
    };

    const handleStatusChange = (id: number, newStatus: string) => {
        setBanners(banners.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        ));
    };

    const handlePreviewClick = (banner: any) => {
        setPreviewBanner(banner);
    };

    const handleClosePreview = () => {
        setPreviewBanner(null);
    };

    const handleExportClick = () => {
        console.log("Exporting banner data...");
        // Logic export data ở đây
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string, color: string }> = {
            "draft": { variant: "secondary", label: "Bản nháp", color: "bg-gray-100 text-gray-800" },
            "active": { variant: "default", label: "Đang hoạt động", color: "bg-green-100 text-green-800" },
            "inactive": { variant: "outline", label: "Không hoạt động", color: "bg-yellow-100 text-yellow-800" },
            "scheduled": { variant: "secondary", label: "Đã lên lịch", color: "bg-blue-100 text-blue-800" },
            "expired": { variant: "destructive", label: "Đã hết hạn", color: "bg-red-100 text-red-800" }
        };

        const config = statusConfig[status] || { variant: "outline", label: status, color: "" };
        return (
            <Badge variant={config.variant} className={config.color}>
                {config.label}
            </Badge>
        );
    };

    const getTypeBadge = (type: string) => {
        const typeConfig = {
            main: { color: "bg-purple-100 text-purple-800", label: "Chính" },
            sidebar: { color: "bg-orange-100 text-orange-800", label: "Sidebar" },
            popup: { color: "bg-pink-100 text-pink-800", label: "Popup" },
            notification: { color: "bg-teal-100 text-teal-800", label: "Thông báo" }
        };
        const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.main;
        return <Badge className={config.color}>{config.label}</Badge>;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN");
    };

    const calculateDaysLeft = (endDate: string) => {
        const end = new Date(endDate);
        const now = new Date();
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getPositionLabel = (position: string) => {
        const positionLabels: Record<string, string> = {
            "homepage-top": "Trang chủ - Top",
            "homepage-popup": "Trang chủ - Popup",
            "career-sidebar": "Tuyển dụng - Sidebar",
            "global-notification": "Toàn site - Thông báo",
            "partners-page": "Trang đối tác"
        };
        return positionLabels[position] || position;
    };

    // Định nghĩa columns
    const columns = [
        {
            key: "banner",
            header: "Banner",
            render: (banner: any) => (
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={banner.thumbnailUrl}
                            alt={banner.title}
                            className="w-20 h-10 object-cover rounded border"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x100?text=No+Image";
                            }}
                        />
                        {banner.status === "active" && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                    </div>
                    <div className="space-y-1">
                        <span className="font-medium block">{banner.title}</span>
                        <span className="text-sm text-gray-500 line-clamp-1">{banner.description}</span>
                    </div>
                </div>
            )
        },
        {
            key: "type",
            header: "Loại & Vị trí",
            render: (banner: any) => (
                <div className="space-y-1">
                    <div>{getTypeBadge(banner.type)}</div>
                    <span className="text-sm text-gray-500">{getPositionLabel(banner.position)}</span>
                </div>
            )
        },
        {
            key: "dates",
            header: "Thời gian",
            render: (banner: any) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{formatDate(banner.startDate)}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                        → {formatDate(banner.endDate)}
                        {banner.status === "active" && (
                            <span className={`ml-2 px-1.5 py-0.5 text-xs rounded ${calculateDaysLeft(banner.endDate) <= 7 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                Còn {calculateDaysLeft(banner.endDate)} ngày
                            </span>
                        )}
                    </div>
                </div>
            )
        },
        {
            key: "order",
            header: "Thứ tự",
            render: (banner: any) => (
                <div className="text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full font-medium">
                        {banner.order}
                    </span>
                </div>
            )
        },
        {
            key: "analytics",
            header: "Thống kê",
            render: (banner: any) => (
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Lượt xem:</span>
                        <span className="font-medium">{banner.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Lượt click:</span>
                        <span className="font-medium">{banner.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">CTR:</span>
                        <span className={`font-medium ${banner.ctr > 5 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {banner.ctr}%
                        </span>
                    </div>
                </div>
            )
        },
        {
            key: "status",
            header: "Trạng thái",
            render: (banner: any) => (
                <div className="space-y-2">
                    {getStatusBadge(banner.status)}
                    <div className="text-xs text-gray-500">
                        {banner.devices?.map((device: string) => (
                            <span key={device} className="inline-block mr-1">📱{device}</span>
                        ))}
                    </div>
                </div>
            )
        },
        {
            key: "actions",
            header: "Thao tác",
            render: (banner: any) => (
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreviewClick(banner)}
                        title="Xem trước"
                    >
                        <EyeIcon className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateClick(banner)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                ⋮
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusChange(banner.id, "active")}>
                                <EyeIcon className="w-4 h-4 mr-2" />
                                Kích hoạt
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(banner.id, "inactive")}>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Tắt
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(banner.id, "draft")}>
                                <Image className="w-4 h-4 mr-2" />
                                Chuyển thành nháp
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDeleteClick(banner.id)}
                                className="text-red-600"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Xóa
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    ];

    // Định nghĩa tabs
    const tabs = [
        {
            key: "details",
            label: "Chi tiết",
            content: (banner: any) => (
                <div className="space-y-6 p-4">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 space-y-6">
                            {/* Banner Preview */}
                            <div className="border rounded-lg overflow-hidden">
                                <div
                                    className="h-48 w-full relative"
                                    style={{ backgroundColor: banner.backgroundColor }}
                                >
                                    <img
                                        src={banner.imageUrl}
                                        alt={banner.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=No+Image";
                                        }}
                                    />
                                    <div
                                        className="absolute inset-0 p-6 flex flex-col justify-center"
                                        style={{ color: banner.textColor }}
                                    >
                                        <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                                        <p className="mb-4">{banner.description}</p>
                                        <a
                                            href={banner.linkUrl}
                                            target={banner.target}
                                            className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg font-medium w-fit`}
                                            style={{
                                                backgroundColor: banner.buttonColor,
                                                color: banner.buttonTextColor
                                            }}
                                        >
                                            {banner.linkText}
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin cơ bản */}
                            <div>
                                <h4 className="font-semibold mb-3">Thông tin banner</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span className="font-medium">Mã phân tích:</span>
                                            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                                {banner.analyticsCode}
                                            </code>
                                        </div>
                                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span className="font-medium">Thiết bị hiển thị:</span>
                                            <span>{banner.devices?.join(", ")}</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span className="font-medium">Thẻ phân loại:</span>
                                            <div className="flex gap-1">
                                                {banner.tags?.map((tag: string) => (
                                                    <Badge key={tag} variant="outline" className="bg-gray-100">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span className="font-medium">Người tạo:</span>
                                            <span>{banner.createdBy}</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span className="font-medium">Ngày tạo:</span>
                                            <span>{formatDate(banner.createdAt)}</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span className="font-medium">Cập nhật cuối:</span>
                                            <span>{formatDate(banner.updatedAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Link và Target */}
                            <div>
                                <h4 className="font-semibold mb-3">Liên kết</h4>
                                <div className="bg-blue-50 p-4 rounded">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">URL:</span>
                                        <Badge variant="outline" className="bg-white">
                                            {banner.target === '_blank' ? 'Mở tab mới' : 'Mở cùng tab'}
                                        </Badge>
                                    </div>
                                    <a
                                        href={banner.linkUrl}
                                        target="_blank"
                                        className="text-blue-600 hover:text-blue-800 break-all block"
                                    >
                                        {banner.linkUrl}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Thống kê chi tiết */}
                            <div className="bg-gray-50 p-4 rounded">
                                <h4 className="font-semibold mb-3">Thống kê hiệu suất</h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm">Lượt hiển thị</span>
                                            <span className="font-bold">{banner.impressions.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${Math.min(banner.impressions / 50000 * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm">Lượt nhấp chuột</span>
                                            <span className="font-bold">{banner.clicks.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-600 h-2 rounded-full"
                                                style={{ width: `${Math.min(banner.clicks / 5000 * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm">Tỷ lệ nhấp (CTR)</span>
                                            <span className={`font-bold ${banner.ctr > 5 ? 'text-green-600' : banner.ctr > 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {banner.ctr}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${banner.ctr > 5 ? 'bg-green-600' : banner.ctr > 2 ? 'bg-yellow-600' : 'bg-red-600'}`}
                                                style={{ width: `${Math.min(banner.ctr * 10, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Màu sắc */}
                            <div className="border rounded p-4">
                                <h4 className="font-semibold mb-3">Màu sắc</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded border"
                                            style={{ backgroundColor: banner.backgroundColor }}
                                        ></div>
                                        <div>
                                            <span className="text-sm font-medium">Nền</span>
                                            <div className="text-xs text-gray-500">{banner.backgroundColor}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded border"
                                            style={{ backgroundColor: banner.textColor }}
                                        ></div>
                                        <div>
                                            <span className="text-sm font-medium">Chữ</span>
                                            <div className="text-xs text-gray-500">{banner.textColor}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded border"
                                            style={{ backgroundColor: banner.buttonColor }}
                                        ></div>
                                        <div>
                                            <span className="text-sm font-medium">Nút</span>
                                            <div className="text-xs text-gray-500">{banner.buttonColor}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trạng thái */}
                            <div className="border rounded p-4">
                                <h4 className="font-semibold mb-3">Trạng thái & Lịch trình</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Trạng thái:</span>
                                        {getStatusBadge(banner.status)}
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Bắt đầu:</span>
                                        <span>{formatDate(banner.startDate)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Kết thúc:</span>
                                        <span>{formatDate(banner.endDate)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Còn lại:</span>
                                        <span className={`font-medium ${calculateDaysLeft(banner.endDate) <= 7 ? 'text-red-600' : 'text-green-600'}`}>
                                            {calculateDaysLeft(banner.endDate)} ngày
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CSS tùy chỉnh */}
                    {banner.customCss && (
                        <div className="mt-6">
                            <h4 className="font-semibold mb-3">CSS Tùy chỉnh</h4>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                                <code>{banner.customCss}</code>
                            </pre>
                        </div>
                    )}

                    <div className="flex justify-end gap-2 pt-6 border-t">
                        <Button
                            variant="outline"
                            onClick={() => handlePreviewClick(banner)}
                            className="flex items-center gap-2"
                        >
                            <EyeIcon size={16} />
                            Xem trước
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleUpdateClick(banner)}
                            className="flex items-center gap-2"
                        >
                            <RefreshCw size={16} />
                            Cập nhật
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => handleDeleteClick(banner.id)}
                        >
                            <Trash2 size={16} className="mr-2" />
                            Xóa banner
                        </Button>
                    </div>
                </div>
            )
        },
        {
            key: "analytics",
            label: "Phân tích",
            content: (banner: any) => (
                <div className="p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold">Phân tích hiệu suất</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Xuất báo cáo
                            </Button>
                            <Button size="sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Làm mới dữ liệu
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-white border rounded p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">{banner.impressions.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Lượt hiển thị</div>
                        </div>
                        <div className="bg-white border rounded p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">{banner.clicks.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Lượt nhấp chuột</div>
                        </div>
                        <div className="bg-white border rounded p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">{banner.ctr}%</div>
                            <div className="text-sm text-gray-500">Tỷ lệ nhấp (CTR)</div>
                        </div>
                        <div className="bg-white border rounded p-4 text-center">
                            <div className="text-2xl font-bold text-orange-600">
                                {banner.impressions > 0 ? ((banner.clicks / banner.impressions) * 100).toFixed(2) : 0}%
                            </div>
                            <div className="text-sm text-gray-500">Tỷ lệ chuyển đổi</div>
                        </div>
                    </div>

                    {/* Chi tiết theo thời gian */}
                    <div className="border rounded p-4">
                        <h4 className="font-semibold mb-4">Thống kê theo thời gian</h4>
                        <div className="text-center py-8 text-gray-500">
                            <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>Dữ liệu theo thời gian chưa có sẵn</p>
                            <p className="text-sm mt-1">Kết nối với Google Analytics để xem dữ liệu chi tiết</p>
                            <Button variant="outline" className="mt-4">
                                Kết nối Analytics
                            </Button>
                        </div>
                    </div>

                    {/* Thiết bị */}
                    <div className="border rounded p-4 mt-4">
                        <h4 className="font-semibold mb-4">Hiệu suất theo thiết bị</h4>
                        <div className="space-y-3">
                            {banner.devices?.map((device: string) => (
                                <div key={device} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                    <div className="flex items-center gap-3">
                                        {device === 'desktop' && '💻'}
                                        {device === 'mobile' && '📱'}
                                        {device === 'tablet' && '📟'}
                                        <span className="font-medium">{device}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">
                                            ~{Math.round(banner.impressions / banner.devices.length).toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-500">lượt hiển thị ước tính</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <>
            <Card className="w-full h-full border-0 shadow-none rounded-md">
                <CardHeader className="flex flex-row items-center justify-between py-3">
                    <div></div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handleExportClick}
                            className="flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Xuất báo cáo
                        </Button>
                        <Button
                            onClick={handleCreateClick}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Thêm banner mới
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <ExpandableTable
                        data={banners}
                        columns={columns}
                        tabs={tabs}
                        loading={loading}
                        emptyMessage="Chưa có banner nào"
                        defaultTab="details"
                    />
                </CardContent>

                <CardFooter className="flex justify-end">
                    <Pagination
                        totalItems={banners.length}
                        pageSize={10}
                        currentPage={1}
                        onPageChange={(page) => console.log("Page changed:", page)}
                    />
                </CardFooter>
            </Card>

            {/* Preview Modal */}
            {previewBanner && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-semibold">Xem trước banner</h3>
                            <Button variant="ghost" size="sm" onClick={handleClosePreview}>
                                ✕
                            </Button>
                        </div>
                        <div className="p-6">
                            <div
                                className="relative rounded-lg overflow-hidden mb-4"
                                style={{ backgroundColor: previewBanner.backgroundColor }}
                            >
                                <img
                                    src={previewBanner.imageUrl}
                                    alt={previewBanner.title}
                                    className="w-full h-64 object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=No+Image";
                                    }}
                                />
                                <div
                                    className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center"
                                    style={{ color: previewBanner.textColor }}
                                >
                                    <h3 className="text-3xl font-bold mb-3">{previewBanner.title}</h3>
                                    <p className="text-lg mb-6 max-w-2xl">{previewBanner.description}</p>
                                    <a
                                        href={previewBanner.linkUrl}
                                        target={previewBanner.target}
                                        className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-lg`}
                                        style={{
                                            backgroundColor: previewBanner.buttonColor,
                                            color: previewBanner.buttonTextColor
                                        }}
                                    >
                                        {previewBanner.linkText}
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                            <div className="text-center text-sm text-gray-500">
                                <p>Banner sẽ hiển thị trên: <strong>{getPositionLabel(previewBanner.position)}</strong></p>
                                <p>Kích thước: 800x400px | Loại: {previewBanner.type}</p>
                            </div>
                        </div>
                        <div className="p-4 border-t flex justify-end gap-2">
                            <Button variant="outline" onClick={handleClosePreview}>
                                Đóng
                            </Button>
                            <Button onClick={() => {
                                handleClosePreview();
                                handleUpdateClick(previewBanner);
                            }}>
                                <Pencil className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {isUpdateModalOpen && selectedBanner && (
                <UpdateBannerModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setIsUpdateModalOpen(false);
                        setSelectedBanner(null);
                    }}
                    banner={selectedBanner}
                    mode={modalMode}
                />
            )}
        </>
    );
}