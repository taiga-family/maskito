import"./chunk-ENRHZQ2S.js";var o=`:root {
    --tui-text-primary: rgb(27, 31, 59);
    --tui-text-tertiary: rgba(27, 31, 59, 0.4);
    --tui-radius-m: 0.75rem;
    --tui-background-base: #fff;
    --tui-background-neutral-1-hover: #ededed;
    --tui-background-accent-1: #526ed3;
}

input,
textarea {
    display: block;
    inline-size: 100%;
    max-inline-size: 25rem;
    font-size: 0.9375rem;
    font-family: 'Roboto', sans-serif;
    border-radius: var(--tui-radius-m);
    box-sizing: border-box;
    border: 1px solid var(--tui-background-neutral-1-hover);
    color: var(--tui-text-primary);
    background: var(--tui-background-base);
    outline: none;
    transition:
        box-shadow,
        background,
        0.2s ease-in-out;
    box-shadow: 0 0.125rem 0.1875rem rgba(0, 0, 0, 0.1);
}

input {
    min-block-size: 2.75rem;
    padding: 0 1rem;
}

textarea {
    min-block-size: 10rem;
    padding: 0.5rem;
}

input:focus::placeholder,
textarea:focus::placeholder {
    color: var(--tui-text-tertiary);
}

input:hover,
textarea:hover {
    box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.16);
}

input:focus,
textarea:focus {
    box-shadow: none;
    border-color: var(--tui-background-accent-1);
    border-width: 0.125rem;
}
`;export{o as default};
