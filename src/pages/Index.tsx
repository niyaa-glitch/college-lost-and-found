import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, PlusCircle, Eye, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ItemCard from "@/components/ItemCard";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase"; 

const steps = [
  { icon: PlusCircle, title: "Backtrack", description: "Register lost or found items." },
  { icon: Eye, title: "Browse", description: "Search through the database." },
  { icon: CheckCircle, title: "Claim", description: "Reunite with your items." },
];

const Index = () => {
  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data, error } = await supabase
          .from('items')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (data) setRecentItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center">Loading Project...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <header className="py-20 text-center border-b bg-card">
        <h1 className="text-4xl font-bold">Lost it? <span className="text-primary">Track it back.</span></h1>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/report"><Button size="lg">Report Item</Button></Link>
          <Link to="/browse"><Button variant="outline" size="lg">Browse</Button></Link>
        </div>
      </header>

      <main className="container mx-auto py-16 px-4">
        <h2 className="text-2xl font-bold mb-8">Recent Items</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;