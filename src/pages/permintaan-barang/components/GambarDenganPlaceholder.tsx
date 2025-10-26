import { Image } from "primereact/image";
import { useState } from "react";

const GambarDenganPlaceholder = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      key={src}
      preview
      src={src}
      alt={alt}
      loading="lazy"
      width="64"
      height="64"
      onLoad={() => setLoaded(true)}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "/images/placeholder.jpg";
      }}
      imageClassName={`transition-all duration-500 ease-in-out rounded-lg bg-gray-200 object-cover ${
        loaded ? "blur-0 scale-100" : "blur-md scale-105"
      } ${className}`}
    />
  );
};

export default GambarDenganPlaceholder;
