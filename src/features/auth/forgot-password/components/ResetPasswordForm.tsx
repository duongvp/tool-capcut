import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Link } from "react-router-dom"
import PasswordInput from "@/components/password-input"

interface ResetPasswordFormProps {
    setStep: (step: number) => void;
    handleLoginBack: () => void;
    // setNewPassword: (password: string) => void;
}

// ✅ Zod schema với validation mật khẩu khớp nhau
const formSchema = z.object({
    newPassword: z.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"], // Hiển thị lỗi ở field confirmPassword
})

export default function ResetPasswordForm({ setStep, handleLoginBack }: ResetPasswordFormProps) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // setNewPassword(values.newPassword);
        console.log("Reset password data: ", values)

        // Giả lập API call để đặt lại mật khẩu
        // await api.resetPassword(values.newPassword);

        // Chuyển đến step thành công hoặc đăng nhập
        setStep(4); // Hoặc step tiếp theo
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Đặt lại mật khẩu</CardTitle>
                <CardDescription className="text-sm">
                    Vui lòng nhập mật khẩu mới cho tài khoản của bạn
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Mật khẩu mới */}
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu mới</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Nhập mật khẩu mới"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <div className="text-xs text-muted-foreground mt-1">
                                        Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Xác nhận mật khẩu */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Nhập lại mật khẩu mới"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="w-full">
                            Đặt lại mật khẩu
                        </Button>

                        {/* Back to Login */}
                        <div className="text-center text-sm">
                            Quay lại trang{" "}
                            <Link
                                to="/login"
                                className="inline-block underline-offset-4 hover:underline pl-1 text-primary"
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}