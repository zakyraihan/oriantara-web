"use client"
import { useState, useRef, useCallback, RefObject, useEffect } from "react";

type ScrollDirection = 'left' | 'right';

interface UseHorizontalScrollReturn {
    scrollRef: RefObject<HTMLDivElement>;
    canScrollLeft: boolean;
    canScrollRight: boolean;
    checkScroll: () => void;
    scroll: (direction: ScrollDirection, amount?: number) => void;
    scrollToStart: () => void;
    scrollToEnd: () => void;
}

export function useHorizontalScroll(): UseHorizontalScrollReturn {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
    const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

    const checkScroll = useCallback((): void => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    }, []);

    const scroll = useCallback((direction: ScrollDirection, amount: number = 400): void => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'right' ? amount : -amount,
                behavior: 'smooth'
            });
            setTimeout(() => {
                checkScroll();
            }, 300);
        }
    }, [checkScroll]);

    const scrollToStart = useCallback((): void => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
            setTimeout(() => {
                checkScroll();
            }, 300);
        }
    }, [checkScroll]);

    const scrollToEnd = useCallback((): void => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollWidth,
                behavior: 'smooth'
            });
            setTimeout(() => {
                checkScroll();
            }, 300);
        }
    }, [checkScroll]);

    // Initial check on mount and window resize
    useEffect(() => {
        checkScroll();

        const handleResize = () => {
            checkScroll();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [checkScroll]);

    return {
        scrollRef,
        canScrollLeft,
        canScrollRight,
        checkScroll,
        scroll,
        scrollToStart,
        scrollToEnd
    };
}
