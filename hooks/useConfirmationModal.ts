import { useCallback, useRef, useState } from "react";

export const useConfirmationModal = () => {
  const promiseRef = useRef<(value: "confirmed" | "canceled") => void>();
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(
    () =>
      new Promise<"confirmed" | "canceled">((resolve) => {
        setOpen(true);
        promiseRef.current = resolve;
      }),
    []
  );

  const onConfirm = useCallback(() => {
    setOpen(false);
    if (promiseRef.current) promiseRef.current("confirmed");
  }, []);

  const onCancel = useCallback(() => {
    setOpen(false);
    if (promiseRef.current) promiseRef.current("canceled");
  }, []);

  const onOpenChange = useCallback((value: boolean) => {
    //
  }, []);

  return {
    open,
    props: {
      open: isOpen,
      onConfirm,
      onCancel,
      onOpenChange,
    },
  };
};
