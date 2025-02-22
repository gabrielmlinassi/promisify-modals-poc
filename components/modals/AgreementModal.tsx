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

export const AgreementModal = ({
  children,
  onAgree,
  onCancel,
  ...props
}: {
  children?: ReactNode;
  onAgree?: () => void;
  onCancel?: () => void;
} & DialogProps) => {
  return (
    <Dialog {...props}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Agreement Modal</DialogTitle>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
            ullam officia non vero nostrum sapiente sint obcaecati dolorum
            magnam at deleniti accusamus beatae excepturi, alias illum deserunt
            laboriosam nulla quibusdam! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Minus delectus quasi esse eveniet illo tempore
            beatae, cupiditate maiores saepe nihil, minima, dolores ut est odio
            consequuntur qui ipsum veniam? Corrupti!
          </p>
          <Button onClick={onAgree}>Agree</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AgreementModal;
