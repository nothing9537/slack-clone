export const convertURLsIntoFiles = async (urls: string[]) => {
  const fetchPromises: Promise<Response>[] = [];
  const blobPromises: Promise<Blob>[] = [];
  const files: File[] = [];

  urls.forEach((url) => {
    fetchPromises.push(fetch(url));
  });

  const responses = await Promise.all(fetchPromises);

  responses.forEach((res) => {
    blobPromises.push(res.blob());
  });

  const blobs = await Promise.all(blobPromises);

  blobs.forEach((blob, index) => {
    const splittedUrl = urls[index].split("/");

    const filename = splittedUrl[splittedUrl.length - 1];
    const mimeType = blob.type || responses[index].headers.get("Content-Type") || "application/octet-stream";

    files.push(new File([blob], filename, { type: mimeType }));
  });

  return files;
};
