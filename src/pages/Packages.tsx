
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, DollarSign } from "lucide-react";

interface Package {
  id: number;
  title: string;
  image: string;
  price: string;
  rating: number;
  tags: string[];
}

const packages: Package[] = [
  {
    id: 1,
    title: "Bali Adventure",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    price: "899",
    rating: 4.8,
    tags: ["best-seller", "beach", "honeymoon"]
  },
  {
    id: 2,
    title: "Swiss Alps Explorer",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    price: "1299",
    rating: 4.9,
    tags: ["family-trip", "adventure"]
  },
  {
    id: 3,
    title: "Santorini Getaway",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    price: "999",
    rating: 4.7,
    tags: ["honeymoon", "best-seller"]
  },
  {
    id: 4,
    title: "Corporate Maldives Retreat",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    price: "1499",
    rating: 4.9,
    tags: ["corporate", "luxury"]
  }
];

const allTags = [
  "best-seller",
  "honeymoon",
  "beach",
  "friends-trip",
  "family-trip",
  "corporate",
  "adventure",
  "luxury"
];

const Packages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredPackages, setFilteredPackages] = useState(packages);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const tag = searchParams.get("tag");
    if (tag) {
      setSelectedTags([tag]);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...packages];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(pkg => 
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(pkg => 
        selectedTags.some(tag => pkg.tags.includes(tag))
      );
    }

    // Apply price filter
    if (minPrice) {
      filtered = filtered.filter(pkg => 
        parseInt(pkg.price) >= parseInt(minPrice)
      );
    }
    if (maxPrice) {
      filtered = filtered.filter(pkg => 
        parseInt(pkg.price) <= parseInt(maxPrice)
      );
    }

    setFilteredPackages(filtered);
  }, [searchQuery, selectedTags, minPrice, maxPrice]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Filters Section */}
          <div className="w-full md:w-1/4 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </label>
                <Input
                  type="text"
                  placeholder="Search packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price Range
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag.replace("-", " ")}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className="group overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag.replace("-", " ")}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-primary text-lg font-bold">${pkg.price}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-gray-600">{pkg.rating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
