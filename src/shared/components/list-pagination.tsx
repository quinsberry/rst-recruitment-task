'use client';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/shared/components/ui/pagination';
import { FunctionComponent, useMemo } from 'react';
import { usePagination } from '../hooks/use-pagination';

interface ListPaginationProps {
    currentPage: number;
    totalPages: number;
    nextPage: () => void;
    prevPage: () => void;
    goToPage: (page: number) => void;
    pages: number[];
}
export const ListPagination: FunctionComponent<ListPaginationProps> = ({
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    pages,
}) => {
    return (
        <div className="space-x-2">
            <Pagination className="justify-end">
                <PaginationContent>
                    <PaginationItem disabled={currentPage === 1}>
                        <PaginationPrevious href="#" onClick={prevPage} />
                    </PaginationItem>
                    {pages.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink href="#" isActive={page === currentPage} onClick={() => goToPage(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}{' '}
                    <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationNext href="#" onClick={nextPage} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

interface UseListPaginationProps<T> {
    listItems: T[];
    itemsPerPage?: number;
}
export const useListPagination = <T,>({ listItems, itemsPerPage = 10 }: UseListPaginationProps<T>) => {
    const pagination = usePagination(listItems.length, itemsPerPage);
    const pages = new Array(pagination.totalPages).fill(0).map((_, index) => index + 1);
    const paginatedItems = useMemo(() => {
        return listItems.slice((pagination.currentPage - 1) * itemsPerPage, pagination.currentPage * itemsPerPage);
    }, [listItems, pagination.currentPage, itemsPerPage]);
    return {
        paginatedItems,
        ListPagination: () => <ListPagination {...pagination} pages={pages} />,
    };
};
