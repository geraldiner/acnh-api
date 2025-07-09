"use client";
import UploadForm from "@/components/upload-form";

function UploadAudio() {
  return (
    <>
      <h1>Hello, Upload Audio!</h1>
      <UploadForm blobType="audio" />
    </>
  );
}

export default UploadAudio;
