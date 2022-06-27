// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, writeJSON, removeFile } from './flat/mod.ts' 
try {
  // Step 1: Read the downloaded_filename JSON
  const filename = Deno.args[0] 
  const json = await readJSON(filename)
  console.log(Deno.args);
  console.log(json)

  // Step 2: Filter specific data we want to keep and write to a new JSON file
  const newJson = {
    ...json.location,
    ...json.current,
    ...json.current.condition
  };

  delete newJson.condition;

  // Step 3. Write a new JSON file with our formated data
  await writeJSON(filename, [newJson]) // create a new JSON file with just the Bitcoin price
  console.log("Wrote a post process file")

} catch (err) {
  console.error(err);
}
