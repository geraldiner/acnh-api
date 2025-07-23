"use client";

import axios from "axios";
import { useState } from "react";
import AudioPlayer from "@/components/audio-player";
import Button from "@/components/button";
import ImageTile from "@/components/image-tile";
import { formatRequestUrl, getRandomImageKey } from "@/utils/env_utils";

function Home() {
  const [randomFileName, setRandomFileName] = useState("");
  const [randomSrc, setRandomSrc] = useState("");
  const [currentTimeData, setCurrentTimeData] = useState<Record<string, any>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRandomAsset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRandomSrc("");
    const type = e.currentTarget.textContent?.includes("image")
      ? "images"
      : e.currentTarget.textContent?.includes("audio")
        ? "audio"
        : null;
    if (type) {
      const ext = type === "images" ? ".png" : ".mp3";
      const randomImageKey = `${getRandomImageKey()}${ext}`;
      const splat = `/api-v2/blobs/${type}/${randomImageKey}`;
      const url = `${formatRequestUrl("netlify", splat)}`;
      setRandomSrc(url);
      setRandomFileName(randomImageKey);
    }
  };

  const handleGetCurrentTimeData = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const now = new Date();
      const hour = now.getHours();
      const splat = `/api-v2/hourly-bgm/${hour}/sunny`;
      const response = await axios.get(formatRequestUrl("netlify", splat));
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
      <h1>Welcome to ACNH API 2.0</h1>
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
          <p>
            Image and audio files are stored in Netlify Blobs. You can access
            them at
            {" "}
            <code>https://acnh-api.netlify.app/api-v2/blobs/:type/:key</code>
            , where
            {" "}
            <code>:type</code>
            {" "}
            is either
            {" "}
            <code>audio</code>
            {" "}
            or
            {" "}
            <code>images</code>
            , and
            <code>:key</code>
            {" "}
            is the file name.
          </p>
          <p>
            You should be able to set that URL as the
            {" "}
            <code>src</code>
            {" "}
            on
            {" "}
            <code>img</code>
            {" "}
            and
            <code>audio</code>
            {" "}
            elements.
          </p>
          <div className="flex flex-col md:flex-row justify-start items-center md:items-start gap-4">
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleGetRandomAsset}
            >
              Get a random image
            </Button>
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleGetRandomAsset}
            >
              Get a random audio
            </Button>
          </div>
          <p>{randomFileName}</p>
          {randomSrc && (
            <>
              {randomSrc.endsWith(".png") && (
                <ImageTile
                  alt={randomFileName}
                  src={randomSrc}
                />
              )}
              {randomSrc.endsWith(".mp3") && (
                <AudioPlayer src={randomSrc} />
              )}
            </>
          )}
        </section>
        <section className="bg-yellow-50 border border-yellow-500 rounded-md p-6 grid grid-cols-1 gap-4">
          <h3>Get data for a random object</h3>
          <div className="flex flex-col md:flex-row justify-start items-center md:items-start gap-4">
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleGetCurrentTimeData}
            >
              Get hourly BGM data for your current time
            </Button>
          </div>
          {currentTimeData.message && (
            <>
              <p>{currentTimeData.message}</p>
              <AudioPlayer src={formatRequestUrl(
                "netlify",
                `/api-v2/blobs/audio/${currentTimeData.hourData["file-name"]}.mp3`
              )}
              />
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
