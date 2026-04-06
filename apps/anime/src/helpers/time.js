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
