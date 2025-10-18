// placeholder
import { v4 as uuidv4 } from 'uuid';
import { Coordinates } from './types.js';

// UUID generation
export const generateId = (): string => {
  return uuidv4();
};

// Time utilities
export const getCurrentTimestamp = (): Date => {
  return new Date();
};

export const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000);
};

export const addHours = (date: Date, hours: number): Date => {
  return addMinutes(date, hours * 60);
};

export const addDays = (date: Date, days: number): Date => {
  return new Date(date.getTime() + days * 86400000);
};

export const getMinutesUntil = (futureDate: Date): number => {
  const now = new Date();
  return Math.max(0, Math.floor((futureDate.getTime() - now.getTime()) / 60000));
};

// Distance calculation (Haversine formula)
export const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Normalization utilities for scoring
export const normalize = (value: number, min: number, max: number): number => {
  if (max === min) return 0.5;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
};

export const normalizeInverse = (value: number, min: number, max: number): number => {
  return 1 - normalize(value, min, max);
};

// Price formatting
export const formatPrice = (price: number, currency: string = 'NGN'): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Duration formatting
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  
  if (hours === 0) {
    return `${mins}min`;
  }
  
  if (mins === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${mins}min`;
};

// Percentage formatting
export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

// Random number generation
export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const randomInt = (min: number, max: number): number => {
  return Math.floor(randomBetween(min, max + 1));
};

// Delay utility (for simulations)
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const randomDelay = (minMs: number, maxMs: number): Promise<void> => {
  return delay(randomInt(minMs, maxMs));
};

// Object utilities
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
};

export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

// Array utilities
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Retry utility
export const retry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError: Error | undefined;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await delay(delayMs * attempt);
      }
    }
  }
  
  throw lastError;
};

// Safe JSON parse
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};

// Calculate weighted average
export const weightedAverage = (values: number[], weights: number[]): number => {
  if (values.length !== weights.length) {
    throw new Error('Values and weights must have the same length');
  }
  
  const sum = values.reduce((acc, val, idx) => acc + val * weights[idx], 0);
  const totalWeight = weights.reduce((acc, w) => acc + w, 0);
  
  return totalWeight === 0 ? 0 : sum / totalWeight;
};

// Rush hour detection
export const isRushHour = (date: Date, morningStart: number, morningEnd: number, eveningStart: number, eveningEnd: number): boolean => {
  const hour = date.getHours();
  return (hour >= morningStart && hour < morningEnd) || (hour >= eveningStart && hour < eveningEnd);
};

// Generate correlation ID for tracking requests
export const generateCorrelationId = (): string => {
  return `${Date.now()}-${generateId().substring(0, 8)}`;
};