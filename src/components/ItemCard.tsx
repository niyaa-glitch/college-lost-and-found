import { MapPin, Calendar, Tag, Check } from "lucide-react";
import { supabase } from "@/lib/supabase"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardHeader 
} from "@/components/ui/card";

const ItemCard = ({ item }: { item: any }) => {
  
  const handleClaim = async (e: React.MouseEvent) => {
    // e.stopPropagation stops the card click from triggering when clicking the button
    e.stopPropagation();
    
    const confirmClaim = window.confirm(`Are you claiming the ${item.title}?`);
    if (confirmClaim) {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', item.id);

      if (error) {
        alert("Error claiming item");
      } else {
        alert("Item successfully claimed and removed from list!");
        window.location.reload(); 
      }
    }
  };

  return (
    <Card className="group cursor-pointer transition-all hover:shadow-lg h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-1">
            {item.title || "Untitled Item"}
          </h3>
          <Badge className={item.type === 'lost' ? "bg-destructive" : "bg-green-600"}>
            {item.type || "unknown"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description || "No description provided."}
        </p>
        
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {item.location || "Unknown"}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recent"}
          </span>
          {item.category && (
            <span className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {item.category}
            </span>
          )}
        </div>

        <Button 
          onClick={handleClaim} 
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
        >
          <Check className="mr-2 h-4 w-4" /> Claim Item
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
