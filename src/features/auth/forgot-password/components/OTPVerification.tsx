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
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Link } from "react-router-dom"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

// ✅ Zod schema cho OTP - chỉ cần mã OTP
const formSchema = z.object({
    otp: z.string().min(6, "Mã OTP phải có 6 ký tự").max(6, "Mã OTP phải có 6 ký tự"),
})

interface OTPVerificationProps {
    email: string;
    setStep: (step: number) => void;
    handleLoginBack: () => void;
    setResetToken: (token: string) => void;
}

export default function OTPVerification({ setStep, email, handleLoginBack, setResetToken }: OTPVerificationProps) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { otp: "" },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("OTP verification data: ", values)

        // Giả lập xác thực OTP
        // await api.verifyOTP({ email, otp: values.otp });

        setResetToken(values.otp); // Lưu token reset
        setStep(3); // Chuyển đến step tiếp theo
    }

    const handleResendOTP = () => {
        // Gửi lại mã OTP
        console.log("Resending OTP to:", email);
        // await api.resendOTP(email);
        alert("Mã OTP đã được gửi lại!");
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Xác thực OTP</CardTitle>
                <CardDescription className="text-sm">
                    Nhập mã OTP 6 số đã được gửi đến
                </CardDescription>
                <CardDescription className="font-medium text-primary">
                    {email}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* OTP Field */}
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormControl>
                                        <InputOTP
                                            maxLength={6}
                                            {...field}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Resend OTP */}
                        <div className="text-center text-sm">
                            Không nhận được mã?{" "}
                            <Button
                                type="button"
                                variant="link"
                                className="p-0 h-auto"
                                onClick={handleResendOTP}
                            >
                                Gửi lại mã OTP
                            </Button>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full">
                            Xác thực
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