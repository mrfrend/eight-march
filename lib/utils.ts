import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Нормализация строки для сравнения ответов
export function normalizeAnswer(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}

// Проверка правильности ответа
export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  return normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);
}

// Задержка
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Случайное число в диапазоне
export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Перемешать массив (Fisher-Yates)
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
