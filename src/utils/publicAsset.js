// Vite supplies BASE_URL in the app; metadata generation also imports the data in Node.
export function publicAsset(path) {
  return `${import.meta.env?.BASE_URL ?? '/'}${path.replace(/^\/+/, '')}`
}
