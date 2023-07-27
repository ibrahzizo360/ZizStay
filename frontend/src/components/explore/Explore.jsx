import React from 'react'
import "./explore.css"
import useFetch from '../../hooks/useFetch'

const Explore = () => {

    const {data,loading,error} = useFetch("http://localhost:5000/api/hotels/countByCity?cities=Accra,Kumasi,Capecoast,Tema,Takoradi");
    

  return (
    <div className='explore'>
        {loading ? ("Loading please wait") : (<>
        <div className="exploreItem">
            <img className="exploreImg" src="https://cf.bstatic.com/xdata/images/city/600x600/684492.jpg?k=67f7f0099c8880a561d3b9e40a9fcc739416746c0eba8b6ef0fb025dde89387d&o=" alt="Accra" />
            <div className="exploreTitles">
                <h1>Accra</h1>
                <h2>{data[0]} properties</h2>
            </div>
        </div>
        <div className="exploreItem">
            <img className="exploreImg" src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/369200651.jpg?k=cbd5f2bf20819d563ac70031a622b6cee85fb3e996aea23def59cab984a41567&o=" alt="Kumasi" />
            <div className="exploreTitles">
                <h1>Kumasi</h1>
                <h2>{data[1]} properties</h2>
            </div>
        </div>
        <div className="exploreItem">
            <img className="exploreImg" src="https://r-xx.bstatic.com/xdata/images/city/170x136/664182.jpg?k=a61050c3c58a473b73789bcd65781765d99c0df43d7fd1ef3aac273f8adcf408&o=" alt="Capecoast" />
            <div className="exploreTitles">
                <h1>Cape Coast</h1>
                <h2>{data[2]} properties</h2>
            </div>
        </div>
        <div className="exploreItem">
            <img className="exploreImg" src="https://r-xx.bstatic.com/xdata/images/city/170x136/845213.jpg?k=9a7ca8ec2db57a41d485c782f058f78c0f20f939621a5a80c76407f6c57c2ada&o=" alt="Akosombo" />
            <div className="exploreTitles">
                <h1>Akosombo</h1>
                <h2>{data[3]} properties</h2>
            </div>
        </div>
        <div className="exploreItem">
            <img className="exploreImg" src="https://q-xx.bstatic.com/xdata/images/city/170x136/696630.jpg?k=0b3eed39c984a18899a85d614c102505d89bedb2ae0ee455055be76f13b52062&o=" alt="Takoradi" />
            <div className="exploreTitles">
                <h1>Takoradi</h1>
                <h2>{data[4]} properties</h2>
            </div>
        </div> </>)}
    </div>
  )
}

export default Explore