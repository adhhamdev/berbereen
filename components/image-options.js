import { CloudArrowDownIcon, PencilIcon } from "@heroicons/react/24/outline";
const ImageOptions = ({ imageId }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center p-2 m-2 bg-white border-2 lg:mx-auto lg:my-4 lg:w-1/4 border-slate-300 rounded-2xl">
      <div className="flex justify-around w-96">
        <button className="flex items-center justify-center p-2 hover:bg-slate-200 rounded-xl size-full">
          <PencilIcon className="size-6" />
        </button>
        <button className="flex items-center justify-center p-2 hover:bg-slate-200 rounded-xl size-full">
          <CloudArrowDownIcon className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default ImageOptions;
