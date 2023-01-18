import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export default function Button({
    className,
    ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={"px-6 py-3 bg-blue-600 text-white rounded-md text-lg " + className} {...props} />
    )
}