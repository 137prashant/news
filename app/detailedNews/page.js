"use client";

import { useEffect, useState } from "react";
import Header from "../component/Header";
import { updateNews } from "../redux/sessionSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
  const value = useSelector((state) => state.detailedNews);
  const [news, setNews] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (typeof value.news === "object" && Object.keys(value.news).length > 0) {
      
      setNews({
        author: value.news.author ?? "Unknown Author",
        content: value.news.content ?? "No content available.",
        description: value.news.description ?? "No description available.",
        publishedAt: value.news.publishedAt ?? "Unknown date",
        title: value.news.title ?? "No title provided.",
        url: value.news.url ?? "No URL available.",
        urlToImage:
          value.news.urlToImage ??
          "https://as1.ftcdn.net/jpg/05/10/89/60/1000_F_510896078_Fb2dY9Mj6H6pClfkK7FS9FgLiyavq5sL.webp",
      });
    } else {

      setNews("");
    }
  }, []);
  return (
    <>
      <Header />
      {news == "" ? (
        <div className="flex items-center justify-center content-center flex-row">
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Something Went Wrong</h2>
              <p>Please go back to home page and try again</p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/")}
            >
              Home Page
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 p-6">
           <div className="my-4 mx-auto">
                  <button
                    className="btn btn-primary"
                    onClick={() => router.back()}
                  >
                    Go Back
                  </button>
                </div>
          <div className="container mx-auto">
            {/* News Card */}
            <div className="card lg:card-side bg-base-100 shadow-xl">
              {/* News Image */}
              <figure className="w-full lg:w-1/3">
                <img
                  src={news.urlToImage || "https://via.placeholder.com/600x400"}
                  alt={news.title || "News Image"}
                  className="h-full object-cover w-full"
                />
              </figure>
              {/* News Content */}
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold text-primary">
                  {news.title || "No title available"}
                </h2>
                <p className="text-gray-600">
                  {news.description || "No description available."}
                </p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Author:</span>{" "}
                    {news.author || "Unknown Author"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Published At:</span>{" "}
                    {news.publishedAt || "Unknown Date"}
                  </p>
                </div>
                <div className="card-actions justify-end">
                  {news.url ? (
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Read Full Article
                    </a>
                  ) : (
                    <button className="btn btn-disabled">
                      No Link Available
                    </button>
                  )}
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
