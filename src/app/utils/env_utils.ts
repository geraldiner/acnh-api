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

export { formatRequestUrl, getNetlifyBaseApiUrl, getNextBaseApiUrl };
