import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Active = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Products</CardTitle>
        <CardDescription>
          Manage your active products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Add code to display active products here */}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};

export default Active;