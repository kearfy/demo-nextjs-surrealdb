import React, { FormEventHandler, ReactNode } from 'react';
import Button from '../form/Button';

export default function FormPage({
    title,
    onSubmit,
    children,
    isLoading,
    button,
}: {
    title: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
    children: ReactNode;
    isLoading: boolean;
    button?: string | ReactNode;
}) {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <form
                onSubmit={onSubmit}
                className="w-[700px] max-w-full py-16 px-20 bg-slate-200 rounded-xl"
            >
                <div className="w-full flex flex-col gap-6">
                    <h1 className="text-center font-semibold text-5xl pb-16 pt-8">
                        {title}
                    </h1>
                    {children}
                    <div className="flex justify-center pt-10 gap-6">
                        {typeof button == 'string' || !button ? (
                            <Button disabled={isLoading}>
                                {isLoading ? 'Loading' : button ?? 'Continue'}
                            </Button>
                        ) : (
                            button
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
