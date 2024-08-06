"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useSearch } from '@/components/providers/search-provider';

// Placeholder data
const placeholderDocuments = [
    { _id: "1", title: "Document 1", icon: "📄" },
    { _id: "2", title: "Document 2", icon: null },
    { _id: "3", title: "Document 3", icon: "📁" },
    { _id: "4", title: "Document 4", icon: null },
    { _id: "5", title: "Document 5", icon: "📝" },
];

export const SearchCommand = () => {
    const { isSearchOpen, toggleSearch } = useSearch();
    const [isMounted, setIsMounted] = useState(false);
    const [filteredDocuments, setFilteredDocuments] = useState(placeholderDocuments);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSearch = (query: string) => {
        const filtered = placeholderDocuments.filter(doc =>
            doc.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredDocuments(filtered);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={isSearchOpen} onOpenChange={toggleSearch}>
            <CommandInput
                placeholder="Search files..."
                onValueChange={handleSearch}
            />
            <CommandList>
                <CommandEmpty>No files found</CommandEmpty>
                <CommandGroup heading="Files">
                    {filteredDocuments.map((document) => (
                        <CommandItem
                            key={document._id}
                            value={`${document._id}-${document.title}`}
                            onSelect={() => console.log(`Selected file with id: ${document._id}`)}
                        >
                            {document.icon ? (
                                <p className="mr-2 text-[18px]">{document.icon}</p>
                            ) : (
                                <File className="mr-2 h-4 w-4" />
                            )}
                            <span>{document.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};
