import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import EditorComponent from "@/components/editor";

const postSchema = z.object({
    title: z.string().min(3, "Tiêu đề tối thiểu 3 ký tự"),
    slug: z.string().min(3, "Slug tối thiểu 3 ký tự"),
    category: z.string().min(1, "Chọn danh mục"),
    thumbnail: z.string().url("URL không hợp lệ"),
    content: z.string().min(10, "Nội dung tối thiểu 10 ký tự"),
    status: z.boolean().default(false),
});

export function ImageUploadAntdStyle() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0]
        if (!f) return
        setFile(f)
        setPreview(URL.createObjectURL(f))
    }

    const removeFile = () => {
        setFile(null)
        setPreview(null)
    }

    return (
        <div className="flex gap-3 flex-wrap">
            {/* Preview block like Antd */}
            {preview && (
                <div className="relative group w-32 h-32 border rounded-md overflow-hidden">
                    {/* <Image
                        src={preview}
                        alt="uploaded"
                        fill
                        className="object-cover"
                    /> */}

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <Button size="sm" variant="destructive" onClick={removeFile}>
                            Xóa
                        </Button>
                    </div>
                </div>
            )}

            {/* Upload button like Antd */}
            {!preview && (
                <label className="w-32 h-32 cursor-pointer border border-dashed rounded-md flex flex-col items-center justify-center hover:border-primary transition">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-sm text-muted-foreground">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
            )}
        </div>
    )
}


export default function AdminPostCreate() {
    const navigate = useNavigate();
    const form = useForm({ resolver: zodResolver(postSchema), defaultValues: { status: false } });
    const [loading, setLoading] = useState(false);

    const handleUpload = (file: File) => {
        console.log("Uploaded file:", file)
        // TODO: gửi file đến server / upload cloud
    }

    const onSubmit = async (values: any) => {
        setLoading(true);
        await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        setLoading(false);
        navigate("/about");
    };

    return (
        <Card className="w-full h-full rounded-md">
            <CardHeader>
                <CardTitle>Thêm bài viết mới</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField name="title" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tiêu đề</FormLabel>
                                    <FormControl><Input placeholder="Nhập tiêu đề" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="slug" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl><Input placeholder="ví dụ: gioi-thieu-cong-ty" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>


                        <FormField name="category" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Danh mục</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue placeholder="Chọn danh mục" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="tin-tuc">Tin tức</SelectItem>
                                        <SelectItem value="cong-nghe">Công nghệ</SelectItem>
                                        <SelectItem value="du-an">Dự án</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField name="thumbnail" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ảnh thumbnail (URL)</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder="https://..." {...field} /> */}
                                    <ImageUploadAntdStyle />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField name="content" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nội dung</FormLabel>
                                <FormControl><EditorComponent /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField name="status" control={form.control} render={({ field }) => (
                            <FormItem className="flex items-center justify-between border p-3 rounded-lg">
                                <FormLabel>Đăng bài</FormLabel>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )} />

                        <Button type="submit" disabled={loading} className="w-fit">
                            {loading ? "Đang lưu..." : "Lưu bài viết"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
