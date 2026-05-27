import { useZenticStore } from "./store";
import { translations } from "./translations";

export function useTranslation() {
  const lang = useZenticStore((s) => s.selectedLanguage);
  return translations[lang];
}
