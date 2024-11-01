import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MenuIcon, User } from "lucide-react";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createList } from "../actions";
import { AddPropertyButton } from "./AddPropertyButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export async function UserNav() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const createListId = createList.bind(null, user?.id as string);

    const getInitials = () => {
        if (user?.given_name && user?.family_name) {
            return `${user.given_name[0]}${user.family_name[0]}`.toUpperCase();
        }
        if (user?.email) {
            return user.email[0].toUpperCase();
        }
        return "";
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    className="relative h-10 w-10 rounded-full"
                >
                    <Avatar className="h-10 w-10">
                        {user?.picture ? (
                            <AvatarImage 
                                src={user.picture} 
                                alt="Profile picture" 
                                className="object-cover"
                            />
                        ) : null}
                        <AvatarFallback className="bg-primary/10">
                            {user ? getInitials() : <User className="h-5 w-5" />}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
                {user ? (
                    <>
                        <div className="flex items-center justify-start gap-2 p-2">
                            <div className="flex flex-col space-y-1 leading-none">
                                {user.given_name && (
                                    <p className="font-medium">{user.given_name}</p>
                                )}
                                {user.email && (
                                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                                        {user.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DropdownMenuItem className="focus:bg-primary/10" asChild>
                            <AddPropertyButton createListId={createListId} />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-primary/10" asChild>
                            <Link href="/dashboard" className="w-full cursor-pointer">
                                Dashboard
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-primary/10" asChild>
                            <LogoutLink className="w-full cursor-pointer">
                                Logout
                            </LogoutLink>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem className="focus:bg-primary/10" asChild>
                            <RegisterLink className="w-full cursor-pointer">
                                Register
                            </RegisterLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-primary/10" asChild>
                            <LoginLink className="w-full cursor-pointer">
                                Login
                            </LoginLink>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}