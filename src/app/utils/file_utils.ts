function convertFileToBlobUrl(file: File) {
  const blob = new Blob([file]);
  const url = URL.createObjectURL(blob);
  return url;
}

export { convertFileToBlobUrl };
