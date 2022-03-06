import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
    <Head>
      <title>First Post</title>
    </Head>
    
    <body>
    <header className="p-3 bg-dark text-white">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link href="/">
           <a className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"/></svg>
           </a>
        </Link>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link href="/"><a className="nav-link px-2 text-secondary">Home</a></Link></li>
          <li><Link href="/"><a className="nav-link px-2 text-white">AAA</a></Link></li>
          <li><Link href="/"><a className="nav-link px-2 text-white">BBB</a></Link></li>
          <li><Link href="/"><a className="nav-link px-2 text-white">CCC</a></Link></li>
          <li><Link href="/"><a className="nav-link px-2 text-white">DDD</a></Link></li>
        </ul>

      </div>
    </div>
  </header>

    <div className="margin_LR_5rem">
      <div className="Img_and_title"> 
        <Image
          src="/images/FoodQuest.jpg" // Route of the image file
          height={200} // Desired size with correct aspect ratio
          width={300} // Desired size with correct aspect ratio
          alt="Your Name"
        /> 
        <h1 className='center title'>FoodQuest Homepage</h1>
      </div>

      <div className="contents">
        <h2> Overview : </h2>
        <p> There will be Overview contents</p>
        <br/>

        <h3> Description : </h3>
        <p> There will be Description contents</p>
        <br/>

        <h3> Contact Information : </h3>


        <table>
          <tr>
            <th>Arman Shah :</th>
            <th>&ensp; ashah360@uw.edu</th>
          </tr>
          <tr>
            <th>jaehong Lee :</th>
            <th>&ensp; jaehol3@uw.edu </th>
          </tr>
          <tr>
            <th>Bitanya Demissie :</th>
            <th>&ensp; bitanyad@uw.edu </th>
          </tr>
        </table>
      </div>
    </div>
    </body>
  
  </>
  )
}

export default Home
