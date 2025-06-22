import { X } from "lucide-react";

function ImageModal({ src, open, setOpen, alt = "Preview" }) {
  if (!open || !src) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-opacity-70 backdrop-blur-sm">
      <div className="relative max-w-4xl w-full mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <div className="p-4 flex justify-center items-center">
          <img
            src={src}
            alt={alt}
            className="max-h-[80vh] w-auto p-4 rounded-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
}


export default ImageModal