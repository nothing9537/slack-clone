import { SignInSchemaType, SignUpSchemaType } from "../../model/types/auth-schemas.types";

export const isSignInSchema = (schema: any): schema is SignInSchemaType => {
  return !schema.confirmPassword;
};

export const isSignUpSchema = (schema: any): schema is SignUpSchemaType => {
  return Boolean(schema.confirmPassword);
};
