import { z } from "zod";

import { FormFactoryComponent } from "@/shared/lib/components/form-factory";

import { UpdateWorkspaceSchema } from "../../lib/consts/update-workspace-schema.consts";

export type UpdateWorkspaceSchemaType = z.infer<typeof UpdateWorkspaceSchema>;
export type UpdateWorkspaceComponent = FormFactoryComponent<UpdateWorkspaceSchemaType>;
