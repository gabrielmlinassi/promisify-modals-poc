Some modals are better managed imperatively rather than declarively. This is an attempt to wrap a modal into a Promise so it can be called imperatively and awaited for user action. The expected result looks interesting and clean but it comes with a price of no a11y compliance.

```tsx
const handleClick = useCallback(async () => {
    const statusConfirmationModal = await modals.showConfirmationModal();

    if (statusConfirmationModal === "confirmed") {
      alert("Confirmed!");
    } else if (statusConfirmationModal === "canceled") {
      alert("Canceled!");
      return;
    } else {
      alert("Unknown");
      return;
    }

    const statusAgreementModal = await modals.showAgreementModal();
    if (statusAgreementModal === "agreed") {
      alert("agreed!");
    } else if (statusAgreementModal === "canceled") {
      alert("Canceled!");
    } else {
      alert("Unknown");
    }
  }, [modals]);
```

The main idea is to evolve the modal actions into a promise and store that promise on a ref so it can be passed around and resolved when and how you wish.

```tsx
export const Modals = ({ children }: { children: ReactNode }) => {
  const promiseRef = useRef<(value: "confirmed" | "canceled") => void>();

  const [{ isConfirmationModalVisible }, setState] = useState({
    isConfirmationModalVisible: false,
  });

  const showConfirmationModal = useCallback(
    () =>
      new Promise<"confirmed" | "canceled">((resolve) => {
        setState((state) => ({
          ...state,
          isConfirmationModalVisible: true,
        }));

        promiseRef.current = resolve;
      }),
    []
  );

  const handleOnConfirmConfirmationModal = useCallback(() => {
    setState((state) => ({
      ...state,
      isConfirmationModalVisible: false,
    }));

    if (promiseRef.current) {
      promiseRef.current("confirmed");
    }
  }, []);

  const handleOnCancelConfirmationModal = useCallback(() => {
    setState((state) => ({
      ...state,
      isConfirmationModalVisible: false,
    }));

    if (promiseRef.current) {
      promiseRef.current("canceled");
    }
  }, []);

  return (
    <ModalsContext.Provider value={{ showConfirmationModal }}>
      {children}
      {isConfirmationModalVisible && (
        <ConfirmationModal
          open
          onConfirm={handleOnConfirmConfirmationModal}
          onCancel={handleOnCancelConfirmationModal}
        />
      )}
    </ModalsContext.Provider>
  );
};
```

You can also promisify each specific Modal without having to rely on a global state like Context example above. You just need to create a hook to handle the modal and apply the same concepts. Example:

```tsx
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
```

Then on your app you pass those props directly to your modal such as:

```tsx
const ConfirmationModal = dynamic(
  () => import("@/components/modals/ConfirmationModal"),
  { ssr: false }
);

export default function Home() {
  const confirmationModal = useConfirmationModal();

  return (
    <>
      ...
      {confirmationModal.props.open && (
        <ConfirmationModal {...confirmationModal.props} />
      )}
    </>
  );
}
```



https://github.com/user-attachments/assets/a256358d-3443-47bf-8a84-7d19787772c0
