// **CustomUploadAdapter.ts**

// Khai báo kiểu dữ liệu cho FileLoader của CKEditor
interface FileLoader {
    file: Promise<File>;
    uploaded: number;
    uploadTotal: number;
}

// Khai báo kiểu dữ liệu cho giá trị trả về thành công của upload
interface UploadSuccessResponse {
    default: string; // URL của ảnh (temporary blob URL)
}

// Khai báo kiểu dữ liệu cho giá trị trả về lỗi của upload
interface UploadErrorResponse {
    error: {
        message: string;
    };
}

/**
 * Adapter này tạo một URL tạm thời (blob URL) cho file ảnh 
 * và trả về ngay lập tức để CKEditor hiển thị, không cần gọi API backend.
 */
function CustomUploadAdapter(loader: FileLoader) {
    return {
        // Phương thức được CKEditor gọi để thực hiện upload
        upload: (): Promise<UploadSuccessResponse | UploadErrorResponse> => {
            return loader.file
                .then((file: File) => {
                    // Tạo URL đối tượng tạm thời từ file
                    const temporaryUrl = URL.createObjectURL(file);

                    // Trả về JSON theo định dạng CKEditor yêu cầu
                    return {
                        default: temporaryUrl
                    } as UploadSuccessResponse; // Ép kiểu về UploadSuccessResponse
                })
                .catch((error: any) => {
                    console.error("Lỗi tạo Object URL:", error);
                    return {
                        error: {
                            message: "Không thể hiển thị ảnh tạm thời."
                        }
                    } as UploadErrorResponse; // Ép kiểu về UploadErrorResponse
                });
        },

        // Phương thức này có thể để trống
        abort: () => {
            // Tùy chọn: Clean up temporary URLs nếu cần
        }
    };
}

// Khai báo kiểu dữ liệu cho instance của CKEditor
interface EditorInstance {
    plugins: {
        get: (name: 'FileRepository') => {
            createUploadAdapter: (loader: FileLoader) => ReturnType<typeof CustomUploadAdapter>;
        };
    };
}

/**
 * Hàm plugin để tích hợp CustomUploadAdapter vào CKEditor.
 */
export function CustomUploadAdapterPlugin(editor: EditorInstance) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: FileLoader) => {
        return CustomUploadAdapter(loader);
    };
}