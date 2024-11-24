import React, { useState } from "react";

const stores = [
  {
    name: "SushiX TÊN LỬA",
    address: "306 - 308 đường Tên Lửa, phường Bình Trị Đông B, Bình Tân",
    phone: "+84 283 928 399",
    hours: "11:00 - 22:00",
    imgSrc: "/src/assets/branches/tenlua.jpg",
    altText: "SushiX TÊN LỬA"
  },
  {
    name: "SushiX Phan Van Tri",
    address: "366A3 Phan Văn Trị, Quận Gò Vấp",
    phone: "(028) 71089799",
    hours: "11:00 - 22:00",
    imgSrc: "/src/assets/branches/phanvantri.jpg",
    altText: "SushiX Phan Van Tri"
  },
  {
    name: "SushiX Cresent",
    address: "Lô CR1, 103 Tôn Dật Tiên, Q.7",
    phone: "1900 234504 - Line 600",
    hours: "11:00 - 22:00",
    imgSrc: "/src/assets/branches/cresent.jpg",
    altText: "SushiX Cresent"
  },
  {
    name: "SushiX Nguyễn Thị Thập",
    address: "31 - 33 Nguyễn Thị Thập, Him Lam, Q.7",
    phone: "(028) 7107 8799",
    hours: "11:00 - 22:00",
    imgSrc: "/src/assets/branches/ngthithap.jpg",
    altText: "SushiX Nguyễn Thị Thập"
  },
  {
    name: "SushiX Song Hành",
    address: "34 Song Hành, Quận 2",
    phone: "(028) 6259 3737",
    hours: "11:00 - 22:00",
    imgSrc: "/src/assets/branches/songhanh.jpg",
    altText: "SushiX Song Hành"
  },
  {
    name: "SushiX ParkView",
    address: "107 Nguyễn Đức Cảnh, Q.7, TPHCM",
    phone: "1900 234504 - Line 444",
    hours: "11:00 - 22:00",
    imgSrc: "/src/assets/branches/parkview.jpg",
    altText: "SushiX ParkView"
  },
  {
    name: "SushiX ParkView",
    address: "107 Nguyễn Đức Cảnh, Q.7, TPHCM",
    phone: "1900 234504 - Line 444",
    hours: "11:00 - 22:00",
    imgSrc: "/src/assets/branches/parkview.jpg",
    altText: "SushiX ParkView"
  },
];

const Branches = () => {
  const itemsPerPage = 6; 
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(stores.length / itemsPerPage);

  const displayedStores = stores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <div>
        <h3
          className="section-title text-center mt-4"
          style={{
            color: "#E82429",
            fontWeight: "bold",
          }}
        >
          Chuỗi Cửa Hàng
        </h3>
      </div>
      <div className="container py-4">
        <div className="row g-4">
          {displayedStores.map((store, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <div className="card-img-top">
                  <a href="#">
                    <img
                      src={store.imgSrc}
                      className="img-fluid rounded-top"
                      alt={store.altText}
                    />
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-danger fw-bold">{store.name}</h5>
                  <ul className="list-unstyled">
                    <li>
                      <i className="bi bi-geo-alt-fill text-danger"></i>
                      <span> {store.address}</span>
                    </li>
                    <li>
                      <i className="bi bi-telephone-fill text-success"></i>
                      <span> {store.phone}</span>
                    </li>
                    <li>
                      <i className="bi bi-clock text-primary"></i>
                      <span> {store.hours}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map((page) => (
            <li
              className={`page-item ${currentPage === page + 1 ? "active" : ""}`}
              key={page + 1}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
};

export default Branches;
