import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  productName: string;
  price: number;
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
  image: string;
  deliveryOptions: {
    fastDelivery: string;
    standardDelivery: string;
  };
}

export default function PreviewProduct(): JSX.Element {
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [pinCode, setPinCode] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/product'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setProduct({
          productName: "Girl's Long Sleeve Deep Uneck Hollow out Pleated mini dress",
          price: 2160,
          description: "Versatile summer dress suitable for various occasions...",
          sizes: ["S", "M", "L", "XL"],
          colors: ["green", "blue", "purple", "pink"],
          stock: 5,
          image: '/path-to-your-image.jpg',
          deliveryOptions: {
            fastDelivery: "Fast Delivery available on some sizes: Free Shipping over ₹2,990",
            standardDelivery: "Standard Delivery: Free Shipping over ₹2,990",
          },
        });
      }
    };

    fetchProduct();
  }, []);

  const handleSizeClick = (selectedSize: string) => {
    setSize(selectedSize);
  };

  const handleColorClick = (selectedColor: string) => {
    setColor(selectedColor);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handlePinCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPinCode(event.target.value);
  };

  const checkDelivery = () => {
    console.log(`Checking delivery for pin code: ${pinCode}`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt="Product" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.productName}</h2>
          <p>₹ {product.price}</p>
          <p>Inclusive of all Taxes</p>
          <p>{product.description}</p>
          <div className="mb-3">
            <h5>Size</h5>
            <div>
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`btn btn-outline-secondary me-2 ${size === s ? 'active' : ''}`}
                  onClick={() => handleSizeClick(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <h5>Color</h5>
            <div>
              {product.colors.map((c) => (
                <button
                  key={c}
                  className={`btn btn-outline-secondary me-2 ${color === c ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => handleColorClick(c)}
                />
              ))}
            </div>
          </div>
          <div className="mb-3">
            <h5>Quantity</h5>
            <input
              type="number"
              className="form-control"
              value={quantity}
              min="1"
              max={product.stock}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary">Add to Varsada Bag</button>
          </div>
          <div className="mb-3">
            <button className="btn btn-danger">Shop This</button>
          </div>
          <p className="text-danger">Only {product.stock} stocks left for out of delivery</p>
          <div className="mb-3">
            <h5>Check Delivery</h5>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Pin-code to shop this"
              value={pinCode}
              onChange={handlePinCodeChange}
            />
            <button className="btn btn-secondary bg-[#C473FF] text-white hover:bg-[#C473FF] mt-2" onClick={checkDelivery}>
              Check
            </button>
          </div>
          <div className="mb-3">
            <h5>Delivery Options</h5>
            <ul>
              <li>{product.deliveryOptions.fastDelivery}</li>
              <li>{product.deliveryOptions.standardDelivery}</li>
            </ul>
          </div>
          <div className="mb-3">
            <h5>Specifications</h5>
          </div>
          <div className="mb-3">
            <h5>Service & Policy</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
