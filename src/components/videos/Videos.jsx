import { useGetVideosQuery } from "../../features/api/apiSlice";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";
import Video from "./Video";

export default function Videos() {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  let content = null;

  //decide what to render
  if (isLoading) {
    // eslint-disable-next-line no-unused-vars
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }
  if (!isLoading && !isError && videos.length === 0) {
    content = <Error message="No videos found" />;
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video video={video} key={video.id} />);
  }

  return <>{content}</>;
}
