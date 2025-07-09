function addLeadingZero(str: string) {
  if (str.length === 1) {
    return `0${str}`;
  }
  return str;
}

/**
 * Hack to use params structure without setting in config
 * since I'm too dumb to figure it out x.x
 */
function parseParamsFromContext(url: string, splat: string) {
  return url.split(splat)[1].split("/");
}

function titleCase(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export { addLeadingZero, parseParamsFromContext, titleCase };
