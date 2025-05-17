import { useEffect, useRef } from "react";

export const useDialogRef = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) {
            dialog.showModal();
        }
    }, []);
    return dialogRef
}