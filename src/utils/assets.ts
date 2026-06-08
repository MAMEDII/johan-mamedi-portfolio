export function withBase(path: string): string {
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export const publicAsset = withBase;

export const logoPublicPaths = [
  withBase("assets/logo/mamedi-logo.png"),
  withBase("assets/logo/mamedi-logo.jpg"),
  withBase("assets/logo/mamedi-logo.jpeg"),
  withBase("assets/logo/mamedi-logo.webp"),
];

export const photoPublicPaths = [
  withBase("assets/photo/johan-mamedi.png"),
  withBase("assets/photo/johan-mamedi.jpg"),
  withBase("assets/photo/johan-mamedi.jpeg"),
  withBase("assets/photo/johan-mamedi.webp"),
];
