import React, { useEffect } from "react";
import Button from "../components/Button";
import { SignupDetails } from "../constants/Types";
import { useForm } from "react-hook-form";
import { useAuthenticatedUser, useSurrealSignin, useSurrealSignup } from "../constants/Queries";
import { useRouter } from "next/router";

export default function Signup() {
    const router = useRouter();
    const { data: user } = useAuthenticatedUser();
    const { register, handleSubmit } = useForm<SignupDetails>();
    const { isLoading, mutate } = useSurrealSignup({
        onSuccess: () => router.push('/'),
        onFailure: () => alert("User already exists!"),
    });

    useEffect(() => {
        if (user) router.push('/');
    }, [user, router]);

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <form onSubmit={handleSubmit((auth) => mutate(auth))} className="py-16 px-20 bg-slate-200 rounded-xl flex flex-col gap-6">
                <h1 className="text-center text-4xl pb-16 pt-8">
                    Signup
                </h1>
                <input {...register('name')}     type="text"     placeholder="Your name" className="w-96 bg-slate-300 px-8 py-4 rounded" />
                <input {...register('username')} type="text"     placeholder="Username"  className="w-96 bg-slate-300 px-8 py-4 rounded" />
                <input {...register('password')} type="password" placeholder="Password"  className="w-96 bg-slate-300 px-8 py-4 rounded" />
                <div className="flex justify-center pt-10">
                    <Button disabled={isLoading}>
                        {isLoading ? "Loading" : "continue"}
                    </Button>
                </div>
            </form>
        </div>
    )
}