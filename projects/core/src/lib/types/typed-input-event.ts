export interface TypedInputEvent extends InputEvent {
    inputType:
        | 'insertText'
        | 'insertReplacementText'
        | 'insertCompositionText'
        | 'insertLineBreak'
        | 'deleteContentBackward' // Backspace
        | 'deleteContentForward' // Delete (Fn + Backspace)
        | 'deleteWordBackward' // Alt (Option) + Backspace
        | 'deleteWordForward' // Alt (Option) + Delete (Fn + Backspace)
        | 'deleteByCut' // Ctrl (Command) + X
        | 'insertFromPaste' // Ctrl (Command) + V
        | 'insertFromDrop'
        | 'historyUndo' // Ctrl (Command) + Z
        | 'historyRedo'; // Ctrl (Command) + Shift + Z
}
