import { useParams } from "react-router-dom";

export default function Search () {
  const { keyword } = useParams();
  return (
    <>
      <h1>Search Component : {keyword}</h1>
    </>
  );
}