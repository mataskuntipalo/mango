export const getPathName = (url: string): string => {
  try {
    return `/${new URL(url).href.split('/').pop()}` || '';
  } catch (error: any) {
    return url;
  }
};
