"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { formatRequestUrl, getRandomImageKey } from "@/utils/env_utils";
import { convertBase64ToBlobUrl } from "@/utils/file_utils";

function Home() {
  const [randomFileData, setRandomFileData] = useState<Record<string, any>>({});
  const [currentTimeData, setCurrentTimeData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRandomImage = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setRandomFileData({});
    setIsLoading(true);
    try {
      const splat = "/api/blobs/images/";
      const randomImageKey = getRandomImageKey();
      const url = `${formatRequestUrl("next", splat)}${randomImageKey}.png`;
      const response = await axios.get(url);
      const data = response.data;
      setRandomFileData(data);
    } catch (error) {
      console.error(error);
      setRandomFileData({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetRandomAudio = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setRandomFileData({});
    setIsLoading(true);
    try {
      const splat = "/api/blobs/audio/";
      const randomImageKey = getRandomImageKey();
      const url = `${formatRequestUrl("next", splat)}${randomImageKey}.mp3`;
      const response = await axios.get(url);
      const data = response.data;
      setRandomFileData(data);
    } catch (error) {
      console.error(error);
      setRandomFileData({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCurrentTimeData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const now = new Date();
      const hour = now.getHours();
      const splat = `/api/hourly-bgm/${hour}/sunny`;
      const response = await axios.get(formatRequestUrl("next", splat));
      setCurrentTimeData(response.data);
    } catch (error) {
      console.error(error);
      setCurrentTimeData({});
    } finally {
      setIsLoading(false);
    }
  };

  const { data, metadata } = randomFileData?.blobWithMetadata || {
    data: "",
    metadata: {},
  };

  return (
    <>
      <h1>ACNH API 2.0</h1>
      <p>
        This is a reboot of the ACNH API, initially created by Alexis Lours (
        <a
          href="https://github.com/alexislours"
          rel="noopener noreferrer"
          target="_blank"
        >
          @alexislours on GitHub
        </a>
        ).
      </p>
      <h2>Try an example</h2>
      <section className="grid grid-cols-1 gap-6">
        <section className="bg-yellow-50 border border-yellow-500  rounded-md p-6 grid grid-cols-1 gap-4">
          <h3>Get a random image or audio file</h3>
          <div className="flex flex-col md:flex-row justify-start items-center md:items-start gap-4">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleGetRandomImage}
              className="w-full md:w-max bg-purple-500 text-white px-4 py-2 rounded-sm disabled:bg-purple-300 disabled:cursor-not-allowed disabled:text-gray-50"
            >
              Get a random image
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleGetRandomAudio}
              className="w-full md:w-max bg-purple-500 text-white px-4 py-2 rounded-sm disabled:bg-purple-300 disabled:cursor-not-allowed disabled:text-gray-50"
            >
              Get a random audio
            </button>
          </div>
          {data && (
            <>
              <p>{randomFileData.message}</p>
              {metadata.type.startsWith("image") && (
                <Image
                  className="rounded-sm"
                  width={256}
                  height={256}
                  alt="Random image"
                  src={convertBase64ToBlobUrl(data, metadata.type)}
                />
              )}
              {metadata.type.startsWith("audio") && (
                <audio controls className="h-max">
                  <source
                    src={convertBase64ToBlobUrl(
                      data,
                      metadata.type
                    )}
                    type={metadata.type}
                  />
                </audio>
              )}
              <details>
                <summary>See response</summary>
                <pre>{JSON.stringify(randomFileData, null, 2)}</pre>
              </details>
            </>
          )}
        </section>
        <section className="bg-yellow-50 border border-yellow-500 rounded-md p-6 grid grid-cols-1 gap-4">
          <h3>Get data for a random object</h3>
          <div className="flex flex-col md:flex-row justify-start items-center md:items-start gap-4">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleGetCurrentTimeData}
              className="w-full md:w-max bg-purple-500 text-white px-4 py-2 rounded-sm disabled:bg-purple-300 disabled:cursor-not-allowed disabled:text-gray-50"
            >
              Get hourly BGM data for your current time
            </button>
          </div>
          {currentTimeData.message && (
            <>
              <p>{currentTimeData.message}</p>
              <details>
                <summary>See response</summary>
                <pre>{JSON.stringify(currentTimeData.hourData, null, 2)}</pre>
              </details>
            </>
          )}
        </section>
      </section>
    </>
  );
}

export default Home;
