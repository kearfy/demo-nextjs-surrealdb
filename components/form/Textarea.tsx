import React, {
    type DetailedHTMLProps,
    type ForwardedRef,
    type TextareaHTMLAttributes,
    forwardRef,
} from 'react';
import { type InputSize, inputStyle } from './Input';

const Textarea = forwardRef(
    (
        {
            className,
            size,
            ...props
        }: DetailedHTMLProps<
            TextareaHTMLAttributes<HTMLTextAreaElement>,
            HTMLTextAreaElement
        > & {
            size?: InputSize;
        },
        ref: ForwardedRef<HTMLTextAreaElement>
    ) => {
        return (
            <textarea
                className={`${inputStyle({ size })} ${className ?? ''}`}
                {...props}
                ref={ref}
            />
        );
    }
);

Textarea.displayName = 'Textarea';
export default Textarea;
