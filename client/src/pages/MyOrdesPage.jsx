import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import NavBar from "../Components/NavBar";
import Announcements from "../Components/Announcements";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOrderDetailsId, getOrderPaidId } from "../redux-toolkit/orderSlice";
import axios from "axios";

const Container = styled.div`
  margin-bottom: 200px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
const Title = styled.div`
  font-weight: 800;
  font-size: 32px;
  margin-bottom: 20px;
`;
const OrderTable = styled.table`
  width: 85%;
`;
const TableMainHeader = styled.thead`
  margin: 0px;
`;
const TableHeader = styled.th`
  text-align: left;
`;
const TableRow = styled.tr`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  border: 2px solid lightgray;
  margin-top: 5px;
  padding: 6px;
`;
const TableBody = styled.tbody`
  margin: 0px;
`;
const TableData = styled.td`
  text-align: left;
`;

const MyOrdesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.currentUser.user._id);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getUserOrder = async () => {
      const res = await axios.post(
        `http://localhost:5000/api/v1/order/${userId}`,
        { userId }
      );
      setOrders(res.data.order);
    };
    getUserOrder();
  }, []);
  const handleDetailClick = (id) => {
    dispatch(getOrderDetailsId(id));
    navigate("/orderdetails");
  };
  const handlePayClick = (id) => {
    dispatch(getOrderPaidId(id));
    navigate("/payment");
  };
  return (
    <Container>
      <NavBar />
      <Announcements />
      <Wrapper>
        <Title>ORDERS</Title>
        <OrderTable>
          <TableMainHeader>
            <TableRow>
              <TableHeader style={{ width: "250px" }}>ID</TableHeader>
              <TableHeader style={{ width: "100px" }}>DATE</TableHeader>
              <TableHeader style={{ width: "70px" }}>TOTAL</TableHeader>
              <TableHeader style={{ width: "50px" }}>AMOUNT</TableHeader>
              <TableHeader style={{ width: "50px" }}>PAID</TableHeader>
              <TableHeader style={{ width: "100px" }}>DETAILS</TableHeader>
            </TableRow>
          </TableMainHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableData style={{ width: "250px" }}>{order._id}</TableData>
                <TableData style={{ width: "100px" }}>
                  {order.createdAt.substring(0, 10)}
                </TableData>
                <TableData style={{ width: "70px" }}>
                  {order.total.toFixed(2)}
                </TableData>
                <TableData style={{ width: "50px" }}>{order.amount}</TableData>
                <TableData style={{ width: "50px", marginTop: "5px" }}>
                  {order.paid ? (
                    "YES"
                  ) : (
                    <Link
                      to={"/payment"}
                      style={{
                        textDecoration: "none",
                        background: "lightgray",
                        padding: "7px",
                      }}
                      onClick={() => handlePayClick(order._id)}
                    >
                      PAYNOW
                    </Link>
                  )}
                </TableData>
                <TableData
                  style={{
                    width: "100px",
                    background: "orange",
                    padding: "3px",
                    margin: "2px",
                    color: "whitesmoke",
                    cursor: "pointer",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                  onClick={() => handleDetailClick(order._id)}
                >
                  DETAILS
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </OrderTable>
      </Wrapper>
    </Container>
  );
};

export default MyOrdesPage;
