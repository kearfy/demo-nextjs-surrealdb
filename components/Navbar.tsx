import Image from "next/image";
import React from "react";
import { useAuthenticatedUser, useSurrealSignout } from "../constants/Queries";
import LinkButton from "./LinkButton";
import Link from "next/link";
import Button from "./Button";
import { PlusCircle } from 'react-feather';

export default function Navbar() {
    const { isLoading: isUserLoading, data: user} = useAuthenticatedUser();
    const { mutate: signout } = useSurrealSignout({});

    return (
        <div className="fixed top-0 left-0 w-screen z-40">
            <div className="bg-white pt-8 mb-8 mx-8 rounded-b-xl">
                <div className="h-24 px-8 bg-neutral-900 rounded-xl flex items-center justify-between gap-12">
                    <Link href="/">
                        <Image src="/logo-full.svg" alt="Logo" width={200} height={50} />
                    </Link>
                    <div className="flex gap-12 items-center">
                        {!isUserLoading && !user && (
                            <>
                                <LinkButton href="/signin">signin</LinkButton>
                                <LinkButton href="/signup">signup</LinkButton>
                            </>
                        )}
                        {!isUserLoading && user && (
                            <>
                                <Link href="/create" className="text-white hover:underline flex items-center gap-2">
                                    <PlusCircle />
                                    Create
                                </Link>
                                <Button onClick={() => signout()}>signout</Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}