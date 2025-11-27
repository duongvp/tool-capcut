import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PasswordInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

function PasswordInput({ value, onChange, placeholder }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(true)

    return (
        <div className="relative">
            <Input
                type={!showPassword ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                    {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                </span>
            </Button>
        </div>
    )
}

export default PasswordInput