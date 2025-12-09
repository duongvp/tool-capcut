import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, RefreshCw, Eye, Pencil, Trash2, Download } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { ExpandableTable } from "@/components/expandable-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UpdateRecruitmentModal } from "./components/UpdateRecruitmentModal";

const fakeRecruitments = [
    {
        id: 1,
        title: "Tuyển dụng Nhân viên Kinh doanh",
        position: "Nhân viên Kinh doanh",
        department: "Kinh doanh",
        location: "Hà Nội",
        quantity: 3,
        status: "active",
        salary: "15-20 triệu",
        deadline: "2025-12-31",
        createdAt: "2025-11-01",
        updatedAt: "2025-11-05",
        description: "Tuyển dụng nhân viên kinh doanh có kinh nghiệm trong lĩnh vực bất động sản.",
        requirements: [
            "Tốt nghiệp Đại học các ngành Kinh tế, Quản trị Kinh doanh",
            "Có ít nhất 2 năm kinh nghiệm kinh doanh",
            "Kỹ năng giao tiếp tốt, thuyết phục khách hàng",
            "Có khả năng làm việc độc lập và theo nhóm"
        ],
        benefits: [
            "Lương thưởng hấp dẫn + hoa hồng",
            "Được đào tạo bài bản",
            "Môi trường làm việc chuyên nghiệp",
            "Cơ hội thăng tiến cao"
        ],
        contactInfo: {
            name: "Phòng Nhân sự",
            phone: "0912345678",
            email: "hr@company.com"
        },
        views: 1250,
        applications: 45
    },
    {
        id: 2,
        title: "Tuyển dụng Lập trình viên Frontend",
        position: "Lập trình viên Frontend",
        department: "Công nghệ thông tin",
        location: "TP.HCM",
        quantity: 2,
        status: "active",
        salary: "20-25 triệu",
        deadline: "2025-12-15",
        createdAt: "2025-10-28",
        updatedAt: "2025-11-03",
        description: "Tuyển dụng lập trình viên Frontend có kinh nghiệm ReactJS/NextJS.",
        requirements: [
            "Tốt nghiệp CNTT hoặc ngành liên quan",
            "Có ít nhất 3 năm kinh nghiệm ReactJS",
            "Thành thạo TypeScript, NextJS",
            "Có kinh nghiệm làm việc với Tailwind CSS"
        ],
        benefits: [
            "Lương cạnh tranh",
            "Làm việc remote linh hoạt",
            "Thưởng hàng quý",
            "Bảo hiểm sức khỏe cao cấp"
        ],
        contactInfo: {
            name: "Trưởng phòng IT",
            phone: "0912345679",
            email: "it@company.com"
        },
        views: 1890,
        applications: 78
    },
    {
        id: 3,
        title: "Tuyển dụng Kế toán trưởng",
        position: "Kế toán trưởng",
        department: "Kế toán",
        location: "Đà Nẵng",
        quantity: 1,
        status: "pending",
        salary: "25-30 triệu",
        deadline: "2025-11-30",
        createdAt: "2025-10-15",
        updatedAt: "2025-10-20",
        description: "Tuyển dụng kế toán trưởng có chứng chỉ hành nghề.",
        requirements: [
            "Có chứng chỉ kế toán trưởng",
            "Ít nhất 5 năm kinh nghiệm kế toán",
            "Thành thạo phần mềm kế toán MISA",
            "Có kinh nghiệm làm việc tại doanh nghiệp sản xuất"
        ],
        benefits: [
            "Lương thỏa thuận",
            "Xe đưa đón",
            "Du lịch hàng năm",
            "Phụ cấp ăn trưa"
        ],
        contactInfo: {
            name: "Giám đốc Tài chính",
            phone: "0912345680",
            email: "finance@company.com"
        },
        views: 890,
        applications: 23
    }
];

