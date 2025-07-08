"use client";

import axios from "axios";
import { useState } from "react";
import { formatRequestUrl, getRandomImageKey } from "@/utils/env_utils";

function Home() {
  const [randomSrc, setRandomSrc] = useState("");
  const [currentTimeData, setCurrentTimeData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRandomImage = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const randomImageKey = getRandomImageKey();
      const splat = `/api/v2/blobs-new/images/${randomImageKey}.png`;
      const url = `${formatRequestUrl("netlify", splat)}`;
      setRandomSrc(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetRandomAudio = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const randomImageKey = getRandomImageKey();
      const splat = `/api/v2/blobs-new/audio/${randomImageKey}.mp3`;
      const url = `${formatRequestUrl("netlify", splat)}`;
      setRandomSrc(url);
    } catch (error) {
      console.error(error);
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
          {randomSrc && (
            <>
              {randomSrc.endsWith(".png")
                && (
                  <>
                    <img
                      className="size-60 rounded-sm"
                      alt={`${randomSrc}`}
                      src={randomSrc}
                    />
                  </>
                )}

              {randomSrc.endsWith(".mp3") && (
                <audio
                  src={randomSrc}
                  controls
                >
                </audio>
              )}
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
