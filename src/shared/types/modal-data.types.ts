import { Workspace } from "@/entities/workspace";

export interface WorkspacePreferencesModalData {
  workspace?: NonNullable<Workspace>;
}

export interface Foo {
  foo: string;
}

export type ModalData = WorkspacePreferencesModalData | Foo;
