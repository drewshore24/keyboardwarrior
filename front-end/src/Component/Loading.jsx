import "../../src/loading.css";
const Loading = () => {
  return (
    <>
      <img className="loading" src="src/images/loading.svg"></img>
      <br />
      <span>Loading</span>
      <span className="loading-1">.</span>
      <span className="loading-2">.</span>
      <span className="loading-3">.</span>
    </>
  );
};

export default Loading;
