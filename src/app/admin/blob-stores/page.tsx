"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatRequestUrl } from "@/app/utils/env_utils";
import { convertBase64ToBlobUrl } from "@/app/utils/file_utils";

type BlobWithMetadata = {
  data: string;
  metadata: {
    type: string;
  };
};

const INITIAL_BLOB_STATE = {
  data: "",
  metadata: {
    type: "",
  },
};

function BlobStores() {
  const [blobStoresResponse, setBlobStoresResponse] = useState<any | null>(
    null
  );
  const [blobKey, setBlobKey] = useState<string>("");
  const [blobCategory, setBlobCategory] = useState<string>("");
  const [foundBlob, setFoundBlob] = useState<{
    findBlobByKey: BlobWithMetadata;
    getRandomImage: BlobWithMetadata;
  }>({
    findBlobByKey: INITIAL_BLOB_STATE,
    getRandomImage: INITIAL_BLOB_STATE,
  });
  const [serverMessage, setServerMessage] = useState({
    findBlobByKey: "",
    getRandomImage: "",
  });

  const findBlobByKeyFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchBlobStores = async () => {
      const splat = "/api/blob-stores";
      const response = await axios.get(formatRequestUrl("next", splat));
      setBlobStoresResponse(response);
    };
    fetchBlobStores();
  }, []);

  const handleBlobTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlobCategory(e.target.value);
    setFoundBlob((prev) => {
      return {
        ...prev,
        findBlobByKey: INITIAL_BLOB_STATE,
      };
    });
    setServerMessage((prev) => {
      return {
        ...prev,
        findBlobByKey: "",
      };
    });
    findBlobByKeyFormRef.current?.reset();
  };

  const handleBlobKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlobKey(e.target.value);
    setFoundBlob((prev) => {
      return {
        ...prev,
        findBlobByKey: INITIAL_BLOB_STATE,
      };
    });
    setServerMessage((prev) => {
      return {
        ...prev,
        findBlobByKey: "",
      };
    });
    findBlobByKeyFormRef.current?.reset();
  };

  const handleSubmitFindBlobByKey = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (blobKey && blobCategory) {
      const splat = `/api/blobs/${blobCategory}/`;
      const url = `${formatRequestUrl("next", splat)}${blobKey}`;
      const response = await axios.get(url);
      const data = response.data;
      setServerMessage((prev) => {
        return {
          ...prev,
          findBlobByKey: data.message,
        };
      });
      setFoundBlob((prev) => {
        return {
          ...prev,
          findBlobByKey: data.audioWithMetadata,
        };
      });
    }
  };

  const json = blobStoresResponse && JSON.parse(blobStoresResponse.data);

  return (
    <>
      <h1>Hello, Blob Stores!</h1>
      <section>
        <h2>Response info</h2>
        <p>
          {blobStoresResponse?.status}
          {" "}
          {blobStoresResponse?.statusText}
        </p>
      </section>
      {json && (
        <section>
          <h2>JSON data</h2>
          <p>
            Message:
            {json.message}
          </p>
          <p>Stores: </p>
          <ul className="ml-8 list-disc">
            {json.stores.map((store: string) => {
              return <li key={store}>{store}</li>;
            })}
          </ul>
        </section>
      )}

      <section>
        <h2>Blob Actions</h2>
        <form
          id="get-blob-by-key"
          ref={findBlobByKeyFormRef}
          className="grid grid-cols-1 gap-6 border-1 border-purple-500 bg-purple-50 p-6 rounded-md"
          onSubmit={handleSubmitFindBlobByKey}
        >
          <h3>Find Blob By Key</h3>
          <fieldset>
            <legend className="block font-semibold">Blob Type</legend>
            <div className="flex gap-4">
              <input
                type="radio"
                id="audio"
                name="category"
                value="audio"
                onChange={handleBlobTypeChange}
                checked={blobCategory === "audio"}
              />
              <label htmlFor="audio">Audio</label>
              <input
                type="radio"
                id="image"
                name="category"
                value="images"
                onChange={handleBlobTypeChange}
                checked={blobCategory === "images"}
              />
              <label htmlFor="image">Image</label>
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
              <button
                type="submit"
                disabled={!blobCategory || !blobKey}
                className="w-full md:w-max bg-purple-500 text-white px-4 py-2 rounded-sm disabled:bg-purple-300 disabled:cursor-not-allowed disabled:text-gray-50"
              >
                GET
              </button>
            </div>
          </div>
          {serverMessage.findBlobByKey && <p>{serverMessage.findBlobByKey}</p>}
          {foundBlob.findBlobByKey.metadata?.type.startsWith("audio")
            ? (
                <audio controls className="h-max">
                  <source
                    src={convertBase64ToBlobUrl(
                      foundBlob.findBlobByKey.data,
                      foundBlob.findBlobByKey.metadata.type
                    )}
                    type="audio/mpeg"
                  />
                </audio>
              )
            : foundBlob.findBlobByKey.metadata?.type.startsWith("image")
              ? (
                  <>
                    <Image
                      className="rounded-sm"
                      width={256}
                      height={128}
                      alt={`${blobKey}`}
                      src={convertBase64ToBlobUrl(foundBlob.findBlobByKey.data, foundBlob.findBlobByKey.metadata.type)}
                    />
                  </>
                )
              : null}
        </form>
      </section>
    </>
  );
}

export default BlobStores;
