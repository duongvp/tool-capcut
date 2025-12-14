// components/UpdateServiceProjectModal.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, DollarSign, Calendar, Users } from "lucide-react";

interface UpdateServiceProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: any;
    mode: "create" | "edit";
}

export function UpdateServiceProjectModal({
    isOpen,
    onClose,
    project,
    mode
}: UpdateServiceProjectModalProps) {
    const [formData, setFormData] = useState(project);
    const [scopeItems, setScopeItems] = useState<string[]>(project.scope || []);
    const [newScopeItem, setNewScopeItem] = useState("");
    const [deliverables, setDeliverables] = useState<string[]>(project.deliverables || []);
    const [newDeliverable, setNewDeliverable] = useState("");

    const handleSubmit = () => {
        // Cập nhật project với scope và deliverables
        const updatedProject = {
            ...formData,
            scope: scopeItems,
            deliverables: deliverables
        };

        console.log(`${mode === "create" ? "Tạo mới" : "Cập nhật"} dự án:`, updatedProject);

        // TODO: Gọi API để lưu dữ liệu
        onClose();
    };

    const addScopeItem = () => {
        if (newScopeItem.trim()) {
            setScopeItems([...scopeItems, newScopeItem.trim()]);
            setNewScopeItem("");
        }
    };

    const removeScopeItem = (index: number) => {
        setScopeItems(scopeItems.filter((_, i) => i !== index));
    };

    const addDeliverable = () => {
        if (newDeliverable.trim()) {
            setDeliverables([...deliverables, newDeliverable.trim()]);
            setNewDeliverable("");
        }
    };

    const removeDeliverable = (index: number) => {
        setDeliverables(deliverables.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create" ? "Tạo dự án dịch vụ mới" : "Chỉnh sửa dự án"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Thông tin cơ bản */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Tên dự án *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Nhập tên dự án"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client">Khách hàng *</Label>
                            <Input
                                id="client"
                                value={formData.client}
                                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                placeholder="Nhập tên khách hàng"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="serviceType">Loại dịch vụ</Label>
                            <Select
                                value={formData.serviceType}
                                onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn loại dịch vụ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Phát triển phần mềm">Phát triển phần mềm</SelectItem>
                                    <SelectItem value="Tư vấn chiến lược">Tư vấn chiến lược</SelectItem>
                                    <SelectItem value="An ninh mạng">An ninh mạng</SelectItem>
                                    <SelectItem value="Thiết kế hệ thống">Thiết kế hệ thống</SelectItem>
                                    <SelectItem value="Đào tạo">Đào tạo</SelectItem>
                                    <SelectItem value="Bảo trì">Bảo trì</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Trạng thái</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn trạng thái" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="planning">Đang lập kế hoạch</SelectItem>
                                    <SelectItem value="in-progress">Đang thực hiện</SelectItem>
                                    <SelectItem value="completed">Đã hoàn thành</SelectItem>
                                    <SelectItem value="on-hold">Tạm dừng</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Độ ưu tiên</Label>
                            <Select
                                value={formData.priority}
                                onValueChange={(value) => setFormData({ ...formData, priority: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn độ ưu tiên" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">Cao</SelectItem>
                                    <SelectItem value="medium">Trung bình</SelectItem>
                                    <SelectItem value="low">Thấp</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Thời gian và ngân sách */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Ngày bắt đầu</Label>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endDate">Ngày kết thúc</Label>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                    <Input
                                        id="endDate"
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="budget">Ngân sách (VND)</Label>
                                <div className="flex items-center">
                                    <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                                    <Input
                                        id="budget"
                                        type="number"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="teamSize">Số lượng thành viên</Label>
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                                    <Input
                                        id="teamSize"
                                        type="number"
                                        min="1"
                                        value={formData.teamSize}
                                        onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) || 1 })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phạm vi dự án */}
                    <div className="space-y-3">
                        <Label>Phạm vi dự án</Label>
                        <div className="flex gap-2">
                            <Input
                                value={newScopeItem}
                                onChange={(e) => setNewScopeItem(e.target.value)}
                                placeholder="Nhập phạm vi công việc"
                                onKeyPress={(e) => e.key === 'Enter' && addScopeItem()}
                            />
                            <Button type="button" onClick={addScopeItem}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {scopeItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span>{item}</span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeScopeItem(index)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sản phẩm bàn giao */}
                    <div className="space-y-3">
                        <Label>Sản phẩm bàn giao</Label>
                        <div className="flex gap-2">
                            <Input
                                value={newDeliverable}
                                onChange={(e) => setNewDeliverable(e.target.value)}
                                placeholder="Nhập sản phẩm cần bàn giao"
                                onKeyPress={(e) => e.key === 'Enter' && addDeliverable()}
                            />
                            <Button type="button" onClick={addDeliverable}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {deliverables.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span>{item}</span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeDeliverable(index)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mô tả */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Mô tả dự án</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Mô tả chi tiết về dự án..."
                            rows={4}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit}>
                        {mode === "create" ? "Tạo dự án" : "Cập nhật"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}