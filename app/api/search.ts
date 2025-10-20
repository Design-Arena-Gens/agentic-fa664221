export interface FoodResult {
  platform: string;
  restaurant: string;
  location: string;
  originalPrice: number;
  finalPrice: number;
  discount: number;
  offer: string | null;
  deliveryTime: string;
  deliveryFee: number;
  rating: number;
}

// Simulated data - In production, this would call real APIs
const generateMockResults = (query: string, location: string): FoodResult[] => {
  const platforms = ["Zomato", "Swiggy", "Uber Eats", "Dunzo", "Magicpin"];
  const restaurants = [
    "Pizza Hut",
    "Domino's Pizza",
    "McDonald's",
    "KFC",
    "Burger King",
    "Subway",
    "Biryani Blues",
    "Faasos",
    "Behrouz Biryani",
    "Wow! Momo"
  ];

  const offers = [
    "50% off up to ₹100",
    "30% off on orders above ₹199",
    "Buy 1 Get 1 Free",
    "Flat ₹150 off",
    "40% off + Free Delivery",
    "60% off on first order",
    null,
    "₹200 cashback on payment via UPI",
    "Free delivery on orders above ₹249",
    "20% off + 10% cashback"
  ];

  const results: FoodResult[] = [];
  const numResults = Math.floor(Math.random() * 3) + 5; // 5-7 results

  for (let i = 0; i < numResults; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
    const basePrice = Math.floor(Math.random() * 400) + 150; // ₹150-550
    const discountPercent = Math.random() > 0.3 ? Math.floor(Math.random() * 60) + 10 : 0; // 10-70% or no discount
    const discountAmount = (basePrice * discountPercent) / 100;
    const finalPrice = basePrice - discountAmount;
    const offer = discountPercent > 0 ? offers[Math.floor(Math.random() * offers.length)] : null;
    const deliveryFee = Math.random() > 0.3 ? Math.floor(Math.random() * 40) + 20 : 0; // ₹20-60 or free
    const deliveryTime = `${Math.floor(Math.random() * 20) + 25}-${Math.floor(Math.random() * 10) + 35} min`;
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

    results.push({
      platform,
      restaurant,
      location: location || "Your Location",
      originalPrice: basePrice,
      finalPrice: finalPrice + deliveryFee,
      discount: discountPercent,
      offer,
      deliveryTime,
      deliveryFee,
      rating: parseFloat(rating)
    });
  }

  // Sort by final price
  return results.sort((a, b) => a.finalPrice - b.finalPrice);
};

export const searchFood = async (query: string, location: string): Promise<FoodResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return generateMockResults(query, location);
};
