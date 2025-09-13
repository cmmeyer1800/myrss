import Nav from './components/Nav'
import Footer from './components/Footer'
import RSSFeed from './components/RSSFeed'
import Menu from './components/Menu'

function App() {
  return (
    <>
      <Nav />

      {/* <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
        </div>
      </section> */}
      <div className='hero is-fullheight-with-navbar'>
        {/* Sticky Sidebar */}
        <div className="box sticky-sidebar">
          <Menu />
        </div>
        
        {/* Main Content */}
        <div className="main-content">
          <div className="container mt-4">
            <div className="box">
              <RSSFeed />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default App
