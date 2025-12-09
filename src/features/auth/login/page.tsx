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
import { Link, useNavigate } from "react-router-dom"
import PasswordInput from "@/components/password-input"

// ✅ Zod schema
const formSchema = z.object({
    email: z.string().email("Email không đúng định dạng"),
    password: z.string().min(1, "Mật khẩu không được để trống"),
})

export default function LoginPage() {
    // const router = useRouter()
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    })


    const onSubmit = (values: any) => {
        console.log("Login data: ", values)
        navigate("/blogs")
        // API call here ✅
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Đăng nhập</CardTitle>
                <CardDescription className="text-sm">
                    Chào mừng quay lại! Vui lòng nhập thông tin của bạn để đăng nhập.
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

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <div className="flex items-center">
                                            <FormLabel>Mật khẩu</FormLabel>
                                        </div>
                                        <FormControl>
                                            <PasswordInput
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Nhập mật khẩu"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex w-full justify-end mt-3">
                            <Link
                                to="/forgot-password"
                                className="inline-block text-sm underline-offset-4 hover:underline pl-1 text-primary"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <CardFooter className="flex-col gap-2 mt-4 px-0">
                            <Button type="submit" className="w-full">
                                Đăng nhập
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
