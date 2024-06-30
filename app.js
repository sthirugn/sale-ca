"use strict";

class App extends React.PureComponent {
  render() {
    //const sortedProducts = this.props.products.sort((a, b) => a.price - b.price)

    return (
      <div>
        <header>
          Forest Manor - Move out sale
          <br />
          suri 210-859-1607
        </header>
        <h3 className="subtitle">
          If the product says available, it is available. Don't ask.
          <h4>(First come first server, unless you pay to hold)</h4>
          <p>
            Feel free to whatsapp me. Thanks
          </p>
        </h3>
        <ProductList products={this.props.products} />
      </div>
    );
  }
}

const ProductList = (props) => {
  // Sort the products by state: available, reserved, sold
  const sortedProducts = props.products.sort((a, b) => {
    const stateOrder = { available: 1, hold: 2, sold: 3 };
    return stateOrder[a.state] - stateOrder[b.state];
  });

  return (
    <div className="container">
      {sortedProducts.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  );
};


const ProductCard = (props) => {
  const p = props.product;
  const formatPrice = (p) =>
    p.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: "0",
    });
  const discount = Math.round(100 - (p.price / p.originalPrice) * 100);

  const goWhatsapp = () =>
    window.open(
      `https://api.whatsapp.com/send?phone=+19847897000&text=Hello%2C+I%27m+interested+in+${p.name}`,
      "_blank"
    );

  return (
    <div className="product">
      <a href={p.url} target="_blank">
        {p.state == "sold" ? (
          <span className="product-span">
            <div className="sold">SOLD</div>
            <img
              className="product-img-filter-sold"
              src={p.imageUrl}
              loading="lazy"
            />
          </span>
        ) : (
          ""
        )}
        {p.state == "hold" ? (
          <span className="product-span">
            <div className="reserved">HOLD</div>
            <img
              className="product-img-filter-reserved"
              src={p.imageUrl}
              loading="lazy"
            />
          </span>
        ) : (
          ""
        )}
        {p.state == "notavailable" ? (
          <span className="product-span">
            <div className="notavailable">NOT AVAILABLE</div>
            <img
              className="product-img-filter-notavailable"
              src={p.imageUrl}
              loading="lazy"
            />
          </span>
        ) : (
          ""
        )}
        {p.state == "available" ? (
          <span className="product-span">
            <div className="available">AVAILABLE</div>
            <img className="product-img" src={p.imageUrl} loading="lazy" />
          </span>
        ) : (
          ""
        )}
      </a>
      <div className="product-details">
        <h3>{p.name}</h3>
         {discount > 0 && <span className="discount">-{discount}%</span>}
        <ul>
          {p.details.map((detail) => (
            <li>{detail}</li>
          ))}
        </ul>
      </div>
      <div onClick={goWhatsapp} className="box-price">
        <span className="price">{formatPrice(p.price)}</span>
        <div className="box">
          <img className="icon" src="./whatsapp-icon.png" />
          <button className="payment">Whatsapp</button>
        </div>
      </div>
    </div>
  );
};

// Load the data.json file and parse it
fetch("./data.json")
  .then((response) => response.json())
  .then((productsData) => {
    // Assuming the JSON contains an array of products
    const products = productsData;
    ReactDOM.render(
      <App products={products} />,
      document.getElementById("root")
    );
  });
