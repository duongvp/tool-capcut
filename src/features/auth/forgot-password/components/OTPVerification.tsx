import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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

// ✅ Zod schema
const formSchema = z.object({
    email: z.string().min(1, "Email không được để trống").email("Email không đúng định dạng"),
    password: z.string().min(1, "Mật khẩu không được để trống"),
})

interface OTPVerificationProps {
    email: string;
    setStep: (step: number) => void;
    handleLoginBack: () => void;
    setResetToken: (token: string) => void;
}

export default function OTPVerification({ setStep, email, handleLoginBack, setResetToken }: OTPVerificationProps) {
    // const router = useRouter()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    })

    const onSubmit = (values: any) => {
        console.log("Login data: ", values)
        // router.push("/message")
        // API call here ✅
        setStep(3);
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Xác thực OTP</CardTitle>
                <CardDescription className="text-sm">
                    Nhập mã OTP gửi đến {email}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="m@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <CardFooter className="flex-col gap-2 mt-4 px-0">
                            <Button type="submit" className="w-fit">
                                Xác thực
                            </Button>
                            <p className="text-sm ">
                                Quay lại trang
                                <Link
                                    to="/login"
                                    className="ml-auto inline-block underline-offset-4 hover:underline pl-1"
                                >
                                    Đăng nhập
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
