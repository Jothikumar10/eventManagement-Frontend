export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-black to-indigo-900 text-gray-300 mt-auto border-t border-gray-800 px-6 pt-8 md:px-16 lg:px-36">
      {/* Top section: Logo + description + links */}
      <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-gray-800 pb-10">

        {/* Logo & Description */}
        <div className="md:max-w-xs">
        <div className="text-2xl md:text-3xl font-extrabold tracking-wide 
                bg-gradient-to-r from-yellow-400 to-orange-500 
                bg-clip-text text-transparent 
                animate-fade-in drop-shadow-lg">
  EventHub
</div>

          <p className="mt-6 text-sm text-gray-400">
            Smart Event Management Platform helps you manage and discover events seamlessly.
          </p>

          {/* App download buttons */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
              alt="Google Play"
              className="h-10 w-auto border border-gray-700 rounded mb-2 md:mb-0"
            />
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
              alt="App Store"
              className="h-10 w-auto border border-gray-700 rounded"
            />
          </div>
        </div>

        {/* Links section */}
        <div className="flex-1 flex flex-col md:flex-row items-start md:justify-end gap-10 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5 text-gray-200">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">About us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact us</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-5 text-gray-200">Get in touch</h2>
            <div className="text-sm space-y-2 text-gray-400">
              <p>+1-234-567-890</p>
              <p>contact@smart-event.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <p className="pt-4 text-center text-sm pb-5 text-gray-500">
        © {new Date().getFullYear()} Smart Event Management Platform. All rights reserved.
      </p>
    </footer>
  );
}
