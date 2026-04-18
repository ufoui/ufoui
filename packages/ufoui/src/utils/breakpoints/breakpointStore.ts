import { ViewportSnapshot } from './breakpoint';

/**
 * Subscriber function used by the breakpoint store.
 *
 * @category Hooks
 */
export type BreakpointStoreSubscriber = () => void;

const subscribers = new Set<BreakpointStoreSubscriber>();

let listenerReady = false;
let mediaQueryList: MediaQueryList | null = null;
let snapshot: ViewportSnapshot = { width: 0, isPrint: false };

const emit = () => {
    subscribers.forEach(listener => {
        listener();
    });
};

const getWindowWidth = (): number => (typeof window === 'undefined' ? 0 : window.innerWidth);

const getPrintMode = (): boolean =>
    typeof window === 'undefined' || typeof window.matchMedia !== 'function'
        ? false
        : window.matchMedia('print').matches;

const onViewportChange = () => {
    const nextWidth = getWindowWidth();
    const nextIsPrint = getPrintMode();

    if (nextWidth === snapshot.width && nextIsPrint === snapshot.isPrint) {
        return;
    }

    snapshot = { width: nextWidth, isPrint: nextIsPrint };
    emit();
};

const ensure = () => {
    if (typeof window === 'undefined' || listenerReady) {
        return;
    }

    window.addEventListener('resize', onViewportChange);
    window.addEventListener('orientationchange', onViewportChange);

    mediaQueryList = window.matchMedia('print');
    mediaQueryList.addEventListener('change', onViewportChange);

    snapshot = {
        width: getWindowWidth(),
        isPrint: mediaQueryList.matches,
    };

    listenerReady = true;
};

/**
 * Shared viewport store used by responsive hooks.
 *
 * @category Hooks
 */
export const breakpointStore = {
    /**
     * Subscribes to viewport state updates.
     *
     * @function
     */
    subscribe(listener: BreakpointStoreSubscriber) {
        ensure();
        subscribers.add(listener);

        return () => {
            subscribers.delete(listener);

            if (subscribers.size === 0 && typeof window !== 'undefined') {
                window.removeEventListener('resize', onViewportChange);
                window.removeEventListener('orientationchange', onViewportChange);
                mediaQueryList?.removeEventListener('change', onViewportChange);

                mediaQueryList = null;
                listenerReady = false;
                snapshot = { width: 0, isPrint: false };
            }
        };
    },

    /**
     * Returns the current viewport snapshot.
     *
     * @function
     */
    getSnapshot(): ViewportSnapshot {
        return snapshot;
    },

    /**
     * Returns the server-side fallback snapshot.
     *
     * @function
     */
    getServerSnapshot(): ViewportSnapshot {
        return {
            width: 0,
            isPrint: false,
        };
    },
};
