import React, { useState } from "react";

const initialMenu = [
  {
    id: 1,
    category: "Main Course",
    name: "Cheeseburger",
    price: 62,
    quantity: 0,
  },
  {
    id: 2,
    category: "Main Course",
    name: "Cheese sandwich",
    price: 55,
    quantity: 0,
  },
  {
    id: 3,
    category: "Main Course",
    name: "Chicken burger",
    price: 70,
    quantity: 0,
  },
  { id: 4, category: "Main Course", name: "Veg Pizza", price: 80, quantity: 0 },
  {
    id: 5,
    category: "Main Course",
    name: "Chicken Pizza",
    price: 90,
    quantity: 0,
  },
  {
    id: 6,
    category: "Main Course",
    name: "Spicy chicken",
    price: 65,
    quantity: 0,
  },
  { id: 7, category: "Main Course", name: "Hot dog", price: 49, quantity: 0 },
  {
    id: 8,
    category: "Appetizers",
    name: "Fruit Salad",
    price: 37,
    quantity: 0,
  },
  { id: 9, category: "Appetizers", name: "Cocktails", price: 50, quantity: 0 },
  { id: 10, category: "Appetizers", name: "Nuggets", price: 60, quantity: 0 },
  { id: 11, category: "Appetizers", name: "Sandwich", price: 55, quantity: 0 },
  {
    id: 12,
    category: "Appetizers",
    name: "French Fries",
    price: 35,
    quantity: 0,
  },
  { id: 13, category: "Beverages", name: "Milk Shake", price: 60, quantity: 0 },
  { id: 14, category: "Beverages", name: "Iced Tea", price: 45, quantity: 0 },
  {
    id: 15,
    category: "Beverages",
    name: "Orange Juice",
    price: 35,
    quantity: 0,
  },
  { id: 16, category: "Beverages", name: "Lemon Tea", price: 30, quantity: 0 },
  { id: 17, category: "Beverages", name: "Coffee", price: 30, quantity: 0 },
];

function App() {
  const pass_list = ["sarvesh"];
  const user_list = ["Sarvesh"];
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const [menuItems, setMenuItems] = useState(initialMenu);
  const [showBill, setShowBill] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  function handleNameChange(event) {
    setuserName(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit() {
    if (!userName || !password) {
      setError("Please enter both username and password");
      return;
    }

    let isValid = false;

    for (let i = 0; i < pass_list.length; i++) {
      if (
        user_list[i].toLowerCase() === userName.toLowerCase() &&
        pass_list[i] === password
      ) {
        isValid = true;
        break;
      }
    }

    if (isValid) {
      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password");
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setMenuItems(initialMenu);
    setShowBill(false);
    setShowPayment(false);
    setPaymentCompleted(false);
    setuserName("");
    setPassword("");
    setError("");
  }

  function handleResetOrder() {
    setMenuItems(initialMenu);
    setShowBill(false);
  }

  const handleQuantityChange = (id, change) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return menuItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const selectedItems = menuItems.filter((item) => item.quantity > 0);
  const categories = ["Main Course", "Appetizers", "Beverages"];

  const total = calculateTotal();
  const bankacc = "webrestaurant@okaxis";
  const bankname = "Web Restaurant";
  const currency = "INR";
  const upiURL = `upi://pay?pa=${bankacc}&pn=${bankname}&am=${total}&cu=${currency}`;
  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    upiURL
  )}`;

  const handleCompletePayment = () => {
    setPaymentCompleted(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <h1 className="resname">Welcome </h1>
        <h2>RESTAURANT LOGIN</h2>
        <div className="category" style={{ textAlign: "center" }}>
          <input
            onChange={handleNameChange}
            type="text"
            placeholder="Enter your username"
            value={userName}
          />
          <input
            onChange={handlePasswordChange}
            type="password"
            placeholder="Enter your password"
            value={password}
          />
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={handleSubmit} className="generate-bill">
            Submit
          </button>
        </div>
        <div className="footer">
          <p>📞 9140916320 | 📍 14,Selhurst Park Road, Katpadi , Vellore</p>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      {!showBill && !showPayment && (
        <div className="menu">
          <h1 className="resname">MENU</h1>
          <h2>WEB RESTAURANT</h2>
          <button onClick={handleLogout} style={{ float: "right" }}>
            Logout
          </button>
          {categories.map((category) => (
            <div key={category} className="category">
              <h3>{category.toUpperCase()}</h3>
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div key={item.id} className="menu-item">
                    <div className="item-details">
                      <span>{item.name}</span> - <span>Rs. {item.price}</span>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
          <button onClick={handleResetOrder}>Reset Order</button>
          <button
            className="generate-bill"
            onClick={() => setShowBill(true)}
            disabled={selectedItems.length === 0}
            style={{ marginLeft: "10px" }}
          >
            Generate Bill
          </button>
          <div className="footer">
            <p>📞 9140916320 | 📍 14,Selhurst Park Road, Katpadi , Vellore</p>
          </div>
        </div>
      )}

      {showBill && !showPayment && (
        <div className="bill">
          <h2>Your Bill</h2>
          {selectedItems.map((item) => (
            <div key={item.id} className="bill-item">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="total">
            <strong>Total: Rs. {calculateTotal()}</strong>
          </div>
          <button onClick={() => setShowBill(false)}>Back to Menu</button>
          <button
            onClick={() => setShowPayment(true)}
            style={{ marginLeft: "10px" }}
          >
            Proceed to Payment
          </button>
        </div>
      )}

      {showPayment && !paymentCompleted && (
        <div className="payment">
          <h2>Scan to Pay with GPay</h2>
          <div className="qr-code">
            <img src={qrCode} alt="GPay QR Code" />
          </div>
          <p>Total Amount: Rs. {calculateTotal()}</p>
          <button onClick={handleCompletePayment}>Complete Payment</button>
        </div>
      )}

      {showPayment && paymentCompleted && (
        <div className="thank-you">
          <h2>Thank You!</h2>
          <p>Your payment of Rs. {calculateTotal()} has been received.</p>
          <p>Come back soon!!!</p>
          <button onClick={handleLogout}>Back to Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
