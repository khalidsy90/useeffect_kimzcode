import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function App() {
  const [term,setTerm]=useState('javascript')
  const [result,setResult]=useState([])
  const [debounceSearch,setDebounceSearch]=useState(term)

  useEffect(()=>{
    const timeout=setTimeout(() => {
      setDebounceSearch(term)
    }, 1200);
    return ()=>{
      clearTimeout(timeout)
    }
  },[term])

  useEffect(()=>{
    const search=async () =>{
          const respond=await axios.get('https://en.wikipedia.org/w/api.php',{
            params: {
              action: 'query',
              list: 'search',
              origin: '*',
              format: 'json',
              srsearch: debounceSearch,
            }
          })
         setResult(respond.data.query.search)
        }
        search()
  },[debounceSearch])
  // useEffect(()=>{
  //  

  //  if(!result.length){
  //    search()
  //  }else{
  //   const timeout= setTimeout(() => {
  //     if(debounceSearch){
  //       search()
  //     }
  //   }, 1500);
   
  //   return()=>{
  //     clearTimeout(timeout)
  //   }
  //  }
  // console.log('render from useEffect');
  // },[term,result.length])

  console.log('render');
  const fetchResult=result.map((el) => {
    return(
    <tr key={el.pageid}>
       <th scope="row" ></th>
       <td>{el.title}</td>
       <td><span dangerouslySetInnerHTML={{__html: el.snippet}}></span></td>
    </tr>
  )})
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='my-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label'>
              Search Input
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              onChange={(e)=> setTerm(e.target.value)}
              value={term}
            />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Desc</th>
              </tr>
            </thead>
            <tbody>
              {fetchResult}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}