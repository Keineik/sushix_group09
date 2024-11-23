const Hero = () => {
    return (
        <section className="py-4 py-md-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="container-fluid bsb-hero-6" style={{ backgroundImage: `url("https://tokyodelihome.com.vn/Data/Sites/1/Banner/banner-tdm.jpg")`}}>
                            <div className="row justify-content-md-center align-items-center">
                                <div className="col-12 col-md-11 col-xl-10">
                                    <h2 className="display-1 text-center text-md-start text-shadow-head fw-bold mb-4 red-text" style={{color: "red"}}>Welcome to SushiX</h2>
                                    <p className="lead text-center text-md-start text-shadow-body mb-5 d-flex justify-content-sm-center justify-content-md-start">
                                        <span className="col-12 col-sm-10 col-md-8 col-xxl-7" style={{color: "black"}}>Where every squeak, every rattle, and every wobble finds its solution, ensuring your ride is always smooth and worry-free.</span>
                                    </p>
                                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center justify-content-md-start">
                                        <a href="#!" className="btn bsb-btn-2xl btn-outline-dark">Explore More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
  
export default Hero