import dynamic from 'next/dynamic'

function MapPage(props) {
  const Map = dynamic(
    () => import('/components/containers/Map'), 
    { ssr: false } 
  )
  return ( <><Map currentloc={props.currentloc} /></> )
}

export default MapPage