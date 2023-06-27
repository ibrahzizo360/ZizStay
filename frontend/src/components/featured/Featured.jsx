import React from 'react'
import "./featured.css"

const Featured = () => {
  return (
    <div className='featured'>
        <div className="featuredItem">
            <img className="featuredImg" src="https://cf.bstatic.com/xdata/images/hotel/square600/457602516.webp?k=1d1acd9aa556e4376e9c8935e267d9e2b4b4c9f12ab8643bcd12f15d534acdfc&o=" alt="Accra" />
            <div className="featuredTitles">
                <h1>Accra</h1>
                <h2>600 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img className="featuredImg" src="https://cf.bstatic.com/xdata/images/hotel/square600/369200651.webp?k=0350b6dbac70e246ba719d4545fa3d718657a5aef4d403be19767fe1ebed80f0&o=" alt="Kumasi" />
            <div className="featuredTitles">
                <h1>Kumasi</h1>
                <h2>128 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img className="featuredImg" src="https://cf.bstatic.com/xdata/images/hotel/square600/407671276.webp?k=9b31077df709fc8a37823638126b62acb91e8f5d162f741abf5120c9caebff87&o=" alt="Lagos" />
            <div className="featuredTitles">
                <h1>Lagos</h1>
                <h2>321 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img className="featuredImg" src="https://cf.bstatic.com/xdata/images/hotel/square600/337747117.webp?k=7ddb8b72e5300ec391c89e1a36904f52d6fa2706d64c85e6a1996d4e5f7e410e&o=" alt="Dubai" />
            <div className="featuredTitles">
                <h1>Dubai</h1>
                <h2>876 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img className="featuredImg" src="https://cf.bstatic.com/xdata/images/city/600x600/976952.jpg?k=4c536b3833e5f6721ff5f89fa4f15d8f50fd5cd4a963060414078428aa67a6d5&o=" alt="London" />
            <div className="featuredTitles">
                <h1>London</h1>
                <h2>124 properties</h2>
            </div>
        </div>
    </div>
  )
}

export default Featured