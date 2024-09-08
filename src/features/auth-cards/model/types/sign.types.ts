export interface SignCallbackReturn {
  signingIn: boolean;
  redirect?: URL;
}

export type SignFlow = "signIn" | "signUp";

export interface BaseSignCardProps {
  switchCardsAction: () => void; // change card into a sign-(up/in) card
  flow: SignFlow;
}
