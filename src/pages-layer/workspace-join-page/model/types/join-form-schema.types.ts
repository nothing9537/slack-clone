import { z } from "zod";

import { FormFactoryComponent } from "@/shared/lib/components";

import { JoinSchema } from "../../lib/consts/join-form-schema.consts";

export type JoinFormSchema = z.infer<typeof JoinSchema>;
export type JoinFormComponent = FormFactoryComponent<JoinFormSchema>;
