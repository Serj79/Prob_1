import { $host, $authHost } from "./index";

export const createIndication = async (dat,indicat_temp ) => {
    console.log('dat,indicat_temp',dat,indicat_temp)
    const { data } = await $authHost.post("api/indication", {dat,indicat_temp});
    return data;
  };
  
  export const fetchIndication  = async () => {
    const { data } = await $host.get("api/indication", );
    return data;
  };