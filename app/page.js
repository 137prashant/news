"use client";
import { useEffect, useState, useCallback } from "react";
import Header from "./component/Header";
import Pagination from "./component/Pagination";
import SearchBar from "./component/SearchBar";
import LoadingSpinNews from "./component/LoadingSpinNews";
import { useSelector, useDispatch } from "react-redux";
import { updateNews } from "./redux/sessionSlice";
import { useRouter } from "next/navigation";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [latestNews, setLatestNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsLoading, setNewsLoading] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const value = useSelector((state) => state);
  const dispatch = useDispatch();
  // const dispatch = useDispatch();
  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const PAGE_SIZE = 10;

  // Fetch news data
  const fetchNews = async (endpoint, page, query = "") => {
    setNewsLoading(true);
    try {
      setErrorAPI(false);
      const url = `https://newsapi.org/v2/${endpoint}?${
        query ? `q=${query}&` : "country=us&"
      }page=${page}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      const filteredNews = data.articles.filter(
        (article) => article.content !== "[Removed]" && article.urlToImage
      );
      setNews(filteredNews);

      if (!query) setLatestNews(filteredNews);
      let calculatePage =
        Math.floor(data.totalResults / PAGE_SIZE) >= 5
          ? 5
          : Math.floor(data.totalResults / PAGE_SIZE);
      setTotalPages(calculatePage);
    } catch (error) {
      setErrorAPI(true);
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchNews("top-headlines", 1);
    setLoading(false);
  }, []);

  // Debounced search function
  const search = useCallback(
    debounce(async (value, page = 1) => {
      if (!value.trim()) return; 
      fetchNews("everything", page, value);
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on new search
    if (value) {
      search(value);
    } else {
      setNews(latestNews);
      setTotalPages(Math.ceil(latestNews.length / PAGE_SIZE));
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
    if (searchTerm) {
      search(searchTerm, page);
    } else {
      fetchNews("top-headlines", page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const redirectDetailedNews = (article) => {
    dispatch(updateNews(article));
    router.push("/detailedNews");
  };
  return (
    <div className="">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <Header />

          <h1 className="text-2xl font-bold text-center my-6">
            Search Latest News
          </h1>
          <SearchBar
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search news by author, title, or keyword..."
          />

          {newsLoading ? (
            <LoadingSpinNews />
          ) : errorAPI ? (
            <div className="flex items-center justify-center content-center flex-row">
              <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Something went wrong!</h2>
                  <p>
                    Please try again or contact support if the issue persists.
                  </p>
                </div>
              </div>
            </div>
          ) : news.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8">
                {news.map((article, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                        {article.title}
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                        {article.description || "No description available."}
                      </p>

                      {/* Author */}
                      <p className="text-xs text-gray-500 mt-2">
                        Author: {article.author || "Unknown"}
                      </p>

                      {/* Read More Button */}
                      <a
                        
                        onClick={() => redirectDetailedNews(article)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto text-blue-600 font-semibold hover:underline hover:cursor-pointer flex justify-end "
                      >
                        Read more
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                changePage={changePage}
              />
            </>
          ) : (
            <div className="flex items-center justify-center content-center flex-row">
              <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">No Search found</h2>
                  <p>Please search other news</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Debounce Utility
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
