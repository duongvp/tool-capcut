import type { LucideIcon } from "lucide-react"

export type MenuItem = {
    title: string
    path?: string
    element?: React.ReactNode
    icon?: LucideIcon
    children?: MenuItem[]
    badge?: string | number
}