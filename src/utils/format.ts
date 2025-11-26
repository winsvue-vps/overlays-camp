export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
export const formatDate = (date: Date | string, language: string) => {
  let inputDate = date;
  if (typeof date === 'string') inputDate = new Date(date);
  return Intl.DateTimeFormat(language).format(inputDate as Date);
};
