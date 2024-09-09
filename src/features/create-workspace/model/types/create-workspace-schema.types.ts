import { z } from "zod";

import { FormFactoryComponent } from "@/shared/lib/components/form-factory";

import { CreateWorkspaceSchema } from "../../lib/consts/create-workspace-schema.consts";

export type CreateWorkspaceSchemaType = z.infer<typeof CreateWorkspaceSchema>;
export type CreateWorkspaceComponent = FormFactoryComponent<CreateWorkspaceSchemaType>;
