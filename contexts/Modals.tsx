"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const ConfirmationModal = dynamic(
  () => import("@/components/modals/ConfirmationModal"),
  { ssr: false }
);

const AgreementModal = dynamic(
  () => import("@/components/modals/AgreementModal"),
  { ssr: false }
);

const ModalsContext = createContext<{
  showConfirmationModal: () => Promise<"confirmed" | "canceled">;
  showAgreementModal: () => Promise<"agreed" | "canceled">;
}>({
  showConfirmationModal: () => new Promise(() => null),
  showAgreementModal: () => new Promise(() => null),
});

export const Modals = ({ children }: { children: ReactNode }) => {
  const promiseRefConfirmationModal =
    useRef<(value: "confirmed" | "canceled") => void>();

  const promiseRefAgreementModal =
    useRef<(value: "agreed" | "canceled") => void>();

  const [{ isConfirmationModalVisible, isAgreementModalVisible }, setState] =
    useState({
      isConfirmationModalVisible: false,
      isAgreementModalVisible: false,
    });

  const showConfirmationModal = useCallback(
    () =>
      new Promise<"confirmed" | "canceled">((resolve) => {
        setState((state) => ({
          ...state,
          isConfirmationModalVisible: true,
        }));

        promiseRefConfirmationModal.current = resolve;
      }),
    []
  );

  const handleOnConfirmConfirmationModal = useCallback(() => {
    setState((state) => ({
      ...state,
      isConfirmationModalVisible: false,
    }));

    if (promiseRefConfirmationModal.current) {
      promiseRefConfirmationModal.current("confirmed");
    }
  }, []);

  const handleOnCancelConfirmationModal = useCallback(() => {
    setState((state) => ({
      ...state,
      isConfirmationModalVisible: false,
    }));

    if (promiseRefConfirmationModal.current) {
      promiseRefConfirmationModal.current("canceled");
    }
  }, []);

  // ---

  const showAgreementModal = useCallback(
    () =>
      new Promise<"agreed" | "canceled">((resolve) => {
        setState((state) => ({
          ...state,
          isAgreementModalVisible: true,
        }));

        promiseRefAgreementModal.current = resolve;
      }),
    []
  );

  const handleOnAgreeAgreementModal = useCallback(() => {
    setState((state) => ({
      ...state,
      isAgreementModalVisible: false,
    }));

    if (promiseRefAgreementModal.current) {
      promiseRefAgreementModal.current("agreed");
    }
  }, []);

  const handleOnCancelAgreementModal = useCallback(() => {
    setState((state) => ({
      ...state,
      isAgreementModalVisible: false,
    }));

    if (promiseRefAgreementModal.current) {
      promiseRefAgreementModal.current("canceled");
    }
  }, []);

  const values = {
    showConfirmationModal,
    showAgreementModal,
  };

  return (
    <ModalsContext.Provider value={values}>
      {children}
      {isConfirmationModalVisible && (
        <ConfirmationModal
          open
          onConfirm={handleOnConfirmConfirmationModal}
          onCancel={handleOnCancelConfirmationModal}
        />
      )}
      {isAgreementModalVisible && (
        <AgreementModal
          open
          onAgree={handleOnAgreeAgreementModal}
          onCancel={handleOnCancelAgreementModal}
        />
      )}
    </ModalsContext.Provider>
  );
};

export const useModals = () => {
  return useContext(ModalsContext);
};
