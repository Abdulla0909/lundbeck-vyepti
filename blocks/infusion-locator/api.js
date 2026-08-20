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

export async function loadLocations(apiInfo, settings) {

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