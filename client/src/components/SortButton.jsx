const SortButton = ({ sortOrder, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Sort by:{" "}
      </label>
      <select
        value={sortOrder}
        onChange={(e) => onChange(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="newer">Newer First</option>
        <option value="older">Older First</option>
      </select>
    </div>
  );
};

export default SortButton;
