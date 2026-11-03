// Asset files are bundled automatically when placed in src/assets/certifications.
// Missing assets simply use the accessible editorial illustration below.
const badgeAssets = import.meta.glob('../../assets/certifications/badges/*.webp', { eager: true, query: '?url', import: 'default' });
const previewAssets = import.meta.glob('../../assets/certifications/previews/*.webp', { eager: true, query: '?url', import: 'default' });
export const badgeFor = (id) => badgeAssets[`../../assets/certifications/badges/${id}.webp`];
export const previewFor = (id) => previewAssets[`../../assets/certifications/previews/${id}.webp`];
