export default function Loader({ text = "Loading..." }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-sm text-gray-600">{text}</p>
      </div>
    );
  }
  