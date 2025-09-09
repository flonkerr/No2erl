import { useState } from "react";

const photos = [
  "https://images.adsttc.com/media/images/6340/ef0a/33b7/6e3d/3491/fe4d/newsletter/bigs-high-rise-building-breaks-ground-in-east-berlin_4.jpg?1665199954",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&auto=format&fit=crop&q=80",
  "https://images.adsttc.com/media/images/6340/ef0a/33b7/6e3d/3491/fe4d/newsletter/bigs-high-rise-building-breaks-ground-in-east-berlin_4.jpg?1665199954",
  "https://images.adsttc.com/media/images/6340/ef0a/33b7/6e3d/3491/fe4d/newsletter/bigs-high-rise-building-breaks-ground-in-east-berlin_4.jpg?1665199954",
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&auto=format&fit=crop&q=80",
];


const ITEMS_PER_PAGE = 8;

const Gallery = () => {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(photos.length / ITEMS_PER_PAGE);
  const currentPhotos = photos.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const nextPage = () => {
    setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <h2 className="text-gray-400 text-3xl">
        Photo <span className="text-black font-bold">Gallery</span>
      </h2>

      <div className="border-t mt-6 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentPhotos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Gallery ${index}`}
              className="w-full h-48 object-cover bg-gray-200"
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-8 text-gray-600">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-black font-bold">{String(page + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{String(totalPages).padStart(2, "0")}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              disabled={page === 0}
              className="px-3 py-2 border hover:bg-gray-100 disabled:opacity-30"
            >
              ←
            </button>
            <button
              onClick={nextPage}
              disabled={page === totalPages - 1}
              className="px-3 py-2 border hover:bg-gray-100 disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
