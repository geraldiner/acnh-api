"use client";
import UploadForm from "@/components/upload-form";

function UploadImages() {
  return (
    <>
      <h1>Hello, Upload Images!</h1>
      <UploadForm blobType="images" />
    </>
  );
}

export default UploadImages;
