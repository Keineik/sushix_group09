import React, { useEffect, useState } from "react";
import orders from "../../dummy/orders.json";
import orderdetails from "../../dummy/orderdetails.json";
import invoices from "../../dummy/invoice.json";
import items from "../../dummy/items.json";

const DeliveryTrackingPage = () => {
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentTab, setCurrentTab] = useState("Đang giao");

  const calculateTotal = (orderID) => {
    const details = orderdetails.filter((item) => item.OrderID === orderID);
    return details.reduce((total, item) => total + (item.UnitPrice || 0) * (item.OrderQuantity || 0), 0);
  };
 // + coupon 
  const calculateFinalTotal = (orderID) => {
    const total = calculateTotal(orderID);
    const invoice = invoices.find((inv) => inv.OrderID === orderID);
    const tax = total * (invoice?.TaxRate || 0);
    const shipping = invoice?.ShippingCost || 0;
    return total + tax + shipping;
  };

  const getOrderDetails = (orderID) => {
    return orderdetails
      .filter((detail) => detail.OrderID === orderID)
      .map((detail) => {
        const item = items.find((i) => i.id === detail.ItemID);
        return { ...detail, itemName: item?.name || "Sản phẩm không xác định", itemImage: item?.image || "" };
      });
  };

  const handleCancelOrder = (orderID) => {
    alert(`Hủy đơn hàng #${orderID} thành công!`);
    setDeliveryOrders((prev) =>
      prev.map((order) => (order.OrderID === orderID ? { ...order, OrderStatus: "Cancelled" } : order))
    );
  };

  useEffect(() => {
    const filteredOrders = orders.filter((order) => order.CustID === 1 && order.OrderType === "Delivery");
    setDeliveryOrders(filteredOrders);
  }, []);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const filteredOrders = deliveryOrders.filter((order) => {
    if (currentTab === "Đang giao") return order.OrderStatus === "Out for Delivery";
    if (currentTab === "Đã giao") return order.OrderStatus === "Delivered";
    if (currentTab === "Đang chuẩn bị") return order.OrderStatus === "Preparing";
    if (currentTab === "Đã hủy") return order.OrderStatus === "Cancelled";
    return true;
  });

  return (
    <div className="container mt-4">
      <h3 className="section-title" style={{ color: '#E82429', fontWeight: 'bold' }}>
        Theo dõi đơn hàng
      </h3>

      <ul className="nav nav-tabs mt-3">
        <li className="nav-item">
          <a
            className={`nav-link ${currentTab === "Đang giao" ? "active" : ""}`}
            onClick={() => handleTabChange("Đang giao")}
          >
            Đang giao
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${currentTab === "Đã giao" ? "active" : ""}`}
            onClick={() => handleTabChange("Đã giao")}
          >
            Đã giao
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${currentTab === "Đang chuẩn bị" ? "active" : ""}`}
            onClick={() => handleTabChange("Đang chuẩn bị")}
          >
            Đang chuẩn bị
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${currentTab === "Đã hủy" ? "active" : ""}`}
            onClick={() => handleTabChange("Đã hủy")}
          >
            Đã hủy
          </a>
        </li>
      </ul>

      {filteredOrders.length === 0 ? (
        <p style={{ fontSize: "0.9rem" }}>Không có đơn hàng giao nào!</p>
      ) : (
        <>
          <table className="table table-bordered" style={{ fontSize: "0.9rem" }}>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Ngày mua</th>
                <th>Địa chỉ giao hàng</th>
                <th>Tổng tiền (VNĐ)</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.OrderID}>
                  <td>{order.OrderID}</td>
                  <td>{new Date(order.OrderDateTime).toLocaleString()}</td>
                  <td>{order.DeliveryAddress}</td>
                  <td>{calculateFinalTotal(order.OrderID).toLocaleString()}</td>
                  <td>{order.OrderStatus}</td>
                  <td>
                    <div className="d-flex flex-column gap-2">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => setSelectedOrder(order.OrderID)}
                      >
                        Chi tiết
                      </button>
                      {order.OrderStatus === "Out for Delivery" && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleCancelOrder(order.OrderID)}
                        >
                          Hủy đơn
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end align-items-center mt-3">
            <button
              className="btn btn-outline-primary btn-sm me-2"
            >
              <i className="bi bi-telephone-fill"></i>
              <span className="ms-2">Liên hệ hỗ trợ</span>
            </button>
          </div>
        </>
      )}

      {selectedOrder && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ fontSize: "1rem" }}>
                  Chi tiết đơn hàng #{selectedOrder}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table" style={{ fontSize: "0.9rem" }}>
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Giá (VNĐ)</th>
                      <th>Số lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getOrderDetails(selectedOrder).map((detail, index) => (
                      <tr key={index}>
                        <td>{detail.itemName} 
                          <img
                            src={detail.itemImage}
                            alt={detail.itemName}
                            style={{ width: "65px", height: "50px" }}
                          /></td>
                        <td>{(detail.UnitPrice || 0).toLocaleString()}</td>
                        <td>{detail.OrderQuantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryTrackingPage;