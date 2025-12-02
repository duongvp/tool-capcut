// components/ExpandableTable.tsx
"use client";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";

// Props interface
interface ExpandableTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    expandedContent: (item: T) => React.ReactNode;
    loading?: boolean;
    emptyMessage?: string;
    onRowClick?: (item: T) => void;
    actions?: (item: T) => React.ReactNode;
}

interface ColumnDef<T> {
    key: string;
    header: string;
    render: (item: T) => React.ReactNode;
    className?: string;
}

// Custom icon component với animation
const ExpandIcon = ({ isExpanded }: { isExpanded: boolean }) => {
    return (
        <div className="relative !h-3 !w-3 flex items-center justify-center">
            <div className={`
          absolute transition-all duration-200 ease-in-out
          ${isExpanded ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}
      `}>
                <Plus className="!h-3 !w-3 text-gray-500" />
            </div>
            <div className={`
          absolute transition-all duration-200 ease-in-out
          ${isExpanded ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}
      `}>
                <Minus className="!h-3 !w-3 text-gray-500" />
            </div>
        </div>
    );
};

export function ExpandableTable<T extends { id: number | string }>({
    data,
    columns,
    expandedContent,
    loading = false,
    emptyMessage = "Không có dữ liệu",
    onRowClick,
    actions
}: ExpandableTableProps<T>) {
    const [expandedRows, setExpandedRows] = useState<(number | string)[]>([]);

    const toggleRow = (id: number | string, e?: React.MouseEvent) => {
        if (e) {
            const target = e.target as HTMLElement;
            if (target.closest('button[data-action]')) {
                return;
            }
        }
        setExpandedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const handleExpandButtonClick = (id: number | string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const isExpanded = (id: number | string) => expandedRows.includes(id);

    if (loading) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                Đang tải dữ liệu...
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                {emptyMessage}
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-10"></TableHead>
                    {columns.map((column) => (
                        <TableHead key={column.key} className={column.className}>
                            {column.header}
                        </TableHead>
                    ))}
                    {actions && <TableHead className="text-right">Hành động</TableHead>}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((item) => (
                    <Collapsible
                        key={item.id}
                        open={isExpanded(item.id)}
                        onOpenChange={() => toggleRow(item.id)}
                        asChild
                    >
                        <>
                            {/* Row chính - click toàn bộ row để expand */}
                            <TableRow
                                className="group cursor-pointer hover:bg-muted/50"
                                onClick={(e) => toggleRow(item.id, e)}
                            >
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 hover:bg-accent border rounded-sm transition-all duration-200"
                                        onClick={(e) => handleExpandButtonClick(item.id, e)}
                                    >
                                        <ExpandIcon isExpanded={isExpanded(item.id)} />
                                    </Button>
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {column.render(item)}
                                    </TableCell>
                                ))}
                                {actions && (
                                    <TableCell
                                        className="text-right"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex justify-end space-x-2">
                                            {actions(item)}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>

                            {/* Row chi tiết */}
                            <TableRow className={isExpanded(item.id) ? "bg-muted/50" : "hidden"}>
                                <TableCell colSpan={columns.length + 2} className="p-0">
                                    <CollapsibleContent className="p-4 transition-all duration-200 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                                        {expandedContent(item)}
                                    </CollapsibleContent>
                                </TableCell>
                            </TableRow>
                        </>
                    </Collapsible>
                ))}
            </TableBody>
        </Table>
    );
}