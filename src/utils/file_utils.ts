function convertFileToBlobUrl(file: File) {
  const blob = new Blob([file]);
  const url = URL.createObjectURL(blob);
  return url;
}

function convertFileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

function convertBase64ToBlobUrl(dataURI: string, contentType: string) {
  const BASE64_MARKER = ";base64,";
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  const blob = new Blob([array], { type: contentType });
  const blobUrl = URL.createObjectURL(blob);
  return blobUrl;
}

export { convertBase64ToBlobUrl, convertFileToBase64, convertFileToBlobUrl };
