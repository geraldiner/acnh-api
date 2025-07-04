"use client";
import axios from "axios";

import Image from "next/image";
import { useRef, useState } from "react";
import { convertFileToBlobUrl } from "@/app/utils/file_utils";

function UploadImages() {
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);
  const [serverMessage, setServerMessage] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const submitUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploadedFiles && uploadedFiles.length) {
      const formData = new FormData();
      for (const file of uploadedFiles) {
        formData.append(file.name, file);
      }
      const response = await axios.post(
        "http://localhost:3000/api/upload-images",
        formData,
      );
      formRef.current?.reset();
      setServerMessage(response.data.message);
      setUploadedFiles(null);
    }
  };

  return (
    <>
      <h1>Hello, UploadImages!</h1>
      <section>
        <form
          ref={formRef}
          className="grid grid-cols-1 gap-6 border-1 border-purple-500 bg-purple-50 p-6 rounded-md"
          onSubmit={e => submitUpload(e)}
        >
          <div>
            <label className="block font-bold mb-2" htmlFor="multiple_files">
              Upload multiple image files
            </label>
            <input
              onChange={e => uploadFiles(e)}
              className="block w-full md:w-1/2 text-sm border border-gray-300 bg-white rounded-sm cursor-pointer file:bg-purple-500 file:text-white file:px-4 file:py-2"
              type="file"
              accept="image/*"
              multiple
            />
          </div>
          <div>
            <h3>Previews</h3>
            {uploadedFiles && uploadedFiles.length
              ? (
                  <ul className="w-full flex flex-wrap gap-4 my-4">
                    {uploadedFiles?.map((file) => {
                      return (
                        <li className="inline-block" key={file.name}>
                          <>
                            <Image
                              className="rounded-sm"
                              width={96}
                              height={96}
                              alt={`${file.name}`}
                              src={convertFileToBlobUrl(file)}
                            />
                          </>
                        </li>
                      );
                    })}
                  </ul>
                )
              : (
                  <p>Upload files to see previews here.</p>
                )}
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-sm disabled:bg-purple-300 disabled:cursor-not-allowed disabled:text-gray-50"
            disabled={!uploadedFiles || !uploadedFiles.length}
          >
            Upload!
          </button>
          {serverMessage && <p>{serverMessage}</p>}
        </form>
      </section>
    </>
  );
}

export default UploadImages;
