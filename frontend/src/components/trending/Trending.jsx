import React, { useContext, useState } from 'react'
import "./trending.css"
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext';


const Trending = () => {

  const navigate = useNavigate();

  const [dates, setDates] = useState([{
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    key: 'selection',
  }]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    rooms: 1
  });
  const {dispatch} = useContext(SearchContext);

  const handleClick = (destination) => {
    dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
    navigate("/hotels", { state: { destination, dates, options } });
  }
  return (
    <div className='trending'>
        <div className="top">
        <div className="trendingItem" onClick={() => handleClick("Accra")}>
            <img className="trendingImg" src="https://cf.bstatic.com/xdata/images/city/600x600/684492.jpg?k=67f7f0099c8880a561d3b9e40a9fcc739416746c0eba8b6ef0fb025dde89387d&o=" alt="Accra" />
            <div className="trendingTitles">
                <h1>Accra</h1>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAllBMVEX///8AAAAAAAAAAAAAAAD88Wf88Fj870n77jv261f77S/77Sr460H76xr76x/26T/15zvy5Tbw4zHv4ivu4Trr3R7l1x7j1Rm+tkbCthqzqRnuiY/tgoiqoBjrcnnqa3PqZ28qm2Mkm2bnW2MolGUellomklsYlV8ZlVsjj1gfjVV0cTTmSVLiQkvjQkzgOkU7OTASEhKrtv3+AAAABXRSTlMAESIzRJTdRHwAAACiSURBVBgZrcFNSsNQFIbh9zv31GIoaHDgpFtw/ytxEbaFOBDB/NwjuckouZNCnwceRoiakD4yFZ+u3LHXyjEZWxmcMGNHOKbEVoCs+ROLxMQijr9Okli80LFKOJKYnd4PvH39UAhHyZn1lzPX/onZKBwpKPw2paCQcMQqf9OwEk6bDxRq4ZVisM6xKbMVYFQZThpGdhKOnqmRTOxFFqImuNs/USclcc4moRgAAAAASUVORK5CYII=" alt="" />
            </div>
        </div>
        
        <div className="trendingItem"  onClick={() => handleClick("London")}>
            <img className="trendingImg" src="https://cf.bstatic.com/xdata/images/city/600x600/976952.jpg?k=4c536b3833e5f6721ff5f89fa4f15d8f50fd5cd4a963060414078428aa67a6d5&o=" alt="London" />
            <div className="trendingTitles">
                <h1>London</h1>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABd1BMVEX///8AAAAAAAAAAAAAAAD////4////+fj2+Pz/9fLx9fnv9vzt8PXt7u776evo7PXo6+//5eX65ebj5fDg4+f73N7b4e741NfU1+j2zND3x8rN0OT2xMjmws30vsP0uL2/wtzstb25vdjyrrPZs8PwqrDJs8mzttTvpayvrs7wnKO7qMPVn7DfnaSjqM2vosOgpcvrkJDvjJObnr/piJOamsPwhIqYmMDngYyPlMLne3vpeYO4hKHueIHQfpPZeouJibSGirrnc3yrgJvYdn+EiLjmcHDob3qae6TLbILkZnLkZWWGeqrjXWpyd615c6JycqXlVmJrc63hV1dtbabgUVFra5/lSVbfSkpgZaNjY51ZYKNbW5boOUTVPkvdPEzjO0ncPDxZWZpRWp7WOTnlMT/aMDDOMD9NTY1CQo7XICBCQoXWGRk6OoM6On/HFxgpNIEeKYIZJH8hIWwYGWsOGHUXF2UREWYREXAPD2wNDGgHBmUGBlziP6OmAAAABXRSTlMAESIzRJTdRHwAAAFFSURBVHjardHbNwJBAMfx3c1oWkUqFaWIlJBa93K/5BJZ0lpsbiVbW0LLZuwfb5ZTL+XBOb4v8zvzeZiHIf4zsm34Pghc90WcBDMZKGkrN7E7SxJUfERPh9dxMBqF2hkeDPUDiqB2hpk+EGBZFsZikGVT40HGAuYwSEuj817gPONgIgG50zEmpDcuSBgq3MX0ImOwCjCZhMLkigcMXXLfIIiib8ADrDCdhg6PpccnisITBiNsxPPNacSQ5+9a4vMaFEotFTQw041KpeY0Y6jJCEVAt99Nl8u0HfjdEYTkGgZZRhvAm91HGiCn4ehm71WWMbxXXCCeXX5RNVA/AiD0sJrTQOjqPT85fFN/QP1MdTpuD44xmLzZtat6XVG0xxWlrhTtYPMaw/bj1vMnQqpqq1ZtqoqXPGOaoghS19EmHfnrD/69L7m1WfG1LUaEAAAAAElFTkSuQmCC" alt="" />
            </div>
        </div>
        </div>
        <div className="bottom">
        <div className="trendingItem"  onClick={() => handleClick("Johannesburg")}>
            <img className="trendingImg" src="https://cf.bstatic.com/xdata/images/city/600x600/674616.jpg?k=0b800c96e92f7cbd5f0b86d9bff427379cfcd4ecb5ef36546d3330353daf1307&o=" alt="Johannesburg" />
            <div className="trendingTitles">
                <h1>Johannesburg</h1>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABjFBMVEX///8AAAAAAAAAAAAAAADj4+Ph4eHs1tT40NHW1tba333V1c3g3WD5xcfb2TfMzMzb01K70cK6zr68wtDTzhW+yUaxw7GwwbfBxhq7wxPIvBams6qtrMiou0n5mZ+hsqi+tEKTtp2rqtCgtlSTsJP0kZOcsB33io6wpkLwiY2moW2JpoyupRuJpWHvgoaSqRmDooZ6oYN7m23ud3vtcnZylnZ9j33va3CYixvsZ2tnjmzvYGOKgTJXimR6drntW2BbhWB3c69YhVZbgVtbf2BIgFZbghZNfFNZfxlSezfnSU9NdlPnR0lwa05HdUs+eE1HdEVEdEnlQkc/ckXnP0NeXl4/az8zZjMwYTdgVw8qYy4vYhMwYRpQUFArXi5LR50iWiYmVygcWiBLSD8XVRtAQEARTxgVThY5N4o2NI86OjoQShcRSRIISBAyL4wzMzMLQwsPQhUIQhANQg0pKYQqKIk1MBAnJ30IPQgpKSkgIHgbG3wiIiIYF3UdHBoVFHsbGxsaGBIPD3YPDw9gJeYQAAAABXRSTlMAESIzRJTdRHwAAAEOSURBVChTY2CgImDECoDigX5+7mJyPmiAkYHJTxsIBDlUNZGBFxMDk6yBKRAosqubIICeD1BCg8vICggMueUs4cA4CCiRpcWj6+Lg4GwrxGttDwXmIUCJ/FBfAWVvd3d3b2k2GGDlBEnEpiYriAYEBweHucKArT9IIjU/P9+GzzMCCMKhIDgCKFFZ09zcaCERk4YEEuKAEjV1zWVS+tnZadk5KUlQEBUOkmiIFHErzM7OKTbjhAN+oESdhWR0UW5uQbqKTF4pFGRmACV01HKB4hXh4nb11TBQUg6U8MgGKq9wEo5vqkaVKExLy0lXUcqrLkECIInc3KJEecfa2ioUwMTAyMyCBTAz4o5BkgEAjSJsFItZw6MAAAAASUVORK5CYII=" alt="" />
            </div>
        </div>
        <div className="trendingItem" onClick={() => handleClick("Toronto")}>
            <img className="trendingImg" src="https://cf.bstatic.com/xdata/images/city/600x600/971990.jpg?k=6d52fe4a57a984e2d540e3d7a1910f8a76fda3a57708faddd74e2109c3344b5e&o=" alt="Toronto" />
            <div className="trendingTitles">
                <h1>Toronto</h1>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAq1BMVEX///8AAAAAAAAAAAAAAAD////+9/f86+zt7e385+j53d341db40NL3ysv2xMXyo6bwnZ/uk5Tuj5PtiYzshIbrfYHren3qen3qdXnpb3LpbnLoam3nY2foYmXmXWHmWFzlVFjlT1PiT1TkTVHgTFDkR0vgSE3fREnjQkfcP0TaO0DXNzvWNDngMTffLzPULjPfKjDfJyzSKS/eIijRJizQIyjdHyTNHyTMFhzTydVaAAAABXRSTlMAESIzRJTdRHwAAADZSURBVBgZBcG7TgJRFADAOQ9WQU20sbDx/3/LQgsthJAAbvZeZwAAAAAAAAAAABACAADMiPcYfALgjRwfHfM0AYAT8RQtogA9BjSDllkgLC4mhdCyCnjpuTuikFpWEbO37c41YkQhtehkOdyftsrt4fF6LaK07B3bfn/YymsZ5ztWWjwUEXvAOfcsqxaJ9fP2NtLIj+NEphaRmD+H5z/L9y/JCK0A3181ZgNZWkWBi7KuKLbSMgFmANTQwgq4ASu70DIWCgALMUVkAABgjhAAAGACAAAAAADwD7CGQGaExXCVAAAAAElFTkSuQmCC" alt="" />
            </div>
        </div>
        <div className="trendingItem" onClick={() => handleClick("Dubai")}>
            <img className="trendingImg" src="https://cf.bstatic.com/xdata/images/city/600x600/619932.jpg?k=81c20cf1191a1d05472b45413bed3cee67dc92b8c1387c60a960beb5629f109d&o=" alt="Dubai" />
            <div className="trendingTitles">
                <h1>Dubai</h1>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAjVBMVEX///8AAAAAAAAAAAAAAAD////29vaRzq+Jy6qAxqN6xJ90wJtxv5jwkZVlupDvio5VsoTugIRKrHzte4Dten/rdHnscXbqaG3pZWroWl/oWF7nUljnUFXmS1DjR03hQ0neQkLlPUPeOUDcNjziMTfZMTfgJy7WKC7gISjUJCrfGCDPGCAXFxcREREICAjEBKG3AAAABXRSTlMAESIzRJTdRHwAAAB7SURBVBgZrcHRCcJAFETRO5MBsQYrsP9e7ENBhED2uZ+bZH8Ez4G/EWKmpFvRvdl7RvWiW9m5KshRaWPUIMgLYEZlgmLAjAqCbODDzkqQF05EcMJE0CVMGDMVsJkILro7o8bDmKmAOREEbw0oDgILnTiQLM6qCTFT/OwLnkMXZQ19cIQAAAAASUVORK5CYII=" alt="" />
            </div>
        </div>
        </div>
    </div>
  )
}

export default Trending