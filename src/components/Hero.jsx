import bannerImage1 from '../assets/banner1.jpg';
import bannerImage2 from '../assets/banner2.jpg';

const Hero = () => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div id="carousel-indicators-dot" className="carousel slide carousel-fade" data-bs-ride="carousel">
              <div className="carousel-indicators carousel-indicators-dot">
                <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="2"></button>
              </div>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={bannerImage1} className="d-block w-100" alt="Slide 1" />
                  <div className="carousel-caption d-flex justify-content-center align-items-center">
                    <div className="text-center bg-dark p-4 opacity-75 rounded" style={{ position: 'absolute', top: '-500%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
                      <h3 className="display-4 text-shadow-head fw-bold mb-4 red-text">Sushi Tươi, Ngon, Và Trải Nghiệm Độc Đáo Tại SushiX</h3>
                      <p className="lead mb-4" style={{ color: 'white' }}>
                        Trải nghiệm sushi tươi ngon ngay tại SushiX, mang đến sự khác biệt cho bữa ăn của bạn!
                      </p>
                      <div className="d-flex justify-content-center">
                        <a href="#!" className="btn btn-danger btn-lg">Explore More</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={bannerImage2} className="d-block w-100" alt="Slide 2" />
                  <div className="carousel-caption d-flex justify-content-center align-items-center">
                    <div className="text-center bg-dark p-4 opacity-75 rounded" style={{ position: 'absolute', top: '-500%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
                      <h3 className="display-4 text-shadow-head fw-bold mb-4 red-text">Dịch vụ giao hàng tận nơi</h3>
                      <p className="lead mb-4" style={{ color: 'white' }}>
                        Sushi luôn tươi ngon đến tận tay bạn!
                      </p>
                      <div className="d-flex justify-content-center">
                        <a href="#!" className="btn btn-danger btn-lg">Order Now</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={bannerImage1} className="d-block w-100" alt="Slide 3" />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carousel-indicators-dot"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carousel-indicators-dot"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero
