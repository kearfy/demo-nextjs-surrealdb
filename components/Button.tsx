import Link, { LinkProps } from "next/link";
import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export default function Button({
    className,
    ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={"px-6 py-4 bg-blue-600 text-white rounded-md text-lg " + className} {...props} />
    )
}