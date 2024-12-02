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
  const [fvrtCart, setFvrtCart] = useState([]);
  const [fvrtCount, setFvrtCount] = useState();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);


  let fvrts = [];

  const addToFvrts = (id) => {

    let product = products.find((product) => product.id === id);

    console.log(fvrts);

    setFvrt((prevState) => {
      const updatedState = {
        ...prevState,
        [id]: !prevState[id], // Toggle favorite status for this product
      };

      console.log(fvrtCart);

      // Update the count of liked items
      const newCount = Object.values(updatedState).filter(Boolean).length;
      setFvrtCount(newCount);


      console.log(updatedState);
      return updatedState;
    });

    setFvrtCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        [id]:
          product,

      };

      console.log(updatedCart);

      return updatedCart;
    })
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

  const handleQuantityChange = (id, value) => {

    console.log(id);
    setQuantity((prevQuantities) => {
      const updatedQuantity = {
        ...prevQuantities,
        [id]: Number(value), // Update the quantity for the specific item
      }

      console.log(updatedQuantity);

      return updatedQuantity;
    });

  }


  const add_to_cart = (id, count) => {
    console.log(id, count);

    let product = products.find((product) => product.id === id);

    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingProduct = prevCart.find((cartItem) => cartItem.id === id);

      let updatedCart;

      if (existingProduct) {
        // Update the quantity of the existing product
        updatedCart = prevCart.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity + count }
            : cartItem
        );
      } else {
        // Add the new product with the specified quantity
        updatedCart = [...prevCart, { ...product, quantity: count }];
      }

      // Calculate the total price of the updated cart
      const totalPrice = updatedCart.reduce(
        (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
        0
      );

      // Update the cart count
      setCartCount(updatedCart.reduce((acc, cartItem) => acc + cartItem.quantity, 0));

      // Update the cart price state
      setCartPrice(totalPrice);

      console.log("Updated Cart Price:", totalPrice);

      return updatedCart; // Return the updated cart state
    });
  };


  const handleCollapse = async () => {
    if (collapsed) {
      console.log("Collapsed");
      setCollapsed(false);
    } else {
      console.log("Expanded");
      setCollapsed(true);
    }
  };



  const handleRemoveCart = (id, count) => {
    console.log(id, count);

    let product = products.find((product) => product.id === id);

    setCart((prevCart) => {
      const updatedCart = prevCart.filter((product) => product.id !== id);
      console.log("Updated Cart:", updatedCart);
      const totalPrice = cartPrice - product.price * count;

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
        // console.log(json);
        setProducts(json);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });


    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        setCategories(json);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });


  }, [])

  // useEffect will be triggered when 'category' changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(json => {
          // console.log(json);
          setProducts(json);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  }, [category]);

  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is smaller than 768px (for mobile devices)
      if (window.innerWidth <= 922) {
        setIsMobile(true);
      } else {
        setIsMobile(false);

      }
    };

    // Initial check
    handleResize();

    // Add event listener to handle resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
      <Topbar cartCount={cartCount} handleShowCart={handleShowCart} isMobile={isMobile} showCart={showCart} handleCollapse={handleCollapse} collapsed={collapsed} />
      <div className='main-part' style={{ gap: isMobile ? '10px' : '20px' }}>
        {collapsed ? null : <Sidebar categories={categories} isMobile={isMobile} collapsed={collapsed} fvrtCount={fvrtCount} getCategory={getCategory} selectedCategory={selectedCategory} />
        }
        <Main products={products}
          loading={loading}
          addToFvrts={addToFvrts}
          fvrt={fvrt}
          add_to_cart={add_to_cart}
          showCart={showCart}
          handleShowCart={handleShowCart}
          cart={cart}
          handleRemoveCart={handleRemoveCart}
          cartPrice={cartPrice}
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
          isMobile={isMobile} />
      </div>
    </>
  );
}

export default App;
