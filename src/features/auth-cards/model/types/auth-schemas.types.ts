import { z } from "zod";

import { FormFactoryComponent } from "@/shared/lib/components/form-factory";
import { SignInSchema, SignUpSchema } from "../../lib/consts/auth-schemas.consts";

export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export type SignInComponent = FormFactoryComponent<SignInSchemaType>;
export type SignUpComponent = FormFactoryComponent<SignUpSchemaType>;

export type AuthType = "github" | "google";
