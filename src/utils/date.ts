import type { Language } from "../types/content";

const plural = (value: number, singular: string, pluralForm: string) =>
  `${value} ${value === 1 ? singular : pluralForm}`;

export function getCurrentAge(birthDate: string, today = new Date()): number {
  const birth = new Date(`${birthDate}T00:00:00`);
  let age = today.getFullYear() - birth.getFullYear();
  const birthdayThisYear = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (today < birthdayThisYear) age -= 1;
  return age;
}

export function getExperienceLabel(startDate: string, language: Language, today = new Date()): string {
  const start = new Date(`${startDate}T00:00:00`);
  let months = (today.getFullYear() - start.getFullYear()) * 12 + today.getMonth() - start.getMonth();
  if (today.getDate() < start.getDate()) months -= 1;
  months = Math.max(0, months);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const words = {
    en: { year: "year", years: "years", month: "month", months: "months" },
    pt: { year: "ano", years: "anos", month: "mes", months: "meses" },
    es: { year: "año", years: "años", month: "mes", months: "meses" },
  }[language];

  if (years < 1) return plural(months, words.month, words.months);
  if (remainingMonths === 0) return plural(years, words.year, words.years);
  return `${plural(years, words.year, words.years)} ${plural(remainingMonths, words.month, words.months)}`;
}
