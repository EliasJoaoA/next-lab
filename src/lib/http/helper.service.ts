export class HelperService {
  static formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
  }

  static currency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  static onlyNumbers(value: string): string {
    return value.replace(/\D/g, '')
  }

  static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
