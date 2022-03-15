export function pluralize(singular: string, plural: string, count: number) {
  return count === 1 ? singular : plural;
}

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
