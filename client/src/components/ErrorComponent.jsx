import './error.css'
import {Link} from 'react-router'
const ErrorComponent=()=>{
    return <>
    
  <section className="page_404 w-full xl:w-1/2 shadow-xl rounded-md border-primary">
  <div className="container">
    <div className="row">	
      <div className="col-sm-12 ">
        <div className="col-sm-10 col-sm-offset-1  text-center">
          <div className="four_zero_four_bg">
            <h1 className="text-center poppins-bold ">404</h1>
          </div>
          <div className="contant_box_404">
            <h3 className="h2 poppins-bold">
              Look like you're lost
            </h3>
            <p className="poppins-regular">the page you are looking for not avaible!</p>
            <Link to="/" className="link_404 poppins-bold">Go to Home</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
}
export default ErrorComponent;