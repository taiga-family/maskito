export interface TypedInputEvent extends InputEvent {
    type: 'beforeinput' | 'input';
    inputType:
        | 'deleteByCut' // Ctrl (Command) + X
        | 'deleteContentBackward' // Backspace
        | 'deleteContentForward' // Delete (Fn + Backspace)
        | 'deleteHardLineBackward' // Ctrl (Command) + Backspace
        | 'deleteHardLineForward'
        | 'deleteSoftLineBackward' // Ctrl (Command) + Backspace
        | 'deleteSoftLineForward'
        | 'deleteWordBackward' // Alt (Option) + Backspace
        | 'deleteWordForward' // Alt (Option) + Delete (Fn + Backspace)
        | 'historyRedo' // Ctrl (Command) + Shift + Z
        | 'historyUndo' // Ctrl (Command) + Z
        | 'insertCompositionText'
        | 'insertFromDrop'
        | 'insertFromPaste' // Ctrl (Command) + V
        | 'insertLineBreak'
        | 'insertReplacementText'
        | 'insertText';
}
