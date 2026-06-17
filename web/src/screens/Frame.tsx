import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";

type MangaCard = {
  title: string;
  chapter: string;
  image: string;
};

export const Frame = (): JSX.Element => {
  const [mangaCards, setMangaCards] = useState<MangaCard[]>([]);
  const [page, setPage] = useState<number>(0); // Dynamic pagination support

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await fetch(`http://localhost:8000/manga/${page}`);
        if (!response.ok) {
          throw new Error("Failed to fetch manga data");
        }

        const data = await response.json();

        const items = Array.isArray(data) ? data : data.items; // safe fallback


        const formatted = items.map((item: any) => {
          const originalUrl = item.cover_url || "https://via.placeholder.com/193x278.png?text=No+Image";

          // Check if the URL ends with .jpg or .jpeg (case-insensitive)
          const needsProxy = /\.(jpe?g|png)$/i.test(originalUrl);

          // Use proxy for JPGs, otherwise use original URL
          const imageUrl = needsProxy
            ? `http://localhost:8000/image-proxy?url=${encodeURIComponent(originalUrl)}`
            : originalUrl;

          return {
            title: item.title || "Unknown Title",
            chapter: item.chapter?.toString() || "??",
            image: imageUrl,
          };
        });

        setMangaCards(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchManga();
  }, [page]);



  // Footer links data
  const footerLinks = [
    { title: "About Us", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
  ];

  // Navigation links data
  const navLinks = [
    { title: "Home", href: "#" },
    { title: "Genres", href: "#" },
    { title: "Contact", href: "#" },
  ];

  return (
    <div
      className="bg-gray-100 flex flex-row justify-center w-full"
      data-model-id="1:2"
    >
      <div className="bg-gray-100 w-full max-w-[1265px] min-h-[1500px] relative">
        {/* Header */}
        <header className="w-full h-[76px] bg-white shadow-md">
          <div className="flex justify-between items-center h-full px-6">
            <div className="font-bold text-gray-800 text-xl [font-family:'Roboto',Helvetica]">
              Manga World
            </div>
            <nav>
              <ul className="flex space-x-8">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="font-normal text-gray-600 text-base [font-family:'Roboto',Helvetica]"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full pt-[90px] pb-[160px]">
          <h1 className="font-bold text-gray-800 text-3xl [font-family:'Roboto',Helvetica] mb-[60px]">
            Latest Manga Updates
          </h1>

          {/* Manga Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mangaCards.map((manga, index) => (
              <Card
                key={index}
                className="w-[full] h-[330px] bg-white rounded-lg overflow-hidden shadow-md"
              >
                <CardContent className="p-0">
                  <div className="pl-0 pt-4 pb-6 pr-0" title={manga.title}>
                    <div className="flex flex-col items-center">
                      <img
                        className="w-[170px] h-[230px] object-cover"
                        alt={manga.title}
                        src={manga.image}
                      />
                      <div className="mt-3 text-center w-full">
                        <h3 className="font-bold text-gray-800 text-lg [font-family:'Roboto',Helvetica] whitespace-nowrap overflow-hidden text-ellipsis px-2">
                          {manga.title}
                        </h3>
                      </div>
                      <div className="mt-0 text-center w-full">
                        <p className="font-normal text-gray-600 text-base [font-family:'Roboto',Helvetica]">
                          Chapter: {manga.chapter}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center items-center mt-10 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className={`px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition ${
              page === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">Page {page + 1}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
        </main>

        {/* Footer */}
        <footer className="absolute w-full h-28 bottom-0 left-0 bg-white">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex space-x-8 mb-4">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-normal text-gray-600 text-base [font-family:'Roboto',Helvetica]"
                >
                  {link.title}
                </a>
              ))}
            </div>
            <div className="flex space-x-8">
              <a href="#" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4 text-gray-600" />
              </a>
              <a href="#" aria-label="Twitter">
                <TwitterIcon className="w-4 h-4 text-gray-600" />
              </a>
              <a href="#" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4 text-gray-600" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
