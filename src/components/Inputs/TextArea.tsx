
import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    ref: React.Ref<HTMLTextAreaElement>;
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ value, onChange, onKeyDown, ...props }, ref) => (
        <textarea
            ref={ref}
            className="max-w-card border border-gray-300 rounded-md p-2 overflow-y-hidden focus:outline-main-blue shadow-md"
            placeholder="Enter new item"
            value={value}
            autoFocus
            maxLength={200}
            onChange={onChange}
            onKeyDown={onKeyDown}
            {...props}
        />
    )
);


