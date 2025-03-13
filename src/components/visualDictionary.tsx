const VisualDictionary = () => {
  return (
    <div className="container-full">
      <div className="flex justify-center py-10 bg-[#f1553f24]">
        <div>
          <div className="flex gap-2 justify-center">
            <img className="w-8 h-8" src="src/assets/861627.png" alt="" />
            <h1 className="text-black font-bold text-xl">Visual Dictionary</h1>
          </div>
          <input
            className="bg-[#fafafa] border border-[#f1543fc1] rounded p-3 w-150 mt-8"
            type="text"
            name=""
            placeholder="Search a word..."
          />
        </div>
      </div>

      <div className="flex flex-col justify-center text-center shadow w-150 mx-auto my-10 border border-[#e2e2e2] rounded p-3">
        <div className="flex justify-center">
          <img className="w-40 rounded" src="" alt="" />
        </div>
        <h2 className="font-bold">Meaning:</h2>
        <p className="font-bold">synonyms:</p>
      </div>
    </div>
  );
};

export default VisualDictionary;
