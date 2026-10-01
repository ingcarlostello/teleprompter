type ClassValue = string | false | null | undefined

/** Joins truthy class names. */
export const cn = (...classes: ClassValue[]): string => classes.filter(Boolean).join(' ')
