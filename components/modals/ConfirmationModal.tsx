import { DialogProps } from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const ConfirmationModal = ({
  children,
  onConfirm,
  onCancel,
  ...props
}: {
  children?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
} & DialogProps) => {
  return (
    <Dialog {...props}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Confirmation Modal</DialogTitle>
          <Button onClick={onConfirm}>Confirm</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ConfirmationModal;
