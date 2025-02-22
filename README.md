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

https://github.com/user-attachments/assets/a256358d-3443-47bf-8a84-7d19787772c0
