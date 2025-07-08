"use client";
import axios from "axios";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatRequestUrl } from "@/utils/env_utils";
import { convertFileToBlobUrl } from "@/utils/file_utils";

function Testing() {
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);
  const [blobKey, setBlobKey] = useState<string>("");
  const [blobType, setBlobType] = useState<string>("");

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
      const splat = `/api/v2/upload-${blobType}-new`;
      await axios.post(
        formatRequestUrl("netlify", splat),
        formData,
      );
      setUploadedFiles(null);
    }
  };

  const handleBlobTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlobType(e.target.value);
  };

  const handleBlobKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlobKey(e.target.value);
  };

  return (
    <>
      <h1>Hello, Testing!</h1>
      <section>
        <form
          className="grid grid-cols-1 gap-6 border-1 border-purple-500 bg-purple-50 p-6 rounded-md"
          onSubmit={submitUpload}
          encType="multipart/form-data"
        >
          <div>
            <label className="block font-bold mb-2" htmlFor="multiple_files">
              Upload multiple image files
            </label>
            <input
              onChange={uploadFiles}
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
        </form>

        <form className="grid grid-cols-1 gap-6 border-1 border-purple-500 bg-purple-50 p-6 rounded-md" onSubmit={submitUpload}>
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
        </form>

        <form
          id="get-blob-by-key"
          className="grid grid-cols-1 gap-6 border-1 border-purple-500 bg-purple-50 p-6 rounded-md"
        >
          <h3>Find Blob By Key</h3>
          <fieldset>
            <legend className="block font-semibold">Blob Type</legend>
            <div className="flex gap-4">
              <input
                type="radio"
                id="audio"
                name="type"
                value="audio"
                onChange={handleBlobTypeChange}
                checked={blobType === "audio"}
              />
              <label htmlFor="audio">Audio</label>
              <input
                type="radio"
                id="images"
                name="type"
                value="images"
                onChange={handleBlobTypeChange}
                checked={blobType === "images"}
              />
              <label htmlFor="images">Image</label>
            </div>
          </fieldset>
          <div>
            <label htmlFor="key" className="block font-semibold">
              Key
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                id="key"
                className="inline-block border-gray-300 bg-white rounded-sm cursor-pointer"
                placeholder="eg. mjk_Aloha.mp3, mjk_Aloha.png"
                onChange={handleBlobKeyChange}
                value={blobKey}
              />
            </div>
          </div>
          <p>
            Blob key is
            {" "}
            {blobKey}
          </p>
          {blobKey.endsWith(".png")
            && (
              <>
                <img
                  className="size-60 rounded-sm"
                  alt={`${blobKey}`}
                  src={formatRequestUrl("netlify", `/api/v2/blobs-new/${blobType}/${blobKey}`)}
                />
              </>
            )}

          {blobKey.endsWith(".mp3") && (
            <audio
              src={formatRequestUrl("netlify", `/api/v2/blobs-new/${blobType}/${blobKey}`)}
              controls
            >
            </audio>
          )}
        </form>
      </section>
    </>
  );
}

export default Testing;
