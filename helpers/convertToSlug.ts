import unidecode from "unidecode";
export const convertToSlug = (text: string): string => {
  const unideCodeText = unidecode(text.trim());
  const slug: string = unideCodeText.replace(/\s+/g, "-");
  return slug;
};
