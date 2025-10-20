"use client";

import { useState } from "react";
import { Search, TrendingUp, Tag, MapPin } from "lucide-react";
import { searchFood, type FoodResult } from "./api/search";

export default function Home() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<FoodResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    const searchResults = await searchFood(query, location);
    setResults(searchResults);
    setLoading(false);
  };

  const getBestDeal = () => {
    if (results.length === 0) return null;
    return results.reduce((best, current) =>
      current.finalPrice < best.finalPrice ? current : best
    );
  };

  const bestDeal = getBestDeal();

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🍕 Food Price Comparator
          </h1>
          <p className="text-xl text-gray-600">
            Compare prices across Zomato, Swiggy, Uber Eats & more. Find the best deals instantly!
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What are you craving?
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., Margherita Pizza, Chicken Biryani..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Koramangala, Bangalore"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? "Searching..." : "Compare Prices"}
            </button>
          </div>
        </form>

        {/* Results */}
        {searched && (
          <>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
                <p className="mt-4 text-gray-600 text-lg">Finding the best deals for you...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                {/* Best Deal Banner */}
                {bestDeal && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-8 mb-8 shadow-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <TrendingUp size={32} />
                      <h2 className="text-3xl font-bold">Best Deal Found!</h2>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <p className="text-xl font-semibold mb-2">{bestDeal.restaurant}</p>
                          <p className="text-2xl font-bold mb-1">
                            ₹{bestDeal.finalPrice.toFixed(2)}
                            {bestDeal.discount > 0 && (
                              <span className="ml-3 text-lg line-through opacity-75">
                                ₹{bestDeal.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </p>
                          {bestDeal.offer && (
                            <p className="text-lg opacity-90">💰 {bestDeal.offer}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm opacity-90 mb-2">Available on</p>
                          <span className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-bold text-lg">
                            {bestDeal.platform}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* All Results */}
                <div className="grid gap-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">All Available Options</h2>
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                        result === bestDeal ? "border-green-500" : "border-gray-100"
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-[250px]">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="px-4 py-1.5 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full text-sm font-semibold">
                                {result.platform}
                              </span>
                              {result === bestDeal && (
                                <span className="px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-semibold">
                                  Best Deal 🎉
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {result.restaurant}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <MapPin size={16} />
                              <span className="text-sm">{result.location}</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-3">
                              ⏱️ {result.deliveryTime} • 🚚 ₹{result.deliveryFee.toFixed(2)} delivery
                            </p>
                            {result.offer && (
                              <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                <Tag size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm font-semibold text-yellow-800">{result.offer}</p>
                              </div>
                            )}
                          </div>

                          <div className="text-right">
                            <div className="mb-2">
                              <p className="text-3xl font-bold text-gray-900">
                                ₹{result.finalPrice.toFixed(2)}
                              </p>
                              {result.discount > 0 && (
                                <>
                                  <p className="text-lg text-gray-400 line-through">
                                    ₹{result.originalPrice.toFixed(2)}
                                  </p>
                                  <p className="text-green-600 font-semibold">
                                    Save ₹{(result.originalPrice - result.finalPrice).toFixed(2)} ({result.discount}% off)
                                  </p>
                                </>
                              )}
                            </div>
                            <button className="mt-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md">
                              Order Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Money Saving Tip</h3>
                  <p className="text-gray-700">
                    By choosing the best deal, you can save up to ₹
                    {(Math.max(...results.map(r => r.finalPrice)) - Math.min(...results.map(r => r.finalPrice))).toFixed(2)} on this order!
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <p className="text-xl text-gray-600 mb-2">No results found</p>
                <p className="text-gray-500">Try searching for a different dish or location</p>
              </div>
            )}
          </>
        )}

        {/* Features */}
        {!searched && (
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600">Compare prices across all major food delivery platforms instantly</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Offers</h3>
              <p className="text-gray-600">Find all available discounts and cashback offers in one place</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Save Money</h3>
              <p className="text-gray-600">Always get the best deal and save on every order</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
