export interface YouTubeVideo {
  id: string;
  title: string;
}

export interface YouTubeVideos {
  id: string;
  name: string;
  videos: YouTubeVideo[];
}
