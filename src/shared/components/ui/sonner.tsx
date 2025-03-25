'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast as sonnerToast, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                } as React.CSSProperties
            }
            position="top-right"
            richColors
            closeButton
            toastOptions={{
                classNames: {
                    toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
                    description: 'group-[.toast]:text-muted-foreground',
                    actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                    cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
                },
            }}
            {...props}
        />
    );
};

const toast = {
    info: (...args: Parameters<typeof sonnerToast.info>) => sonnerToast.info(args[0], { duration: 5000, ...args[1] }),
    success: (...args: Parameters<typeof sonnerToast.success>) =>
        sonnerToast.success(args[0], { duration: 3000, ...args[1] }),
    warning: (...args: Parameters<typeof sonnerToast.warning>) =>
        sonnerToast.warning(args[0], { duration: 5000, ...args[1] }),
    error: (...args: Parameters<typeof sonnerToast.error>) =>
        sonnerToast.error(args[0], { duration: 5000, ...args[1] }),
    loading: (...args: Parameters<typeof sonnerToast.loading>) => sonnerToast.loading(args[0], { ...args[1] }),
};

export { Toaster, toast };
