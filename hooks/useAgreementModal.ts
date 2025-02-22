import { useCallback, useRef, useState } from "react";

export const useAgreementModal = () => {
  const promiseRef = useRef<(value: "agreed" | "canceled") => void>();
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(
    () =>
      new Promise<"agreed" | "canceled">((resolve) => {
        setOpen(true);
        promiseRef.current = resolve;
      }),
    []
  );

  const onAgree = useCallback(() => {
    setOpen(false);
    if (promiseRef.current) promiseRef.current("agreed");
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
      onAgree,
      onCancel,
      onOpenChange,
    },
  };
};
