import axios from "axios";
import { useRef, useState } from "react";
import { formatRequestUrl } from "@/utils/env_utils";
import Button from "./button";
import UploadPreviews from "./upload-previews";

type UploadFormProps = {
  blobType: string;
};

function UploadForm({ blobType }: UploadFormProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [serverMessage, setServerMessage] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const targetFiles = e.target.files;
      setUploadedFiles(() => {
        const files = [];
        for (const file of targetFiles) {
          files.push(file);
        }
        return files;
      });
    }
  };

  const handleSubmitUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploadedFiles && uploadedFiles.length) {
      try {
        const formData = new FormData();
        for (const file of uploadedFiles) {
          formData.append(file.name, file);
        }
        const splat = `/api-v2/upload-${blobType}`;
        const response = await axios.post(
          formatRequestUrl("netlify", splat),
          formData,
        );
        setServerMessage(response.data.message);
      } catch (error) {
        console.error(error);
      } finally {
        setUploadedFiles([]);
        formRef.current?.reset();
      }
    }
  };

  const typeText = blobType === "images" ? "image" : "audio";

  return (
    <form
      className="grid grid-cols-1 gap-6 border-1 border-purple-500 bg-purple-50 p-6 rounded-md"
      onSubmit={handleSubmitUpload}
      encType="multipart/form-data"
      ref={formRef}
    >
      <div>
        <label className="block font-bold mb-2" htmlFor="multiple_files">
          Upload multiple
          {" "}
          {typeText}
          {" "}
          files
        </label>
        <input
          onChange={handleUploadFiles}
          className="block w-full md:w-1/2 text-sm border border-gray-300 bg-white rounded-sm cursor-pointer file:bg-purple-500 file:text-white file:px-4 file:py-2"
          type="file"
          accept={blobType === "images" ? "image/*" : "audio/*"}
          multiple
        />
      </div>
      <UploadPreviews files={uploadedFiles} type={typeText} />
      <div className="w-full md:w-max">
        <Button disabled={!uploadedFiles || !uploadedFiles.length} type="submit">Upload!</Button>
      </div>
      {serverMessage && <p>{serverMessage}</p>}
    </form>
  ); }

export default UploadForm;
