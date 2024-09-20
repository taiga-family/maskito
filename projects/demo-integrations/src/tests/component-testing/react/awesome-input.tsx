import {forwardRef, type InputHTMLAttributes} from 'react';

const hiddenInputStyles = {
    display: 'none',
};

export const AwesomeInput = forwardRef<HTMLDivElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
    <div ref={ref}>
        <input style={hiddenInputStyles} />
        <input
            className="real-input"
            {...props}
        />
        <input style={hiddenInputStyles} />
    </div>
));
