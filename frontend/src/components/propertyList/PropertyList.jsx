import React from 'react'
import "./propertyList.css"
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext';


const PropertyList = () => {

    const {data,loading} = useFetch("http://localhost:5000/api/hotels/countByType");
    

    const images = [
        "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450090.jpeg?k=52f6b8190edb5a9c91528f8e0f875752ce55a6beb35dc62873601e57944990e4&o=",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
      ];
  return (
    <div className='pList'>
        {loading?"Loading please wait": (<>
        {data && images.map((img, i) => (

        
        <div className="pListItem" key={i}>
            <img src={img} alt="#" className="pListImg" />

            <div className="pListTitles">
                <h1>{data[i]?.type}</h1>
                <h2>{data[i]?.count} {data[i]?.type}</h2>
            </div>
        </div>
        ))}
        </>
        )}
    </div>
  )
}

export default PropertyList