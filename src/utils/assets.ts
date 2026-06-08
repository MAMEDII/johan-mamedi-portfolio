export const publicAsset = (path: string): string => {
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

export const logoPublicPaths = [
  "/assets/logo/mamedi-logo.png",
  "/assets/logo/mamedi-logo.jpg",
  "/assets/logo/mamedi-logo.jpeg",
  "/assets/logo/mamedi-logo.webp",
];

export const photoPublicPaths = [
  "/assets/photo/johan-mamedi.png",
  "/assets/photo/johan-mamedi.jpg",
  "/assets/photo/johan-mamedi.jpeg",
  "/assets/photo/johan-mamedi.webp",
];
