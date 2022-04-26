import dynamic from 'next/dynamic'

function MapPage() {
  const Map = dynamic(
    () => import('/components/containers/Map'), 
    { ssr: false } 
  )
  return ( <><Map /><>asdugiusdhals</></> )
}

export default MapPage