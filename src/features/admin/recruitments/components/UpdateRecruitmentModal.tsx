import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Calendar, DollarSign, Users, MapPin, Building } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface UpdateRecruitmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    recruitment: {
        id?: number;
        title: string;
        position: string;
        department: string;
        location: string;
        quantity: number;
        status: string;
        salary: string;
        deadline: string;
        description: string;
        requirements: string[];
        benefits: string[];
        contactInfo: {
            name: string;
            phone: string;
            email: string;
        };
    };
    mode: "create" | "edit";
}

export function UpdateRecruitmentModal({ isOpen, onClose, recruitment, mode }: UpdateRecruitmentModalProps) {
    const [requirements, setRequirements] = useState<string[]>(recruitment.requirements || []);
    const [newRequirement, setNewRequirement] = useState("");
    const [benefits, setBenefits] = useState<string[]>(recruitment.benefits || []);
    const [newBenefit, setNewBenefit] = useState("");

    const schema = z.object({
        title: z.string().min(1, "Tiêu đề là bắt buộc").min(5, "Tiêu đề phải có ít nhất 5 ký tự"),
        position: z.string().min(1, "Vị trí là bắt buộc"),
        department: z.string().min(1, "Phòng ban là bắt buộc"),
        location: z.string().min(1, "Địa điểm là bắt buộc"),
        quantity: z.number().min(1, "Số lượng phải ít nhất là 1"),
        status: z.string().min(1, "Trạng thái là bắt buộc"),
        salary: z.string().min(1, "Mức lương là bắt buộc"),
        deadline: z.string().min(1, "Hạn nộp hồ sơ là bắt buộc"),
        description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
        contactName: z.string().min(1, "Tên người liên hệ là bắt buộc"),
        contactPhone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
        contactEmail: z.string().email("Email không hợp lệ"),

        requirements: z.array(z.string()).optional(),
        benefits: z.array(z.string()).optional(),
    });

    type FormData = z.infer<typeof schema>;

    const defaultValues: FormData = {
        title: recruitment.title || "",
        position: recruitment.position || "",
        department: recruitment.department || "",
        location: recruitment.location || "",
        quantity: recruitment.quantity || 1,
        status: recruitment.status || "draft",
        salary: recruitment.salary || "",
        deadline: recruitment.deadline || "",
        description: recruitment.description || "",
        requirements: recruitment.requirements || [],
        benefits: recruitment.benefits || [],
        contactName: recruitment.contactInfo?.name || "",
        contactPhone: recruitment.contactInfo?.phone || "",
        contactEmail: recruitment.contactInfo?.email || "",
    };

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: "onChange",
    });

    useEffect(() => {
        if (isOpen) {
            form.reset(defaultValues);
            setRequirements(recruitment.requirements || []);
            setBenefits(recruitment.benefits || []);
        }
    }, [isOpen, recruitment, form]);

    const addRequirement = () => {
        if (newRequirement.trim()) {
            const updatedRequirements = [...requirements, newRequirement.trim()];
            setRequirements(updatedRequirements);
            form.setValue("requirements", updatedRequirements);
            setNewRequirement("");
        }
    };

    const removeRequirement = (index: number) => {
        const updatedRequirements = requirements.filter((_, i) => i !== index);
        setRequirements(updatedRequirements);
        form.setValue("requirements", updatedRequirements);
    };

    const addBenefit = () => {
        if (newBenefit.trim()) {
            const updatedBenefits = [...benefits, newBenefit.trim()];
            setBenefits(updatedBenefits);
            form.setValue("benefits", updatedBenefits);
            setNewBenefit("");
        }
    };

    const removeBenefit = (index: number) => {
        const updatedBenefits = benefits.filter((_, i) => i !== index);
        setBenefits(updatedBenefits);
        form.setValue("benefits", updatedBenefits);
    };

    const onSubmit = (data: FormData) => {
        const submitData = {
            ...data,
            id: recruitment.id,
            requirements,
            benefits,
            contactInfo: {
                name: data.contactName,
                phone: data.contactPhone,
                email: data.contactEmail,
            },
        };

        console.log("Recruitment data:", submitData);

        if (mode === "create") {
            console.log("Creating new recruitment...");
        } else {
            console.log("Updating recruitment...");
        }

        onClose();
    };

    const handleClose = () => {
        form.reset();
        setRequirements([]);
        setBenefits([]);
        onClose();
    };

    const renderFormField = (
        name: keyof FormData,
        label: string,
        type: string = "text",
        placeholder: string,
        icon?: React.ReactNode
    ) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                const error = form.formState.errors[name];
                const fieldId = `field-${name}`;

                return (
                    <div className="grid grid-cols-3 gap-x-4 gap-y-1 items-center">
                        <div className="flex items-center gap-2">
                            {icon}
                            <FormLabel htmlFor={fieldId} className="text-sm cursor-pointer">
                                {label}:
                            </FormLabel>
                        </div>
                        <div className="col-span-2">
                            <FormControl>
                                {name === "description" ? (
                                    <Textarea
                                        id={fieldId}
                                        placeholder={placeholder}
                                        className={`min-h-[100px] ${error ? "border-red-500" : ""}`}
                                        {...field}
                                        value={field.value as string}
                                    />
                                ) : (
                                    <Input
                                        id={fieldId}
                                        type={type}
                                        placeholder={placeholder}
                                        className={`${error ? "border-red-500" : ""}`}
                                        {...field}
                                        value={field.value as string | number}
                                    />
                                )}
                            </FormControl>
                        </div>
                        <div className="col-span-1" />
                        <div className="col-span-2">
                            <FormMessage />
                        </div>
                    </div>
                );
            }}
        />
    );

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

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        {mode === "create" ? "Đăng tin tuyển dụng" : "Chỉnh sửa tin tuyển dụng"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
                        <div className="grid grid-cols-2 gap-6">
                            {/* LEFT COLUMN */}
                            <div className="space-y-4">
                                {renderFormField("title", "Tiêu đề", "text", "Nhập tiêu đề tuyển dụng")}
                                {renderFormField("position", "Vị trí", "text", "Ví dụ: Nhân viên Kinh doanh", <Users className="w-4 h-4" />)}
                                {renderFormField("department", "Phòng ban", "text", "Ví dụ: Kinh doanh", <Building className="w-4 h-4" />)}
                                {renderFormField("location", "Địa điểm", "text", "Ví dụ: Hà Nội", <MapPin className="w-4 h-4" />)}

                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => {
                                        const error = form.formState.errors.quantity;
                                        const fieldId = "field-quantity";

                                        return (
                                            <div className="grid grid-cols-3 gap-x-4 gap-y-1 items-center">
                                                <FormLabel htmlFor={fieldId} className="text-sm cursor-pointer">
                                                    Số lượng:
                                                </FormLabel>
                                                <div className="col-span-2">
                                                    <FormControl>
                                                        <Input
                                                            id={fieldId}
                                                            type="number"
                                                            min="1"
                                                            placeholder="Nhập số lượng cần tuyển"
                                                            className={`${error ? "border-red-500" : ""}`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div className="col-span-1" />
                                                <div className="col-span-2">
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        );
                                    }}
                                />

                                <FormField
                                    control={form.control}
                                    name="salary"
                                    render={({ field }) => {
                                        const error = form.formState.errors.salary;
                                        const fieldId = "field-salary";

                                        return (
                                            <div className="grid grid-cols-3 gap-x-4 gap-y-1 items-center">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="w-4 h-4" />
                                                    <FormLabel htmlFor={fieldId} className="text-sm cursor-pointer">
                                                        Mức lương:
                                                    </FormLabel>
                                                </div>
                                                <div className="col-span-2">
                                                    <FormControl>
                                                        <Input
                                                            id={fieldId}
                                                            placeholder="Ví dụ: 15-20 triệu"
                                                            className={`${error ? "border-red-500" : ""}`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div className="col-span-1" />
                                                <div className="col-span-2">
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        );
                                    }}
                                />
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="deadline"
                                    render={({ field }) => {
                                        const error = form.formState.errors.deadline;
                                        const fieldId = "field-deadline";

                                        return (
                                            <div className="grid grid-cols-3 gap-x-4 gap-y-1 items-center">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <FormLabel htmlFor={fieldId} className="text-sm cursor-pointer">
                                                        Hạn nộp hồ sơ:
                                                    </FormLabel>
                                                </div>
                                                <div className="col-span-2">
                                                    <FormControl>
                                                        <Input
                                                            id={fieldId}
                                                            type="date"
                                                            className={`${error ? "border-red-500" : ""}`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div className="col-span-1" />
                                                <div className="col-span-2">
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        );
                                    }}
                                />

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => {
                                        const error = form.formState.errors.status;
                                        const fieldId = "field-status";

                                        return (
                                            <div className="grid grid-cols-3 gap-x-4 gap-y-1 items-center">
                                                <FormLabel htmlFor={fieldId} className="text-sm cursor-pointer">
                                                    Trạng thái:
                                                </FormLabel>
                                                <div className="col-span-2">
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className={`${error ? "border-red-500" : ""}`}>
                                                                <SelectValue placeholder="Chọn trạng thái" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="draft">Bản nháp</SelectItem>
                                                            <SelectItem value="pending">Chờ duyệt</SelectItem>
                                                            <SelectItem value="active">Đang tuyển</SelectItem>
                                                            <SelectItem value="closed">Đã đóng</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="col-span-1" />
                                                <div className="col-span-2">
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        );
                                    }}
                                />

                                {renderFormField("contactName", "Người liên hệ", "text", "Nhập tên người liên hệ")}
                                {renderFormField("contactPhone", "Số điện thoại", "tel", "Nhập số điện thoại liên hệ")}
                                {renderFormField("contactEmail", "Email liên hệ", "email", "Nhập email liên hệ")}
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="pt-2">
                            {renderFormField("description", "Mô tả công việc", "text", "Mô tả chi tiết công việc, trách nhiệm...")}
                        </div>

                        {/* REQUIREMENTS */}
                        <div className="space-y-3 pt-2">
                            <Label className="text-sm font-medium">Yêu cầu công việc:</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={newRequirement}
                                    onChange={(e) => setNewRequirement(e.target.value)}
                                    placeholder="Nhập yêu cầu công việc"
                                    className="flex-1"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addRequirement();
                                        }
                                    }}
                                />
                                <Button type="button" onClick={addRequirement} variant="outline">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {requirements.map((req, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <div className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>{req}</span>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeRequirement(index)}
                                            className="h-8 w-8 p-0"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}
                                {requirements.length === 0 && (
                                    <div className="text-center py-4 text-gray-500 text-sm">
                                        Chưa có yêu cầu nào. Hãy thêm yêu cầu công việc.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* BENEFITS */}
                        <div className="space-y-3 pt-2">
                            <Label className="text-sm font-medium">Quyền lợi:</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={newBenefit}
                                    onChange={(e) => setNewBenefit(e.target.value)}
                                    placeholder="Nhập quyền lợi cho ứng viên"
                                    className="flex-1"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addBenefit();
                                        }
                                    }}
                                />
                                <Button type="button" onClick={addBenefit} variant="outline">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">•</span>
                                            <span>{benefit}</span>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeBenefit(index)}
                                            className="h-8 w-8 p-0"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}
                                {benefits.length === 0 && (
                                    <div className="text-center py-4 text-gray-500 text-sm">
                                        Chưa có quyền lợi nào. Hãy thêm quyền lợi cho ứng viên.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CURRENT STATUS */}
                        <div className="pt-4 border-t">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Trạng thái hiện tại:</span>
                                    {getStatusBadge(form.watch("status"))}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {mode === "create" ? "Tin tuyển dụng mới" : `ID: ${recruitment.id || "N/A"}`}
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="flex gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Hủy
                            </Button>
                            <Button type="submit">
                                {mode === "create" ? "Đăng tin" : "Cập nhật"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}