import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import fs from "fs";
import path from "path";

// Helper function to dynamically load all JSON files in the locale folder
async function loadLocaleMessages(locale: string) {
  const localeDir = path.resolve(`./locales/${locale}`);
  const messages: Record<string, any> = {};

  const files = fs.readdirSync(localeDir);

  for (const file of files) {
    const namespace = file.replace(".json", "");
    messages[namespace] = (
      await import(`../locales/${locale}/${namespace}.json`)
    ).default;
  }

  return messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Dynamically load all JSON files in the locale directory
  const messages = await loadLocaleMessages(locale);

  return {
    locale,
    messages,
  };
});
