
// Function for the brightcove script tag integration for the video rendering
export function getBrightcoveScriptTag(accountId, playerId) {
  const script = document.createElement('script');
  script.src = `https://players.brightcove.net/${accountId}/${playerId}_default/index.min.js`;
  script.async = true;
  document.body.append(script);
}

// Code Starts for locator block configuration
export const DEFAULT_DISTANCES = ['5', '10', '25', '50','100', '200', '400'];

/**
* Evaluates truthy string configurations into booleans.
*/
export function parseBool(value, fallback) {
  if (value === undefined) return fallback;
  return /^(true|yes|1|on)$/i.test(value);
}


export function getSettings(block, apiInfo) {
   return {
    apiKey: apiInfo.apiKey,
    apiEndpoint: apiInfo.apiEndpoint,
    showInfusionCenters: parseBool(apiInfo.showInfusionCenters, true),
    showHcpData: parseBool(apiInfo.showHcpData, false),
    showFilters: parseBool(apiInfo.showFilters, false),
    distances: apiInfo.distances
      ? apiInfo.distances.split(',').map((d) => d.trim())
      : DEFAULT_DISTANCES,
  };
}
// Code Ends for locator block configuration