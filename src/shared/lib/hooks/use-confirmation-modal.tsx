/* eslint-disable no-spaced-func */
import React, { useCallback, useState } from "react";

import { Button } from "@/shared/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";

interface UseConfirmModalParams {
  title: string;
  description: string;
}

export const useConfirmModal = (params: UseConfirmModalParams): [() => React.JSX.Element, () => Promise<unknown>] => {
  const { title, description } = params;

  const [promise, setPromise] = useState<{ resolve: ((value: boolean) => void) } | null>(null);

  const confirm = useCallback(() => new Promise((resolve) => {
    setPromise({ resolve });
  }), []);

  const onClose = useCallback(() => setPromise(null), []);

  const onCancel = useCallback(() => {
    promise?.resolve(false);
    onClose();
  }, [promise, onClose]);

  const onConfirm = useCallback(() => {
    promise?.resolve(true);
    onClose();
  }, [promise, onClose]);

  const ConfirmDialog = useCallback(() => (
    <Dialog open={promise !== null} onOpenChange={onCancel}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onConfirm} variant="destructive">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ), [promise, title, description, onConfirm, onCancel]);

  return [ConfirmDialog, confirm] as const;
};
