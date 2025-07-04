"use client";
import Image from "next/image";

import { useState } from "react";
import { convertFileToBlobUrl } from "../utils/file_utils";

function Admin() {
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);

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

  const submitUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploadedFiles && uploadedFiles.length) {
      console.log("hello, world!");
    }
  };

  return (
    <>
      <h1>Hello, Admin!</h1>
      <section>
        <h2>API Assets File Upload</h2>
        <form className="border-1 border-purple-500 bg-purple-50 p-6 rounded-md" onSubmit={submitUpload}>
          <label className="block mb-4 font-bold" htmlFor="multiple_files">
            Upload multiple files
          </label>
          <input
            onChange={e => uploadFiles(e)}
            className="block w-full md:w-1/2 text-sm border border-gray-300 bg-white rounded-sm cursor-pointer file:bg-purple-500 file:text-white file:px-4 file:py-2"
            id="large_size"
            type="file"
            accept="image/*, audio/*"
            multiple
          />
          <div>
            <h3>Previews</h3>
            {uploadedFiles && uploadedFiles.length
              ? (
                  <ul className="w-full flex flex-wrap gap-4 my-4">
                    {uploadedFiles?.map((file) => {
                      return (
                        <li className="inline-block" key={file.name}>
                          {file.type.startsWith("audio")
                            ? (
                                <>
                                  <p>{file.name}</p>
                                  <audio controls>
                                    <source src={convertFileToBlobUrl(file)} type="audio/mpeg" />
                                  </audio>
                                </>
                              )
                            : (
                                <>
                                  <Image
                                    className="rounded-sm"
                                    width={96}
                                    height={96}
                                    alt={`${file.name}`}
                                    src={convertFileToBlobUrl(file)}
                                  />
                                </>
                              )}
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
        </form>
      </section>
    </>
  );
}

export default Admin;
