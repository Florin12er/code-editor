import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbProps {
    items: {
        label: string;
        href: string;
    }[];
}

export function BreadcrumbNav({ items }: BreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">
                            <Home className="h-4 w-4" />
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                {items.map((item, index) => (
                    <BreadcrumbItem key={item.href}>
                        {index === items.length - 1 ? (
                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : (
                            <>
                                <BreadcrumbLink asChild>
                                    <Link href={item.href}>{item.label}</Link>
                                </BreadcrumbLink>
                                <BreadcrumbSeparator>
                                    <ChevronRight className="h-4 w-4" />
                                </BreadcrumbSeparator>
                            </>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
