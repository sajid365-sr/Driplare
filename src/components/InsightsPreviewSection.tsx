
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    title: "The Future of AI in Customer Service: Trends to Watch",
    excerpt: "Discover how AI is revolutionizing customer service and what trends will shape the industry in the coming years.",
    date: "April 18, 2025",
    image: "https://images.unsplash.com/photo-1596443686394-f7dad35365a8?q=80&w=2071&auto=format&fit=crop",
    link: "/insights/ai-customer-service"
  },
  {
    title: "Maximizing ROI with Strategic Digital Marketing Approaches",
    excerpt: "Learn the key strategies that can help businesses achieve better returns on their digital marketing investments.",
    date: "April 15, 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    link: "/insights/marketing-roi"
  }
];

export function InsightsPreviewSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">Insight Hub</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto fade-in slide-up">
            Expert insights and analysis on the latest digital trends and innovations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <Card key={index} className="overflow-hidden hover-scale">
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">{article.date}</div>
                <h3 className="text-xl font-bold">{article.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{article.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Link to={article.link}>
                  <Button variant="link" className="p-0 group flex items-center text-primary">
                    <span>Read More</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/insights">
            <Button variant="outline" className="group">
              <span>View All Insights</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
