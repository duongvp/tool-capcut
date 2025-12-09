import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";

interface UpdateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        username: string;
        fullName: string;
        email: string;
        phone: string;
        branch: string;
        role: string;
        isCurrentUser: boolean;
    };
    mode: "create" | "edit";
}

type FormData = {
    username: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    phone?: string;
    fullName?: string;
};

export function UpdateUserModal({ isOpen, onClose, user, mode }: UpdateUserModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const schema = z
        .object({
            username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
            password: z.string().optional(),
            confirmPassword: z.string().optional(),
            email: z.string().email("Email không hợp lệ").optional(),
            phone: z.string().optional(),
            fullName: z.string().optional(),
        })
        .refine(
            (data) => mode === "create" ? data.password && data.password.length > 0 : true,
            { message: "Mật khẩu là bắt buộc", path: ["password"] }
        )
        .refine(
            (data) => mode === "create" ? data.confirmPassword && data.confirmPassword.length > 0 : true,
            { message: "Vui lòng nhập lại mật khẩu", path: ["confirmPassword"] }
        )
        .refine(
            (data) => {
                if (mode === "create") return data.password === data.confirmPassword;
                if (data.password || data.confirmPassword) return data.password === data.confirmPassword;
                return true;
            },
            { message: "Mật khẩu không khớp", path: ["confirmPassword"] }
        );

    const defaultValues = {
        username: mode === "edit" ? user.username : "",
        password: "",
        confirmPassword: "",
        email: mode === "edit" ? user.email : "",
        phone: mode === "edit" ? user.phone : "",
        fullName: mode === "edit" ? user.fullName : "",
    };

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: "onChange",
    });

    useEffect(() => {
        if (isOpen) form.reset(defaultValues);
    }, [isOpen, mode, user, form]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const submitData = mode === "edit" && !data.password
            ? (({ password, confirmPassword, ...rest }) => rest)(data)
            : data;

        console.log(mode === "edit" && !data.password
            ? "Updated data (edit without password):"
            : "Updated data:",
            submitData
        );

        onClose();
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const renderFormField = (
        name: keyof FormData,
        label: string,
        type: string = "text",
        placeholder: string,
        showPasswordToggle: boolean = false
    ) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                const error = form.formState.errors[name];
                const showToggle = showPasswordToggle && (name === "password" || name === "confirmPassword");
                const showEye = name === "password" ? showPassword : showConfirmPassword;
                const fieldId = `field-${name}`;

                return (
                    <div className="grid grid-cols-3 items-start">
                        <div className="flex items-center h-10">
                            <FormLabel htmlFor={fieldId} className="text-sm cursor-pointer">
                                {label}:
                            </FormLabel>
                        </div>

                        <div className="col-span-2 space-y-1">
                            <div className="relative">
                                <FormControl>
                                    <Input
                                        id={fieldId}
                                        type={showToggle ? (showEye ? "text" : "password") : type}
                                        placeholder={placeholder}
                                        className={`${error ? "border-red-500" : ""} ${showToggle ? "pr-10" : ""}`}
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                {showToggle && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3"
                                        onClick={() => name === "password"
                                            ? setShowPassword(!showPassword)
                                            : setShowConfirmPassword(!showConfirmPassword)
                                        }
                                    >
                                        {showEye ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </Button>
                                )}
                            </div>
                            <FormMessage />
                        </div>
                    </div>
                );
            }}
        />
    );

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        {mode === "create" ? "Thêm người dùng" : "Cập nhật người dùng"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-8 py-4">
                            {/* LEFT COLUMN */}
                            <div className="space-y-4">
                                {renderFormField("username", "Tên đăng nhập", "text", "Nhập tên đăng nhập")}
                                {renderFormField("password", "Mật khẩu", "password",
                                    mode === "edit" ? "Để trống nếu không đổi" : "Nhập mật khẩu",
                                    true
                                )}
                                {renderFormField("confirmPassword", "Gõ lại mật khẩu", "password",
                                    "Nhập lại mật khẩu",
                                    true
                                )}
                                {renderFormField("email", "Email", "email", "Nhập email")}
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="space-y-6">
                                {renderFormField("fullName", "Tên người dùng", "text", "Nhập tên đầy đủ")}
                                {renderFormField("phone", "Điện thoại", "tel", "Nhập số điện thoại")}

                                {mode === "edit" && (
                                    <div className="grid grid-cols-3 items-center h-10">
                                        <Label htmlFor="role-field" className="text-sm cursor-pointer">
                                            Vai trò:
                                        </Label>
                                        <div className="col-span-2">
                                            <Input
                                                id="role-field"
                                                value={user.role}
                                                disabled
                                                className="bg-gray-100"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <DialogFooter className="flex gap-2 pt-6">
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Hủy
                            </Button>
                            <Button type="submit">
                                Lưu
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}