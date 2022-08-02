import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
const getRandomPhotos = async (page) => {
  try {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=8`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Photo2 = () => {
  // instance
  const [randomPhotos, setRandomPhotos] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const handleLoadMore = useRef({});
  handleLoadMore.current = async () => {
    const images = await getRandomPhotos(nextPage);
    const newPhotos = [...randomPhotos, ...images];
    setRandomPhotos(newPhotos);
    setNextPage((nextPage) => nextPage + 1);
  };
  useEffect(() => {
    handleLoadMore.current();
  }, []);
  // function là by references (react sẽ so sánh vị trí trong memory của 2 function là handleLoadMore trong dependency và handleLoadMore nằm ở bên ngoài) nên nếu nhét cả function handleLoadMore vào đây
  // thì component sẽ re-render liên tục bởi dependency và function bên ngoài luôn khác nhau thì nó sẽ chạy liên tục cho tới khi bao giờ giống nhau thì thôi
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 p-5">
        {randomPhotos.length > 0 &&
          randomPhotos.map((item, index) => (
            <div
              key={item.id}
              className="p-3 bg-white shadow-md rounded-lg h-[200px]"
            >
              <img
                src={item.download_url}
                alt={item.author}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
      </div>
      <div className="text-center">
        <button
          className="inline-flex items-center justify-center px-8 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
          onClick={handleLoadMore.current}
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default Photo2;
