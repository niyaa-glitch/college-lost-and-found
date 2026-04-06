import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Report = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "lost", // Default to lost
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This sends the data to your real Supabase table!
      const { error } = await supabase
        .from('items')
        .insert([
          { 
            title: formData.title,
            description: formData.description,
            location: formData.location,
            type: formData.type,
            category: formData.category,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Item reported successfully.",
      });
      
      // Go to browse page to see the new item
      navigate("/browse");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to report item",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Report an Item</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border">
          <div>
            <label className="block text-sm font-medium mb-2">Item Title</label>
            <Input 
              required 
              placeholder="e.g. Blue Pen, Keys, Laptop"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select 
              className="w-full p-2 rounded-md border bg-background"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input 
              required 
              placeholder="Where was it last seen?"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea 
              placeholder="Provide details..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Reporting..." : "Submit Report"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Report;