import"./chunk-TIC6Q35B.js";var p=`import {forwardRef, type InputHTMLAttributes} from 'react';

const hiddenInputStyles = {display: 'none'};

export const AwesomeInput = forwardRef<HTMLDivElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
    <div
        id="awesome-input-wrapper"
        ref={ref}
    >
        <input style={hiddenInputStyles} />
        <input
            className="real-input"
            {...props}
        />
        <input style={hiddenInputStyles} />
    </div>
));
`;export{p as default};
