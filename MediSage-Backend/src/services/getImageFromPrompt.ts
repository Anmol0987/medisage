import axios from "axios";

export const getImageFromPrompt = async (
  imagePrompt: string
): Promise<string | null> => {
  try {
    console.log("inside getImageFromPrompt");
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: imagePrompt, per_page: 1 },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });
    console.log("inside getImageFromPrompt response", res);
    //@ts-ignore
    const imageUrl = res.data.results?.[0]?.urls?.regular;
    console.log("Fetched image URL:", imageUrl);
    return imageUrl;
  } catch (err: any) {
    console.error("Unsplash image fetch failed:", err.message);
    return null;
  }
};
