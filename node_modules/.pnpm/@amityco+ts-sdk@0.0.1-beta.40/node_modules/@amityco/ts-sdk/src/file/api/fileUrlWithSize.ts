/**
 * Allow to query a file url with a selected size
 *
 * @param fileUrl the file Url to decorate
 * @param size one of the selected sizes
 * @returns the computed url for the selected size
 */
export const fileUrlWithSize = (
  fileUrl: Amity.File['fileUrl'],
  size: 'small' | 'medium' | 'large' | 'full',
) => {
  return `${fileUrl}?size=${size}`;
};
