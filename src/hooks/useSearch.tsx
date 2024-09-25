import { useState, useEffect } from "react";

export default function useSearch() {
    const [searchFilter, setSearchFilter] = useState('');
    const debouncedSearchFilter = useDebounce(searchFilter, 800);

    return {
        searchFilter: debouncedSearchFilter,
        setSearchFilter,
    }
}

function useDebounce(value: string | number, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
