'use client';

import { FunctionComponent } from 'react';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';

const defaultFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});
interface DatePickerProps {
    date: Date | undefined;
    setDate: (date: Date) => void;
    formatter?: Intl.DateTimeFormat;
}
export const DatePicker: FunctionComponent<DatePickerProps> = ({ formatter = defaultFormatter, date, setDate }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                    <CalendarIcon />
                    {date ? formatter.format(date) : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
        </Popover>
    );
};
