import { useState } from "react";
import { AiOutlineZoomIn } from "react-icons/ai";

const photos = [
  "https://snoopy.archdaily.com/images/archdaily/catalog/uploads/photo/image/412964/full_adidas_Flagship_Store_Lagos__Oshinowo_Studio_3.jpg?v=1764323226&format=webp&width=680&height=516&crop=true",
  "https://snoopy.archdaily.com/images/archdaily/media/images/6925/6a10/bacd/cd00/0116/0eb8/large_jpg/01.jpg?1764059762&format=webp&width=680&height=516&crop=true",
  "https://snoopy.archdaily.com/images/archdaily/media/images/68cd/4b57/0469/df00/01df/273d/large_jpg/06-Soldalhus-Martin-Schubert.jpg?1758284675&format=webp&width=680&height=516&crop=true",
  "https://snoopy.archdaily.com/images/archdaily/media/images/6925/8701/084c/9e27/2de2/7807/large_jpg/me-bistro-an-nam-architecture_27.jpg?1764067098&format=webp&width=680&height=516&crop=true",
  "https://snoopy.archdaily.com/images/archdaily/media/images/68da/6d32/c767/8c00/0197/a705/large_jpg/Thoso-1.jpg?1759145318&format=webp&width=680&height=516&crop=true",
  "https://snoopy.archdaily.com/images/archdaily/media/images/68f7/fb93/66e5/d600/015e/89d8/large_jpg/_I3A0050.jpg?1761082319&format=webp&width=680&height=516&crop=true",
  "https://snoopy.archdaily.com/images/archdaily/media/images/644c/1c51/2f92/3270/a150/bd9d/large_jpg/targ-blonie-aleksandra-wasilkowska-architectural-studio_9.jpg?1682709601&format=webp&width=680&height=516&crop=true",
  "https://snoopy.archdaily.com/images/archdaily/media/images/691f/2baa/4d20/ca00/01de/5cfd/large_jpg/st_bamboo_theatre_2024___5_ddd.jpg?1763650495&format=webp&width=680&height=516&crop=true",
  "https://snoopy.archdaily.com/images/archdaily/media/images/691f/2489/4d20/ca00/01de/5ccb/large_jpg/IMG_8165.jpg?1763648684&format=webp&width=680&height=516&crop=true",
  "https://snoopy.archdaily.com/images/archdaily/media/images/6916/895c/20ca/aa00/01ef/7cd7/large_jpg/N2bArquitetura_Foto_CarolinaMossin_005.jpg?1763084697&format=webp&width=680&height=516&crop=true",
];

const ITEMS_PER_PAGE = 8;

const Gallery = () => {
  const [page, setPage] = useState(0);
  const [modalImg, setModalImg] = useState<string | null>(null);

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
      <h2 className="text-gray-400 text-3xl mb-6">
        Photo <span className="text-black font-bold">Gallery</span>
      </h2>

      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentPhotos.map((photo, index) => (
          <div key={index} className="relative group cursor-pointer">
            <img
              src={photo}
              alt={`Gallery ${index}`}
              className="w-full h-48 object-cover bg-gray-200 rounded"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <AiOutlineZoomIn className="text-white text-3xl" />
            </div>
            <div onClick={() => setModalImg(photo)} className="absolute inset-0"></div>
          </div>
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

      {modalImg && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setModalImg(null)}
        >
          <img src={modalImg} alt="Enlarged" className="max-h-[90vh] max-w-full rounded shadow-lg" />
        </div>
      )}
    </section>
  );
};

export default Gallery;
