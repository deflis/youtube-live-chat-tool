import Parser from "fast-xml-parser";
import fetch from "node-fetch";
import { YouTubeVideos } from "../interface/YouTubeVideos";
import { channelRssUrl } from "./youtube";

export const fetchYouTubeVideosByChannel = async (
  id: string
): Promise<YouTubeVideos> => {
  const res = await fetch(channelRssUrl(id));

  const rss = Parser.parse(await res.text(), {
    ignoreAttributes: false,
    ignoreNameSpace: true,
  });
  const videos = (rss.feed.entry as any[]).map((entry) => {
    const id = entry.videoId;
    const title = entry.title;
    return {
      title,
      id,
    };
  });
  return { id, name: rss.feed.title, videos };
};
