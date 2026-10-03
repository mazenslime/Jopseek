import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { FlashMessages, FlashToast } from '@/types/ui';

export function useFlashToast(): void {
    useEffect(() => {
        const removeFlashListener = router.on('flash', (event) => {
            const flash = (event as CustomEvent).detail?.flash;
            const data = flash?.toast as FlashToast | undefined;

            if (!data) {
                return;
            }

            toast[data.type](data.message);
        });

        const removeNavigateListener = router.on('navigate', (event) => {
            const messages = event.detail.page.props.flashMessages as FlashMessages | undefined;

            if (messages?.success) {
                toast.success(messages.success);
            }

            if (messages?.error) {
                toast.error(messages.error);
            }
        });

        return () => {
            removeFlashListener();
            removeNavigateListener();
        };
    }, []);
}
