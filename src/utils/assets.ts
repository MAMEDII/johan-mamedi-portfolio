export function withBase(path: string): string {
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export const publicAsset = withBase;

export const logoPublicPaths = [
  withBase("assets/logo/mamedi-logo.webp"),
  withBase("assets/logo/mamedi-logo.png"),
];

export const photoPublicPaths = [
  withBase("assets/photo/johan-mamedi.webp"),
  withBase("assets/photo/johan-mamedi.png"),
];
