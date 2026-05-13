const tamilMonths = [
  'ஜனவரி',
  'பிப்ரவரி',
  'மார்ச்',
  'ஏப்ரல்',
  'மே',
  'ஜூன்',
  'ஜூலை',
  'ஆகஸ்ட்',
  'செப்டம்பர்',
  'அக்டோபர்',
  'நவம்பர்',
  'டிசம்பர்',
];

export function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(date: Date) {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatEnglishMonth(date: Date) {
  return date.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });
}

export function formatTamilMonth(date: Date) {
  return `${tamilMonths[date.getMonth()]} ${date.getFullYear()}`;
}

export function parseDateInput(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return new Date();
  }

  return parsedDate;
}

export function isSameMonth(isoDate: string, date: Date) {
  const parsedDate = new Date(isoDate);

  return (
    parsedDate.getFullYear() === date.getFullYear() &&
    parsedDate.getMonth() === date.getMonth()
  );
}
