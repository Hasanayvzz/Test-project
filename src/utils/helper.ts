import { UserData } from "@/types/auth";

export function decodeJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid JWT", e);
    return null;
  }
}

export function truncateText(text: any, startChars: number, endChars: number) {
  if (typeof text !== "string" || startChars < 0 || endChars < 0) {
    return text;
  }

  if (text.length <= startChars + endChars) {
    return text;
  }

  return text.slice(0, startChars) + ".." + text.slice(-endChars);
}
export function getFirstChars(fullName?: UserData["fullName"]): string {
  if (!fullName) return "";
  const words = fullName.trim().split(" ");
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  return (
    (words[0][0] || "").toUpperCase() +
    (words[words.length - 1][0] || "").toUpperCase()
  );
}
