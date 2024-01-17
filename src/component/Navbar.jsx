import { HeartIcon } from "@heroicons/react/24/outline"

export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">LOGO😍</div>
      {children}
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">4</span>
      </button>
    </nav>
  )
}


export function Search({query, setQuery}) {
  return <input
  value={query} onChange={(e)=>setQuery(e.target.value)} type="text" className='text-field' placeholder='search...' />
}
export function SearchResult({ numOfResult }) {
 return <div className="navbar__result">found {numOfResult} characters</div>
}