export default function EventFilters({ filters, setFilters }) {
  return (
    <div className="bg-black border border-yellow-400/30 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      
      {/* CATEGORY FILTER */}
      <div className="flex flex-col w-full sm:w-1/3">
        <label className="text-xs text-gray-400 mb-1">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
          className="bg-black text-white border border-yellow-400/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Business">Business</option>
          <option value="Education">Education</option>
        </select>
      </div>

      {/* SORT FILTER */}
      <div className="flex flex-col w-full sm:w-1/3">
        <label className="text-xs text-gray-400 mb-1">
          Sort By
        </label>
        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
          className="bg-black text-white border border-yellow-400/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Default</option>
          <option value="date">Date</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {/* RESET BUTTON */}
      <button
        onClick={() => setFilters({ category: "", sort: "" })}
        className="mt-2 sm:mt-6 bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
      >
        Reset
      </button>
    </div>
  );
}
