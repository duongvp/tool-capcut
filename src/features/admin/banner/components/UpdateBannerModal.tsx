// components/UpdateBannerModal.tsx
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, Image as ImageIcon, Palette, Link as LinkIcon } from "lucide-react";

interface UpdateBannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    banner: any;
    mode: "create" | "edit";
}

export function UpdateBannerModal({
    isOpen,
    onClose,
    banner,
    mode
}: UpdateBannerModalProps) {
    const [formData, setFormData] = useState(banner);
    const [tags, setTags] = useState<string[]>(banner.tags || []);
    const [newTag, setNewTag] = useState("");
    const [selectedDevices, setSelectedDevices] = useState<string[]>(banner.devices || ["desktop"]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(banner.categories || []);

    const deviceOptions = [
        { value: "desktop", label: "Máy tính" },
        { value: "mobile", label: "Điện thoại" },
        { value: "tablet", label: "Máy tính bảng" }
    ];

    const categoryOptions = [
        { value: "promotion", label: "Khuyến mãi" },
        { value: "recruitment", label: "Tuyển dụng" },
        { value: "event", label: "Sự kiện" },
        { value: "service", label: "Dịch vụ" },
        { value: "partnership", label: "Đối tác" },
        { value: "homepage", label: "Trang chủ" },
        { value: "technology", label: "Công nghệ" }
    ];

    const typeOptions = [
        { value: "main", label: "Banner chính" },
        { value: "sidebar", label: "Sidebar" },
        { value: "popup", label: "Popup" },
        { value: "notification", label: "Thông báo" }
    ];

    const positionOptions = [
        { value: "homepage-top", label: "Trang chủ - Top" },
        { value: "homepage-popup", label: "Trang chủ - Popup" },
        { value: "career-sidebar", label: "Tuyển dụng - Sidebar" },
        { value: "global-notification", label: "Toàn site - Thông báo" },
        { value: "partners-page", label: "Trang đối tác" },
        { value: "services-top", label: "Dịch vụ - Top" }
    ];

    const statusOptions = [
        { value: "draft", label: "Bản nháp" },
        { value: "active", label: "Đang hoạt động" },
        { value: "inactive", label: "Không hoạt động" },
        { value: "scheduled", label: "Đã lên lịch" }
    ];

    useEffect(() => {
        setFormData(banner);
        setTags(banner.tags || []);
        setSelectedDevices(banner.devices || ["desktop"]);
        setSelectedCategories(banner.categories || []);
    }, [banner]);

    const handleSubmit = () => {
        // Cập nhật banner với tags, devices, categories
        const updatedBanner = {
            ...formData,
            tags,
            devices: selectedDevices,
            categories: selectedCategories
        };

        console.log(`${mode === "create" ? "Tạo mới" : "Cập nhật"} banner:`, updatedBanner);

        // TODO: Gọi API để lưu dữ liệu
        onClose();
    };

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const toggleDevice = (device: string) => {
        setSelectedDevices(prev =>
            prev.includes(device)
                ? prev.filter(d => d !== device)
                : [...prev, device]
        );
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create" ? "Tạo banner mới" : "Chỉnh sửa banner"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Preview */}
                    <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Xem trước</h4>
                        <div
                            className="h-40 rounded relative"
                            style={{ backgroundColor: formData.backgroundColor || "#3B82F6" }}
                        >
                            {formData.imageUrl ? (
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <ImageIcon className="w-12 h-12 text-white opacity-50" />
                                </div>
                            )}
                            <div
                                className="absolute inset-0 p-4 flex flex-col justify-center"
                                style={{ color: formData.textColor || "#FFFFFF" }}
                            >
                                <h3 className="text-lg font-bold mb-1">{formData.title || "Tiêu đề banner"}</h3>
                                <p className="text-sm mb-3">{formData.description || "Mô tả banner"}</p>
                                <div
                                    className={`px-4 py-2 rounded text-sm w-fit`}
                                    style={{
                                        backgroundColor: formData.buttonColor || "#FFFFFF",
                                        color: formData.buttonTextColor || "#3B82F6"
                                    }}
                                >
                                    {formData.linkText || "Xem thêm"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            {/* Thông tin cơ bản */}
                            <div className="space-y-4">
                                <h4 className="font-semibold">Thông tin cơ bản</h4>

                                <div className="space-y-2">
                                    <Label htmlFor="title">Tiêu đề *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Nhập tiêu đề banner"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Mô tả</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Nhập mô tả banner"
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Loại banner</Label>
                                        <Select
                                            value={formData.type}
                                            onValueChange={(value) => setFormData({ ...formData, type: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn loại banner" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {typeOptions.map(option => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="position">Vị trí</Label>
                                        <Select
                                            value={formData.position}
                                            onValueChange={(value) => setFormData({ ...formData, position: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn vị trí" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {positionOptions.map(option => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="order">Thứ tự hiển thị</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            min="1"
                                            value={formData.order}
                                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                                        />
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
                                                {statusOptions.map(option => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Link */}
                            <div className="space-y-4">
                                <h4 className="font-semibold">Liên kết</h4>

                                <div className="space-y-2">
                                    <Label htmlFor="linkUrl">URL liên kết</Label>
                                    <div className="flex items-center">
                                        <LinkIcon className="w-4 h-4 mr-2 text-gray-500" />
                                        <Input
                                            id="linkUrl"
                                            value={formData.linkUrl}
                                            onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="linkText">Văn bản nút</Label>
                                        <Input
                                            id="linkText"
                                            value={formData.linkText}
                                            onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                                            placeholder="Xem chi tiết"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="target">Cách mở</Label>
                                        <Select
                                            value={formData.target}
                                            onValueChange={(value) => setFormData({ ...formData, target: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn cách mở" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="_self">Mở trong tab hiện tại</SelectItem>
                                                <SelectItem value="_blank">Mở tab mới</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Hình ảnh */}
                            <div className="space-y-4">
                                <h4 className="font-semibold">Hình ảnh</h4>

                                <div className="space-y-2">
                                    <Label htmlFor="imageUrl">URL hình ảnh chính</Label>
                                    <div className="flex items-center">
                                        <ImageIcon className="w-4 h-4 mr-2 text-gray-500" />
                                        <Input
                                            id="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Kích thước đề xuất: 800x400px</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="thumbnailUrl">URL thumbnail</Label>
                                    <Input
                                        id="thumbnailUrl"
                                        value={formData.thumbnailUrl}
                                        onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                                        placeholder="https://..."
                                    />
                                    <p className="text-xs text-gray-500">Kích thước đề xuất: 200x100px</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Màu sắc */}
                            <div className="space-y-4">
                                <h4 className="font-semibold">Màu sắc</h4>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="backgroundColor">Màu nền</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="backgroundColor"
                                                value={formData.backgroundColor}
                                                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                                                placeholder="#3B82F6"
                                            />
                                            <input
                                                type="color"
                                                value={formData.backgroundColor || "#3B82F6"}
                                                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                                                className="w-10 h-10 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="textColor">Màu chữ</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="textColor"
                                                value={formData.textColor}
                                                onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                                                placeholder="#FFFFFF"
                                            />
                                            <input
                                                type="color"
                                                value={formData.textColor || "#FFFFFF"}
                                                onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                                                className="w-10 h-10 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="buttonColor">Màu nút</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="buttonColor"
                                                value={formData.buttonColor}
                                                onChange={(e) => setFormData({ ...formData, buttonColor: e.target.value })}
                                                placeholder="#FFFFFF"
                                            />
                                            <input
                                                type="color"
                                                value={formData.buttonColor || "#FFFFFF"}
                                                onChange={(e) => setFormData({ ...formData, buttonColor: e.target.value })}
                                                className="w-10 h-10 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="buttonTextColor">Màu chữ nút</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="buttonTextColor"
                                                value={formData.buttonTextColor}
                                                onChange={(e) => setFormData({ ...formData, buttonTextColor: e.target.value })}
                                                placeholder="#3B82F6"
                                            />
                                            <input
                                                type="color"
                                                value={formData.buttonTextColor || "#3B82F6"}
                                                onChange={(e) => setFormData({ ...formData, buttonTextColor: e.target.value })}
                                                className="w-10 h-10 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="space-y-3">
                                <Label>Thẻ phân loại</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        placeholder="Nhập thẻ..."
                                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                                    />
                                    <Button type="button" onClick={addTag}>
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                                {/* <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 hover:text-red-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div> */}
                            </div>

                            {/* Thiết bị */}
                            <div className="space-y-3">
                                <Label>Thiết bị hiển thị</Label>
                                <div className="space-y-2">
                                    {deviceOptions.map(device => (
                                        <div key={device.value} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`device-${device.value}`}
                                                checked={selectedDevices.includes(device.value)}
                                                onCheckedChange={() => toggleDevice(device.value)}
                                            />
                                            <Label
                                                htmlFor={`device-${device.value}`}
                                                className="text-sm font-normal"
                                            >
                                                {device.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Danh mục */}
                            <div className="space-y-3">
                                <Label>Danh mục</Label>
                                <div className="space-y-2">
                                    {categoryOptions.map(category => (
                                        <div key={category.value} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`category-${category.value}`}
                                                checked={selectedCategories.includes(category.value)}
                                                onCheckedChange={() => toggleCategory(category.value)}
                                            />
                                            <Label
                                                htmlFor={`category-${category.value}`}
                                                className="text-sm font-normal"
                                            >
                                                {category.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Thời gian */}
                            <div className="space-y-4">
                                <h4 className="font-semibold">Thời gian hoạt động</h4>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="startDate">Ngày bắt đầu</Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="endDate">Ngày kết thúc</Label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit}>
                        {mode === "create" ? "Tạo banner" : "Cập nhật"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}