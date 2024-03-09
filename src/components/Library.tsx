import React from "react";
import { debounce } from "lodash";
const Library = () => {
  const searchInput = React.useRef<HTMLInputElement>(null);

  // Debounce the handleSearch function
  const debouncedHandleSearch = React.useCallback(
    debounce(() => {
      const value = searchInput?.current?.value;
      console.log(value);
    }, 500),
    []
  );
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    debouncedHandleSearch();
  };
  const handleSelection = (selection: string) => {
    if (searchInput && searchInput.current) {
        searchInput.current.value = selection;
        debouncedHandleSearch();
      }
  };
  return (
    <form>
      <div className="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label
            htmlFor="image_search"
            className="block mb-2 text-md text-left font-medium text-gray-900 dark:text-white"
          >
            Αναζήτηση
          </label>
          <input
            ref={searchInput}
            onChange={handleSearch}
            type="text"
            id="image_search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Αναζήτηση"
            required
          />
        </div>
        <div>
          <div className="flex justify-between">
            <div className="button" onClick={() => handleSelection("Nature")}>
              Nature
            </div>
            <div className="button" onClick={() => handleSelection("Birds")}>
              Birds
            </div>
            <div className="button" onClick={() => handleSelection("Cats")}>
              Cats
            </div>
            <div className="button" onClick={() => handleSelection("Shoes")}>
              Shoes
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Library;
