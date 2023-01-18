import { cva } from 'class-variance-authority';
import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    ForwardedRef,
    forwardRef,
} from 'react';

export const buttonStyle = cva([], {
    variants: {
        color: {
            blue: ['bg-blue-600', 'text-white'],
            red: ['bg-red-600', 'text-white'],
            black: ['bg-black', 'text-white'],
        },
        size: {
            small: ['px-4', 'py-2', 'rounded-md'],
            normal: ['px-6', 'py-2.5', 'rounded-md', 'text-lg'],
        },
    },
    defaultVariants: {
        color: 'blue',
        size: 'normal',
    },
});

export type ButtonColor = Exclude<
    Exclude<Parameters<typeof buttonStyle>[0], undefined>['color'],
    null | undefined
>;
export type ButtonSize = Exclude<
    Exclude<Parameters<typeof buttonStyle>[0], undefined>['size'],
    null | undefined
>;

const Button = forwardRef(
    (
        {
            className,
            color,
            size,
            ...props
        }: DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        > & {
            color?: ButtonColor;
            size?: ButtonSize;
        },
        ref: ForwardedRef<HTMLButtonElement>
    ) => {
        return (
            <button
                className={`${buttonStyle({ color, size })} ${className ?? ''}`}
                {...props}
                ref={ref}
            />
        );
    }
);

Button.displayName = 'Button';
export default Button;
