import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, RefreshCw, Pencil, Trash2, Download, Users, Calendar, DollarSign, Target } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { ExpandableTable } from "@/components/expandable-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UpdateServiceProjectModal } from "./UpdateServiceProjectModal/page";

const fakeServiceProjects = [
    {
        id: 1,
        name: "Xây dựng hệ thống quản lý khách hàng",
        client: "Công ty TNHH ABC",
        serviceType: "Phát triển phần mềm",
        status: "in-progress",
        startDate: "2025-09-01",
        endDate: "2025-12-31",
        budget: 500000000,
        revenue: 320000000,
        teamSize: 8,
        progress: 75,
        priority: "high",
        projectManager: "Nguyễn Văn A",
        department: "Công nghệ thông tin",
        location: "Hà Nội",
        description: "Phát triển hệ thống CRM cho quản lý khách hàng với các tính năng tự động hóa.",
        scope: [
            "Phân tích yêu cầu khách hàng",
            "Thiết kế hệ thống",
            "Phát triển backend và frontend",
            "Kiểm thử và triển khai"
        ],
        deliverables: [
            "Tài liệu phân tích yêu cầu",
            "Mã nguồn hệ thống",
            "Tài liệu hướng dẫn sử dụng",
            "Báo cáo kiểm thử"
        ],
        milestones: [
            { date: "2025-09-30", name: "Hoàn thành phân tích", status: "completed" },
            { date: "2025-10-31", name: "Hoàn thành thiết kế", status: "completed" },
            { date: "2025-11-30", name: "Hoàn thành phát triển", status: "in-progress" },
            { date: "2025-12-31", name: "Bàn giao hệ thống", status: "pending" }
        ],
        teamMembers: [
            { name: "Trần Văn B", role: "Backend Developer" },
            { name: "Lê Thị C", role: "Frontend Developer" },
            { name: "Phạm Văn D", role: "QA Tester" }
        ],
        risks: [
            "Thay đổi yêu cầu từ khách hàng",
            "Chậm tiến độ do phụ thuộc bên thứ ba"
        ],
        createdAt: "2025-08-15",
        updatedAt: "2025-11-20",
        clientSatisfaction: 4.5,
        documents: 12,
        meetings: 24
    },
    {
        id: 2,
        name: "Tư vấn chuyển đổi số doanh nghiệp",
        client: "Tập đoàn XYZ",
        serviceType: "Tư vấn chiến lược",
        status: "completed",
        startDate: "2025-06-01",
        endDate: "2025-10-31",
        budget: 300000000,
        revenue: 300000000,
        teamSize: 5,
        progress: 100,
        priority: "medium",
        projectManager: "Trần Thị B",
        department: "Tư vấn",
        location: "TP.HCM",
        description: "Tư vấn và triển khai chiến lược chuyển đổi số toàn diện cho doanh nghiệp.",
        scope: [
            "Đánh giá hiện trạng",
            "Xây dựng lộ trình chuyển đổi",
            "Đào tạo nhân sự",
            "Giám sát triển khai"
        ],
        deliverables: [
            "Báo cáo đánh giá hiện trạng",
            "Lộ trình chuyển đổi số",
            "Tài liệu đào tạo",
            "Báo cáo hoàn thành"
        ],
        milestones: [
            { date: "2025-07-15", name: "Báo cáo đánh giá", status: "completed" },
            { date: "2025-08-30", name: "Phê duyệt lộ trình", status: "completed" },
            { date: "2025-09-30", name: "Hoàn thành đào tạo", status: "completed" },
            { date: "2025-10-31", name: "Bàn giao dự án", status: "completed" }
        ],
        teamMembers: [
            { name: "Nguyễn Văn E", role: "Chuyên gia tư vấn" },
            { name: "Lê Văn F", role: "Chuyên viên đào tạo" }
        ],
        risks: [],
        createdAt: "2025-05-10",
        updatedAt: "2025-11-01",
        clientSatisfaction: 4.8,
        documents: 8,
        meetings: 18
    },
    {
        id: 3,
        name: "Triển khai hệ thống bảo mật thông tin",
        client: "Ngân hàng DEF",
        serviceType: "An ninh mạng",
        status: "planning",
        startDate: "2026-01-15",
        endDate: "2026-06-30",
        budget: 750000000,
        revenue: 0,
        teamSize: 12,
        progress: 20,
        priority: "high",
        projectManager: "Phạm Văn C",
        department: "An ninh mạng",
        location: "Đà Nẵng",
        description: "Triển khai hệ thống bảo mật toàn diện cho ngân hàng với các giải pháp tiên tiến.",
        scope: [
            "Đánh giá rủi ro bảo mật",
            "Lựa chọn giải pháp",
            "Triển khai hệ thống",
            "Đào tạo và chuyển giao"
        ],
        deliverables: [
            "Báo cáo đánh giá rủi ro",
            "Giải pháp bảo mật được phê duyệt",
            "Hệ thống bảo mật vận hành",
            "Tài liệu chuyển giao"
        ],
        milestones: [
            { date: "2026-02-28", name: "Hoàn thành đánh giá", status: "in-progress" },
            { date: "2026-03-31", name: "Phê duyệt giải pháp", status: "pending" },
            { date: "2026-05-31", name: "Triển khai hệ thống", status: "pending" },
            { date: "2026-06-30", name: "Hoàn thành dự án", status: "pending" }
        ],
        teamMembers: [
            { name: "Hoàng Thị G", role: "Chuyên gia bảo mật" },
            { name: "Vũ Văn H", role: "Kỹ sư hệ thống" }
        ],
        risks: [
            "Tuân thủ quy định ngân hàng",
            "Độ phức tạp cao của hệ thống"
        ],
        createdAt: "2025-11-01",
        updatedAt: "2025-11-15",
        clientSatisfaction: null,
        documents: 5,
        meetings: 8
    }
];

