
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function StarRating({ rating }: { rating: number }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-400" />);
    }
  }

  return <div className="flex space-x-1">{stars}</div>;
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  rating:number;
  image: {
    asset: {
      url: string;
    };
  };
  category: string;
  description: string;
}

interface PopularProductProps {
  products: Product[];
}

export default function PopularProduct({ products }: PopularProductProps) {
  if (!products?.length) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-zinc-900 text-center mb-12">Popular Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {product.image?.asset?.url && (
                <img
                  src={product.image.asset.url}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                  />
                )}
               
              <div className="p-6">
                <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">{product.title}</h3>
                <StarRating rating={product.rating} />
                </div>
                <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-zinc-900">${product.price}</span>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
