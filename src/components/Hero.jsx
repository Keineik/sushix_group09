const Hero = () => {
    return (
        <section className="py-4 py-md-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="col w-full lg:w-9/12 Module Module-1289" style={{ backgroundImage: `url("/src/assets/banner-tdm_1.jpg")`}}>
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

// const Hero = () => {
//     return (
//       <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden py-4 py-md-5">
//         <img
//           src="/src/assets/background.jpg"
//           alt="Sushi background"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50" />
//         <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
//           <h1 className="mb-4 text-5xl font-bold md:text-6xl">Welcome to SushiX</h1>
//           <p className="mb-8 max-w-2xl text-xl md:text-2xl">
//             Discover the art of authentic Japanese cuisine, where every roll tells a story of tradition and innovation.
//           </p>
//           <a
//             href="/shop"
//             className="rounded-full bg-red-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-red-700"
//           >
//             Shop Now
//           </a>
//         </div>
//       </section>
//     );
//   };
// https://tokyodelihome.com.vn/Data/Sites/1/Banner/banner-tdm.jpg
export default Hero
