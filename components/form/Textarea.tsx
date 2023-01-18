import React, { DetailedHTMLProps, ForwardedRef, TextareaHTMLAttributes, forwardRef } from "react";
import { InputSize, inputStyle } from "./Input";

const Textarea = forwardRef(({
    className,
    size,
    ...props
}: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
    size?: InputSize;
}, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
        <textarea className={`${inputStyle({ size })} ${className ?? ""}`} {...props} ref={ref} />
    );
});

Textarea.displayName = "Textarea";
export default Textarea;