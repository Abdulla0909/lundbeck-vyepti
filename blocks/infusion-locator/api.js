// import { geocodeZip, centerMap } from "./map.js";
import mockdata from "./mockData.js";

const USE_MOCK_DATA = false;

export function getApiInfo(block) {
  const apiKeyElement = block.querySelector('#form-apikey');
  const apiEndpointElement = block.querySelector('#form-endpoint');
  const showInfusionCentersElement = block.querySelector('#form-infusion-center');
  const showHcpDataElement = block.querySelector('#form-hcp-data');
  const showFiltersElement = block.querySelector('#form-filter');


  if (!apiKeyElement || !apiEndpointElement) {
    return null;
  }

  const apiKey = apiKeyElement.textContent;
  const apiEndpoint = apiEndpointElement.textContent;

  const showInfusionCenters =
    showInfusionCentersElement?.textContent || '';

  const showHcpData =
    showHcpDataElement?.textContent || '';

  const showFilters =
    showFiltersElement?.textContent || '';
  [
    apiKeyElement,
    apiEndpointElement,
    showInfusionCentersElement,
    showHcpDataElement,
    showFiltersElement,
  ].forEach((element) => {
    element?.closest('.field-wrapper')?.remove();
  });

  return {
    apiKey,
    apiEndpoint,
    showInfusionCenters,
    showHcpData,
    showFilters,
  };
}

// export async function searchLocations(
//   zip,
//   settings,
//   apiInfo,
//   filters,
//   distance
// ) {
//   // const coords = await geocodeZip(zip);
//   // centerMap(coords, 10);

//   // if (USE_MOCK_DATA) {
//   //   return mockdata.result;
//   // }

//   // try {
//   //   const params = new URLSearchParams({
//   //     latitude: coords.lat,
//   //     longitude: coords.lng,
//   //     radius: distance,
//   //     showIC: settings.showInfusionCenters,
//   //     showHCPData: settings.showHcpData,
//   //   });

//   //   filters.forEach((filter) => {
//   //     params.append("filter", filter);
//   //   });


//   //   const response = await fetch(`${apiInfo.apiEndpoint}?${params}`, { method: "POST" });
//   //   //  const response = await fetch(`https://www.vyepti.com/api/picllocator?actionType=getLocatorRecords&showHcp=false&showIC=true`, { method: "POST" });

//   //   if (!response.ok) {
//   //     throw new Error(`API returned ${response.status}`);
//   //   }

//   //   const data = await response.json();

//   //   return data.results || data.providers || data || [];
//   // } catch (error) {
//   //   console.error(error);
//   //   return [];
//   // }

  
// }

export async function loadLocations(apiInfo, settings) {
  /*
   * Keep mock data for now.
   * We will switch this to false once the
   * on-load API flow is working.
   */
  if (USE_MOCK_DATA) {
    return mockdata.result || [];
  }

  try {
    const params = new URLSearchParams({
      actionType: 'getLocatorRecords',
      showHcp: String(settings.showHcpData).toLowerCase(),
      showIC: String(settings.showInfusionCenters).toLowerCase(),
    });

    const response = await fetch(
      `${apiInfo.apiEndpoint}?${params.toString()}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(
        `API returned ${response.status}`,
      );
    }

    const data = await response.json();
    
    return data.result || data.providers || data || [];
  } catch (error) {
    console.error(
      'Failed to load locator records:',
      error,
    );

    return [];
  }
}