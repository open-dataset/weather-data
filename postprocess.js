// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, writeJSON, removeFile } from './flat/mod.ts' 
try {
  // Step 1: Read the downloaded_filename JSON
  const allfilename = './data/all.json';
  const filename = Deno.args[0] 
  const json = await readJSON(filename)
  const allJson = (await readJSON(allfilename)) || []
  console.log(Deno.args);

  // Step 2: Filter specific data we want to keep and write to a new JSON file
  const newJson = {
    ...json.location,
    ...json.current,
    ...json.current.condition
  };

  delete newJson.condition;

  const index = allJson.findIndex(({ name }) => name === newJson.name)

  if (index === -1) {
     await writeJSON(allfilename, [...allJson, newJson]) // create a new JSON file with just the Bitcoin price
  } else {
     allJson[index] = newJson;
     await writeJSON(allfilename, allJson) // create a new JSON file with just the Bitcoin price
  }
  // Step 3. Write a new JSON file with our formated data
  await writeJSON(filename, newJson) // create a new JSON file with just the Bitcoin price
  console.log("Wrote a post process file")

} catch (err) {
  console.error(err);
}
