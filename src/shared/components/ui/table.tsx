'use client';

import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { Loader2 } from 'lucide-react';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
    return (
        <div data-slot="table-container" className="relative w-full overflow-x-auto">
            <table data-slot="table" className={cn('w-full caption-bottom text-sm', className)} {...props} />
        </div>
    );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
    return <thead data-slot="table-header" className={cn('[&_tr]:border-b', className)} {...props} />;
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    isInProgress?: boolean;
    emptyMessage?: React.ReactNode;
}
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ className, isInProgress = false, emptyMessage = 'No data', children, ...props }, ref) => (
        <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props}>
            {isInProgress ? (
                <TableRow className="h-15">
                    <TableCell colSpan={100} className="h-full w-full">
                        <div className="flex justify-center items-center">
                            <Loader2 size={26} className="animate-spin" />
                        </div>
                    </TableCell>
                </TableRow>
            ) : React.Children.count(children) === 0 ? (
                <TableRow className="h-15">
                    <TableCell colSpan={100} className="h-full w-full text-center">
                        {emptyMessage}
                    </TableCell>
                </TableRow>
            ) : (
                children
            )}
        </tbody>
    ),
);
TableBody.displayName = 'TableBody';

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
            {...props}
        />
    );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
    return (
        <tr
            data-slot="table-row"
            className={cn('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', className)}
            {...props}
        />
    );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                className,
            )}
            {...props}
        />
    );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
    return (
        <td
            data-slot="table-cell"
            className={cn(
                'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                className,
            )}
            {...props}
        />
    );
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
    return (
        <caption data-slot="table-caption" className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />
    );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
