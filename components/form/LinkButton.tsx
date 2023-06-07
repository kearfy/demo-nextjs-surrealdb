import Link, { type LinkProps } from 'next/link';
import React, { type ForwardedRef, type ReactNode, forwardRef } from 'react';
import { type ButtonColor, type ButtonSize, buttonStyle } from './Button';

const LinkButton = forwardRef(
    (
        {
            className,
            color,
            size,
            ...props
        }: LinkProps & {
            children?: ReactNode;
            className?: string;
            color?: ButtonColor;
            size?: ButtonSize;
        },
        ref: ForwardedRef<HTMLAnchorElement>
    ) => {
        return (
            <div
                className={`${buttonStyle({ color, size })} ${className ?? ''}`}
            >
                <Link {...props} ref={ref} />
            </div>
        );
    }
);

LinkButton.displayName = 'LinkButton';
export default LinkButton;
