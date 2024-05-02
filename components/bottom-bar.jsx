

export default function BottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-black shadow">
      <div className="flex justify-around py-2">
        <a href="#" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Home</span>
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Search</span>
        </a>

        <a href="#" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Notifications</span>
        </a>

        <a href="#" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Profile</span>
        </a>
      </div>
    </div>
  );
}
