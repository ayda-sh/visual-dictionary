import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Meaning, Image } from "../../lib/axios";


interface Definition {
  definition: string;
  synonyms: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface MeaningData {
  meanings: Meaning[];
}

const VisualDictionary = () => {
  const [word, setWord] = useState<string>('');
  const [filteredWord, setFilteredWord] = useState<string>('');

 
  const { data: meaningData, isLoading: meaningLoading } = useQuery<MeaningData[]>({
    queryKey: ["meaning", filteredWord],
    queryFn: () => Meaning(filteredWord),
 
  });



  
  const { data: imageData, isLoading: imageLoading } = useQuery<string | undefined>({
    queryKey: ["image", filteredWord],
    queryFn: () => Image(filteredWord),
    
  });

  
  const submitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const searchValue = e.target.value;
    setWord(searchValue);
    setFilteredWord(searchValue);
    
  };

  return (
    <div className="container-full">
      <form onChange={submitHandler }>
        <div className="flex justify-center py-10 bg-[#f1553f24]">
          <div>
            <div className="flex gap-2 justify-center">
              <img className="w-8 h-8" src="src/assets/861627.png" alt="" />
              <h1 className="text-black font-bold text-xl">Visual Dictionary</h1>
            </div>
            <input
              onChange={submitHandler}
              className="bg-[#fafafa] border border-[#f1543fc1] rounded p-3 w-150 mt-8"
              type="text"
              value={word}
              placeholder="Search a word..."
            />
          </div>
        </div>

        <div className="flex flex-col justify-center text-center shadow w-150 mx-auto my-10 border border-[#e2e2e2] rounded p-3">
          {imageLoading ? (
             <div role="status" className=" flex justify-center">
             <svg
               aria-hidden="true"
               className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
               viewBox="0 0 100 101"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                 fill="currentColor"
               />
               <path
                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                 fill="currentFill"
               />
             </svg>
             <span className="sr-only">Loading...</span>
           </div>
          ) : imageData ? (
            <div className="flex justify-center">
              <img className="w-40 rounded" src={imageData} />
            </div>
          ) : null}
          
          <h2 className="font-bold">Meaning:</h2>
          {meaningLoading ? (
            <p>Loading meanings...</p>
          ) : meaningData && Array.isArray(meaningData) && meaningData.length > 0 ? (
            meaningData.map((meaning, index) => {
              const definitions = meaning.meanings[0]?.definitions || [];

              return (
                <div key={index}>
                  {definitions.length > 0 ? (
                    definitions.map((definition, defIndex) => (
                      <p key={defIndex} className="my-1">{definition.definition}</p>
                    ))
                  ) : (
                    <p>No definitions found.</p>
                  )}

                  {definitions.length > 0 && definitions[0].synonyms && Array.isArray(definitions[0].synonyms) && definitions[0].synonyms.length > 0 && (
                    <>
                      <p className="font-bold">Synonyms:</p>
                      <ul className="list-disc list-inside">
                        {definitions[0].synonyms.map((synonym, synIndex) => (
                          <li key={synIndex}>{synonym}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No meaning found.</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default VisualDictionary;
