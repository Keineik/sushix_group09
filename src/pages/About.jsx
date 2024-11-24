const About = () => {
    return (
        <div>
            <h2 
                className="section-title text-center mt-4" 
                style={{ color: "#E82429", fontFamily: "'Potta One', cursive" }}
            >
                Giới thiệu SushiX
            </h2>

            <div className="container px-5 py-4">
                <div className="row">
                    <div className="col w-full md:w-1/2">
                        <h5>SUSHIX SERVICE</h5>
                        <p className="mt-4" style={{textAlign: "justify"}}>Nhằm phát huy thế mạnh của chuỗi nhà hàng <span style={{fontWeight: "bold", color: "#E82429"}}>SushiX</span>, <span style={{fontWeight: "bold", color: "#E82429"}}>SushiX</span> là dịch vụ giao hàng tận nơi nhằm đáp ưng nhu cầu thưởng thức hương vị Nhật Bản của khách hàng ngay tại nhà.</p>
                    </div>
                    <div className="col w-full md:w-1/2">
                        <img src="/src/assets/about1.jpg" alt="About1" />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <img src="/src/assets/about2.jpg" alt="About2" />
                    </div>
                    <div className="col">
                        <h5>MÓN ĂN TỐT CHO SỨC KHỎE</h5>
                        <p className="mt-1" style={{textAlign: "justify"}}>Với nhu cầu ngày càng tăng của người tiêu dùng Việt Nam cả về chất lượng thực phẩm và vệ sinh an toàn thực phẩm, <span style={{fontWeight: "bold", color: "#E82429"}}>SushiX</span> đảm bảo mang đến cho khách hàng dịch vụ với chất lượng tốt nhất.</p>
                        <p style={{textAlign: "justify"}}>Một trong những món tạo nên thương hiệu của <span style={{fontWeight: "bold", color: "#E82429"}}>SushiX</span> chính là cá hồi. Cá hồi  được coi là một trong những siêu thực phẩm có thể giúp tăng cường sức khỏe cho da. Thịt cá chứa rất nhiều Omega-3, là chất dinh dưỡng chỉ có thể hấp thụ qua đường ăn uống vì cơ thể chúng ta không thể tạo ra chúng. Vậy nên việc ăn cá hồi hàng ngày giúp bổ sung dinh dưỡng, tốt cho sức khỏe.</p>
                        <p style={{textAlign: "justify"}}>Ngoài ra, <span style={{fontWeight: "bold", color: "#E82429"}}>SushiX</span> sử dụng các nguyên vật liệu thân thiện với môi trường, đặc biệt các món ăn được đóng gói bằng hộp giấy Eco vô cùng tiện lợi và đảm bảo cho sức khỏe của khách hàng.</p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <h5>THỰC ĐƠN PHONG PHÚ</h5>
                        <p className="mt-4" style={{textAlign: "justify"}}>Thực đơn của <span style={{fontWeight: "bold", color: "#E82429"}}>SushiX</span> có nhiều món ăn phong phú, đặc sắc và rất ngon miệng do chính các chuyên gia người Nhật chế biến theo đúng hương vị Nhật Bản. Thực đơn luôn được bổ sung và thay đổi định kỳ nhằm giới thiệu cho khách hàng nhiều hơn nữa những món ăn truyền thống của Nhật.</p>
                    </div>
                    <div className="col">
                        <img src="/src/assets/about3.jpg" alt="About3" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About