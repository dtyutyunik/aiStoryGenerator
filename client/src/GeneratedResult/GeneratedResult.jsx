import {useState,useEffect} from 'react';
import Loader from '../Loader/Loader.jsx';

const GeneratedResult=()=>{
    
    const [progress, setProgress]=useState(0)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       setProgress((currentProgress) => {
    //         if (currentProgress < 100) {
    //           return currentProgress + 20;
    //         }
    //         clearInterval(interval);
    //         return 1000;
    //       });
    //     }, 1000);
    
    //     return () => clearInterval(interval);
    //   }, []);
    
      return (
        <div>
          <Loader progress={progress} />
        </div>
      );
}

export default GeneratedResult;