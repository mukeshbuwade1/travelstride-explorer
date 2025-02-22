
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Clock, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia",
    excerpt: "Discover lesser-known destinations that will take your breath away...",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
    author: "Travel Team",
    date: "2024-03-10",
    readTime: "5 min read",
    category: "Travel Tips",
  },
  {
    id: 2,
    title: "Ultimate Travel Photography Guide",
    excerpt: "Master the art of capturing your travel memories with these pro tips...",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
    author: "Photography Expert",
    date: "2024-03-08",
    readTime: "8 min read",
    category: "Photography",
  },
  {
    id: 3,
    title: "Sustainable Travel: A Complete Guide",
    excerpt: "Learn how to minimize your environmental impact while exploring the world...",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    author: "Eco Explorer",
    date: "2024-03-05",
    readTime: "6 min read",
    category: "Eco Tourism",
  },
];

export const BlogSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Travel Blog</h2>
          <p className="text-lg text-gray-600">Stories, guides, and tips from our travel experts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 group">
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
