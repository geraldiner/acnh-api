"use client";
import axios from "axios";

import { useRef, useState } from "react";
import { formatRequestUrl } from "@/utils/env_utils";
import { convertFileToBase64, convertFileToBlobUrl } from "@/utils/file_utils";

function UploadAudio() {
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
      const data: Record<string, unknown> = {};
      for (const file of uploadedFiles) {
        const fileInBase64 = await convertFileToBase64(file) as string;
        const fileData = JSON.stringify({ fileInBase64, name: file.name, type: file.type });
        const fileKey = file.name;
        data[fileKey] = fileData;
      }
      const splat = "/api/upload-audio";
      const response = await axios.post(
        formatRequestUrl("next", splat),
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      formRef.current?.reset();
      setServerMessage(response.data.message);
      setUploadedFiles(null);
    }
  };

  return (
    <>
      <h1>Hello, UploadAudio!</h1>
      <section>
        <form ref={formRef} className="grid grid-cols-1 gap-6 border-1 border-purple-500 bg-purple-50 p-6 rounded-md" onSubmit={submitUpload}>
          <div>
            <label className="block font-bold mb-2" htmlFor="multiple_files">
              Upload multiple audio files
            </label>
            <input
              onChange={e => uploadFiles(e)}
              className="block w-full md:w-1/2 text-sm border border-gray-300 bg-white rounded-sm cursor-pointer file:bg-purple-500 file:text-white file:px-4 file:py-2"
              type="file"
              accept="audio/*"
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
                            <p>{file.name}</p>
                            <audio controls>
                              <source src={convertFileToBlobUrl(file)} type="audio/mpeg" />
                            </audio>
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
            className="w-full md:w-max bg-purple-500 text-white px-4 py-2 rounded-sm disabled:bg-purple-300 disabled:cursor-not-allowed disabled:text-gray-50"
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

export default UploadAudio;
