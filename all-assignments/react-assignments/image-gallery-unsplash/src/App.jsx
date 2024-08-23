import { useMemo, useState } from "react";
import Image from "./components/Image";
import ImageContainer from "./components/ImageContainer";
import WholePageImage from "./components/WholePageImage";

function App() {
  const imageLinks = useMemo(() => {
    return [
      "https://plus.unsplash.com/premium_photo-1724411829646-cc1105f94dfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1724198169550-ba2fde71cfc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1724254351233-914fd32f2515?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1724217552369-22b256e395d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1724269176827-6c56fa8f3b85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
    ];
  });

  const [image, setImage] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      <ImageContainer>
        {imageLinks.map((image) => (
          <Image
            key={image}
            image={image}
            onClick={() => {
              setIsSelected(true);
              setImage(image);
            }}
          />
        ))}
      </ImageContainer>

      {isSelected && (
        <WholePageImage
          image={image}
          showImage={isSelected}
          onClick={() => setIsSelected(false)}
        />
      )}
    </>
  );
}

export default App;
