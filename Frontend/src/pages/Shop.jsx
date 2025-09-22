import React, { useState } from "react";

const Shop = () => {
  /* ---------------- Banner State ---------------- */
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://picsum.photos/800/500?random=1",
      title: "Welcome to My E-Store",
      subtitle: "Your One-Stop Shop",
      description: "Discover a wide range of products tailored to meet your daily needs.",
    },
    {
      id: 2,
      image: "https://picsum.photos/800/500?random=2",
      title: "Exclusive Offers",
      subtitle: "Unbeatable Prices",
      description: "Take advantage of our exclusive offers and save big!",
    },
    {
      id: 3,
      image: "https://picsum.photos/800/500?random=3",
      title: "Quality Guaranteed",
      subtitle: "Shop with Confidence",
      description: "We guarantee the quality of our products.",
    },
  ];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

  /* ---------------- Product Detail State ---------------- */
  const product = {
    name: "T-Shirt LD02",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias necessitatibus ratione consectetur.",
    image: "https://picsum.photos/400/400?random=4",
    price: "100 ~ 200",
    children: [
      { color: "#bfb1a4", size: "M", price: 100 },
      { color: "#bfb1a4", size: "L", price: 120 },
      { color: "#bfb1a4", size: "XL", price: 170 },
      { color: "#9c2f46", size: "M", price: 140 },
      { color: "#9c2f46", size: "L", price: 120 },
      { color: "#9c2f46", size: "XL", price: 150 },
    ],
  };

  const [option, setOption] = useState({ size: null, color: null });

  const colors = [...new Set(product.children.map((item) => item.color))];
  const sizes = [...new Set(product.children.map((item) => item.size))];

  const getPrice = () => {
    if (!option.size || !option.color) return product.price;
    const selected = product.children.find(
      (child) => child.size === option.size && child.color === option.color
    );
    return selected ? selected.price : product.price;
  };

  const handleSelection = (type, value) => {
    setOption((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  return (
    <div className="w-full">
      {/* ---------------- Banner ---------------- */}
      <section className="relative h-screen bg-gray-100">
        <div className="relative h-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="flex-shrink-0 w-full h-full flex items-center justify-center"
              >
                <div className="container mx-auto max-w-screen-lg px-5 grid grid-cols-1 lg:grid-cols-2 items-center h-full">
                  <div>
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                      {slide.title}
                    </h1>
                    <h3 className="text-2xl text-blue-500 font-semibold mb-4">{slide.subtitle}</h3>
                    <p className="text-blue-500 mb-4">{slide.description}</p>
                  </div>
                  <img src={slide.image} alt={slide.title} className="w-full rounded-lg shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          ▶
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                activeIndex === index ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ---------------- Featured Products ---------------- */}
      <section className="bg-gray-100">
        <div className="container mx-auto py-10 px-5">
          <div className="text-center py-5">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Featured Products
            </h1>
            <p className="text-blue-500">
              Explore our handpicked collection of best-selling items.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={`https://picsum.photos/400/300?random=${i + 10}`}
                  alt={`Product ${i}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-500 font-semibold">₹ {1000 + i * 500}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-blue-500">Product {i}</h2>
                  <p className="text-blue-400 text-sm mt-2">Reviews ({i * 10 + 5})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Product Detail ---------------- */}
      <main className="bg-gray-100 w-[90vw] max-w-screen-lg mx-auto mt-12 p-10 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <img src={product.image} alt={product.name} className="w-full rounded-lg" />

          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-medium bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              {product.name}
            </h2>
            <p className="text-blue-500 text-sm">{product.description}</p>

            {/* Colors */}
            <p className="font-semibold text-blue-500">Colors</p>
            <ul className="grid grid-cols-6 gap-4">
              {colors.map((color) => (
                <li
                  key={color}
                  onClick={() => handleSelection("color", color)}
                  className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                    option.color === color ? "border-blue-500 shadow-lg" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </ul>

            {/* Sizes */}
            <p className="font-semibold text-blue-500">Sizes</p>
            <ul className="grid grid-cols-3 gap-4">
              {sizes.map((size) => (
                <li
                  key={size}
                  onClick={() => handleSelection("size", size)}
                  className={`py-2 px-4 text-center rounded-lg border cursor-pointer ${
                    option.size === size ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {size}
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="flex items-center gap-2 text-3xl font-bold text-blue-500">
              <span>₹ {getPrice()}</span>
            </div>

            {/* Add to Cart */}
            <button className="w-full py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-green-500 transition">
              Add To Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
