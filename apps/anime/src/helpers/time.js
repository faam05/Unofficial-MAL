export const formatTime = (seconds) => {
  const days = Math.floor(seconds / (3600 * 24))
  const hours = Math.floor((seconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  return { days, hours, minutes }
}

export const formatAiringTime = (seconds) => {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)

  if (d > 0) {
    // Jika masih ada hari, tampilkan Hari dan Jam
    return `${d} days, ${h} hours`
  } else {
    // Jika hari sudah 0, tampilkan Jam dan Menit
    return `${h} hours, ${m} mins`
  }
}

// Contoh penggunaan dengan data kamu:
// const { days, hours, minutes } = formatTime(200415)
// console.log(`${days}d ${hours}h ${minutes}m`)
// Hasil: 0d 8h 40m

export const getStartDayWeekRange = () => {
  // 1. Ambil waktu hari ini
  const start = new Date()
  // Set ke jam 00:00:00.000 (Waktu lokal user)
  start.setHours(0, 0, 0, 0)

  // 2. Buat waktu untuk 7 hari ke depan
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  // Set ke jam 23:59:59.999 (Waktu lokal user)
  end.setHours(23, 59, 59, 999)

  return {
    airingAtGreater: Math.floor(start.getTime() / 1000),
    airingAtLesser: Math.floor(end.getTime() / 1000),
  }
}
