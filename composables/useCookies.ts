export function getCookie(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=')[1]) : null
}

export function setCookie(name: string, value: string, days?: number): void {
  let cookie = `${name}=${encodeURIComponent(value)}; path=/`
  if (days !== undefined) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    cookie += `; expires=${expires}`
  }
  document.cookie = cookie
}
