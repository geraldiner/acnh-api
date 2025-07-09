import musicImageJson from "../../netlify/functions/music/music.json";

function getNetlifyBaseApiUrl() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8888"
    : (process.env.BASE_API_URL ?? null);
}

function getNextBaseApiUrl() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : (process.env.BASE_API_URL ?? null);
}

function formatRequestUrl(service: "next" | "netlify", splat: string) {
  const baseUrl =
    service === "next" ? getNextBaseApiUrl() : getNetlifyBaseApiUrl();
  return `${baseUrl ?? ""}${splat}`;
}

function getRandomImageKey() {
  const musicImageKeys = Object.keys(musicImageJson);
  return musicImageKeys[Math.floor(Math.random() * musicImageKeys.length)];
}

export {
  formatRequestUrl,
  getNetlifyBaseApiUrl,
  getNextBaseApiUrl,
  getRandomImageKey,
};
