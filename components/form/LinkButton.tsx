import Link, { LinkProps } from "next/link";
import React, { ForwardedRef, ReactNode, forwardRef } from "react";
import { ButtonColor, ButtonSize, buttonStyle } from "./Button";

const LinkButton = forwardRef(({
    className,
    color,
    size,
    ...props
}: LinkProps & {
    children?: ReactNode;
    className?: string;
    color?: ButtonColor;
    size?: ButtonSize;
}, ref: ForwardedRef<HTMLAnchorElement>) => {
    return (
        <div className={`${buttonStyle({ color, size })} ${className ?? ""}`}>
            <Link {...props} ref={ref} />
        </div>
    )
});

LinkButton.displayName = "LinkButton";
export default LinkButton;