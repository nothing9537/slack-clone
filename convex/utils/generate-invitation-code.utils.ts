export const generateInvitationCode = () => {
  const code = Array
    .from({ length: 6 }, () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)])
    .join("");

  return code.toUpperCase();
};
