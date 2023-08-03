import  './header.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi} from '@fortawesome/free-solid-svg-icons';
import {DateRange} from 'react-date-range'
import { useContext, useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext'

const Header = ({type}) => {
  const [dates, setDates] = useState([{
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    key: 'selection',
  }]);
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    rooms: 1
  });
  const handleOption = (name, operation) =>{
    setOptions(prev=>{return {
      ...prev, [name]: operation === "i"? options[name] +1 : options[name] -1
    }})
  }

  const {dispatch} = useContext(SearchContext);

  const navigate = useNavigate(); 

  const handleSearch = () => {
    dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
    navigate("/hotels", { state: { destination, dates, options } });
  };


  return (
    <>
    <div className='header'>
      <div className={ type === "list"? 'headerContainer listMode': "headerContainer"}>
       <div className='headerList'>
        <div className="headerListItem active">
        <FontAwesomeIcon icon={faBed} />
        <span>stays</span>
        </div>
        <div className="headerListItem">
        <FontAwesomeIcon icon={faPlane} />
        <span>Flights</span>
        </div>
        <div className="headerListItem">
        <FontAwesomeIcon icon={faCar} />
        <span>Car rentals</span>
        </div>
        <div className="headerListItem">
        <FontAwesomeIcon icon={faBed} />
        <span>Attractions</span>
        </div>
        <div className="headerListItem">
        <FontAwesomeIcon icon={faTaxi} />
        <span>Airport Taxis</span>
        </div>
     </div>
    { type !== "list" && <><h1 className="headerTitle">A lifetime of discount? It's genius</h1>
      <p className="headerDesc">Search deals on hotels, homes, and much more...</p>
      <div className="headerSearch">
        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faBed} className="headerIcon"/>
        <input type="text"
         placeholder='Where are you going?' 
         className="headerSearchInput"
         onChange={e=>setDestination(e.target.value)}
          />
      </div>
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
        <span className="headerSearchText" onClick={()=>setOpenDate(!openDate)}>
          {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")} `}
          </span>
        {openDate && <DateRange
        editableDateInputs = {true}
        onChange={item=> setDates([item.selection])}
        moveRangeOnFirstSelection = {false}
        ranges={dates}
        className='date'
        />}
      </div>
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
        <span className="headerSearchText" 
        onClick={()=>setOpenOptions(!openOptions)} >{`${options.adult} adult . ${options.children} children . ${options.rooms} rooms`}</span>
        {openOptions && <div className="options">
          <div className="optionItem">
            <span className="optionText">Adults</span>
            <div className="optionCounter">
            <button className="optionCounterBtn" 
            disabled={options.adult <=1 }
            onClick={()=>handleOption('adult', "d")}
            >-</button>
            <span className="optionCounterNumber">{options.adult}</span>
            <button className="optionCounterBtn" 
            onClick={()=>handleOption('adult', "i")}>+</button>
            </div>
          </div>
          <div className="optionItem">
            <span className="optionText">Children</span>
            <div className="optionCounter">
            <button className="optionCounterBtn" 
            disabled={options.children <=0 }
            onClick={()=>handleOption('children', "d")}>-</button>
            <span className="optionCounterNumber">{options.children}</span>
            <button className="optionCounterBtn" onClick={()=>handleOption('children', "i")}>+</button>
            </div>
          </div>
          <div className="optionItem">
            <span className="optionText">Rooms</span>
            <div className="optionCounter">
            <button className="optionCounterBtn" 
            disabled={options.rooms <=1 }
            onClick={()=>handleOption('rooms', "d")}>-</button>
            <span className="optionCounterNumber">{options.rooms}</span>
            <button className="optionCounterBtn" onClick={()=>handleOption('rooms', "i")}>+</button>
            </div>
          </div>
        </div>}
      </div>
      <div className="headerSearchItem">
        <button className="headerBtn" onClick={handleSearch}>Search</button> 
          </div>
        </div></>}
       </div> 
    </div> 
    
    </>
  )
}

export default Header