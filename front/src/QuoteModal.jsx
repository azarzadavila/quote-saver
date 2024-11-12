import { useState } from "react";

export default function QuoteModal({ isOpen, onClose, onSave }) {
  const [newQuote, setNewQuote] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [quoteDate, setQuoteDate] = useState("");

  if (!isOpen) return null;

  function handleSave() {
    onSave({ newQuote, newAuthor, newDate: quoteDate });
    setNewQuote("");
    setNewAuthor("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black">Add a New Quote</h2>

        <div className="mb-4 text-left">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="quote"
          >
            Quote
          </label>
          <input
            type="text"
            id="quote"
            placeholder="Enter the quote"
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded text-black"
          />
        </div>

        <div className="mb-4 text-left">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            placeholder="Enter the author"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded text-black"
          />
        </div>

        <div className="mb-4 text-left">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="date"
          >
            Date the quote was said
          </label>
          <input
            type="date"
            id="date"
            value={quoteDate}
            onChange={(e) => setQuoteDate(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded text-black"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <div className="relative group">
            <button
              className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${
                !newQuote ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleSave}
              disabled={!newQuote}
            >
              Save
            </button>
            {!newQuote && (
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-sm rounded py-1 px-2">
                Enter a quote before saving
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
