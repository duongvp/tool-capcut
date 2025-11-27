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

interface ForgotPasswordFormProps {
    setStep: (step: number) => void;
    handleLoginBack: () => void;
    setEmail: (email: string) => void;
}

// ✅ Zod schema
const formSchema = z.object({
    email: z.string().min(1, "Email không được để trống").email("Email không đúng định dạng"),
})

export default function ForgotPasswordForm({ setStep, setEmail, handleLoginBack }: ForgotPasswordFormProps) {
    // const router = useRouter()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "" },
    })

    const onSubmit = (values: any) => {
        setEmail(values.email);
        console.log("Login data: ", values)
        // router.push("/message")
        // API call here ✅
        setStep(2);
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Quên mật khẩu</CardTitle>
                <CardDescription className="text-sm">
                    Vui lòng nhập email đăng nhập để nhận liên kết khôi phục mật khẩu
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
                            <Button type="submit" className="w-full">
                                Gửi yêu cầu
                            </Button>
                            <div className="text-center text-sm">
                                Quay lại trang{" "}
                                <Link
                                    to="/login"
                                    className="inline-block underline-offset-4 hover:underline pl-1 text-primary"
                                >
                                    Đăng nhập
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}