export default function RecruitmentList() {
    const [recruitments, setRecruitments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecruitment, setSelectedRecruitment] = useState<any>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");

    useEffect(() => {
        setTimeout(() => {
            setRecruitments(fakeRecruitments);
            setLoading(false);
        }, 500);
    }, []);

    const handleCreateClick = () => {
        setSelectedRecruitment({
            title: "",
            position: "",
            department: "",
            location: "",
            quantity: 1,
            status: "draft",
            salary: "",
            deadline: "",
            description: "",
            requirements: [],
            benefits: [],
            contactInfo: {
                name: "",
                phone: "",
                email: ""
            }
        });
        setModalMode("create");
        setIsUpdateModalOpen(true);
    };

    const handleUpdateClick = (recruitment: any) => {
        setSelectedRecruitment(recruitment);
        setModalMode("edit");
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tin tuyển dụng này?")) {
            setRecruitments(recruitments.filter(item => item.id !== id));
        }
    };

    const handleStatusChange = (id: number, newStatus: string) => {
        setRecruitments(recruitments.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        ));
    };

    const handleExportClick = () => {
        console.log("Exporting recruitment data...");
        // Logic export data ở đây
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
            active: { variant: "default", label: "Đang tuyển" },
            draft: { variant: "secondary", label: "Bản nháp" },
            pending: { variant: "outline", label: "Chờ duyệt" },
            closed: { variant: "destructive", label: "Đã đóng" }
        };

        const config = statusConfig[status] || { variant: "outline", label: status };
        return (
            <Badge variant={config.variant}>
                {config.label}
            </Badge>
        );
    };

    // Định nghĩa columns
    const columns = [
        {
            key: "title",
            header: "Tiêu đề",
            render: (recruitment: any) => (
                <div className="space-y-1">
                    <span className="font-medium block">{recruitment.title}</span>
                    <span className="text-sm text-gray-500">{recruitment.position}</span>
                </div>
            )
        },
        {
            key: "department",
            header: "Phòng ban",
            render: (recruitment: any) => (
                <div className="space-y-1">
                    <span className="block">{recruitment.department}</span>
                    <span className="text-sm text-gray-500">{recruitment.location}</span>
                </div>
            )
        },
        {
            key: "quantity",
            header: "Số lượng",
            render: (recruitment: any) => (
                <div className="text-center">
                    <span className="font-medium">{recruitment.quantity}</span>
                </div>
            )
        },
        {
            key: "deadline",
            header: "Hạn nộp",
            render: (recruitment: any) => (
                <div className="space-y-1">
                    <span className="block">{new Date(recruitment.deadline).toLocaleDateString("vi-VN")}</span>
                    <span className="text-sm text-gray-500">
                        {recruitment.salary}
                    </span>
                </div>
            )
        },
        {
            key: "status",
            header: "Trạng thái",
            render: (recruitment: any) => getStatusBadge(recruitment.status)
        },
        {
            key: "statistics",
            header: "Thống kê",
            render: (recruitment: any) => (
                <div className="text-sm">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">
                            👁️ {recruitment.views}
                        </span>
                        <span className="text-gray-600">
                            📄 {recruitment.applications}
                        </span>
                    </div>
                </div>
            )
        },
        {
            key: "actions",
            header: "Thao tác",
            render: (recruitment: any) => (
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateClick(recruitment)}
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
                            <DropdownMenuItem onClick={() => handleStatusChange(recruitment.id, "active")}>
                                Đang tuyển
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(recruitment.id, "draft")}>
                                Bản nháp
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(recruitment.id, "closed")}>
                                Đóng tuyển dụng
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDeleteClick(recruitment.id)}
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
            content: (recruitment: any) => (
                <div className="space-y-6 p-4">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">{recruitment.title}</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    {getStatusBadge(recruitment.status)}
                                    <span className="text-sm text-gray-500">
                                        📍 {recruitment.location}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Vị trí:</span>
                                    <span>{recruitment.position}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Phòng ban:</span>
                                    <span>{recruitment.department}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Số lượng:</span>
                                    <span>{recruitment.quantity} người</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Mức lương:</span>
                                    <span className="font-semibold text-green-600">{recruitment.salary}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Hạn nộp hồ sơ:</span>
                                    <span className="font-semibold">
                                        {new Date(recruitment.deadline).toLocaleDateString("vi-VN")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded">
                                <h4 className="font-semibold mb-2">Thông tin liên hệ</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Người phụ trách:</span>
                                        <span>{recruitment.contactInfo.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Điện thoại:</span>
                                        <span>{recruitment.contactInfo.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Email:</span>
                                        <span className="text-blue-600">{recruitment.contactInfo.email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border rounded">
                                <h4 className="font-semibold mb-2">Thống kê</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{recruitment.views}</div>
                                        <div className="text-sm text-gray-500">Lượt xem</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{recruitment.applications}</div>
                                        <div className="text-sm text-gray-500">Đơn ứng tuyển</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6">
                        <div>
                            <h4 className="font-semibold mb-3">Yêu cầu công việc</h4>
                            <ul className="space-y-2">
                                {recruitment.requirements.map((req: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3">Quyền lợi</h4>
                            <ul className="space-y-2">
                                {recruitment.benefits.map((benefit: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">•</span>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h4 className="font-semibold mb-3">Mô tả công việc</h4>
                        <div className="bg-gray-50 p-4 rounded whitespace-pre-line">
                            {recruitment.description}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-6 border-t">
                        <Button
                            variant="outline"
                            onClick={() => handleUpdateClick(recruitment)}
                            className="flex items-center gap-2"
                        >
                            <RefreshCw size={16} />
                            Cập nhật
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => handleDeleteClick(recruitment.id)}
                        >
                            <Trash2 size={16} className="mr-2" />
                            Xóa
                        </Button>
                    </div>
                </div>
            )
        },
        {
            key: "applications",
            label: "Ứng viên",
            content: (recruitment: any) => (
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Danh sách ứng viên ({recruitment.applications})</h3>
                        <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Xuất danh sách
                        </Button>
                    </div>
                    <div className="text-center py-8 text-gray-500">
                        <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Chưa có dữ liệu ứng viên</p>
                        <p className="text-sm mt-1">Có {recruitment.applications} ứng viên đã nộp hồ sơ</p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <>
            <Card className="w-full h-full border-0 shadow-none rounded-md">
                <CardHeader className="flex flex-row items-center justify-between py-3">
                    {/* <h1 className="text-2xl font-bold">Quản lý tuyển dụng</h1> */}
                    <div></div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handleExportClick}
                            className="flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Xuất Excel
                        </Button>
                        <Button
                            onClick={handleCreateClick}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Đăng tin tuyển dụng
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <ExpandableTable
                        data={recruitments}
                        columns={columns}
                        tabs={tabs}
                        loading={loading}
                        emptyMessage="Chưa có tin tuyển dụng nào"
                        defaultTab="details"
                    />
                </CardContent>

                <CardFooter className="flex justify-end">
                    <Pagination
                        totalItems={recruitments.length}
                        pageSize={10}
                        currentPage={1}
                        onPageChange={(page) => console.log("Page changed:", page)}
                    />
                </CardFooter>
            </Card>

            {isUpdateModalOpen && selectedRecruitment && (
                <UpdateRecruitmentModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setIsUpdateModalOpen(false);
                        setSelectedRecruitment(null);
                    }}
                    recruitment={selectedRecruitment}
                    mode={modalMode}
                />
            )}
        </>
    );
}