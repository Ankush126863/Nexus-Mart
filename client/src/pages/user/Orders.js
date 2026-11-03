
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  // Fetch logged-in user's orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        '/api/v1/order/my-orders',
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    } else {
      setLoading(false);
    }
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <h1>All Orders</h1>

            {loading ? (
              <h4>Loading orders...</h4>
            ) : orders.length === 0 ? (
              <h4>You haven't placed any orders yet.</h4>
            ) : (
              orders.map((order, index) => (
                <div className="card mb-3" key={order._id}>
                  <div className="card-header">
                    Order #{index + 1}
                    <span className="float-end">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="card-body">
                    {order.products?.map((product) => (
                      <div key={product._id} className="mb-2">
                        <h5>{product.name}</h5>
                        <p>Price: ₹{product.price}</p>
                      </div>
                    ))}

                    <hr />

                    <p>
                      Payment Status: {order.payment?.status}
                    </p>

                    <p>
                      Total Amount: ₹{order.payment?.amount}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
