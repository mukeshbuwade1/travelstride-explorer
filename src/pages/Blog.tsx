
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, User } from "lucide-react";

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

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Blog</h1>
          <p className="text-lg text-gray-600">
            Discover travel tips, guides, and inspiring stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
