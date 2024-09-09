import { useGetWorkspaceById } from "../services/get-workspace/get-workspace-by-id";
import { useGetWorkspaces } from "../services/get-workspace/get-workspaces";

export type Workspace = ReturnType<typeof useGetWorkspaceById>["workspace"];
export type Workspaces = ReturnType<typeof useGetWorkspaces>["workspaces"];
