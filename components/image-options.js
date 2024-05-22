import { CloudArrowDownIcon, PencilIcon } from "@heroicons/react/24/outline";
const ImageOptions = ({ imageId }) => {
  return (
    <div className="fixed m-2 lg:mx-auto lg:my-4 bottom-0 left-0 right-0 lg:w-1/4 flex justify-center p-2 border-2 border-slate-300 rounded-2xl bg-white">
      <div className="w-96 flex justify-around">
        <button className="flex justify-center items-center hover:bg-slate-200 rounded-xl p-2 size-full">
          <PencilIcon className="size-6" />
        </button>
          <button className="flex justify-center items-center hover:bg-slate-200 rounded-xl p-2 size-full">
            <CloudArrowDownIcon className="size-6" />
          </button>
      </div>
    </div>
  );
};

export default ImageOptions;
