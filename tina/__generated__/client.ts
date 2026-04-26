import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '002fdcf56b6a127c86988d9614028e0b26e50750', queries,  });
export default client;
  