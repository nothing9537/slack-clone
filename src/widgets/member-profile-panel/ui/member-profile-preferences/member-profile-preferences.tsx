import { FC, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Member, PopulatedMember, UpdateMemberForm, useDeleteMember } from "@/entities/member";
import { useProfileMemberId } from "@/entities/message";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useConfirmModal } from "@/shared/lib/hooks";
import { usePanel } from "@/shared/lib/hooks/use-panel";
import { Button } from "@/shared/ui/button";

interface MemberProfilePreferencesProps {
  member: NonNullable<PopulatedMember>;
  currentMember: NonNullable<Member>;
  isCurrentMemberAdmin: boolean;
}

export const MemberProfilePreferences: FC<MemberProfilePreferencesProps> = ({ member, currentMember, isCurrentMemberAdmin }) => {
  const wetherVisibleMemberCurrentMember = member._id === currentMember._id;
  const { onPanelClose } = usePanel(useProfileMemberId);
  const router = useRouter();

  const handleRemove = useDeleteMember(member._id, {
    onSuccess: () => {
      toast.success("Member action.", {
        description: "Successfully kicked member.",
      });

      onPanelClose();
    },
    onError: (errorMessage) => {
      toast.error("Member action", {
        description: errorMessage,
      });
    },
  });

  const [ConfirmKickDialog, confirmKick] = useConfirmModal({
    title: "Are you want to kick this member?",
    description: "This user will no longer be able to view messages, post in chat, or have private conversations until you or someone else shares the invitation code with them. This action cannot be undone.",
  });

  const [ConfirmLeaveDialog, confirmLeave] = useConfirmModal({
    title: "Are you want to leave from this workspace?",
    description: "You will no longer be able to view, write any messages in this workspace. To return to this workspace, access it using the invitation code.",
  });

  const handleKick = useCallback(async () => {
    const isKickConfirmed = await confirmKick();

    if (!isKickConfirmed) {
      return;
    }

    handleRemove();
  }, [confirmKick, handleRemove]);

  const handleLeave = useCallback(async () => {
    const isKickConfirmed = await confirmLeave();

    if (!isKickConfirmed) {
      return;
    }

    handleRemove().then(() => {
      router.push("/");
    });
  }, [confirmLeave, handleRemove, router]);

  return (

    <>
      <ConfirmKickDialog />
      <ConfirmLeaveDialog />
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        {(isCurrentMemberAdmin && !wetherVisibleMemberCurrentMember) && (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full capitalize font-semibold">
                  {member.role}
                  {" "}
                  <ChevronDown className="size-4 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <UpdateMemberForm memberId={member._id} defaultValue={member.role} />
              </PopoverContent>
            </Popover>
            <Button variant="destructive" className="w-full font-semibold" onClick={handleKick}>
              Kick
            </Button>
          </>
        )}
        {!isCurrentMemberAdmin && wetherVisibleMemberCurrentMember && (
          <Button variant="destructive" className="w-full font-semibold" onClick={handleLeave}>
            Leave workspace
          </Button>
        )}
      </div>
    </>
  );
};
