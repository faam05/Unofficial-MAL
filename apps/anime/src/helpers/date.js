export const getCurrentSeasonInfo = () => {
  const now = new Date()
  const month = now.getMonth() // 0-11 (Januari adalah 0)
  const year = now.getFullYear()

  let season = ''

  // Logika pembagian bulan (0: Jan, 1: Feb, 2: Mar, dst)
  if (month >= 0 && month <= 2) {
    season = 'WINTER'
  } else if (month >= 3 && month <= 5) {
    season = 'SPRING'
  } else if (month >= 6 && month <= 8) {
    season = 'SUMMER'
  } else {
    season = 'FALL'
  }

  return { season, year }
}

export const formatStartDate = (startDate) => {
  const { day, month, year } = startDate

  // 1. Jika tahun saja tidak ada, anggap belum ada info (TBA)
  if (!year) return 'TBA'

  // 2. Jika ada Tahun, Bulan, dan Hari (Lengkap)
  if (year && month && day) {
    const date = new Date(year, month - 1, day)
    return new Intl.DateTimeFormat('en-EN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  // 3. Jika hanya ada Tahun dan Bulan (Kasus kamu)
  if (year && month && !day) {
    const date = new Date(year, month - 1)
    return new Intl.DateTimeFormat('en-EN', {
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  // 4. Jika hanya ada Tahun saja
  return year.toString()
}
