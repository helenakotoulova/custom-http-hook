import { useCallback, useState } from "react";

const useHttp = () => { // predtim bylo requestConfig a appplyData zde
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback( async (requestConfig, applyData) => { // nechceme aby se ta fce pokazde vytvarela. pouzijeme callback.
    setIsLoading(true);
    setError(null);
    // metoda try/catch. at tryne nejaky kod, pokud to neklapne, tak at catchne dany error.
    try {
      const response = await fetch(requestConfig.url, {
          method: requestConfig.method? requestConfig.method : 'GET', // bud neco zadame, nebo se budou brat tyto defaultni hodnoty.
          headers:requestConfig.headers? requestConfig.headers : {},
          body: requestConfig.body? JSON.stringify(requestConfig.body): null,
      });

        //"https://tasks-custom-hooks-3d663-default-rtdb.firebaseio.com/tasks.json"

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data)

    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []); // tohle je dependency toho useCallbacku. 

    return {
        isLoading: isLoading,
        error: error,
        sendRequest:sendRequest, // slo by zapsat bez tech dvojtecek. jen return { isLoading, error} apod.
        // to by byl zapis moderniho JS, ktery muzeme pouzit 
    }

};

export default useHttp;
