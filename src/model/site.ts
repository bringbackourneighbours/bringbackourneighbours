const isDev = import.meta.env.DEV;

const localhostUrl = 'http://localhost:4321';
const prodUrl = 'https://bringbackourneighbours.de';
const prodLinkUrl = 'bbonlink.de';
export const basePath = '/';

export const siteUrl = isDev ? localhostUrl : prodUrl;

export const previewUrl = localhostUrl;
export const linkUrl = isDev ? `${localhostUrl}/link` : prodLinkUrl;