export default function ServiceProjectList() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");

    useEffect(() => {
        setTimeout(() => {
            setProjects(fakeServiceProjects);
            setLoading(false);
        }, 500);
    }, []);

    const handleCreateClick = () => {
        setSelectedProject({
            name: "",
            client: "",
            serviceType: "",
            status: "planning",
            startDate: "",
            endDate: "",
            budget: 0,
            revenue: 0,
            teamSize: 1,
            progress: 0,
            priority: "medium",
            projectManager: "",
            department: "",
            location: "",
            description: "",
            scope: [],
            deliverables: [],
            milestones: [],
            teamMembers: [],
            risks: []
        });
        setModalMode("create");
        setIsUpdateModalOpen(true);
    };

    const handleUpdateClick = (project: any) => {
        setSelectedProject(project);
        setModalMode("edit");
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
            setProjects(projects.filter(item => item.id !== id));
        }
    };

    const handleStatusChange = (id: number, newStatus: string) => {
        setProjects(projects.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        ));
    };

    const handleExportClick = () => {
        console.log("Exporting project data...");
        // Logic export data ở đây
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string, color: string }> = {
            "planning": { variant: "secondary", label: "Đang lập kế hoạch", color: "bg-gray-100 text-gray-800" },
            "in-progress": { variant: "default", label: "Đang thực hiện", color: "bg-blue-100 text-blue-800" },
            "completed": { variant: "outline", label: "Đã hoàn thành", color: "bg-green-100 text-green-800" },
            "on-hold": { variant: "destructive", label: "Tạm dừng", color: "bg-yellow-100 text-yellow-800" },
            "cancelled": { variant: "destructive", label: "Đã hủy", color: "bg-red-100 text-red-800" }
        };

        const config = statusConfig[status] || { variant: "outline", label: status, color: "" };
        return (
            <Badge variant={config.variant} className={config.color}>
                {config.label}
            </Badge>
        );
    };

    const getPriorityBadge = (priority: string) => {
        const priorityConfig = {
            high: { color: "bg-red-100 text-red-800", label: "Cao" },
            medium: { color: "bg-yellow-100 text-yellow-800", label: "Trung bình" },
            low: { color: "bg-green-100 text-green-800", label: "Thấp" }
        };
        const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
        return <Badge className={config.color}>{config.label}</Badge>;
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Định nghĩa columns
    const columns = [
        {
            key: "name",
            header: "Tên dự án",
            render: (project: any) => (
                <div className="space-y-1">
                    <span className="font-medium block">{project.name}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{project.client}</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded">{project.serviceType}</span>
                    </div>
                </div>
            )
        },
        {
            key: "team",
            header: "Nhóm dự án",
            render: (project: any) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{project.teamSize} thành viên</span>
                    </div>
                    <span className="text-sm text-gray-500">{project.projectManager}</span>
                </div>
            )
        },
        {
            key: "timeline",
            header: "Thời gian",
            render: (project: any) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{new Date(project.startDate).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                        → {new Date(project.endDate).toLocaleDateString("vi-VN")}
                    </span>
                </div>
            )
        },
        {
            key: "budget",
            header: "Ngân sách",
            render: (project: any) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{formatCurrency(project.budget)}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-green-600">Đã thu: {formatCurrency(project.revenue)}</span>
                    </div>
                </div>
            )
        },
        {
            key: "progress",
            header: "Tiến độ",
            render: (project: any) => (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">{project.progress}%</span>
                        {getPriorityBadge(project.priority)}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                        ></div>
                    </div>
                    {getStatusBadge(project.status)}
                </div>
            )
        },
        {
            key: "actions",
            header: "Thao tác",
            render: (project: any) => (
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateClick(project)}
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
                            <DropdownMenuItem onClick={() => handleStatusChange(project.id, "in-progress")}>
                                Bắt đầu dự án
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(project.id, "on-hold")}>
                                Tạm dừng
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(project.id, "completed")}>
                                Hoàn thành
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDeleteClick(project.id)}
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
            key: "overview",
            label: "Tổng quan",
            content: (project: any) => (
                <div className="space-y-6 p-4">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    {getStatusBadge(project.status)}
                                    <span className="text-sm text-gray-500">
                                        🏢 {project.department}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Khách hàng:</span>
                                    <span className="font-semibold">{project.client}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Loại dịch vụ:</span>
                                    <span>{project.serviceType}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Quản lý dự án:</span>
                                    <span>{project.projectManager}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Địa điểm:</span>
                                    <span>{project.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded">
                                <h4 className="font-semibold mb-2">Thông tin tài chính</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Ngân sách:</span>
                                        <span className="font-bold text-blue-700">{formatCurrency(project.budget)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Doanh thu:</span>
                                        <span className="font-bold text-green-600">{formatCurrency(project.revenue)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Chênh lệch:</span>
                                        <span className={`font-bold ${project.budget - project.revenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {formatCurrency(project.budget - project.revenue)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border rounded">
                                <h4 className="font-semibold mb-2">Thống kê</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">{project.documents}</div>
                                        <div className="text-sm text-gray-500">Tài liệu</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">{project.meetings}</div>
                                        <div className="text-sm text-gray-500">Cuộc họp</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {project.clientSatisfaction ? project.clientSatisfaction + '/5' : 'N/A'}
                                        </div>
                                        <div className="text-sm text-gray-500">Đánh giá KH</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6">
                        <div>
                            <h4 className="font-semibold mb-3">Phạm vi dự án</h4>
                            <ul className="space-y-2">
                                {project.scope.map((item: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3">Sản phẩm bàn giao</h4>
                            <ul className="space-y-2">
                                {project.deliverables.map((item: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h4 className="font-semibold mb-3">Mốc quan trọng</h4>
                        <div className="space-y-3">
                            {project.milestones.map((milestone: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                    <div className="flex items-center gap-3">
                                        <Target className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <span className="font-medium">{milestone.name}</span>
                                            <div className="text-sm text-gray-500">
                                                {new Date(milestone.date).toLocaleDateString("vi-VN")}
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant={milestone.status === 'completed' ? 'default' : 'outline'}>
                                        {milestone.status === 'completed' ? 'Đã hoàn thành' :
                                            milestone.status === 'in-progress' ? 'Đang thực hiện' : 'Chờ xử lý'}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-6 border-t">
                        <Button
                            variant="outline"
                            onClick={() => handleUpdateClick(project)}
                            className="flex items-center gap-2"
                        >
                            <RefreshCw size={16} />
                            Cập nhật
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => handleDeleteClick(project.id)}
                        >
                            <Trash2 size={16} className="mr-2" />
                            Xóa dự án
                        </Button>
                    </div>
                </div>
            )
        },
        {
            key: "team",
            label: "Nhóm dự án",
            content: (project: any) => (
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Thành viên dự án ({project.teamSize} người)</h3>
                        <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm thành viên
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {project.teamMembers.map((member: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <span className="font-medium">{member.name}</span>
                                        <div className="text-sm text-gray-500">{member.role}</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                    <Pencil className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {project.teamMembers.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>Chưa có thành viên nào trong dự án</p>
                            <Button variant="outline" className="mt-4">
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm thành viên đầu tiên
                            </Button>
                        </div>
                    )}
                </div>
            )
        },
        {
            key: "risks",
            label: "Rủi ro & Vấn đề",
            content: (project: any) => (
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Danh sách rủi ro ({project.risks.length})</h3>
                        <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm rủi ro
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {project.risks.map((risk: string, index: number) => (
                            <div key={index} className="flex items-start gap-3 p-3 border border-yellow-200 bg-yellow-50 rounded">
                                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                                    <span className="text-yellow-800 font-bold">!</span>
                                </div>
                                <div className="flex-1">
                                    <span className="font-medium">Rủi ro #{index + 1}</span>
                                    <p className="text-sm mt-1">{risk}</p>
                                </div>
                                <Badge variant="outline" className="bg-white">Cần theo dõi</Badge>
                            </div>
                        ))}
                    </div>

                    {project.risks.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>Không có rủi ro nào được ghi nhận</p>
                            <p className="text-sm mt-1">Đây là dấu hiệu tích cực!</p>
                        </div>
                    )}
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
                            Tạo dự án mới
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <ExpandableTable
                        data={projects}
                        columns={columns}
                        tabs={tabs}
                        loading={loading}
                        emptyMessage="Chưa có dự án dịch vụ nào"
                        defaultTab="overview"
                    />
                </CardContent>

                <CardFooter className="flex justify-end">
                    <Pagination
                        totalItems={projects.length}
                        pageSize={10}
                        currentPage={1}
                        onPageChange={(page) => console.log("Page changed:", page)}
                    />
                </CardFooter>
            </Card>

            {isUpdateModalOpen && selectedProject && (
                <UpdateServiceProjectModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setIsUpdateModalOpen(false);
                        setSelectedProject(null);
                    }}
                    project={selectedProject}
                    mode={modalMode}
                />
            )}
        </>
    );
}