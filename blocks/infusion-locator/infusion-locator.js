import { getSettings } from '../../scripts/config.js';
import  createLayout  from './layout.js';
// import { initializeAutocomplete, initializeMap } from './map.js'; 'THis should be in comment till wre get end point'
import { initializeMap } from './map.js';
import { getApiInfo, 
    loadLocations,
 } from './api.js';
import registerEvents from './events.js';
import { initCustomDropdown } from './dropdown.js';
import getElements from './ui.js';
import { loadPdfMake } from './layout/pdf.js';

async function renderForm(block) {
  const formModule = await import('../form/form.js');
  await formModule.default(block);
}

function initializeDropdowns(ui) {
  ui.distanceDropdown = initCustomDropdown(
    ui.mileBlock,
    'select',
  );
}

await loadPdfMake();

export default async function decorate(block) {
  /*
   * 1. Render form
   */
  await renderForm(block);

  /*
   * 2. Get API information
   */
  const apiInfo = getApiInfo(block);

   /*
   * 3. Get settings
   */
  const settings = getSettings(block, apiInfo);

   /*
   * 4. Load all facility data on page load
   */
  const allLocations = await loadLocations(
    apiInfo,
    settings,
  );

   console.log(
    'All locations loaded:',
    allLocations,
  );


   /*
   * 5. Create layout
   */
  await createLayout(block);


/*
   * 6. Initialize map
   */
  await initializeMap(
    apiInfo.apiKey,
  );


 //  It will in commented until we get the Proper End points
  // const zipInput = block.querySelector('#form-zipcode');
  // const autocomplete = initializeAutocomplete(zipInput);


  /*
 * 7. Get UI elements
   */
  const ui = getElements(block);

  
  /*
   * 8. Initialize dropdowns
   */
  initializeDropdowns(ui);

  registerEvents({
    block,
    ui,
    settings,
    apiInfo,
    allLocations,
  });
}




