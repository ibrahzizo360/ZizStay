
import Trending from '../../components/trending/Trending'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailContainer from '../../components/mailContainer/MailContainer'
import NavBar from '../../components/navbar/NavBar'
import PropertyList from '../../components/propertyList/PropertyList'
import  './home.css'
import Explore from '../../components/explore/Explore'

const HomePage = () => {
  return (<>
    <NavBar/>
    <Header/>
    <div className="homeContainer">
      <h1 className="homeTitle">Trending destinations</h1>
      <p>Most popular choices for travelers from Ghana</p>
      <Trending/>
      <h1 className="homeTitle">Browse by property type</h1>
      <PropertyList/>
      <h1 className="homeTitle">Explore Ghana</h1>
      <p>These popular destinations have a lot to offer</p>
      <Explore/>
      <h1 className="homeTitle">Home guests love</h1>
      <FeaturedProperties/>
      <MailContainer/>
      <Footer/>
    </div>
    </>
  )
}

export default HomePage