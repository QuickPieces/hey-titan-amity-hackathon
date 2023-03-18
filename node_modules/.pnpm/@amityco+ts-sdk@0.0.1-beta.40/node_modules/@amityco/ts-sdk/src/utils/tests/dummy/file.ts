import MockFormData from 'form-data';

export const file11: Amity.File<'image'> = {
  fileId: 'file-Id',
  fileUrl: 'https://fileUrl.com/test-file',
  type: 'image',
  createdAt: '2022-10-28T08:01:51.996Z',
  updatedAt: '2022-10-28T08:01:51.996Z',
  attributes: {
    name: 'test.png',
    extension: 'png',
    size: '166904',
    mimeType: 'image/png',
    metadata: {
      height: 966,
      width: 1918,
      isFull: false,
      exif: {},
      gps: {},
    },
  },
};

export const file12: Amity.File<'video'> = {
  fileId: 'file-Id-12',
  feedType: 'post',
  status: 'uploaded',
  fileUrl: 'https://fileUrl.com/test-file',
  type: 'video',
  createdAt: '2023-01-20T18:37:19.583Z',
  updatedAt: '2023-01-20T18:37:19.583Z',
  attributes: {
    name: 'test.mp4',
    extension: 'mp4',
    size: '3652304',
    mimeType: 'video/mp4',
    metadata: {},
  },
};

export const createFileFormData = () => {
  const fd = new MockFormData() as unknown as FormData;
  fd.append('files', 'file');
  fd.getAll = jest.fn().mockImplementation(() => ['file']);
  return fd;
};

export const createEmptyFormData = () => {
  const fd = new MockFormData() as unknown as FormData;
  fd.getAll = jest.fn().mockImplementation(() => []);
  return fd;
};
