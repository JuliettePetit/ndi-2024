"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Menu, Package2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const NavLinks = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'Podcasts', path: '/podcasts' },
    { id: 3, name: 'Contact', path: '/contact' },
];

export default function NavBar() {


    const pathname = usePathname();
    const isActive = (path: string) => path === pathname;

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 z-10">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">

                <Link
                    href={"/"}
                    className="flex items-center gap-2 text-lg font-semibold"
                >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>

                {NavLinks.map((link) => (

                    <Link
                        key={link.id}
                        href={link.path}
                        className={isActive(link.path) ? 'text-foreground transition-colors' : 'text-muted-foreground hover:text-primary transition-colors'}
                    >
                        {link.name}
                    </Link>

                ))}

            </nav>
            <div className="ml-auto flex items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href={"/"}
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>

                            {NavLinks.map((link) => (
                                <Link
                                    key={link.id}
                                    href={link.path}
                                    className={isActive(link.path) ? 'text-foreground transition-colors' : 'text-muted-foreground hover:text-primary transition-colors'}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
