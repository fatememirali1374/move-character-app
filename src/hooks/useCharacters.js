import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(url,query){
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function featchData() {
          try {
            setIsLoading(true)
            const { data } = await axios.get(`${url}=${query}`, { signal })
            setCharacters(data.results.splice(0, 5))
          } catch (err) {
            // fetch=>err.name!=="AbortError"
            // axios=>!axios.isCancel(err)
            if (!axios.isCancel(err)) {
              setCharacters([])
              // FOR REALLE PROJECT: err.response.data.message
              // console.log(err.response.data.error);
              toast.error(err.response.data.error)
            }
    
          }
          finally {
            setIsLoading(false)
          }
        }
        featchData();
        return () => {
          // cancel the request before component unmounts
          controller.abort();
        };
      }, [query])
      return {isLoading,characters}
}