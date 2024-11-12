import { useEffect, useState } from "react";
import { FaPlus, FaRandom } from "react-icons/fa";
import QuoteModal from "./QuoteModal";
import { URL } from "./Constants";

const classButton =
  "bg-white text-purple-500 p-4 rounded-full shadow-lg hover:bg-purple-200";

export default function RandomQuote() {
  const [isLoading, setLoading] = useState(true);

  const [quote, setQuote] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);

  async function fetchQuote() {
    setLoading(true);
    const res = await fetch(`${URL}/quotes`);
    const data = await res.json();
    if (data.length !== 0) {
      const quote = data[Math.floor(Math.random() * data.length)];
      setQuote(quote);
    }
    setLoading(false);
  }

  async function onSave({ newQuote, newAuthor, quoteDate }) {
    setLoading(true);
    const res = await fetch(`${URL}/quotes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newQuote,
        author: newAuthor,
        date: quoteDate,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setQuote(data);
    } else {
      console.error("Failed to save quote");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="text-center px-4">
        {isLoading && !quote && <p className="text-2xl">Loading...</p>}
        {!isLoading && !quote && <p className="text-2xl">No quotes found</p>}
        {quote && (
          <>
            <p className="text-4xl md:text-6xl font-bold mb-4">
              "{quote.text}"
            </p>
            <p className="text-2xl md:text-3xl italic mb-8">- {quote.author}</p>
          </>
        )}

        <div className="flex justify-center space-x-4 mt-8">
          <button className={classButton} onClick={() => setModalOpen(true)}>
            <FaPlus className="text-2xl" />
          </button>
          <button
            className={classButton}
            onClick={() => fetchQuote()}
            disabled={isLoading}
          >
            <FaRandom className="text-2xl" />
          </button>
        </div>
      </div>
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={onSave}
      />
      {isLoading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
          Fetching a quote
          <div className="loader mt-2 mx-auto w-6 h-6 border-4 border-t-transparent border-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
