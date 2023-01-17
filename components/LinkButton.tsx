import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";

export default function LinkButton({
    ...props
}: LinkProps & {
    children?: ReactNode;
}) {
    return (
        <div className="px-6 py-4 bg-blue-600 text-white rounded-md text-lg">
            <Link {...props} />
        </div>
    )
}