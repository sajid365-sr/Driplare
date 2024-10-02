import { client } from "@/sanity/lib/client";

const GetBanner = async () => {
  const bannerQuery = '*[_type=="bannerText"]';
  try {
    const banner = await client.fetch(bannerQuery);

    return banner;
  } catch (error) {
    console.log(error);
  }
};

export default GetBanner;
