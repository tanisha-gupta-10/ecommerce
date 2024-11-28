import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Main from './components/Main';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';

function App() {

  const [loading, setLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState();
  const [fvrt, setFvrt] = useState([]);
  const [cartPrice, setCartPrice] = useState();
  const [cart, setCart] = useState([]);
  const [fvrtCount, setFvrtCount] = useState();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();


  const addToFvrts = (id) => {

    // console.log(id);
    setFvrt((prevState) => {
      const updatedState = {
        ...prevState,
        [id]: !prevState[id], // Toggle favorite status for this product
      };


      // Update the count of liked items
      const newCount = Object.values(updatedState).filter(Boolean).length;
      setFvrtCount(newCount);


      console.log(updatedState);
      return updatedState;
    });
  }

  const getCategory = (newCategory) => {
    setCategory(newCategory);
  };


  const handleShowCart = () => {
    if (showCart == true) {
      setShowCart(false);
    } else {
      setShowCart(true);
    }
  }


  const add_to_cart = (id) => {
    console.log(id);
    let product = products.find((product) => product.id === id);

    setCart((prevCart) => {
      // Add product to the cart
      const updatedCart = [...prevCart, product];
      console.log("Updated Cart:", updatedCart); // Logs the updated cart immediately

      // Calculate the total price of the updated cart
      const totalPrice = updatedCart.reduce((acc, cartItem) => acc + cartItem.price, 0);

      // Update the cart count
      setCartCount(updatedCart.length);

      // Update the cart price state
      setCartPrice(totalPrice);

      console.log("Updated Cart Price:", totalPrice);

      return updatedCart; // Return the updated cart state
    });
  };


  const handleRemoveCart = (id) => {
    console.log(id);

    let product = products.find((product) => product.id === id);

    setCart((prevCart) => {
      const updatedCart = prevCart.filter((product) => product.id !== id);
      console.log("Updated Cart:", updatedCart);
      const totalPrice = cartPrice - product.price;

      // Update the cart count
      setCartCount(updatedCart.length);

      // Update the cart price state
      setCartPrice(Math.round(totalPrice, 2));


      return updatedCart;
    });


  }


  useEffect(() => {

    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setProducts(json);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });


    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setCategories(json);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });


  }, [])

  // useEffect will be triggered when 'category' changes
  useEffect(() => {
    if (category) {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          setProducts(json);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  }, [category]);


  return (
    <>
      <Topbar cartCount={cartCount} handleShowCart={handleShowCart} showCart={showCart} />
      <div className='main-part'>
        <Sidebar categories={categories} fvrtCount={fvrtCount} getCategory={getCategory} />
        <Main products={products}
          loading={loading}
          addToFvrts={addToFvrts}
          fvrt={fvrt}
          add_to_cart={add_to_cart}
          showCart={showCart}
          handleShowCart={handleShowCart}
          cart={cart}
          handleRemoveCart={handleRemoveCart}
          cartPrice={cartPrice} />
      </div>
    </>
  );
}

export default App;
