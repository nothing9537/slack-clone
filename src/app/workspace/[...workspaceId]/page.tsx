import { FC } from "react";

interface WorkspaceIDPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIDPage: FC<WorkspaceIDPageProps> = ({ params }) => {
  return (
    <div>
      Workspace with ID:
      {" "}
      {params.workspaceId}
    </div>
  );
};

export default WorkspaceIDPage;
