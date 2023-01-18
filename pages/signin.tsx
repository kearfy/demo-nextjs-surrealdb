import React, { useEffect } from "react";
import { SigninDetails } from "../constants/Types";
import { useForm } from "react-hook-form";
import { useAuthenticatedUser, useSurrealSignin } from "../constants/Queries";
import { useRouter } from "next/router";
import Input from "../components/form/Input";
import FormPage from "../components/layout/FormPage";

export default function Signin() {
    const router = useRouter();
    const { data: user } = useAuthenticatedUser();
    const { register, handleSubmit } = useForm<SigninDetails>();
    const { isLoading, mutate } = useSurrealSignin({
        onSuccess: () => router.push('/'),
        onFailure: () => alert("Failed!"),
    });

    useEffect(() => {
        if (user) router.push('/');
    }, [user, router]);

    return (
        <FormPage {...{
            title: "Signin",
            onSubmit: handleSubmit((auth) => {
                console.log(auth);
                mutate(auth)
            }),
            isLoading,
        }}>
            <Input {...register('username')} type="text"     placeholder="Username" />
            <Input {...register('password')} type="password" placeholder="Password" />
        </FormPage>
    );
}