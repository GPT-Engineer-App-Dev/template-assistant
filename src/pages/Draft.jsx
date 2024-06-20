import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Draft = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Draft Products</CardTitle>
        <CardDescription>
          Manage your draft products and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Add code to display draft products here */}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};

export default Draft;