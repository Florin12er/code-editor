"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SearchContextType {
    isSearchOpen: boolean;
    isCommandOpen: boolean;
    toggleSearch: () => void;
    toggleCommand: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCommandOpen, setIsCommandOpen] = useState(false);

    const toggleSearch = () => setIsSearchOpen(prev => !prev);
    const toggleCommand = () => setIsCommandOpen(prev => !prev);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check for Ctrl+P (or Cmd+P on Mac)
            if ((event.ctrlKey || event.metaKey) && event.key === 'p' && !event.shiftKey) {
                event.preventDefault();
                toggleSearch();
            }
            // Check for Ctrl+Shift+P (or Cmd+Shift+P on Mac)
            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'P') {
                event.preventDefault();
                toggleCommand();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <SearchContext.Provider value={{
            isSearchOpen,
            isCommandOpen,
            toggleSearch,
            toggleCommand
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
