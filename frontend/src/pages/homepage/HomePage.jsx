
import Featured from '../../components/featured/Featured'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailContainer from '../../components/mailContainer/MailContainer'
import NavBar from '../../components/navbar/NavBar'
import PropertyList from '../../components/propertyList/PropertyList'
import  './home.css'

const HomePage = () => {
  return (<>
    <NavBar/>
    <Header/>
    <div className="homeContainer">
      <h1 className="homeTitle">Trending destinations</h1>
      <Featured/>
      <h1 className="homeTitle">Browse by property type</h1>
      <PropertyList/>
      <h1 className="homeTitle">Home guests love</h1>
      <FeaturedProperties/>
      <MailContainer/>
      <Footer/>
    </div>
    </>
  )
}

export default HomePage